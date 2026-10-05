import type { Metadata } from "next";
import { PrivacyPage, privacyMeta } from "@/components/pages/PrivacyPage";
import { pageMeta } from "@/lib/seo";

const LANG = "th" as const;

export const metadata: Metadata = pageMeta({
  ...privacyMeta[LANG],
  lang: LANG,
  path: "/privacy",
});

export default function ThaiPrivacyRoute() {
  return <PrivacyPage lang={LANG} />;
}
