#!/usr/bin/env node
/**
 * Crawl the running site from `/` and `/en`, follow every internal link
 * (nav, footer, body), and report:
 *   - any internal URL that doesn't return 200 (except --allow prefixes)
 *   - per HTML page: exactly one <h1>, <title> ≤ 65 visible chars, meta
 *     description 70–165 chars, every ld+json block parses, FAQPage
 *     questions/answers appear verbatim in the visible text, and no visible
 *     Thai on /en pages.
 *
 *   node scripts/check-links.mjs                       # http://localhost:3000
 *   node scripts/check-links.mjs --base http://localhost:3001 --allow /knowledge
 *
 * Exits 1 on any failure. "Visible chars" = grapheme clusters, so Thai
 * combining vowels/tone marks don't count as separate characters.
 */

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : undefined;
};
const base = (opt("--base") ?? "http://localhost:3000").replace(/\/$/, "");
const allow = args.flatMap((a, i) => (args[i - 1] === "--allow" ? [a] : []));

const seg = new Intl.Segmenter("th", { granularity: "grapheme" });
const glen = (s) => [...seg.segment(s)].length;

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return String.fromCodePoint(n);
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
const norm = (s) => s.replace(/\s+/g, " ").trim();

function visibleText(html) {
  const body = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<template\b[\s\S]*?<\/template>/gi, " ")
    .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return norm(decode(body));
}

const isAllowed = (path) => allow.some((p) => path === p || path.startsWith(`${p}/`) || path.startsWith(`/en${p}`));

const queue = ["/", "/en"];
const seen = new Set(queue);
const failures = [];
const expected404 = [];
const pageReports = [];

while (queue.length) {
  const path = queue.shift();
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 200) {
    if (isAllowed(path.split("?")[0])) expected404.push(`${res.status} ${path}`);
    else failures.push(`HTTP ${res.status} ${path}`);
    continue;
  }
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) continue;
  const html = await res.text();

  // Collect internal links.
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    let href = decode(m[1]);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    href = href.split("#")[0];
    if (!href || seen.has(href)) continue;
    seen.add(href);
    queue.push(href);
  }

  // Per-page checks.
  const problems = [];
  const h1 = (html.match(/<h1\b/gi) ?? []).length;
  if (h1 !== 1) problems.push(`h1 count ${h1}`);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  if (glen(title) > 65) problems.push(`title ${glen(title)} > 65`);
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "");
  if (glen(desc) < 70 || glen(desc) > 165) problems.push(`description ${glen(desc)} not in 70–165`);
  const text = visibleText(html);
  const ldTypes = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      problems.push(`ld+json parse error: ${e.message}`);
      continue;
    }
    for (const node of [data].flat()) {
      ldTypes.push(node["@type"]);
      if (node["@type"] !== "FAQPage") continue;
      for (const q of node.mainEntity ?? []) {
        if (!text.includes(norm(q.name))) problems.push(`FAQ question not visible: ${q.name.slice(0, 60)}`);
        if (!text.includes(norm(q.acceptedAnswer.text))) {
          problems.push(`FAQ answer not visible: ${q.acceptedAnswer.text.slice(0, 60)}`);
        }
      }
    }
  }
  const pathOnly = path.split("?")[0];
  if ((pathOnly === "/en" || pathOnly.startsWith("/en/")) && /[฀-๿]/.test(text)) {
    const at = text.search(/[฀-๿]/);
    problems.push(`visible Thai on English page: "…${text.slice(Math.max(0, at - 30), at + 30)}…"`);
  }
  pageReports.push({ path, title: glen(title), desc: glen(desc), h1, ld: ldTypes.join(",") });
  for (const p of problems) failures.push(`${path}: ${p}`);
}

for (const r of pageReports) {
  console.log(`200 ${r.path}  title=${r.title} desc=${r.desc} h1=${r.h1} ld=[${r.ld}]`);
}
console.log(`\nchecked ${pageReports.length} HTML pages, ${seen.size} internal URLs`);
if (expected404.length) console.log(`allowed non-200: ${expected404.join("; ")}`);
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log("check-links: ok");
