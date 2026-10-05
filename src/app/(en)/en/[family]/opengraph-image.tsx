import { notFound } from "next/navigation";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { families, getFamily } from "@/data/products";

const LANG = "en" as const;

/**
 * Prerender a card per family — leaving this route dynamic would break the
 * font `readFile()` in `ogCard.tsx` in production (see the module comment
 * and `next.config.ts`'s `outputFileTracingIncludes`).
 */
export function generateStaticParams() {
  return families.map((f) => ({ family: f.slug }));
}

// `alt` must be a static export, so it stays generic here while the card
// itself is per-family.
export const alt = "VAN INTERTRADE";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ family: string }>;
}) {
  const { family: slug } = await params;
  const family = getFamily(slug);
  if (!family) notFound();

  return ogCard({
    eyebrowTh: family.name.th,
    eyebrowEn: family.name.en,
    title: family.title[LANG],
    subtitle: family.description[LANG],
  });
}
