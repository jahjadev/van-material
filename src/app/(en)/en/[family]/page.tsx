import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductFamilyPage } from "@/components/ProductFamilyPage";
import { families, getFamily } from "@/data/products";
import { pageMeta } from "@/lib/seo";

const LANG = "en" as const;

/** Only the families in `src/data/products`; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return families.map((f) => ({ family: f.slug }));
}

type Props = { params: Promise<{ family: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const family = getFamily((await params).family);
  if (!family) return {};
  return pageMeta({
    title: family.title[LANG],
    description: family.description[LANG],
    lang: LANG,
    path: `/${family.slug}`,
  });
}

export default async function FamilyPage({ params }: Props) {
  const family = getFamily((await params).family);
  if (!family) notFound();
  return <ProductFamilyPage family={family} lang={LANG} />;
}
