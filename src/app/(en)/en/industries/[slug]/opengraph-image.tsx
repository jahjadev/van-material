import { notFound } from "next/navigation";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { getIndustry, industries } from "@/data/industries";

const LANG = "en" as const;

/** Prerender a card per industry — see the note in `[family]/opengraph-image.tsx`. */
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const alt = "VAN INTERTRADE";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  return ogCard({
    eyebrowTh: "อุตสาหกรรม",
    eyebrowEn: "INDUSTRIES",
    title: ind.title[LANG],
    subtitle: ind.description[LANG],
  });
}
