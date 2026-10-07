/**
 * RFQ ("request a quote") form validation, shared by the client form and
 * the `/api/rfq` route so both sides agree on what a valid submission looks
 * like. Ported from the sibling VAN repo's `src/lib/quoteSchema.ts`
 * (zod validation, CR/LF rejected in fields that reach the email Subject,
 * a silent honeypot) and adapted to this site's bilingual pages and its
 * product/grade data instead of a fixed service list.
 *
 * `product` and `grade` are validated against a passed-in `RfqProductOption[]`
 * — never trusted as free text — because both are interpolated into the
 * email Subject line in `src/app/api/rfq/route.ts`, and an unvalidated
 * Subject is a header-injection vector. This module deliberately does NOT
 * import `@/data/products` itself (see `rfqOptions.ts`'s module comment):
 * `RfqForm.tsx` imports `createRfqSchema` into the client bundle, so this
 * file can only depend on the slim `RfqProductOption[]` shape, never the
 * full product/grade dataset.
 */

import { z } from "zod";
import type { RfqProductOption } from "@/lib/rfqOptions";
import type { Lang } from "@/lib/locale";

// zod v4 probes `new Function` once to decide whether to JIT its object
// parsers. Our CSP has no 'unsafe-eval', so that probe is blocked — harmless
// (zod falls back) but Chrome still logs a CSP violation on every page with
// the RFQ form, which costs Lighthouse best-practices points. jitless skips
// the probe; these schemas are tiny, so the JIT never mattered.
z.config({ jitless: true });

const CRLF = /[\r\n]/;

/** Defense in depth for any string that reaches the email Subject header. */
export function stripCrlf(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function validGradeValues(products: RfqProductOption[], productSlug: string): Set<string> {
  const product = products.find((p) => p.slug === productSlug);
  return new Set(["", ...(product?.grades.map((o) => o.value) ?? [])]);
}

// Excludes whitespace and the characters that have no business in an email
// address and are classic header/SMTP-injection or quoting tricks
// (`,` `<` `>` `"`), on top of requiring the usual local@domain.tld shape.
const EMAIL_RE = /^[^\s@,"<>]+@[^\s@,"<>]+\.[^\s@,"<>]+$/;
const PHONE_RE = /^[0-9+\-\s()]+$/;

type Messages = {
  nameRequired: string;
  nameTooLong: string;
  nameInvalid: string;
  companyTooLong: string;
  companyInvalid: string;
  emailInvalid: string;
  emailTooLong: string;
  phoneRequired: string;
  phoneInvalid: string;
  phoneTooLong: string;
  productRequired: string;
  gradeInvalid: string;
  formTooLong: string;
  quantityTooLong: string;
  messageRequired: string;
  messageTooLong: string;
};

const MESSAGES: Record<Lang, Messages> = {
  th: {
    nameRequired: "กรุณากรอกชื่อ",
    nameTooLong: "ชื่อยาวเกินไป",
    nameInvalid: "ชื่อไม่ถูกต้อง",
    companyTooLong: "ชื่อบริษัทยาวเกินไป",
    companyInvalid: "ชื่อบริษัทไม่ถูกต้อง",
    emailInvalid: "อีเมลไม่ถูกต้อง",
    emailTooLong: "อีเมลยาวเกินไป",
    phoneRequired: "กรุณากรอกเบอร์โทรให้ถูกต้อง",
    phoneInvalid: "เบอร์โทรไม่ถูกต้อง",
    phoneTooLong: "เบอร์โทรไม่ถูกต้อง",
    productRequired: "กรุณาเลือกสินค้า",
    gradeInvalid: "กรุณาเลือกเกรดที่ถูกต้อง",
    formTooLong: "รูปแบบยาวเกินไป",
    quantityTooLong: "จำนวนยาวเกินไป",
    messageRequired: "กรุณาอธิบายรายละเอียดอย่างน้อย 10 ตัวอักษร",
    messageTooLong: "ข้อความยาวเกินไป",
  },
  en: {
    nameRequired: "Please enter your name",
    nameTooLong: "Name is too long",
    nameInvalid: "Name is not valid",
    companyTooLong: "Company name is too long",
    companyInvalid: "Company name is not valid",
    emailInvalid: "Email is not valid",
    emailTooLong: "Email is too long",
    phoneRequired: "Please enter a valid phone number",
    phoneInvalid: "Phone number is not valid",
    phoneTooLong: "Phone number is not valid",
    productRequired: "Please select a product",
    gradeInvalid: "Please select a valid grade",
    formTooLong: "Form is too long",
    quantityTooLong: "Quantity is too long",
    messageRequired: "Please describe your request (at least 10 characters)",
    messageTooLong: "Message is too long",
  },
};

/** Build the zod schema with messages localized for `lang`, validated against `products`. */
export function createRfqSchema(lang: Lang, products: RfqProductOption[]) {
  const m = MESSAGES[lang];
  const productSlugs = products.map((p) => p.slug);
  return z
    .object({
      name: z
        .string()
        .min(2, m.nameRequired)
        .max(120, m.nameTooLong)
        // No CR/LF — `name` reaches the email Subject (api/rfq/route.ts).
        .refine((v) => !CRLF.test(v), m.nameInvalid),
      company: z
        .string()
        .max(200, m.companyTooLong)
        // `company` also reaches the Subject — same reason as `name`.
        .refine((v) => !CRLF.test(v), m.companyInvalid),
      email: z.string().min(1, m.emailInvalid).max(254, m.emailTooLong).refine((v) => EMAIL_RE.test(v), m.emailInvalid),
      phone: z
        .string()
        .min(9, m.phoneRequired)
        .max(32, m.phoneTooLong)
        .refine((v) => PHONE_RE.test(v), m.phoneInvalid),
      product: z
        .string()
        .min(1, m.productRequired)
        .refine((v) => productSlugs.includes(v), m.productRequired),
      grade: z.string().max(100, m.gradeInvalid),
      form: z
        .string()
        .max(200, m.formTooLong)
        .refine((v) => !CRLF.test(v), m.formTooLong),
      quantity: z.string().max(100, m.quantityTooLong),
      message: z.string().min(10, m.messageRequired).max(5000, m.messageTooLong),
      /**
       * Honeypot — a hidden field only a bot fills in. Deliberately NOT
       * constrained to empty here: a `max(0)` would fail validation and hand
       * the bot a 422 naming this exact field, teaching it what to skip next
       * time. The API silently drops a filled submission instead (see
       * api/rfq/route.ts), so a bot sees the same success shape as a real
       * send. The cap only bounds the payload.
       */
      website: z.string().max(200),
    })
    .superRefine((data, ctx) => {
      if (data.grade && !validGradeValues(products, data.product).has(data.grade)) {
        ctx.addIssue({ code: "custom", path: ["grade"], message: m.gradeInvalid });
      }
    });
}

export type RfqInput = z.infer<ReturnType<typeof createRfqSchema>>;
