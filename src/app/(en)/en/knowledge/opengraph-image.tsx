import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { knowledgeMeta, KNOWLEDGE } from "@/data/articles";

const LANG = "en" as const;

export const alt = `${knowledgeMeta[LANG].title} — VAN INTERTRADE`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrowTh: KNOWLEDGE.th,
    eyebrowEn: KNOWLEDGE.en,
    title: knowledgeMeta[LANG].title,
    subtitle: knowledgeMeta[LANG].description,
  });
}
