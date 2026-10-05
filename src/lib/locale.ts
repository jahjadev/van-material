/**
 * Locale routing rules, shared by server and client.
 *
 * Thai is served at the bare paths (`/`, `/about`) and English under the
 * `/en` prefix (`/en`, `/en/about`). One URL is exactly one language: there
 * is no client-side language switch, only navigation between the two trees.
 * Deliberately free of React so route handlers, metadata, and the sitemap
 * can share these functions with the components.
 */

import { SITE_URL } from "./site";

export type Lang = "th" | "en";

/** Both locales, in the order they should appear in hreflang / the sitemap. */
export const LANGS: readonly Lang[] = ["th", "en"];

/** BCP-47 tags for `hreflang` and OpenGraph `locale`. */
export const HREFLANG: Record<Lang, string> = { th: "th-TH", en: "en" };
export const OG_LOCALE: Record<Lang, string> = { th: "th_TH", en: "en_US" };

const EN_PREFIX = "/en";

/**
 * Map a locale-independent path (always written the Thai way, e.g. `/about`)
 * onto the URL for `lang`. Non-app hrefs (`#anchor`, `tel:`, `mailto:`,
 * absolute URLs) are returned untouched so this is safe to apply blindly in
 * a link component.
 */
export function localizePath(path: string, lang: Lang): string {
  const p = path === "" ? "/" : path;
  if (lang === "th" || !p.startsWith("/") || p.startsWith("//")) return p;
  return p === "/" ? EN_PREFIX : `${EN_PREFIX}${p}`;
}

/**
 * Inverse of `localizePath`: split a real pathname into its locale and the
 * shared path. Used to point the language switcher at the same page in the
 * other language.
 */
export function splitLocale(pathname: string): { lang: Lang; path: string } {
  if (pathname === EN_PREFIX) return { lang: "en", path: "/" };
  if (pathname.startsWith(`${EN_PREFIX}/`)) {
    return { lang: "en", path: pathname.slice(EN_PREFIX.length) };
  }
  return { lang: "th", path: pathname };
}

/** True for hrefs that point inside the app and therefore need a locale. */
export function isInternalPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/** Pick a `th`/`en` pair for a known language. */
export const pickLang = <T,>(lang: Lang, th: T, en: T): T =>
  lang === "en" ? en : th;

/** Absolute URL for `path` in `lang`, built from `SITE_URL`. */
export const absUrl = (path: string, lang: Lang) =>
  `${SITE_URL}${localizePath(path, lang)}`;
