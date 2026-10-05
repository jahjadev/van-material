import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { company } from "@/data/company";
import type { Bi, ProductFamily } from "@/data/products";
import type { Lang } from "@/lib/locale";

/*
 * Page building blocks shared by the product family, grade, industry, home,
 * about and contact pages: breadcrumbs, the hero with its single
 * high-priority image, RFQ buttons, bulleted sections and the closing RFQ
 * band. Product-specific assembly (ProductFamilyPage, productPageLd) stays
 * in ProductFamilyPage.tsx.
 */

export const HOME: Bi = { th: "หน้าแรก", en: "Home" };

export type Crumb = { name: string; path: string };

/** The one hero image a page carries (rendered with fetchPriority="high"). */
export type HeroImage = { src: string; width: number; height: number; alt: Bi };

/** Visible breadcrumb; the same items feed `breadcrumbLd`. */
export function Breadcrumbs({ items, lang }: { items: Crumb[]; lang: Lang }) {
  return (
    <nav aria-label={lang === "en" ? "Breadcrumb" : "เส้นทางนำทาง"} className="text-[13px] text-secondary">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-primary">{c.name}</span>
            ) : (
              <LocaleLink href={c.path} className="hover:text-accent">{c.name}</LocaleLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Hero: H1 + intro on the left, the page's single high-priority image on the
 * right. `crumbs` is omitted on the home page (no breadcrumb there); `image`
 * is omitted on pages that have no hero picture (contact, privacy).
 */
export function PageHero({
  lang,
  crumbs,
  eyebrow,
  h1,
  children,
  rfqHref,
  image,
}: {
  lang: Lang;
  crumbs?: Crumb[];
  eyebrow: string;
  h1: string;
  children: ReactNode;
  /** Shows the RFQ + phone buttons under the intro when set. */
  rfqHref?: string;
  image?: HeroImage;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
        {crumbs && <Breadcrumbs items={crumbs} lang={lang} />}
        <div
          className={
            image
              ? "mt-6 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12"
              : "mt-6 max-w-3xl"
          }
        >
          <div className="min-w-0">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
            <h1 className="mt-2 text-3xl leading-tight font-bold text-primary md:text-[40px]">{h1}</h1>
            {children}
            {rfqHref && <RfqButtons href={rfqHref} lang={lang} />}
          </div>
          {image && (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt[lang]}
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 768px) 460px, 100vw"
              className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}

/** Product hero: `PageHero` with the family's image and the RFQ buttons. */
export function ProductHero({
  family,
  lang,
  crumbs,
  eyebrow,
  h1,
  children,
  rfqHref,
}: {
  family: ProductFamily;
  lang: Lang;
  crumbs: Crumb[];
  eyebrow: string;
  h1: string;
  children: ReactNode;
  rfqHref: string;
}) {
  return (
    <PageHero lang={lang} crumbs={crumbs} eyebrow={eyebrow} h1={h1} rfqHref={rfqHref} image={family.image}>
      {children}
    </PageHero>
  );
}

export function RfqButtons({ href, lang }: { href: string; lang: Lang }) {
  const en = lang === "en";
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <LocaleLink
        href={href}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white hover:bg-primary"
      >
        {en ? "Request a quote" : "ขอใบเสนอราคา"}
        <ArrowRight className="size-4" aria-hidden />
      </LocaleLink>
      <a
        href={`tel:${company.contact.tels[0]}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-primary hover:border-accent"
      >
        <Phone className="size-4" aria-hidden />
        {company.contact.telsDisplay[0]}
      </a>
    </div>
  );
}

/** Two-column bulleted list section (forms, applications). Hidden when empty. */
export function BulletSection({ title, items, lang }: { title: Bi; items: Bi[]; lang: Lang }) {
  if (items.length === 0) return null;
  return (
    <section className="min-w-0">
      <h2 className="text-xl font-bold text-primary md:text-2xl">{title[lang]}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.en} className="flex gap-3 leading-relaxed text-secondary">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{it[lang]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const FORMS: Bi = { th: "รูปแบบสินค้า", en: "Product forms" };
export const APPLICATIONS: Bi = { th: "งานที่ใช้", en: "Typical applications" };
export const FORMS_NOTE: Bi = {
  th: "ขนาดและรูปแบบที่จัดหาได้ยืนยันในใบเสนอราคา",
  en: "Available sizes and forms are confirmed in your quotation.",
};

export function FormsAndApplications({
  forms,
  applications,
  lang,
}: {
  forms: Bi[];
  applications: Bi[];
  lang: Lang;
}) {
  if (forms.length === 0 && applications.length === 0) return null;
  return (
    <div className="mt-14 grid gap-10 md:grid-cols-2">
      {forms.length > 0 && (
        <div className="min-w-0">
          <BulletSection title={FORMS} items={forms} lang={lang} />
          <p className="mt-3 text-sm text-secondary">{FORMS_NOTE[lang]}</p>
        </div>
      )}
      <BulletSection title={APPLICATIONS} items={applications} lang={lang} />
    </div>
  );
}

/**
 * Closing call-to-action band. `title`/`body` override the default
 * "Need a price for <subject>?" copy (used by the home and industry pages).
 */
export function RfqBand({
  href,
  lang,
  subject,
  title,
  body,
}: {
  href: string;
  lang: Lang;
  subject: string;
  title?: string;
  body?: string;
}) {
  const en = lang === "en";
  return (
    <section className="mt-16 rounded-2xl bg-near-black px-6 py-10 text-on-dark md:px-10">
      <h2 className="text-xl font-bold md:text-2xl">
        {title ?? (en ? `Need a price for ${subject}?` : `ต้องการราคา ${subject}?`)}
      </h2>
      <p className="mt-3 max-w-2xl text-on-dark-2">
        {body ??
          (en
            ? "Tell us the grade, form, size and quantity, and we will send a quotation."
            : "แจ้งเกรด รูปแบบ ขนาด และจำนวนที่ต้องการ แล้วเราจะส่งใบเสนอราคาให้")}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LocaleLink
          href={href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-light"
        >
          {en ? "Request a quote" : "ขอใบเสนอราคา"}
          <ArrowRight className="size-4" aria-hidden />
        </LocaleLink>
        <a
          href={company.contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-full border border-line-dark px-5 text-sm font-semibold hover:bg-white/10"
        >
          LINE {company.contact.lineId}
        </a>
      </div>
    </section>
  );
}
