---
name: seo-aeo
description: Search and answer-engine optimization for the VAN-MATERIAL (van-material.com) site. Use when adding or editing a product family, grade, industry, or knowledge-article page, any metadata, structured data, or internal link — and before any content push or Search Console submission. Covers keyword ownership, the no-unsourced-numbers rule, bilingual rules, title length, page-speed rules, and the automated audit that gates all of it.
---

# SEO / AEO — VAN-MATERIAL

Run the audit before claiming anything is fixed. It reads the **rendered
HTML**, never `src/` — a title that never resolved, a canonical the template
forgot, or a link that only exists after a click all look fine in the data
and wrong to Googlebot:

```bash
npm run build && npm run start      # audit reads rendered HTML, never src/
npm run seo:audit                   # or: node scripts/seo-audit.mjs --strict
node scripts/seo-audit.mjs --base https://www.van-material.com   # production
node scripts/seo-audit.mjs --lang th                              # Thai tree only, faster
node scripts/seo-audit.mjs --fetch-vaninter   # refresh docs/seo/vaninter-material-titles.txt
```

`scripts/seo-audit.mjs` (Task 8) replaced the old `check-sitemap.mjs` and
`check-links.mjs` — both of those checks are folded into it now, so there is
one script that reads one rendered page instead of two that each read half
of it. It checks, per sitemap URL: HTTP 200; exactly one `<h1>`; `<title>`
present and ≤ 65 visible chars; meta description 70–165 visible chars;
self-canonical against the **production** host even when crawling
localhost; reciprocal hreflang (`th-TH` / `en` / `x-default`) matching the
sitemap's own `alternates`; ≥ 1 parseable JSON-LD block; `FAQPage` schema
text equal to the visible FAQ text; no visible Thai on `/en`; correct
`<html lang>`; no orphans; no dead-end knowledge articles; no unregistered
pages (a live internal link target not in the sitemap); `robots.txt`
allowing the AI bots and pointing at the sitemap; `llms.txt` returning 200
and linking only sitemap URLs; exactly one absolute `og:image`; keyword
ownership (below); and the vaninter.com cross-domain title collision
(below). "Visible chars" strips Thai combining marks (U+0E31, U+0E34–3A,
U+0E47–4E) and decodes HTML entities, so counts aren't comparable with a
naive `.length`.

## 1. Keyword ownership — one head term, one page

`KEYWORD_OWNERS` in `scripts/seo-audit.mjs`, set by controller ruling R6:

| Term | Owner | Term | Owner |
|---|---|---|---|
| Beryllium Copper | `/beryllium-copper` | ToughMet | `/toughmet` |
| C17200 | `/beryllium-copper/c17200` | ToughMet 3 | `/toughmet/toughmet-3` |
| C17410 | `/beryllium-copper/c17410` | ToughMet 2 | `/toughmet/toughmet-2` |
| C17510 | `/beryllium-copper/c17510` | CrCuZr | `/chrome-copper` |
| C17460 | `/beryllium-copper/c17460` | C5191 | `/standard-copper-alloys/c5191` |
| MoldMAX | `/moldmax` | C5210 | `/standard-copper-alloys/c5210` |
| MoldMAX HH | `/moldmax/moldmax-hh` | C1100 | `/standard-copper-alloys/c1100` |
| MoldMAX V | `/moldmax/moldmax-v` | Clad Metal | `/clad-metal` |
| MoldMAX XL | `/moldmax/moldmax-xl` | Silver Electrical Contacts | `/electrical-contacts` |
| PROtherm | `/moldmax/protherm` | | |

**The rule:** a title fails only if it *leads with* (starts with, after
trimming) an owned term whose owner is a different page, and the longest
owned term decides (`MoldMAX HH` beats `MoldMAX`). A title that leads with
an owned term but also names another distinct owned term elsewhere — a
comparison like "C17200 vs C17510: Which Beryllium Copper?" — is exempt:
it's comparing SKUs, not trying to own the leading term alone. A term that
is merely a substring of another matched term (`MoldMAX` inside
`MoldMAX HH`) doesn't count as a second, distinct term.

This caught a real collision on 2026-10-05:
`src/data/articles/what-is-beryllium-copper.ts`'s Thai `title` led with the
bare English term "Beryllium Copper คืออะไร…", directly colliding with
`/beryllium-copper`'s owned lead. Fixed by leading with the transliterated
Thai gloss instead (`เบริลเลียมคอปเปอร์คืออะไร คุณสมบัติและการใช้งาน`) — see
`task-8-report.md` for the full before/after. **Don't "fix" a real
collision by weakening the rule** — rewrite the colliding title instead, in
`src/data/*`, the same way.

