#!/usr/bin/env node
// On-page SEO / AEO / i18n audit over the rendered site. Ported from the
// sibling VAN INTERTRADE site's `VAN/scripts/seo-audit.mjs` and folded
// together with what used to be `check-sitemap.mjs` + `check-links.mjs`
// (removed — this script is now the one gate; see git history for the
// originals) so there is exactly one script that reads the rendered HTML
// instead of two that each read half of it.
//
// It reads `sitemap.xml` on `--base` and checks the HTML a crawler actually
// receives, never `src/` — a `<title>` that never rendered, a canonical the
// template forgot, or a link that only exists after a click all look fine
// in the data and wrong to Googlebot.
//
// Usage:
//   npm run build && npm run start           # serves http://localhost:3000
//   npm run seo:audit
//   node scripts/seo-audit.mjs --base https://www.van-material.com
//   node scripts/seo-audit.mjs --lang th     # skip the /en tree (faster)
//   node scripts/seo-audit.mjs --strict      # gate on warnings too
//   node scripts/seo-audit.mjs --fetch-vaninter   # refresh docs/seo/vaninter-material-titles.txt
//
// Exit: 0 all clear, 1 findings, 2 could not run.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

const args = process.argv.slice(2);
const flag = (name, fallback = undefined) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};

const BASE = (flag("--base", "http://localhost:3000") ?? "").replace(/\/$/, "");
const LANG = flag("--lang", "both");
const STRICT = args.includes("--strict");
const CONCURRENCY = 8;

/**
 * The production host (R14 / global-constraints.md: the only place a
 * hostname may be hardcoded is `src/lib/site.ts`; this is a second,
 * documented copy for the same reason `check-sitemap.mjs` used to carry
 * one — a plain Node script can't import the TS module directly). Every
 * canonical / og:url / sitemap <loc> must resolve to this host even when
 * `--base` points the crawler at localhost.
 */
const PROD_HOST = "www.van-material.com";

const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

// ── vaninter.com cross-domain title check (R step 2) ───────────────────────

const VANINTER_SLUGS = ["beryllium-copper", "chrome-copper", "clad-metal", "electrical-contacts", "toughmet", "moldmax"];
const VANINTER_TITLES_FILE = path.join(ROOT, "docs", "seo", "vaninter-material-titles.txt");

async function fetchVaninterTitles() {
  const lines = [];
  for (const slug of VANINTER_SLUGS) {
    for (const url of [`https://www.vaninter.com/materials/${slug}`, `https://www.vaninter.com/en/materials/${slug}`]) {
      const res = await fetch(url, { redirect: "follow" });
      const html = await res.text();
      const m = html.match(/<title>([\s\S]*?)<\/title>/i);
      lines.push(m ? m[1].replace(/\s+/g, " ").trim() : "");
      console.log(`fetched ${url} -> ${res.status}`);
    }
  }
  const body = lines.filter(Boolean).join("\n") + "\n";
  writeFileSync(VANINTER_TITLES_FILE, body, "utf8");
  console.log(`wrote ${VANINTER_TITLES_FILE}`);
}

function loadVaninterTitles() {
  try {
    return new Set(
      readFileSync(VANINTER_TITLES_FILE, "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#")),
    );
  } catch {
    return new Set();
  }
}

// ── keyword ownership (controller ruling R6) ────────────────────────────────
//
// One head term, one page. A title FAILS only if it LEADS with (starts
// with, after trimming) an owned term whose owner is a different page —
// longest owned term wins. A title that leads with an owned term but also
// mentions another distinct owned term elsewhere (e.g. "C17200 vs C17510:
// Which Beryllium Copper?") is a comparison/explainer, not an attempt to
// own the leading term, and is exempt. "Distinct" excludes a term that is
// merely a substring of another matched term (e.g. "MoldMAX" inside
// "MoldMAX HH" is the same lexical item, not a second term).
const KEYWORD_OWNERS = {
  "Beryllium Copper": ["/beryllium-copper"],
  C17200: ["/beryllium-copper/c17200"],
  C17410: ["/beryllium-copper/c17410"],
  C17510: ["/beryllium-copper/c17510"],
  C17460: ["/beryllium-copper/c17460"],
  "MoldMAX HH": ["/moldmax/moldmax-hh"],
  "MoldMAX V": ["/moldmax/moldmax-v"],
  "MoldMAX XL": ["/moldmax/moldmax-xl"],
  MoldMAX: ["/moldmax"],
  PROtherm: ["/moldmax/protherm"],
  "ToughMet 3": ["/toughmet/toughmet-3"],
  "ToughMet 2": ["/toughmet/toughmet-2"],
  ToughMet: ["/toughmet"],
  CrCuZr: ["/chrome-copper"],
  C5191: ["/standard-copper-alloys/c5191"],
  C5210: ["/standard-copper-alloys/c5210"],
  C1100: ["/standard-copper-alloys/c1100"],
  "Clad Metal": ["/clad-metal"],
  "Silver Electrical Contacts": ["/electrical-contacts"],
};
// Longest key first, so `.find` below picks the longest term a title leads
// with (e.g. "MoldMAX HH" over "MoldMAX").
const OWNER_KEYS = Object.keys(KEYWORD_OWNERS).sort((a, b) => b.length - a.length);

