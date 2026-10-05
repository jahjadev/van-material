import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/pages/IndustryPage";
import { getIndustry, industries } from "@/data/industries";
import { pageMeta } from "@/lib/seo";

const LANG = "th" as const;

/** Only the industries in `src/data/industries.ts`; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  return pageMeta({
    title: ind.title[LANG],
    description: ind.description[LANG],
    lang: LANG,
    path: `/industries/${ind.slug}`,
  });
}

export default async function ThaiIndustryRoute({ params }: Props) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  return <IndustryPage industry={ind} lang={LANG} />;
}
