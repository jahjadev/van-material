import { NextResponse } from "next/server";
import { families } from "@/data/products";
import { company } from "@/data/company";
import { rfqSchema, resolveGradeLabel, stripCrlf, type RfqInput } from "@/lib/rfqSchema";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

/**
 * RFQ ("request a quote") handler — every request is emailed to the sales
 * inbox. Ported from the sibling VAN repo's `src/app/api/quote/route.ts`:
 * zod validation, a silent honeypot, per-IP + endpoint rate limiting, and
 * SMTP delivery via nodemailer. Turnstile and Resend are out of scope here
 * (see task-5-brief.md) — SMTP is the only transport.
 *
 * Set these (project env + `.env.local` for dev) to actually deliver mail —
 * see `.env.example` for the full explanation, including why
 * `SMTP_TLS_INSECURE` currently has to be set:
 *   SMTP_HOST, SMTP_PORT (optional, default 465), SMTP_USER, SMTP_PASS,
 *   SMTP_TLS_INSECURE (optional), RFQ_TO_EMAIL (optional override).
 *
 * With SMTP unset the request is accepted but NOT delivered, and the
 * response says so (`delivered: false`) — the form then tells the visitor
 * to call or LINE instead of falsely promising a callback. This is
 * deliberate: no lead is ever silently dropped without the visitor knowing.
 *
 * Never log the submitter's PII (name, email, phone, message) — server logs
 * carry redacted values and error reasons only.
 */

const TO_EMAIL = process.env.RFQ_TO_EMAIL ?? company.contact.email;

/** Over SMTP, From defaults to the authenticating mailbox (SMTP_USER). */
function fromEmail(smtpUser: string) {
  return `VAN INTERTRADE <${smtpUser}>`;
}

/** Redact PII for the one place a value might appear in a server log. */
function redactEmail(email: string) {
  const at = email.indexOf("@");
  return at > 0 ? `${email.slice(0, 1)}***@${email.slice(at + 1)}` : "***";
}

function bodyText(data: RfqInput, productLabel: string, gradeLabel: string) {
  return [
    `Name: ${data.name}`,
    `Company: ${data.company || "-"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Product: ${productLabel}`,
    `Grade: ${gradeLabel || "-"}`,
    `Form: ${data.form || "-"}`,
    `Quantity: ${data.quantity || "-"}`,
    "",
    data.message,
  ].join("\n");
}

function bodyHtml(data: RfqInput, productLabel: string, gradeLabel: string) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const row = (label: string, value: string) =>
    `<tr><td style="padding:2px 8px 2px 0;color:#555">${esc(label)}</td><td style="padding:2px 0">${esc(value)}</td></tr>`;
  return [
    "<table>",
    row("Name", data.name),
    row("Company", data.company || "-"),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Product", productLabel),
    row("Grade", gradeLabel || "-"),
    row("Form", data.form || "-"),
    row("Quantity", data.quantity || "-"),
    "</table>",
    `<p>${esc(data.message).replace(/\n/g, "<br>")}</p>`,
  ].join("\n");
}

async function sendMail(data: RfqInput, subject: string, text: string, html: string) {
  const nodemailer = (await import("nodemailer")).default;

  // Test-only switch (never set in production): exercises this exact
  // function and the real transport API without opening a network
  // connection. See scripts/test-rfq.mjs.
  if (process.env.RFQ_TEST_JSON_TRANSPORT === "1") {
    const transport = nodemailer.createTransport({ jsonTransport: true });
    const info = await transport.sendMail({
      from: fromEmail("test@example.com"),
      to: TO_EMAIL,
      replyTo: data.email,
      subject,
      text,
      html,
    });
    return info.message;
  }

  const host = process.env.SMTP_HOST!;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const port = Number(process.env.SMTP_PORT ?? 465);

  const transport = nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: port === 465,
    auth: { user, pass },
    // The company mail host currently serves a self-signed certificate
    // (see .env.example for the full explanation) — opting in with
    // SMTP_TLS_INSECURE keeps the connection encrypted but unauthenticated.
    ...(process.env.SMTP_TLS_INSECURE === "true"
      ? { tls: { rejectUnauthorized: false, servername: host } }
      : {}),
  });

  await transport.sendMail({
    from: fromEmail(user),
    to: TO_EMAIL,
    replyTo: data.email,
    subject,
    text,
    html,
  });
  return undefined;
}

/** Per-IP: enough for a genuine retry or a second enquiry, not for a flood. */
const PER_IP_LIMIT = 5;
const PER_IP_WINDOW_MS = 15 * 60 * 1000;

/**
 * Whole-endpoint ceiling, so rotating IPs can't mail-bomb the inbox or burn
 * the mailbox's sending quota with the host.
 */
const GLOBAL_LIMIT = 60;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;

function tooMany(retryAfter: number) {
  return NextResponse.json(
    { ok: false, error: "rate_limited" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export async function POST(req: Request) {
  // Rate-limit before parsing: an unparsed body is the cheapest thing to
  // reject, and every accepted request costs a real outbound email.
  const callerIp = clientIp(req);
  const ip = rateLimit(callerIp, PER_IP_LIMIT, PER_IP_WINDOW_MS);
  if (!ip.ok) return tooMany(ip.retryAfter);

  const global = rateLimit("__all__", GLOBAL_LIMIT, GLOBAL_WINDOW_MS);
  if (!global.ok) {
    console.warn("[rfq] global rate limit hit — shedding requests");
    return tooMany(global.retryAfter);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = rfqSchema.safeParse(body);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    return NextResponse.json(
      { ok: false, field: typeof field === "string" ? field : "unknown" },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: silently accept bots without doing anything — same success
  // shape as a real send, no mail composed or sent.
  if (data.website && data.website.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const family = families.find((f) => f.slug === data.product);
  const productLabel = family ? family.name.en : data.product;
  const gradeLabel = resolveGradeLabel(family, data.grade);

  // Subject is built only from server-resolved labels (productLabel comes
  // from `families`, not the request body) plus the submitter's name/company,
  // both already CR/LF-rejected by the schema — `stripCrlf` is defense in
  // depth, not the only guard.
  const subjectParts = [productLabel, gradeLabel].filter(Boolean).join(" ");
  const subject = stripCrlf(
    `RFQ: ${subjectParts}${data.company ? ` — ${data.company}` : ` — ${data.name}`}`,
  );

  const text = bodyText(data, productLabel, gradeLabel);
  const html = bodyHtml(data, productLabel, gradeLabel);

  const hasSmtp = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
  const testMode = process.env.RFQ_TEST_JSON_TRANSPORT === "1";

  if (!hasSmtp && !testMode) {
    console.warn(
      "[rfq] no SMTP transport configured (set SMTP_HOST/PORT/USER/PASS) — request NOT delivered. product:",
      data.product,
      "email:",
      redactEmail(data.email),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const testMessage = await sendMail(data, subject, text, html);
    return NextResponse.json({
      ok: true,
      delivered: true,
      ...(testMode ? { testMessage } : {}),
    });
  } catch (err) {
    console.error(
      "[rfq] delivery failed via smtp:",
      err instanceof Error ? err.message : "unknown error",
      "email:",
      redactEmail(data.email),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }
}
