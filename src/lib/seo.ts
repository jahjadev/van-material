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
 */

import type { Metadata } from "next";
import { company } from "@/data/company";
import { SITE_URL } from "./site";
import { absUrl, HREFLANG, OG_LOCALE, type Lang } from "./locale";

const BRAND_SUFFIX = "VAN INTERTRADE";

/** Default OpenGraph/Twitter image when a page doesn't supply its own. */
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export function pageMeta({
  title,
  description,
  lang,
  path,
  image,
}: {
  title: string;
  description: string;
  lang: Lang;
  /** Locale-independent path, always written the Thai way (e.g. `/about`). */
  path: string;
  /** Absolute image URL. Falls back to the site logo. */
  image?: string;
}): Metadata {
  const url = absUrl(path, lang);
  // `absolute` so this is used verbatim — see module comment on why this
  // doesn't rely on the root layouts' title template.
  const socialTitle = `${title} | ${BRAND_SUFFIX}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

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
      type: "website",
      locale: OG_LOCALE[lang],
      url,
      siteName: company.legalNameEn,
      title: socialTitle,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
