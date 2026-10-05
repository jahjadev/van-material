/**
 * Primary navigation data, shared by the desktop and mobile nav and by the
 * footer link groups. Hrefs are locale-independent (always written the Thai
 * way); `LocaleLink` prefixes `/en` on the English tree.
 *
 * Every route below other than `/`, `/about`, `/contact`, `/industries/...`
 * and `/knowledge` is built by a later task — they intentionally 404 for now.
 */

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
    label: "โลหะหุ้ม (Clad Metal)",
    labelEn: "Clad Metal",
  },
  {
    href: "/electrical-contacts",
    label: "หน้าสัมผัสไฟฟ้า (Electrical Contacts)",
    labelEn: "Electrical Contacts",
  },
];

export const mainNav: NavGroup[] = [
  { label: "สินค้า", labelEn: "Products", children: productLinks },
  {
    label: "อุตสาหกรรม",
    labelEn: "Industries",
    href: "/industries/plastic-mold",
  },
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
    title: "บริษัท",
    titleEn: "Company",
    links: [
      {
        href: "/industries/plastic-mold",
        label: "อุตสาหกรรม",
        labelEn: "Industries",
      },
      { href: "/knowledge", label: "คลังความรู้", labelEn: "Knowledge" },
      { href: "/about", label: "เกี่ยวกับเรา", labelEn: "About" },
      { href: "/contact", label: "ติดต่อเรา", labelEn: "Contact" },
    ],
  },
];
