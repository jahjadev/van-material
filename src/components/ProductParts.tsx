import Image from "next/image";
import type { ReactNode } from "react";
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

/** Solid accent button, the prototype's one call-to-action style. */
export const btnPrimary =
  "arrow-link inline-flex items-center justify-center gap-1 rounded-full bg-accent px-[22px] py-[11px] text-[17px] leading-none text-white transition-colors duration-200 hover:bg-accent-hover hover:text-white";
/** Outlined pill, the second button in an apple.com pair. */
export const btnSecondary =
  "arrow-link inline-flex items-center justify-center gap-1 rounded-full border border-accent px-[21px] py-[10px] text-[17px] leading-none text-link transition-colors duration-200 hover:bg-accent hover:text-white";
/** Text link with a trailing chevron ("Learn more ›"). */
export const linkArrow = "arrow-link inline-flex items-center gap-1 text-[17px] text-link hover:underline";
/** Shared page gutter + max width. */
export const wrap = "mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)]";
/** Section heading (h2) size used below the hero. */
export const h2Class = "m-0 text-[clamp(28px,3.4vw,48px)] leading-[1.1] font-semibold tracking-[-.015em] text-primary";

export function Arrow() {
  return (
    <span aria-hidden className="arrow">
      ›
    </span>
  );
}

/** Visible breadcrumb; the same items feed `breadcrumbLd`. */
export function Breadcrumbs({ items, lang }: { items: Crumb[]; lang: Lang }) {
  return (
    <nav aria-label={lang === "en" ? "Breadcrumb" : "เส้นทางนำทาง"} className="text-[12px] text-secondary">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-primary">{c.name}</span>
            ) : (
              <LocaleLink href={c.path} className="text-secondary hover:text-accent">{c.name}</LocaleLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Hero: H1 + intro on the left, the page's single high-priority image on the
 * right, on the prototype's white-to-grey gradient. `crumbs` is omitted on
 * the home page (no breadcrumb there); `image` is omitted on pages that have
 * no hero picture (contact, privacy).
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
    <section className="border-b border-line bg-[linear-gradient(180deg,#FFFFFF_0%,var(--color-tint-2)_100%)]">
      <div className={`${wrap} py-[clamp(40px,6vw,80px)]`}>
        {crumbs && <Breadcrumbs items={crumbs} lang={lang} />}
        <div
          className={
            image
              ? "mt-6 grid items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[1.1fr_0.9fr]"
              : "mt-6 max-w-3xl"
          }
        >
          <div className="flex min-w-0 flex-col gap-[18px]">
            <p className="eyebrow m-0">{eyebrow}</p>
            <h1 className="m-0 text-[clamp(34px,4.4vw,58px)] leading-[1.18] font-semibold text-primary [text-wrap:balance]">
              {h1}
            </h1>
            <div className="max-w-[580px] text-[18px] leading-[1.7] text-body [&>p]:m-0 [&>p+p]:mt-3">{children}</div>
            {rfqHref && <RfqButtons href={rfqHref} lang={lang} />}
          </div>
          {image && (
            <div className="overflow-hidden rounded-md bg-[#E4E8EE]">
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt[lang]}
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 768px) 520px, 100vw"
                className="aspect-[314/191] w-full object-cover"
              />
            </div>
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

/** Contact links land on the quote form: append `#rfq` unless an anchor is set. */
export const rfqAnchor = (href: string) =>
  href.startsWith("/contact") && !href.includes("#") ? `${href}#rfq` : href;

export function RfqButtons({ href, lang }: { href: string; lang: Lang }) {
  const en = lang === "en";
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-x-7 gap-y-3.5">
      <LocaleLink href={rfqAnchor(href)} className={btnPrimary}>
        {en ? "Request a quote" : "ขอใบเสนอราคา"}
        <Arrow />
      </LocaleLink>
      <a href={`tel:${company.contact.tels[0]}`} className={`${linkArrow} py-3.5`}>
        {en ? "Call" : "โทร"} {company.contact.telsDisplay[0]}
        <Arrow />
      </a>
    </div>
  );
}

/** Two-column bulleted list section (forms, applications). Hidden when empty. */
export function BulletSection({ title, items, lang }: { title: Bi; items: Bi[]; lang: Lang }) {
  if (items.length === 0) return null;
  return (
    <section className="min-w-0">
      <h2 className="m-0 text-[clamp(24px,2.6vw,30px)] font-semibold text-primary">{title[lang]}</h2>
      <ul className="mt-4 border-b border-line">
        {items.map((it) => (
          <li key={it.en} className="border-t border-line py-3.5 text-[17px] leading-relaxed text-body">
            {it[lang]}
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
    <div data-reveal="0" className="mt-16 grid gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
      {forms.length > 0 && (
        <div className="min-w-0">
          <BulletSection title={FORMS} items={forms} lang={lang} />
          <p className="mt-3 text-[14px] text-secondary">{FORMS_NOTE[lang]}</p>
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
    <section data-reveal="0" className="mt-20 border-t border-line pt-[clamp(56px,7vw,96px)]">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-3.5 text-center">
        <h2 className="m-0 text-[clamp(30px,3.6vw,46px)] leading-[1.25] font-semibold text-primary [text-wrap:balance]">
          {title ?? (en ? `Need a price for ${subject}?` : `ต้องการราคา ${subject}?`)}
        </h2>
        <p className="m-0 max-w-2xl text-[18px] text-secondary">
          {body ??
            (en
              ? "Tell us the grade, form, size and quantity, and we will send a quotation."
              : "แจ้งเกรด รูปแบบ ขนาด และจำนวนที่ต้องการ แล้วเราจะส่งใบเสนอราคาให้")}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <LocaleLink href={rfqAnchor(href)} className={btnPrimary}>
            {en ? "Request a quote" : "ขอใบเสนอราคา"}
            <Arrow />
          </LocaleLink>
          <a href={company.contact.lineUrl} target="_blank" rel="noopener noreferrer" className={linkArrow}>
            LINE {company.contact.lineId}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
