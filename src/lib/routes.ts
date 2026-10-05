/**
 * Single source of truth for every indexable route on the site. The
 * sitemap, `/llms.txt`, and any future route audit all read from
 * `allRoutes()` instead of hard-coding paths themselves.
 *
 * Every new page MUST be registered here.
 *
 * Only routes that render a real 200 today are listed. Later
 * tasks add their own route groups as the underlying data modules land —
 * extend `allRoutes()` by spreading a new array (e.g. `...familyRoutes()`),
 * don't hand-list paths elsewhere:
 *
 *   // Task 3 (product families/grades): done — see `familyRoutes()` below.
 *
 *   // Task 4 (home, about, contact, privacy, industries): done — see
 *   // `staticRoutes` and `industryRoutes()` below.
 *
 *   // Task 7 (knowledge articles): done — see `knowledgeRoutes()` below.
 *
 * Then: `return [...staticRoutes, ...familyRoutes(), ...industryRoutes(), ...articleRoutes()];`
 */

import { families } from "@/data/products";
import { industries } from "@/data/industries";
import { articleLastmod, articles } from "@/data/articles";

export type RouteEntry = {
  /** Locale-independent path, written the Thai (bare-path) way, e.g. `/about`. */
  path: string;
  /** ISO date string. Omit unless the route has a real, tracked change date
   *  (a build-time stamp applied to every route makes Google ignore lastmod
   *  site-wide — see global-constraints.md / task-2-brief.md Step 3). */
  lastmod?: string;
};

/** Static pages that exist today. */
const staticRoutes: RouteEntry[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/contact" },
  { path: "/privacy" },
];

/** Product family pages and the grade pages under them (Task 3). */
const familyRoutes = (): RouteEntry[] =>
  families.flatMap((f) => [
    { path: `/${f.slug}` },
    ...f.grades.map((g) => ({ path: `/${f.slug}/${g.slug}` })),
  ]);

/** Industry pages (Task 4). */
const industryRoutes = (): RouteEntry[] =>
  industries.map((i) => ({ path: `/industries/${i.slug}` }));

/**
 * Knowledge index + one route per article (Task 7). Articles carry a real
 * content date, so they get `lastmod = modified ?? date`; the index takes
 * the newest of them (it changes exactly when an article is added/updated).
 */
const knowledgeRoutes = (): RouteEntry[] => {
  const dates = articles.map(articleLastmod).sort();
  return [
    { path: "/knowledge", ...(dates.length ? { lastmod: dates[dates.length - 1] } : {}) },
    ...articles.map((a) => ({ path: `/knowledge/${a.slug}`, lastmod: articleLastmod(a) })),
  ];
};

export function allRoutes(): RouteEntry[] {
  return [...staticRoutes, ...familyRoutes(), ...industryRoutes(), ...knowledgeRoutes()];
}