Family and grade `title` fields already follow the pattern that avoids
this: grade pages lead with their own code (`"C17200 Beryllium Copper
(Alloy 25)…"`), family pages lead with their own family name, and industry
pages never lead with any owned term (`"Copper Alloys for…"`,
`"Contact Materials…"`). Knowledge articles stay informational — never lead
a title with a bare owned term; lead with the question, the comparison, or
a non-English gloss instead.

## 2. The vaninter.com cross-domain check

VAN-MATERIAL and vaninter.com are sibling properties run by the same
client. `docs/seo/vaninter-material-titles.txt` holds the `<title>` of
vaninter.com's six material pages (TH bare path + EN `/en/` path, fetched
once with Node — never `curl`, which mangles non-ASCII URLs on Windows Git
Bash into a query string on `/`, see §8 of the sibling VAN skill). The
audit fails if any van-material.com page's `<title>` is byte-identical to
one of these lines — two sites ranking for the exact same title string is
Google-visible duplication even when the bodies differ. Refresh the file
with `node scripts/seo-audit.mjs --fetch-vaninter` if vaninter.com's titles
change, and commit the new file.

## 3. No unsourced numbers

Every property value (hardness, %IACS conductivity, tensile strength) must
cite its source in a `source` field pointing at a Materion/Longsun
datasheet or the public Materion page URL (`SRC.*` in
`src/data/products/shared.ts`). **A value with no `source` is not
published** — this is enforced by review, not by `seo-audit.mjs`; when
adding a grade or editing properties, grep the new file for a bare number
with no adjacent `source:` and either add the citation or cut the number.
Copy for knowledge articles follows the same rule — every specific figure
in `src/data/articles/*` traces back to one of the `REF.*`/`SRC.*` entries
listed in its `refs` field.

## 4. Adding a product family / grade / industry / article — route registration

Nothing here has a central route list to edit by hand; `src/lib/routes.ts`'s
`allRoutes()` derives from the data modules, and the sitemap, `llms.txt`,
and this audit all walk `allRoutes()` / `sitemap.xml`. So the only way to
accidentally ship an unregistered page is to add UI that *links* to a path
with no backing data entry (the audit's `unregistered-page` check would
only catch that it returns 404, not that it's a dangling link rendering a
500) or to add a data entry that nothing links to (the `orphan` check
catches this).

- **New grade:** add it to the family's `grades` array in
  `src/data/products/<family>.ts` with a `slug`, `title` (see §1 — lead
  with the grade code), properties each carrying a `source`, and link it
  from somewhere already crawled (the family page lists its own grades
  automatically; link it from a knowledge article too if relevant).
- **New family:** new file in `src/data/products/`, registered in
  `src/data/products/index.ts`'s `families` array (nav order), and in
  `KEYWORD_OWNERS` here.
- **New industry:** add to `src/data/industries.ts`; `fits` is derived from
  which families list the industry slug, with a module-level check that
  fails the build if they drift — don't add an industry without updating
  the families that should fit it.
- **New article:** add to `src/data/articles/`, registered in
  `src/data/articles/index.ts`'s `articles` array. It **must** link at
  least one family or grade page in its body (the `dead-end` check) — not
  `/industries`, not another article. Title stays informational (§1).
  FAQ pairs become `FAQPage` JSON-LD; the schema text must equal the
  rendered FAQ text (`faq-schema-mismatch` check) — never write an answer
  into the schema that isn't also on the page.

Run `npm run build && npm run start && npm run seo:audit` after any of the
above — orphan/dead-end/keyword-owner findings only show up against the
rendered site.

## 5. Bilingual rules

- Thai lives at the bare path, English under `/en`. Both are in the
  sitemap with reciprocal `alternates`; `x-default` points at Thai.
- `/en` pages must contain **zero** visible Thai characters
  (U+0E00–U+0E7F) in the rendered body — the audit's `visible-thai-on-en`
  check scans `<main>`/`<body>` text, not just the data file, so a missed
  `en` string anywhere in the render tree fails it.
- `pageMeta()` in `src/lib/seo.ts` builds title/description/canonical/OG/
  hreflang for every page — never hand-roll a `<head>`, never hardcode
  `/en` (use `LocaleLink` / `absUrl` from `src/lib/locale.ts`).
