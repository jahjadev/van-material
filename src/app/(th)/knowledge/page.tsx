import type { Metadata } from "next";
import { KnowledgeIndexPage } from "@/components/ArticlePage";
import { knowledgeMeta } from "@/data/articles";
import { pageMeta } from "@/lib/seo";

const LANG = "th" as const;

export const metadata: Metadata = pageMeta({
  title: knowledgeMeta[LANG].title,
  description: knowledgeMeta[LANG].description,
  lang: LANG,
  path: "/knowledge",
});

export default function ThaiKnowledgeRoute() {
  return <KnowledgeIndexPage lang={LANG} />;
}
