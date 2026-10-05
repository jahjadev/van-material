import type { Bi, Faq } from "@/data/products";

/**
 * Knowledge-base article model. Every visible string is a `Bi` pair, like the
 * product data, so the Thai and English pages render from one record.
 *
 * Inline links: `p` and `ul` text may contain `[label](/path)` with a
 * locale-independent internal path (written the Thai way, e.g.
 * `/beryllium-copper/c17200`). `ArticleBody` turns them into `LocaleLink`s,
 * so the English page links into `/en/...` automatically. Labels inside the
 * `en` string must be English (the /en tree carries no visible Thai).
 *
 * Numbers: an article may only state a value that appears in product data
 * (with its `SRC.*` source) or on a page listed in its `refs` (ruling R10).
 */

export type TableBlock = {
  t: "table";
  /** Column headings. */
  head: Bi[];
  /** Cells; a plain string is language-neutral (grade codes, numbers). */
  rows: (string | Bi)[][];
  /** Shown under the table: what the values are, and where they come from. */
  note: Bi;
};

export type Block =
  | { t: "p"; text: Bi }
  /** Section heading — phrased as a question; the next `p` answers it in sentence one. */
  | { t: "h2"; text: Bi }
  | { t: "ul"; items: Bi[] }
  | TableBlock
  /** Property comparison rendered by `PropertyTable` (values from product data). */
  | { t: "props"; heading: Bi; note: Bi; grades: { family: string; grade: string }[] };

export type Ref = { title: string; url: string };

export type Article = {
  slug: string;
  /** Family slugs this article belongs to: drives "Related articles" on family pages. */
  topic: string[];
  /** `family/grade` keys of grade pages that should also list this article. */
  grades?: string[];
  /** ISO date first published. */
  date: string;
  /** ISO date of the last real content change (defaults to `date`). */
  modified?: string;
  /** SERP title, ≤ 48 visible chars before the " | VAN INTERTRADE" suffix. */
  title: Bi;
  h1: Bi;
  /** Meta description and index-card excerpt, 70–165 chars. */
  description: Bi;
  /** Opening paragraph: sentence one answers the title. */
  intro: Bi;
  /** Image used for the Article JSON-LD (a site image that already exists). */
  image: string;
  body: Block[];
  /** 3–5 Q&A pairs; rendered visibly and used verbatim for FAQPage schema. */
  faqs: Faq[];
  /** Every URL the article's facts come from, shown as a visible list. */
  refs: Ref[];
};