- Company facts come from `src/data/company.ts` only ("Global Constraints"
  in `docs/superpowers/plans/2026-10-05-van-material-nextjs-seo-launch.md`)
  — never invent an address, phone, hours, or founding year inline.

## 6. Title length and the `<title>` ≤ 65 rule

SERP truncation is pixel-based; 65 visible characters (combining marks
stripped, entities decoded, brand suffix `" | VAN INTERTRADE"` included) is
the practical bound the audit gates on — there is no warn-only slack here,
unlike the sibling VAN site's older script. Meta description: 70–165
visible chars, also a hard fail. When a title runs long, shorten the
descriptive tail first, not the term that makes the page findable.

## 7. Page speed — rules learned in Task 6

- **Nothing above the fold starts at `opacity: 0`.** Chrome never counts an
  invisible element as LCP. Heroes render plain; reveal-on-scroll animation
  is for content below the fold only.
- **The LCP image** gets `priority`/`fetchPriority="high"` with real `sizes`
  — one per page, never two competing "priority" images.
- **Client components never statically import a whole data module.**
  Anything that needs article/product bodies client-side goes through
  `next/dynamic` or takes a pre-narrowed prop type, not the full data array.
- **A display font belongs to the route that paints with it.** Don't add a
  font face to a shared layout/shell for one page's heading — declare it
  where it's actually used so it isn't preloaded on routes that never
  render it.
- **Export icons at their real target size** (`icon.png` 192px,
  `apple-icon.png` 180px) — don't ship a full-resolution source image as
  the favicon.
- Measure Lighthouse against **production**, not localhost (a cold image
  optimizer makes localhost numbers meaningless), and take at least three
  runs per URL before trusting a number — simulated LCP scatters ±0.5s on a
  single run.

## 8. Open client questions (unresolved as of 2026-10-05 — do not guess)

These block some content/claims from being added; don't invent an answer
to get past this list:

- **MoldMAX / EDRO branding and usage rights.** Confirm with the client (or
  Materion) what's permitted before publishing any MoldMAX/EDRO trademark
  usage beyond naming the alloy, and before using any Materion-owned
  imagery.
- **Datasheets and stock.** No list prices, no MOQ, no stock/lead-time
  promises are published anywhere (`priceFaq()` in
  `src/data/products/shared.ts` explains why and routes to a quote instead)
  — confirm with the client before adding any of these.
- **Sales/contact email.** `company.contact.email` is `van@vaninter.com`
  (current site), but vaninter.com's own contact form posts to
  `info@vaninter.com` — confirmed by the client before changing
  `src/data/company.ts`.
- **Materion-authorized-distributor-since year.** `company.materion.since`
  is `null` by design (`src/data/company.ts`) — leave any "authorized
  since <year>" copy out until the client provides a real year; the field
  exists so it's a one-line change once they do.
- **Real logo and photos.** Every product/industry image is a shared stock
  photo (`public/images/*.webp`, several reused across unrelated families)
  and `public/logo.png` is a placeholder. Swap in real client-supplied
  photography and the real logo before launch; don't let stock imagery
  ship as "final."

## 9. Structured data, robots and llms.txt

**One entity.** VAN-MATERIAL and vaninter.com are the same legal company, so
there is exactly one Organization node, `ORG_ID` =
`${company.url}/#organization` (https://www.vaninter.com/#organization —
the @id vaninter.com already uses), rendered site-wide by `RootShell` with
the WebSite node (`${SITE_URL}/#website`). Every author/publisher/
mainEntity reference uses `ORG_ID`. Address, geo and hours live on that
Organization (`address`, `location`, `contactPoint`) — never add a second
Organization or a LocalBusiness node with its own @id. Product `brand` is
emitted only when `family.brand` names a producer (Materion/Longsun);
families with no named producer have no `brand` at all.


`src/app/robots.ts` explicitly allows `GPTBot`, `OAI-SearchBot`,
`PerplexityBot`, `ClaudeBot`, and `Google-Extended` (AEO is a stated goal —
nothing should block an answer engine from crawling) and points at
`/sitemap.xml`. `src/app/llms.txt/route.ts` is generated from
`company.ts` + `routes.ts` + the product/industry/article data, so it can't
drift out of sync with the site; it links only English (`/en/...`) URLs,
all of which must already be in the sitemap — the audit's
`llms-unregistered-link` check fails if a future edit to that route hand-adds
a link `allRoutes()` doesn't know about.
