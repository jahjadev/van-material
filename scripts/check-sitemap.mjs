#!/usr/bin/env node
/**
 * Fails unless the running site's sitemap.xml contains both the Thai and
 * English home URLs. Run against a local `next start` by default:
 *
 *   node scripts/check-sitemap.mjs
 *   node scripts/check-sitemap.mjs --base https://www.van-material.com
 */

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const base = (baseIdx !== -1 ? args[baseIdx + 1] : "http://localhost:3000").replace(
  /\/$/,
  "",
);

// Same fallback as src/lib/site.ts — the one place a hostname is allowed to
// live in app code; duplicated here only because this plain Node script
// can't import the TS module directly.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.van-material.com"
).replace(/\/$/, "");

const res = await fetch(`${base}/sitemap.xml`);
if (!res.ok) {
  console.error(`check-sitemap: fetch ${base}/sitemap.xml failed: ${res.status}`);
  process.exit(1);
}
const xml = await res.text();

const required = [`<loc>${SITE_URL}/en</loc>`, `<loc>${SITE_URL}/</loc>`];
let ok = true;
for (const needle of required) {
  if (!xml.includes(needle)) {
    console.error(`check-sitemap: missing ${needle}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log("check-sitemap: ok");