function keywordOwnerFinding(title, path_) {
  const t = title.trim();
  const leading = OWNER_KEYS.find((k) => t.startsWith(k));
  if (!leading) return null;
  const others = OWNER_KEYS.filter(
    (k) => k !== leading && !leading.includes(k) && !k.includes(leading) && t.includes(k),
  );
  if (others.length > 0) return null; // comparison/explainer — exempt
  const owners = KEYWORD_OWNERS[leading];
  if (!owners.includes(delocalize(path_))) return { leading, owners };
  return null;
}

// Commercial pages (family + grade): dead-end/orphan-adjacent checks treat
// these, not /industries or /knowledge, as "sells something".
const FAMILY_SLUGS = ["beryllium-copper", "moldmax", "toughmet", "chrome-copper", "standard-copper-alloys", "clad-metal", "electrical-contacts"];
const COMMERCIAL = new RegExp(`^\\/(${FAMILY_SLUGS.join("|")})(\\/|$)`);

const findings = [];
const add = (level, kind, url, detail) => findings.push({ level, kind, url, detail });

/** Warn-only kinds; everything else fails the run. */
const WARN_ONLY = new Set(["few-links", "no-h2"]);

// ── tiny HTML helpers ───────────────────────────────────────────────────────

const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/**
 * Horizontal width of a string, in characters. Thai vowel/tone marks
 * (U+0E31, U+0E34–U+0E3A, U+0E47–U+0E4E) are separate code points that take
 * no horizontal space, so `.length` overstates Thai titles.
 */
const THAI_COMBINING = /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/gu;
const visibleLength = (s) => [...s.replace(THAI_COMBINING, "")].length;

/** Any visible Thai character (the full Thai Unicode block). */
const THAI_CHAR = /[\u0E00-\u0E7F]/;

const stripTags = (html) =>
  decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<head[\s\S]*?<\/head>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

function mainText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i);
  const body = html.match(/<body[\s\S]*?<\/body>/i);
  return stripTags(main ? main[0] : body ? body[0] : html);
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? decodeEntities(m[1]) : null;
};

const firstTag = (html, re) => {
  const m = html.match(re);
  return m ? m[0] : null;
};

function internalLinks(html, pageUrl) {
  const out = new Set();
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const raw = decodeEntities(m[1]);
    if (/^(mailto:|tel:|#|javascript:)/i.test(raw)) continue;
    let p;
    try {
      const u = new URL(raw, pageUrl);
      if (u.origin !== new URL(pageUrl).origin) continue;
      p = u.pathname;
    } catch {
      continue;
    }
    out.add(p.length > 1 ? p.replace(/\/$/, "") : p);
  }
  return [...out];
}

/** Strip the `/en` prefix so both trees share one link-graph identity. */
const delocalize = (p) => {
  const x = p === "/en" ? "/" : p.replace(/^\/en(?=\/|$)/, "");
  return x.length > 1 ? x.replace(/\/$/, "") || "/" : x || "/";
};

const isEnPath = (p) => p === "/en" || p.startsWith("/en/");

// ── fetching ────────────────────────────────────────────────────────────────

async function getText(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, html: await res.text() };
}

