import type { MetadataRoute } from "next";
import { HREFLANG, LANGS, absUrl } from "@/lib/locale";
import { allRoutes } from "@/lib/routes";

/**
 * Emits one `<url>` entry per route per language — the Thai URL and the
 * English URL each get their own entry, every entry carrying the full
 * `alternates.languages` cluster (th-TH, en, x-default → Thai). Routes come
 * from `allRoutes()` so this file never lists a path itself.
 *
 * No `lastModified` unless the route provides one (see routes.ts) — a
 * build-time date on every route trains Google to ignore lastmod site-wide.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  for (const route of allRoutes()) {
    const languages = {
      [HREFLANG.th]: absUrl(route.path, "th"),
      [HREFLANG.en]: absUrl(route.path, "en"),
      "x-default": absUrl(route.path, "th"),
    };

    for (const lang of LANGS) {
      out.push({
        url: absUrl(route.path, lang),
        ...(route.lastmod ? { lastModified: route.lastmod } : {}),
        alternates: { languages },
      });
    }
  }

  return out;
}
