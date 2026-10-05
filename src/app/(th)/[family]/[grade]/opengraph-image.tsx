import { notFound } from "next/navigation";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { families, getGrade } from "@/data/products";

const LANG = "th" as const;

/** Prerender a card per grade — see the note in `[family]/opengraph-image.tsx`. */
export function generateStaticParams() {
  return families.flatMap((f) =>
    f.grades.map((g) => ({ family: f.slug, grade: g.slug })),
  );
}

export const alt = "VAN INTERTRADE";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ family: string; grade: string }>;
}) {
  const { family: f, grade: g } = await params;
  const found = getGrade(f, g);
  if (!found) notFound();
  const { family, grade } = found;

  return ogCard({
    eyebrowTh: family.name.th,
    eyebrowEn: family.name.en,
    title: grade.title[LANG],
    subtitle: grade.description[LANG],
  });
}
