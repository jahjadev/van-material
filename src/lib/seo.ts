/**
 * Per-page metadata builder. One function every page calls so the
 * hreflang cluster, canonical, and OpenGraph/Twitter defaults can't drift
 * page to page. Model: `VAN/src/lib/seo.ts` (sibling production site).
 *
 * `metadataBase` lives on the two root layouts (`src/app/(th)/layout.tsx`,
 * `src/app/(en)/layout.tsx`). The brand suffix is appended here, as an
 * `absolute` title, rather than via Next's `title.template` inheritance:
 * with two independent root layouts (one per locale — required so each can
 * set its own `<html lang>`), Next's template-merging across the route
 * tree does not reliably apply to both trees (verified against a build:
 * the English tree got "%s | VAN INTERTRADE", the Thai tree silently
 * didn't). Building the full title directly sidesteps that.
 *
 * No `openGraph.images` / `twitter.images` field here: every route in this
 * app has its own `opengraph-image.tsx` + `twitter-image.tsx` (Task 6,
 * `src/lib/ogCard.tsx`), and Next merges that file-convention image with
 * whatever this function returns. Setting an image here too would put two
 * `og:image` tags on every page. Model: `VAN/src/lib/seo.ts`, which has no
 * `image` param for the same reason.
 */

import type { Metadata } from "next";
import { company } from "@/data/company";
import { absUrl, HREFLANG, OG_LOCALE, type Lang } from "./locale";

const BRAND_SUFFIX = "VAN INTERTRADE";

export function pageMeta({
  title,
  description,
  lang,
  path,
  article,
}: {
  title: string;
  description: string;
  lang: Lang;
  /** Locale-independent path, always written the Thai way (e.g. `/about`). */
  path: string;
  /**
   * Knowledge articles only: emits `og:type=article` plus
   * `article:published_time` / `article:modified_time` (ISO dates, the
   * same ones the page and its Article JSON-LD show). Every other page is
   * `og:type=website`.
   */
  article?: { published: string; modified: string };
}): Metadata {
  const url = absUrl(path, lang);
  // `absolute` so this is used verbatim — see module comment on why this
  // doesn't rely on the root layouts' title template.
  const socialTitle = `${title} | ${BRAND_SUFFIX}`;

  return {
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: url,
      languages: {
        [HREFLANG.th]: absUrl(path, "th"),
        [HREFLANG.en]: absUrl(path, "en"),
        "x-default": absUrl(path, "th"),
      },
    },
    openGraph: {
      locale: OG_LOCALE[lang],
      url,
      siteName: company.legalNameEn,
      title: socialTitle,
      description,
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.published,
            modifiedTime: article.modified,
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
