/**
 * The email fallback for the RFQ form: when `/api/rfq` can't deliver (no
 * SMTP configured, a send failure, a network error), the form offers to
 * send the same request from the visitor's own mail app instead — the
 * `mailto:` approach vaninter.com has always used — so a lead is never lost
 * just because the server couldn't mail it.
 *
 * The email itself always uses English field labels and product names,
 * like the server-sent RFQ email, whatever page language it came from: it
 * goes to the same sales inbox, and Thai is ~9× longer once percent-encoded
 * into a `mailto:` URL, which would leave almost no room for the message.
 * The visitor's own text is passed through as typed.
 *
 * Client-safe: depends only on the slim `RfqProductOption[]` shape, like
 * `rfqSchema.ts`.
 */

import type { RfqInput } from "@/lib/rfqSchema";
import type { RfqProductOption } from "@/lib/rfqOptions";
import type { Lang } from "@/lib/locale";

/**
 * Desktop Outlook and some older mail handlers silently truncate or refuse
 * a `mailto:` URL much past ~2,000 characters. Above this the message is
 * shortened in the draft; the full text stays available through "Copy
 * request".
 */
const MAX_MAILTO_LENGTH = 1900;

function labels(data: RfqInput, products: RfqProductOption[]) {
  const product = products.find((p) => p.slug === data.product);
  const grade = product?.grades.find((g) => g.value === data.grade);
  return { product: product?.name.en ?? data.product, grade: grade?.label.en ?? "" };
}

export function rfqEmailSubject(data: RfqInput, products: RfqProductOption[]): string {
  const l = labels(data, products);
  const what = [l.product, l.grade].filter(Boolean).join(" ");
  return `RFQ: ${what} — ${data.company || data.name}`.replace(/[\r\n]+/g, " ");
}

/** Plain-text request, same field order as the server-sent email. */
export function rfqEmailBody(data: RfqInput, products: RfqProductOption[], message: string = data.message): string {
  const l = labels(data, products);
  const row = (label: string, v: string) => `${label}: ${v || "-"}`;
  return [
    row("Name", data.name),
    row("Company", data.company),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Product", l.product),
    row("Grade", l.grade),
    row("Form", data.form),
    row("Quantity", data.quantity),
    "",
    message,
  ].join("\n");
}

/**
 * The `mailto:` draft. `shortened` is true when the message had to be cut
 * to fit — the form then points the visitor at "Copy request" for the
 * full text.
 */
export function rfqMailto(
  to: string,
  data: RfqInput,
  products: RfqProductOption[],
  lang: Lang,
): { href: string; shortened: boolean } {
  const subject = rfqEmailSubject(data, products);
  const build = (message: string) =>
    `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      rfqEmailBody(data, products, message),
    )}`;

  const full = build(data.message);
  if (full.length <= MAX_MAILTO_LENGTH) return { href: full, shortened: false };

  // Trim the message (never the contact details) until the URL fits. The
  // note is in the visitor's language: it's their text being cut.
  const note = lang === "en" ? "[Message shortened]" : "[ข้อความถูกตัดให้สั้นลง]";
  let keep = data.message.length;
  while (keep > 0) {
    keep = Math.floor(keep * 0.8);
    const href = build(`${data.message.slice(0, keep).trimEnd()}…\n\n${note}`);
    if (href.length <= MAX_MAILTO_LENGTH) return { href, shortened: true };
  }
  return { href: build(note), shortened: true };
}
