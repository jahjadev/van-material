/**
 * Primary navigation data, shared by the desktop and mobile nav and by the
 * footer link groups. Hrefs are locale-independent (always written the Thai
 * way); `LocaleLink` prefixes `/en` on the English tree.
 *
 * Every route below exists. `/privacy` is linked from the footer only.
 * There is no `/industries` index page (ruling R19), so "Industries" is a
 * menu of the industry pages, like "Products".
 */

import { industryLabels } from "@/data/products/shared";

/**
 * Industry page slugs in nav order. Labels come from `industryLabels` (the
 * same names the industry pages use). Kept as a slug list rather than
 * importing `src/data/industries.ts` because `Nav` is a client component and
 * must not pull every industry page body into the browser bundle (SKILL.md
 * §7); `industries.ts` fails the build if this list and its own
 * `industries` array ever differ.
 */
export const INDUSTRY_NAV_SLUGS = [
  "plastic-mold",
  "ev",
  "oil-gas",
  "aerospace",
  "automotive",
  "switchgear",
] as const;

export type NavLink = {
  href: string;
  label: string;
  labelEn: string;
  desc?: string;
  descEn?: string;
};

export type NavGroup = {
  label: string;
  labelEn: string;
  href?: string;
  children?: NavLink[];
};

export const productLinks: NavLink[] = [
  {
    href: "/beryllium-copper",
    label: "ทองแดงเบริลเลียม (Beryllium Copper)",
    labelEn: "Beryllium Copper",
  },
  {
    href: "/moldmax",
    label: "MoldMAX",
    labelEn: "MoldMAX",
  },
  {
    href: "/toughmet",
    label: "ToughMet",
    labelEn: "ToughMet",
  },
  {
    href: "/chrome-copper",
    label: "ทองแดงโครเมียม (Chrome Copper)",
    labelEn: "Chrome Copper",
  },
  {
    href: "/standard-copper-alloys",
    label: "ทองแดงผสมมาตรฐาน",
    labelEn: "Standard Copper Alloys",
  },
  {
    href: "/clad-metal",
    label: "โลหะประกบ (Clad Metal)",
    labelEn: "Clad Metal",
  },
  {
    href: "/electrical-contacts",
    label: "หน้าสัมผัสไฟฟ้า (Electrical Contacts)",
    labelEn: "Electrical Contacts",
  },
];

export const industryLinks: NavLink[] = INDUSTRY_NAV_SLUGS.map((slug) => ({
  href: `/industries/${slug}`,
  label: industryLabels[slug].th,
  labelEn: industryLabels[slug].en,
}));

export const mainNav: NavGroup[] = [
  { label: "สินค้า", labelEn: "Products", children: productLinks },
  { label: "อุตสาหกรรม", labelEn: "Industries", children: industryLinks },
  { label: "คลังความรู้", labelEn: "Knowledge", href: "/knowledge" },
  { label: "เกี่ยวกับเรา", labelEn: "About", href: "/about" },
  { label: "ติดต่อเรา", labelEn: "Contact", href: "/contact" },
];

export const footerGroups: { title: string; titleEn: string; links: NavLink[] }[] = [
  {
    title: "สินค้า",
    titleEn: "Products",
    links: productLinks,
  },
  {
    title: "อุตสาหกรรม",
    titleEn: "Industries",
    links: industryLinks,
  },
  {
    title: "บริษัท",
    titleEn: "Company",
    links: [
      { href: "/knowledge", label: "คลังความรู้", labelEn: "Knowledge" },
      { href: "/about", label: "เกี่ยวกับเรา", labelEn: "About" },
      { href: "/contact", label: "ติดต่อเรา", labelEn: "Contact" },
    ],
  },
];
