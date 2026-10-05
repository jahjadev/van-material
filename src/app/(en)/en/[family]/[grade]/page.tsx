import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GradePage } from "@/components/GradePage";
import { families, getGrade } from "@/data/products";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const LANG = "en" as const;

/** Only grades with their own page in `src/data/products`; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return families.flatMap((f) =>
    f.grades.map((g) => ({ family: f.slug, grade: g.slug })),
  );
}

type Props = { params: Promise<{ family: string; grade: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family: f, grade: g } = await params;
  const found = getGrade(f, g);
  if (!found) return {};
  const { family, grade } = found;
  return pageMeta({
    title: grade.title[LANG],
    description: grade.description[LANG],
    lang: LANG,
    path: `/${family.slug}/${grade.slug}`,
    image: `${SITE_URL}${family.image.src}`,
  });
}

export default async function GradeRoute({ params }: Props) {
  const { family: f, grade: g } = await params;
  const found = getGrade(f, g);
  if (!found) notFound();
  return <GradePage family={found.family} grade={found.grade} lang={LANG} />;
}