async function sitemapEntries() {
  const { status, html } = await getText(`${BASE}/sitemap.xml`);
  if (status !== 200) throw new Error(`sitemap.xml returned ${status}`);
  const blocks = [...html.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  if (!blocks.length) throw new Error("sitemap.xml contained no <url> entries");

  const entries = blocks.map((b) => {
    const loc = b.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
    const alternates = {};
    for (const am of b.matchAll(/<xhtml:link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)) {
      alternates[am[1]] = am[2];
    }
    const lastmod = b.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null;
    return { loc, alternates, lastmod };
  });

  for (const e of entries) {
    let host;
    try {
      host = new URL(e.loc).host;
    } catch {
      add("fail", "sitemap-host", e.loc, "<loc> is not a valid URL");
      continue;
    }
    if (host !== PROD_HOST) {
      add("fail", "sitemap-host", e.loc, `<loc> host is "${host}", expected "${PROD_HOST}"`);
    }
    for (const [hreflang, href] of Object.entries(e.alternates)) {
      let ahost;
      try {
        ahost = new URL(href).host;
      } catch {
        add("fail", "sitemap-host", e.loc, `hreflang="${hreflang}" href is not a valid URL`);
        continue;
      }
      if (ahost !== PROD_HOST) {
        add("fail", "sitemap-host", e.loc, `hreflang="${hreflang}" href host is "${ahost}", expected "${PROD_HOST}"`);
      }
    }
  }

  return entries;
}

async function pool(items, worker) {
  const results = [];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

// ── per-page checks ─────────────────────────────────────────────────────────

function auditPage(entry, status, html) {
  const u = new URL(entry.loc);
  const path_ = u.pathname || "/";
  const prodUrl = `https://${PROD_HOST}${path_}`;

  if (status !== 200) {
    add("fail", "status", path_, `HTTP ${status} — in the sitemap but not served`);
    return null;
  }

  const head = html.slice(0, html.search(/<\/head>/i) + 7);

  // <html lang>
  const htmlLang = html.match(/<html[^>]*\blang="([^"]+)"/i)?.[1] ?? null;
  const expectedLang = isEnPath(path_) ? "en" : "th";
  if (!htmlLang) add("fail", "html-lang-missing", path_, "no <html lang>");
  else if (htmlLang !== expectedLang) add("fail", "html-lang-wrong", path_, `<html lang="${htmlLang}">, expected "${expectedLang}"`);

  // title
  const titleRaw = head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const title = decodeEntities(titleRaw.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
  if (!title) add("fail", "title-missing", path_, "no <title>");
  else if (visibleLength(title) > TITLE_MAX)
    add("fail", "title-long", path_, `${visibleLength(title)} chars — SERP truncates near ${TITLE_MAX}`);

  // description
  const descTag = firstTag(head, /<meta[^>]+name="description"[^>]*>/i);
  const desc = descTag ? attr(descTag, "content") ?? "" : "";
  const descLen = visibleLength(desc);
  if (!desc) add("fail", "desc-missing", path_, "no meta description");
  else if (descLen < DESC_MIN || descLen > DESC_MAX)
    add("fail", "desc-length", path_, `${descLen} chars — must be ${DESC_MIN}-${DESC_MAX}`);

  // self-canonical (must be the page's own PRODUCTION url)
  const canonTag = firstTag(head, /<link[^>]+rel="canonical"[^>]*>/i);
  const canonical = canonTag ? attr(canonTag, "href") : null;
  // Compared via the normalized URL (`.href`), not the raw string: Next's
  // metadata API renders the bare-root canonical as
  // "https://host" (no trailing slash) while the sitemap's own <loc> for
  // the same page is "https://host/" — both are the same URL per the
  // WHATWG URL spec (`new URL(...).href` agrees on both), so this isn't a
  // real duplicate-canonical bug and shouldn't fail the gate.
  if (!canonical) add("fail", "canonical-missing", path_, "no rel=canonical");
  else {
    let canonHref;
    try {
      canonHref = new URL(canonical).href;
    } catch {
      canonHref = null;
    }
    if (canonHref !== new URL(prodUrl).href) add("fail", "canonical-mismatch", path_, `canonical is "${canonical}", expected "${prodUrl}"`);
  }

  // reciprocal hreflang, matching the sitemap's own alternates for this URL
  const hreflangTags = [...head.matchAll(/<link[^>]+rel="alternate"[^>]*>/gi)].map((m) => m[0]);
  const pageAlt = {};
  for (const t of hreflangTags) {
    const hl = attr(t, "hreflang");
    const href = attr(t, "href");
    if (hl) pageAlt[hl] = href;
  }
  for (const key of ["th-TH", "en", "x-default"]) {
    if (!pageAlt[key]) add("fail", "hreflang-missing", path_, `no hreflang="${key}"`);
  }
  const hrefEq = (a, b) => {
    try {
      return new URL(a).href === new URL(b).href;
    } catch {
      return a === b;
    }
  };
  for (const [key, href] of Object.entries(entry.alternates)) {
    if (!pageAlt[key] || !hrefEq(pageAlt[key], href))
      add("fail", "hreflang-mismatch", path_, `hreflang="${key}" is "${pageAlt[key]}", sitemap says "${href}"`);
  }

  // og:image, present once and absolute
  const ogImgTags = [...head.matchAll(/<meta[^>]+property="og:image"[^>]*>/gi)].map((m) => m[0]);
  if (ogImgTags.length === 0) add("fail", "og-image-missing", path_, "no og:image");
  else if (ogImgTags.length > 1) add("fail", "og-image-multiple", path_, `${ogImgTags.length} og:image tags`);
  else {
    const ogImg = attr(ogImgTags[0], "content");
    if (!ogImg || !/^https?:\/\//.test(ogImg)) add("fail", "og-image-relative", path_, `og:image is "${ogImg}"`);
  }

  // h1
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length === 0) add("fail", "h1-missing", path_, "no <h1>");
  else if (h1s.length > 1) add("fail", "h1-multiple", path_, `${h1s.length} <h1> elements`);

  const h2s = [...html.matchAll(/<h2\b/gi)].length;
  if (h2s === 0) add("warn", "no-h2", path_, "no <h2> — no subheading structure");

  // JSON-LD
  const ldTypes = [];
  const ldNodes = [];
  for (const m of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        if (node?.["@type"]) ldTypes.push(node["@type"]);
        ldNodes.push(node);
      }
    } catch {
      add("fail", "jsonld-invalid", path_, "a ld+json block does not parse");
    }
  }
  if (!ldTypes.length) add("fail", "jsonld-missing", path_, "no structured data");

  const text = mainText(html);

  // no visible Thai on /en
  if (isEnPath(path_) && THAI_CHAR.test(text)) {
    const at = text.search(THAI_CHAR);
    add("fail", "visible-thai-on-en", path_, `"…${text.slice(Math.max(0, at - 30), at + 30)}…"`);
  }

  // FAQPage schema text must equal visible FAQ text
  for (const node of ldNodes) {
    if (node?.["@type"] !== "FAQPage") continue;
    for (const q of node.mainEntity ?? []) {
      const question = (q.name ?? "").replace(/\s+/g, " ").trim();
      const answer = (q.acceptedAnswer?.text ?? "").replace(/\s+/g, " ").trim();
      if (question && !text.includes(question)) add("fail", "faq-schema-mismatch", path_, `FAQ question not visible: ${question.slice(0, 60)}`);
      if (answer && !text.includes(answer)) add("fail", "faq-schema-mismatch", path_, `FAQ answer not visible: ${answer.slice(0, 60)}`);
    }
  }

  // keyword ownership
  const owner = keywordOwnerFinding(title, path_);
  if (owner) add("fail", "keyword-owner", path_, `title leads with "${owner.leading}", owned by ${owner.owners.join(" / ")}`);

  // vaninter.com cross-domain title collision
  if (vaninterTitles.has(title)) add("fail", "vaninter-title-collision", path_, `title is byte-identical to a vaninter.com page: "${title}"`);

  const links = internalLinks(html, prodUrl);
  if (links.length < 5) add("warn", "few-links", path_, `only ${links.length} internal links`);

  return { path: path_, title, desc, links: links.map(delocalize) };
}

