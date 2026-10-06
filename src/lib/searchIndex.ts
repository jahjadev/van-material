import { articles } from "@/data/articles";
import { industries } from "@/data/industries";
import { families } from "@/data/products";
import type { Lang } from "@/lib/locale";

/**
 * The header search's index, built on the server and handed to `Nav` as a
 * prop. `Nav` is a client component and must not import the product,
 * industry or article modules itself (SKILL.md §7: their page bodies would
 * all land in the browser bundle); this keeps only the few strings the
 * search box needs. `k` is the lowercase match text, in both languages so
 * a Thai visitor typing "beryllium" or an English one typing a grade alias
 * still finds the page.
 */
export type SearchKind = "family" | "grade" | "industry" | "article";
export type SearchEntry = { kind: SearchKind; title: string; sub: string; href: string; k: string };

const clip = (s: string, n = 110) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

export function searchIndex(lang: Lang): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const f of families) {
    out.push({
      kind: "family",
      title: f.name[lang],
      sub: clip(f.summary[lang]),
      href: `/${f.slug}`,
      k: [f.keyword, f.name.th, f.name.en, f.brand ?? ""].join(" "),
    });
    for (const g of f.grades) {
      out.push({
        kind: "grade",
        title: g.aliases.length ? `${g.code} · ${g.aliases[0]}` : g.code,
        sub: clip(g.tagline[lang]),
        href: `/${f.slug}/${g.slug}`,
        k: [g.code, ...g.aliases, f.keyword, f.name.th, f.name.en, g.tagline.th, g.tagline.en].join(" "),
      });
    }
  }
  for (const i of industries) {
    out.push({
      kind: "industry",
      title: i.name[lang],
      sub: clip(i.summary[lang]),
      href: `/industries/${i.slug}`,
      k: [i.name.th, i.name.en, i.h1.th, i.h1.en].join(" "),
    });
  }
  for (const a of articles) {
    out.push({
      kind: "article",
      title: a.h1[lang],
      sub: clip(a.description[lang]),
      href: `/knowledge/${a.slug}`,
      k: [a.h1.th, a.h1.en, a.title.th, a.title.en].join(" "),
    });
  }
  return out.map((e) => ({ ...e, k: e.k.toLowerCase() }));
}
