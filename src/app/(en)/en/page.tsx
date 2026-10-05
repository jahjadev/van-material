import type { Metadata } from "next";
import { HomePage, homeMeta } from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

const LANG = "en" as const;

export const metadata: Metadata = pageMeta({
  ...homeMeta[LANG],
  lang: LANG,
  path: "/",
});

export default function EnglishHomePage() {
  return <HomePage lang={LANG} />;
}
