import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/ArticlePage";
import { articleLastmod, articles, getArticle } from "@/data/articles";
import { pageMeta } from "@/lib/seo";

const LANG = "th" as const;

/** Only the articles in `src/data/articles`; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMeta({
    title: article.title[LANG],
    description: article.description[LANG],
    lang: LANG,
    path: `/knowledge/${article.slug}`,
    article: { published: article.date, modified: articleLastmod(article) },
  });
}

export default async function ThaiArticleRoute({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <ArticlePage article={article} lang={LANG} />;
}
