/**
 * Product data model. Every visible product string is a `Bi` pair so the
 * Thai and English trees render from the same record and can't drift.
 *
 * Two ways a family lists what it sells:
 *  - `grades`   — each grade gets its own indexable page at
 *                 `/<family>/<grade.slug>` (BeCu, MoldMAX, ToughMet,
 *                 standard copper alloys).
 *  - `variants` — listed on the family page only, no subpage (chrome copper,
 *                 clad metal, electrical contacts), because those variants
 *                 don't carry enough distinct, sourceable content to stand
 *                 alone as pages.
 * A family uses one or the other; the unused list is `[]`.
 *
 * Numbers: `Property` values are published only when a public
 * Materion/Longsun page states them, and `source` holds that URL. If a grade
 * has no sourced value its `properties` is `[]` and `PropertyTable` renders
 * nothing (see global-constraints.md, controller ruling R7).
 */

export type Bi = { th: string; en: string };

export type Property = {
  label: Bi;
  /** Language-neutral value as the source states it (e.g. "25–30", "≤ 140"). */
  value: string;
  unit?: string;
  /** URL of the public page that states this value. */
  source: string;
};

export type Faq = { q: Bi; a: Bi };

export type Grade = {
  /** URL segment, e.g. "c17200". */
  slug: string;
  /** Display code that leads the title and H1, e.g. "C17200". */
  code: string;
  /** Other names buyers search for, e.g. ["Alloy 25", "UNS C17200"]. */
  aliases: string[];
  /** SERP title, ≤ 48 chars before the " | VAN INTERTRADE" suffix, leads with code. */
  title: Bi;
  h1: Bi;
  /** One-line card text used on the family page's grade cards. */
  tagline: Bi;
  /** First paragraph: sentence one answers "what is <code>". */
  summary: Bi;
  /** Meta description, 70–165 chars. */
  description: Bi;
  properties: Property[];
  /** Condition the property values refer to (temper, product form). */
  propertiesNote?: Bi;
  forms: Bi[];
  applications: Bi[];
  faqs: Faq[];
};

export type Variant = { name: Bi; desc: Bi };

export type ProductFamily = {
  /** URL segment, e.g. "beryllium-copper". */
  slug: string;
  brand: "Materion" | "Longsun" | "VAN INTERTRADE";
  /** Owned head term (ia.md), e.g. "Beryllium Copper". */
  keyword: string;
  /** Short name for breadcrumbs, cards and links. */
  name: Bi;
  title: Bi;
  h1: Bi;
  summary: Bi;
  description: Bi;
  /** Optional extra paragraphs under the summary. */
  body: Bi[];
  image: { src: string; width: number; height: number; alt: Bi };
  /** Grades with their own pages. */
  grades: Grade[];
  /** List-only variants (no subpage). */
  variants: Variant[];
  forms: Bi[];
  applications: Bi[];
  /** Industry slugs → `/industries/<slug>` (pages arrive in Task 4). */
  industries: string[];
  faqs: Faq[];
};
