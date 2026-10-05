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
 * The one legal entity behind this site and vaninter.com. Its `@id` is the
 * parent company's own Organization `@id` on vaninter.com, so both sites
 * describe the SAME node instead of two look-alike companies. Every
 * publisher/author/mainEntity reference on this site points here.
 */
export const ORG_ID = `${company.url}/#organization`;

/** WebSite node id for this domain (one node; both locales are on it). */
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Organization node, rendered site-wide by `RootShell` (both locales). One
 * `@id` across both trees; only the postal-address prose is localized.
 * `url` is the parent company's site (`company.url`), which is why there
 * is no `sameAs`. Contact details are a `contactPoint` (sales, Thai and
 * English, office hours from company.ts) — there is no separate
 * LocalBusiness node anywhere on the site.
 */
export const organizationLd = (lang: Lang) => {
  const en = lang === "en";
  const c = company.contact;
  const p = c.postal;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.legalNameEn,
    alternateName: company.legalNameTh,
    url: company.url,
    logo: LOGO_URL,
    telephone: c.tels[0],
    foundingDate: String(company.foundedYearCE),
    address: {
      "@type": "PostalAddress",
      streetAddress: en ? p.streetEn : p.streetTh,
      addressLocality: en ? p.localityEn : p.localityTh,
      addressRegion: en ? p.regionEn : p.regionTh,
      postalCode: p.postalCode,
      addressCountry: p.country,
    },
    location: {
      "@type": "Place",
      geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
      hasMap: `https://www.google.com/maps?q=${c.geo.lat},${c.geo.lng}`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: c.tels[0],
      email: c.email,
      contactType: "sales",
      availableLanguage: ["th", "en"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: c.hoursSpec.days,
        opens: c.hoursSpec.opens,
        closes: c.hoursSpec.closes,
      },
    },
  };
};

/**
 * WebSite node for this domain, rendered site-wide next to the Organization.
 * One `@id` and one `url` (the domain root) for both locales, so the node
 * is identical on every page; `inLanguage` lists both languages.
 */
export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: company.legalNameEn,
  alternateName: company.legalNameTh,
  inLanguage: [HREFLANG.th, HREFLANG.en],
  publisher: { "@id": ORG_ID },
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
    /** Producer; when absent no `brand` is emitted (no unsourced claim). */
    brand?: string;
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
  ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
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

/**
 * Article node for a knowledge-base entry. Author and publisher are both the
 * Organization (`ORG_ID`, rendered site-wide by RootShell): the articles are
 * written by the company, not a named person.
 */
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
  mainEntityOfPage: absUrl(a.path, lang),
  inLanguage: HREFLANG[lang],
  datePublished: a.date,
  dateModified: a.modified ?? a.date,
  author: {
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.legalNameEn,
    url: company.url,
  },
  publisher: { "@id": ORG_ID },
  isPartOf: { "@id": WEBSITE_ID },
});
