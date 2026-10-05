/**
 * RFQ ("request a quote") form validation, shared by the client form and
 * the `/api/rfq` route so both sides agree on what a valid submission looks
 * like. Ported from the sibling VAN repo's `src/lib/quoteSchema.ts`
 * (zod validation, CR/LF rejected in fields that reach the email Subject,
 * a silent honeypot) and adapted to this site's bilingual pages and its
 * product/grade data instead of a fixed service list.
 *
 * `product` and `grade` are validated against `families` here — never
 * trusted as free text — because both are interpolated into the email
 * Subject line in `src/app/api/rfq/route.ts`, and an unvalidated Subject is
 * a header-injection vector.
 */

import { z } from "zod";
import { families, type ProductFamily } from "@/data/products";
import type { Lang } from "@/lib/locale";

const CRLF = /[\r\n]/;

/** Defense in depth for any string that reaches the email Subject header. */
export function stripCrlf(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function slugifyVariantName(nameEn: string): string {
  return nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Known family slugs — the only values `product` may take. */
export const PRODUCT_SLUGS: string[] = families.map((f) => f.slug);

/** Sentinel grade value for "I'm not sure / other", valid for any product. */
export const OTHER_GRADE = "other";

export type GradeOption = { value: string; label: { th: string; en: string } };

/**
 * Options for the grade `<select>`, dependent on the chosen product: the
 * family's grade codes (own pages), its list-only variant names, then the
 * trailing "other / not sure" choice. Used by `RfqForm` to render the
 * select and by the API route to validate + relabel the submitted value.
 */
export function gradeOptionsFor(family: ProductFamily | undefined): GradeOption[] {
  if (!family) return [];
  const fromGrades: GradeOption[] = family.grades.map((g) => ({
    value: g.code,
    label: { th: g.code, en: g.code },
  }));
  const fromVariants: GradeOption[] = family.variants.map((v) => ({
    value: slugifyVariantName(v.name.en),
    label: v.name,
  }));
  return [
    ...fromGrades,
    ...fromVariants,
    { value: OTHER_GRADE, label: { th: "อื่น ๆ / ไม่แน่ใจ", en: "Other / not sure" } },
  ];
}

/** The submitted grade value's display label, for the email subject/body. */
export function resolveGradeLabel(family: ProductFamily | undefined, grade: string): string {
  if (!family || !grade) return "";
  if (grade === OTHER_GRADE) return "Other / not sure";
  const g = family.grades.find((x) => x.code === grade);
  if (g) return g.code;
  const v = family.variants.find((x) => slugifyVariantName(x.name.en) === grade);
  if (v) return v.name.en;
  return "";
}

function validGradeValues(family: ProductFamily | undefined): Set<string> {
  return new Set(["", ...gradeOptionsFor(family).map((o) => o.value)]);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]+$/;

type Messages = {
  nameRequired: string;
  nameTooLong: string;
  nameInvalid: string;
  companyTooLong: string;
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

/** Build the zod schema with messages localized for `lang`. */
export function createRfqSchema(lang: Lang) {
  const m = MESSAGES[lang];
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
        // `company` also reaches the Subject — same reason.
        .refine((v) => !CRLF.test(v), m.companyTooLong),
      email: z.string().min(1, m.emailInvalid).max(254, m.emailTooLong).refine((v) => EMAIL_RE.test(v), m.emailInvalid),
      phone: z
        .string()
        .min(9, m.phoneRequired)
        .max(32, m.phoneTooLong)
        .refine((v) => PHONE_RE.test(v), m.phoneInvalid),
      product: z
        .string()
        .min(1, m.productRequired)
        .refine((v) => PRODUCT_SLUGS.includes(v), m.productRequired),
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
      const family = families.find((f) => f.slug === data.product);
      if (data.grade && !validGradeValues(family).has(data.grade)) {
        ctx.addIssue({ code: "custom", path: ["grade"], message: m.gradeInvalid });
      }
    });
}

export type RfqInput = z.infer<ReturnType<typeof createRfqSchema>>;

/** Default-language schema for callers that don't need localized messages (the API route). */
export const rfqSchema = createRfqSchema("en");
