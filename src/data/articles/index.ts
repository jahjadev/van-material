import { getFamily, getGrade, type Bi } from "@/data/products";
import type { Lang } from "@/lib/locale";
import type { Article, Block } from "./types";
import { whatIsBerylliumCopper } from "./what-is-beryllium-copper";
import { c17200VsC17510 } from "./c17200-vs-c17510";
import { moldSteelVsBerylliumCopper } from "./mold-steel-vs-beryllium-copper";
import { whatIsMoldInsert } from "./what-is-mold-insert";
import { crcuVsCrcuzr } from "./crcu-vs-crcuzr-welding-electrodes";
import { berylliumCopperSafety } from "./beryllium-copper-safety";

export type { Article, Block, Ref } from "./types";

/** Section name (breadcrumb, eyebrow, share-card label). */
export const KNOWLEDGE: Bi = { th: "คลังความรู้", en: "Knowledge" };

export const knowledgeMeta: Record<Lang, { title: string; description: string; h1: string; intro: string }> = {
  th: {
    title: "คลังความรู้ Beryllium Copper และวัสดุแม่พิมพ์",
    description:
      "บทความอธิบาย Beryllium Copper วิธีเลือกเกรด C17200 กับ C17510 ทองแดงเบริลเลียมสำหรับแม่พิมพ์ insert แม่พิมพ์ หัวเชื่อม CrCu/CrCuZr และความปลอดภัย พร้อมแหล่งอ้างอิง",
    h1: "คลังความรู้: Beryllium Copper วัสดุแม่พิมพ์ และทองแดงผสม",
    intro:
      "คำตอบสำหรับคำถามที่วิศวกรและฝ่ายจัดซื้อถามบ่อยเกี่ยวกับโลหะผสมทองแดงและวัสดุแม่พิมพ์ ทุกบทความอ้างอิงข้อมูลจากผู้ผลิตและแสดงแหล่งที่มาท้ายบทความ",
  },
  en: {
    title: "Copper Alloy & Mold Material Knowledge Base",
    description:
      "Articles on beryllium copper, choosing C17200 or C17510, beryllium copper for molds and mold inserts, CrCu vs CrCuZr electrodes and safe handling, all with sources.",
    h1: "Knowledge Base: Beryllium Copper, Mold Materials and Copper Alloys",
    intro:
      "Answers to the questions engineers and buyers ask most about copper alloys and mold materials. Every article draws on producer data and lists its sources at the end.",
  },
};

/** Every knowledge article, in index order. */
export const articles: Article[] = [
  whatIsBerylliumCopper,
  c17200VsC17510,
  moldSteelVsBerylliumCopper,
  whatIsMoldInsert,
  crcuVsCrcuzr,
  berylliumCopperSafety,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Articles whose `topic` includes this family slug (family "Related articles"). */
export function articlesForTopic(familySlug: string): Article[] {
  return articles.filter((a) => a.topic.includes(familySlug));
}

/** Articles tagged for one grade page (`family/grade`). */
export function articlesForGrade(familySlug: string, gradeSlug: string): Article[] {
  return articles.filter((a) => a.grades?.includes(`${familySlug}/${gradeSlug}`));
}

/** Last real change of an article (sitemap lastmod, `dateModified`). */
export const articleLastmod = (a: Article) => a.modified ?? a.date;

/*
 * Build-time integrity check: a typo in a topic, grade key, `props` block or
 * inline link must fail the build rather than ship a dead link or an empty
 * "Related articles" list.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const slugs = new Set(articles.map((a) => a.slug));

function checkPath(path: string, where: string) {
  const p = path.split(/[?#]/)[0];
  const segs = p.split("/").filter(Boolean);
  const ok =
    p === "/contact" ||
    (segs[0] === "knowledge" && segs.length === 2 && slugs.has(segs[1])) ||
    (segs.length === 1 && !!getFamily(segs[0])) ||
    (segs.length === 2 && !!getGrade(segs[0], segs[1]));
  if (!ok) throw new Error(`articles: bad link ${path} in ${where}`);
}

function blockTexts(b: Block): string[] {
  if (b.t === "p" || b.t === "h2") return [b.text.th, b.text.en];
  if (b.t === "ul") return b.items.flatMap((i) => [i.th, i.en]);
  return [];
}

for (const a of articles) {
  for (const t of a.topic) if (!getFamily(t)) throw new Error(`articles: ${a.slug} bad topic ${t}`);
  for (const g of a.grades ?? []) {
    const [f, s] = g.split("/");
    if (!getGrade(f, s)) throw new Error(`articles: ${a.slug} bad grade ${g}`);
  }
  for (const b of a.body) {
    if (b.t === "props") {
      for (const g of b.grades) {
        if (!getGrade(g.family, g.grade)) throw new Error(`articles: ${a.slug} bad props grade ${g.grade}`);
      }
    }
    for (const text of blockTexts(b)) {
      for (const m of text.matchAll(LINK)) checkPath(m[2], a.slug);
    }
  }
}
