import { notFound } from "next/navigation";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { KNOWLEDGE } from "@/data/articles";
import { articles, getArticle } from "@/data/articles";

const LANG = "th" as const;

/**
 * Prerender a card per article — leaving this route dynamic would break the
 * font `readFile()` in `ogCard.tsx` in production (see its module comment).
 */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// `alt` must be a static export, so it stays generic while the card is per-article.
export const alt = "VAN INTERTRADE";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return ogCard({
    eyebrowTh: KNOWLEDGE.th,
    eyebrowEn: KNOWLEDGE.en,
    title: article.title[LANG],
    subtitle: article.description[LANG],
  });
}
