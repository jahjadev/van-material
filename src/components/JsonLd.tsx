import { company } from "@/data/company";
import { SITE_URL } from "@/lib/site";
import { absUrl, HREFLANG, type Lang } from "@/lib/locale";

/** Inline a JSON-LD block (one schema.org node, or an array of them). */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a value containing "</script>" can't break out of the
      // inline script — safe-by-default regardless of what data is passed.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Absolute URL of the brand logo — used as the Organization logo in rich
 *  results (Google wants an absolute ImageObject/image URL). */
const LOGO_URL = `${SITE_URL}/logo.png`;

/**
 * Organization node, site-wide. One `@id` across both locales — there is
 * one company, and every `provider`/`publisher` reference elsewhere resolves
 * here. Only the postal address prose is localized; identity facts (phone,
 * founding date) are language-neutral.
 *
 * `sameAs` includes only `company.url` (vaninter.com, the parent company's
 * own verified site) per controller ruling — no Facebook/LinkedIn, those
 * are unverified.
 */
export const organizationLd = (lang: Lang) => {
  const en = lang === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.legalNameEn,
    alternateName: company.legalNameTh,
    url: SITE_URL,
    logo: LOGO_URL,
    telephone: company.contact.tels[0],
    foundingDate: "1986",
    address: {
      "@type": "PostalAddress",
      streetAddress: en
        ? "59/349-51 Soi Ramkhamhaeng 140, Ramkhamhaeng Rd."
        : "59/349-51 ซอยรามคำแหง 140 ถนนรามคำแหง",
      addressLocality: en
        ? "Saphan Sung Sub-district, Saphan Sung District"
        : "แขวงสะพานสูง เขตสะพานสูง",
      addressRegion: en ? "Bangkok" : "กรุงเทพมหานคร",
      postalCode: "10240",
      addressCountry: "TH",
    },
    sameAs: [company.url],
  };
};

/**
 * WebSite node — ties the domain to the Organization for the knowledge
 * graph. Each language gets its own `@id`/`url` since `inLanguage` differs
 * per node; reusing one `@id` across both would assert two `inLanguage`
 * values for the same node.
 */
export const websiteLd = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website${lang === "en" ? "-en" : ""}`,
  url: absUrl("/", lang),
  name: company.legalNameEn,
  alternateName: company.legalNameTh,
  inLanguage: HREFLANG[lang],
  publisher: { "@id": `${SITE_URL}/#organization` },
});

/** BreadcrumbList for nested routes — enables breadcrumb rich snippets. */
export const breadcrumbLd = (
  items: { name: string; path: string }[],
  lang: Lang,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absUrl(item.path, lang),
  })),
});

/**
 * Product node for a distributed material grade. No `offers` — this is a
 * quote-only distributor with no published prices, and Google flags a
 * Product with a fake Offer.
 */
export const productLd = (
  p: {
    name: string;
    description: string;
    path: string;
    image: string;
    brand: string;
    sku?: string;
  },
  lang: Lang,
) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  image: p.image,
  url: absUrl(p.path, lang),
  inLanguage: HREFLANG[lang],
  brand: { "@type": "Brand", name: p.brand },
  ...(p.sku ? { sku: p.sku } : {}),
});

/**
 * FAQPage — the Q&A passed here MUST also be rendered as visible content on
 * the page (Google requirement); callers pass the same list they display.
 */
export const faqPageLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
});

/** Article node for a knowledge-base entry. */
export const articleLd = (
  a: {
    title: string;
    description: string;
    path: string;
    image: string;
    date: string;
    modified?: string;
  },
  lang: Lang,
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  image: a.image,
  url: absUrl(a.path, lang),
  inLanguage: HREFLANG[lang],
  datePublished: a.date,
  dateModified: a.modified ?? a.date,
  publisher: { "@id": `${SITE_URL}/#organization` },
});
