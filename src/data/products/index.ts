import type { Grade, ProductFamily } from "./types";
import { berylliumCopper } from "./beryllium-copper";
import { moldmax } from "./moldmax";
import { toughmet } from "./toughmet";
import { chromeCopper } from "./chrome-copper";
import { standardCopperAlloys } from "./standard-copper-alloys";
import { cladMetal } from "./clad-metal";
import { electricalContacts } from "./electrical-contacts";

export type { Bi, Faq, Grade, ProductFamily, Property, Variant } from "./types";
export { industryLabels } from "./shared";

/** All product families, in nav order (matches `src/data/nav.ts`). */
export const families: ProductFamily[] = [
  berylliumCopper,
  moldmax,
  toughmet,
  chromeCopper,
  standardCopperAlloys,
  cladMetal,
  electricalContacts,
];

export function getFamily(slug: string): ProductFamily | undefined {
  return families.find((f) => f.slug === slug);
}

export function getGrade(
  family: string,
  grade: string,
): { family: ProductFamily; grade: Grade } | undefined {
  const f = getFamily(family);
  const g = f?.grades.find((x) => x.slug === grade);
  return f && g ? { family: f, grade: g } : undefined;
}
