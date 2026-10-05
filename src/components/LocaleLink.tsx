"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { isInternalPath, localizePath } from "@/lib/locale";
import { useLang } from "@/lib/prefs";

/**
 * Drop-in replacement for `next/link` that keeps the visitor in their
 * language. Components write locale-independent hrefs (`/about`,
 * `/knowledge/${slug}`) and this prefixes `/en` when rendered inside the
 * English tree, so nav data, templates, and one-off links are all covered
 * by one rule.
 *
 * `tel:`, `mailto:`, `#anchor`, and absolute URLs pass through untouched.
 */
export function LocaleLink({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { lang } = useLang();
  const localized =
    typeof href === "string" && isInternalPath(href)
      ? localizePath(href, lang)
      : href;
  return <NextLink href={localized} {...rest} />;
}
