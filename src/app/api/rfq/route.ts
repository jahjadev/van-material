import { NextResponse } from "next/server";
import { company } from "@/data/company";
import { createRfqSchema, stripCrlf, type RfqInput } from "@/lib/rfqSchema";
import { resolveGradeLabel, resolveProductLabel, rfqProductOptions } from "@/lib/rfqOptions";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const rfqProducts = rfqProductOptions();
/** Server-side validation only needs the slim product/grade list, not the
 * full `@/data/products` dataset (which only `rfqOptions.ts` imports). */
const rfqSchema = createRfqSchema("en", rfqProducts);

export const runtime = "nodejs";

/**
 * RFQ ("request a quote") handler — every request is emailed to the sales
 * inbox. Ported from the sibling VAN repo's `src/app/api/quote/route.ts`:
 * zod validation, a silent honeypot, per-IP + endpoint rate limiting, and
 * SMTP delivery via nodemailer. Turnstile and Resend are out of scope here
 * (see Task 5 in docs/superpowers/plans/2026-10-05-van-material-nextjs-seo-launch.md) — SMTP is the only transport.
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

const TO_EMAIL = process.env.RFQ_TO_EMAIL || company.contact.email;

/** Over SMTP, From defaults to the authenticating mailbox (SMTP_USER). */
function fromEmail(smtpUser: string) {
  return `VAN INTERTRADE <${smtpUser}>`;
}

/** Redact PII for the one place a value might appear in a server log. */
function redactEmail(email: string) {
  const at = email.indexOf("@");
  return at > 0 ? `${email.slice(0, 1)}***@${email.slice(at + 1)}` : "***";
}

/**
 * Whether the test-only jsonTransport path is active. Double-guarded on
 * purpose: `RFQ_TEST_JSON_TRANSPORT=1` alone used to be enough, which meant
 * a stray copy of that one variable in a real deployment would silently
 * stop delivering real leads — the route would still answer
 * `{ok:true, delivered:true}` (so nothing downstream would notice) while
 * actually only composing a message in memory, and would echo that message
 * (including the real `To` inbox) back in the HTTP response.
 *
 * Both of these must hold:
 *  - `VERCEL_ENV` is unset — refuses to activate on any real Vercel
 *    deployment (Production, Preview, anything), where that var is always
 *    set by the platform.
 *  - `RFQ_TEST_ALLOW=1` is also set — a second, differently-named switch
 *    that only `scripts/test-rfq.mjs` sets, so one leftover env var can't
 *    trigger this on its own.
 */
function testModeActive(): boolean {
  return (
    process.env.RFQ_TEST_JSON_TRANSPORT === "1" &&
    !process.env.VERCEL_ENV &&
    process.env.RFQ_TEST_ALLOW === "1"
  );
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

async function sendMail(data: RfqInput, subject: string, text: string, html: string, testMode: boolean) {
  const nodemailer = (await import("nodemailer")).default;

  // Test-only switch, gated by `testModeActive()` (never true in a real
  // deployment): exercises this exact function and the real transport API
  // without opening a network connection. See scripts/test-rfq.mjs.
  if (testMode) {
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

  // The global ceiling is charged later, right before the actual send
  // attempt — not here. Charging it this early would let a flood of
  // garbage (unparseable bodies, failed validation, honeypot hits, all of
  // which rotate IPs to dodge the per-IP limit) burn the whole endpoint's
  // hourly quota and lock out genuine leads without ever composing an
  // email.

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

  const productLabel = resolveProductLabel(rfqProducts, data.product);
  const gradeLabel = resolveGradeLabel(rfqProducts, data.product, data.grade);

  // Subject is built only from server-resolved labels (productLabel/gradeLabel
  // come from `rfqProducts`, not the request body) plus the submitter's
  // name/company, both already CR/LF-rejected by the schema — `stripCrlf` is
  // defense in depth, not the only guard.
  const subjectParts = [productLabel, gradeLabel].filter(Boolean).join(" ");
  const subject = stripCrlf(
    `RFQ: ${subjectParts}${data.company ? ` — ${data.company}` : ` — ${data.name}`}`,
  );

  const text = bodyText(data, productLabel, gradeLabel);
  const html = bodyHtml(data, productLabel, gradeLabel);

  const hasSmtp = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );
  const testMode = testModeActive();

  if (process.env.RFQ_TEST_JSON_TRANSPORT === "1" && !testMode) {
    // Someone set the test-only variable without the second explicit
    // guard (or this is a real Vercel deployment) — refuse to activate it
    // and fall straight through to the ordinary "not configured" path
    // below, exactly as if RFQ_TEST_JSON_TRANSPORT had never been set.
    console.error(
      "[rfq] RFQ_TEST_JSON_TRANSPORT is set but the test-mode guard did not pass " +
        "(requires RFQ_TEST_ALLOW=1 and no VERCEL_ENV) — ignoring it. " +
        "This variable must never be set in a real deployment.",
    );
  }

  if (testMode) {
    // This must be impossible to reach in a real deployment — see
    // `testModeActive()`. Loud on purpose: this code path never sends a
    // real email, so anyone who sees this log line in a place that should
    // be delivering real leads needs to notice immediately.
    console.error(
      "[rfq] TEST MODE ACTIVE (RFQ_TEST_JSON_TRANSPORT) — no real email will be sent for this request.",
    );
  }

  if (!hasSmtp && !testMode) {
    console.warn(
      "[rfq] no SMTP transport configured (set SMTP_HOST/PORT/USER/PASS) — request NOT delivered. product:",
      data.product,
      "email:",
      redactEmail(data.email),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  // Charge the whole-endpoint ceiling only now, immediately before the
  // actual send attempt — see the comment near the per-IP check above.
  const global = rateLimit("__all__", GLOBAL_LIMIT, GLOBAL_WINDOW_MS);
  if (!global.ok) {
    console.warn("[rfq] global rate limit hit — shedding requests");
    return tooMany(global.retryAfter);
  }

  try {
    const testMessage = await sendMail(data, subject, text, html, testMode);
    return NextResponse.json({
      ok: true,
      delivered: true,
      // Never echoed unless the double guard above passed — the real
      // destination inbox (`to`) is part of this payload.
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