// ── run ─────────────────────────────────────────────────────────────────────

let vaninterTitles = new Set();

async function main() {
  if (args.includes("--fetch-vaninter")) {
    await fetchVaninterTitles();
    return;
  }
  vaninterTitles = loadVaninterTitles();

  const entries = await sitemapEntries();
  const scoped =
    LANG === "th"
      ? entries.filter((e) => !isEnPath(new URL(e.loc).pathname))
      : LANG === "en"
        ? entries.filter((e) => isEnPath(new URL(e.loc).pathname))
        : entries;

  const sitemapPaths = new Set(entries.map((e) => new URL(e.loc).pathname || "/"));
  if (!sitemapPaths.has("/")) add("fail", "sitemap-missing-home", "/", "Thai home not in sitemap");
  if (!sitemapPaths.has("/en")) add("fail", "sitemap-missing-home", "/en", "English home not in sitemap");

  console.log(`Auditing ${scoped.length} URL(s) against ${BASE} (sitemap loc host checked against ${PROD_HOST})\n`);

  const pages = (
    await pool(scoped, async (entry) => {
      const p = new URL(entry.loc).pathname || "/";
      try {
        const { status, html } = await getText(`${BASE}${p}`);
        return auditPage(entry, status, html);
      } catch (e) {
        add("fail", "fetch", p, e.message);
        return null;
      }
    })
  ).filter(Boolean);

  // ── link-graph checks ──────────────────────────────────────────────────
  const byPath = new Map(pages.map((p) => [delocalize(p.path), p]));
  const inbound = new Map([...byPath.keys()].map((k) => [k, 0]));
  const externalTargets = new Set();

  for (const p of pages) {
    for (const target of new Set(p.links)) {
      if (target === delocalize(p.path)) continue;
      if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
      else externalTargets.add(target);
    }
  }

  for (const [target, count] of inbound) {
    if (count === 0 && target !== "/") add("fail", "orphan", target, "no other crawled page links to it");
  }

  // dead-end articles: every /knowledge/<slug> must link >=1 commercial page
  for (const p of pages) {
    if (!/^\/(en\/)?knowledge\/.+/.test(p.path)) continue;
    if (!p.links.some((l) => COMMERCIAL.test(l)))
      add("fail", "dead-end", p.path, "article links to no family/grade page");
  }

  // unregistered pages: an internal link target that returns 200 but isn't
  // in the sitemap.
  const extra = [...externalTargets].filter((t) => t !== "/api/rfq");
  const extraResults = await pool(extra, async (t) => {
    try {
      const { status } = await getText(`${BASE}${t}`);
      return { t, status };
    } catch (e) {
      return { t, status: null, err: e.message };
    }
  });
  for (const { t, status, err } of extraResults) {
    if (err) add("fail", "broken-link", t, `fetch error: ${err}`);
    else if (status === 200) add("fail", "unregistered-page", t, "returns 200 but is not in the sitemap");
    else if (status !== 404) add("fail", "broken-link", t, `HTTP ${status}`);
  }

  // robots.txt
  try {
    const { status, html: robotsTxt } = await getText(`${BASE}/robots.txt`);
    if (status !== 200) add("fail", "robots-missing", "/robots.txt", `HTTP ${status}`);
    else {
      for (const bot of ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"]) {
        const re = new RegExp(`User-agent:\\s*${bot}[\\s\\S]{0,80}?Allow:\\s*/`, "i");
        if (!re.test(robotsTxt)) add("fail", "robots-bot-missing", "/robots.txt", `no Allow rule for ${bot}`);
      }
      if (!new RegExp(`Sitemap:\\s*https?://${PROD_HOST.replace(/\./g, "\\.")}/sitemap\\.xml`, "i").test(robotsTxt))
        add("fail", "robots-no-sitemap", "/robots.txt", "no Sitemap: line pointing at the production sitemap");
    }
  } catch (e) {
    add("fail", "robots-missing", "/robots.txt", e.message);
  }

  // llms.txt
  try {
    const { status, html: llms } = await getText(`${BASE}/llms.txt`);
    if (status !== 200) add("fail", "llms-missing", "/llms.txt", `HTTP ${status}`);
    else {
      const linkedUrls = [...llms.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)].map((m) => m[1]);
      for (const url of linkedUrls) {
        let p;
        try {
          p = new URL(url).pathname || "/";
        } catch {
          add("fail", "llms-bad-link", "/llms.txt", `not a URL: ${url}`);
          continue;
        }
        if (!sitemapPaths.has(p)) add("fail", "llms-unregistered-link", "/llms.txt", `links ${url}, not in the sitemap`);
      }
    }
  } catch (e) {
    add("fail", "llms-missing", "/llms.txt", e.message);
  }

  // ── report ────────────────────────────────────────────────────────────
  const byKind = new Map();
  for (const f of findings) byKind.set(f.kind, [...(byKind.get(f.kind) ?? []), f]);

  for (const [kind, list] of [...byKind.entries()].sort((a, b) => b[1].length - a[1].length)) {
    const level = WARN_ONLY.has(kind) ? "warn" : "FAIL";
    console.log(`${level} ${kind} — ${list.length}`);
    for (const f of list.slice(0, 10)) console.log(`     ${f.url}  ${f.detail}`);
    if (list.length > 10) console.log(`     … ${list.length - 10} more`);
    console.log();
  }

  const failures = findings.filter((f) => !WARN_ONLY.has(f.kind));
  const warnings = findings.filter((f) => WARN_ONLY.has(f.kind));
  const gated = STRICT ? findings : failures;

  if (gated.length === 0) {
    console.log(
      `PASS — ${pages.length} page(s): metadata, structured data, i18n and the internal link graph are sound` +
        (warnings.length && !STRICT ? `\n  (${warnings.length} warning(s) above — run with --strict to gate on them)` : ""),
    );
    process.exit(0);
  }
  console.log(
    `RESULT FAIL — ${failures.length} failure(s)` +
      (warnings.length ? ` and ${warnings.length} warning(s)` : "") +
      ` across ${pages.length} page(s)`,
  );
  process.exit(1);
}

main().catch((e) => {
  console.error("ERR " + e.message);
  console.error(e.stack);
  process.exit(2);
});
