/**
 * Slim RFQ product/grade option list, derived from `@/data/products` but
 * carrying none of the long-form copy (summaries, FAQs, property tables,
 * sourced technical paragraphs for 7 families × 13 grades).
 *
 * `RfqForm.tsx` is a client component (its state, validation and the
 * `/api/rfq` POST all need to run in the browser), so whatever it imports
 * ships in the client JS bundle. It used to import `families` directly from
 * `@/data/products` just to list product names and grade codes in two
 * `<select>` elements — which meant every visitor downloaded the full
 * product/grade dataset (every family's summary, body paragraphs, sourced
 * properties and FAQs) just to render two dropdowns.
 *
 * This module is imported only by server components (page files) and by the
 * `/api/rfq` route handler (also server-only) — never by a "use client"
 * file — so `@/data/products` itself never reaches the client bundle. The
 * page passes the plain, serializable `RfqProductOption[]` this module
 * builds down to `<RfqForm products={...} />` as a prop instead.
 */

import { families, type ProductFamily } from "@/data/products";

export type RfqGradeOption = { value: string; label: { th: string; en: string } };

export type RfqProductOption = {
  slug: string;
  name: { th: string; en: string };
  grades: RfqGradeOption[];
};

/** Sentinel grade value for "I'm not sure / other", valid for any product. */
export const OTHER_GRADE = "other";

function slugifyVariantName(nameEn: string): string {
  return nameEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function gradeOptionsFor(family: ProductFamily): RfqGradeOption[] {
  const fromGrades: RfqGradeOption[] = family.grades.map((g) => ({
    value: g.code,
    label: { th: g.code, en: g.code },
  }));
  const fromVariants: RfqGradeOption[] = family.variants.map((v) => ({
    value: slugifyVariantName(v.name.en),
    label: v.name,
  }));
  return [
    ...fromGrades,
    ...fromVariants,
    { value: OTHER_GRADE, label: { th: "อื่น ๆ / ไม่แน่ใจ", en: "Other / not sure" } },
  ];
}

/** The slim product/grade list `RfqForm` renders its two `<select>`s from. */
export function rfqProductOptions(): RfqProductOption[] {
  return families.map((f) => ({
    slug: f.slug,
    name: f.name,
    grades: gradeOptionsFor(f),
  }));
}

/** The submitted product value's display label, for the email subject/body. */
export function resolveProductLabel(products: RfqProductOption[], slug: string): string {
  return products.find((p) => p.slug === slug)?.name.en ?? slug;
}

/** The submitted grade value's display label, for the email subject/body. */
export function resolveGradeLabel(
  products: RfqProductOption[],
  productSlug: string,
  grade: string,
): string {
  if (!grade) return "";
  const product = products.find((p) => p.slug === productSlug);
  const g = product?.grades.find((o) => o.value === grade);
  return g ? g.label.en : "";
}
