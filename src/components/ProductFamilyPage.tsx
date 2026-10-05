import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { PropertyTable } from "@/components/PropertyTable";
import {
  JsonLd,
  breadcrumbLd,
  faqPageLd,
  productLd,
} from "@/components/JsonLd";
import { company } from "@/data/company";
import {
  industryLabels,
  type Bi,
  type Faq,
  type ProductFamily,
} from "@/data/products";
import { SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/locale";

/* ------------------------------------------------------------------ */
/* Pieces shared with GradePage                                        */
/* ------------------------------------------------------------------ */

export const HOME: Bi = { th: "หน้าแรก", en: "Home" };

export type Crumb = { name: string; path: string };

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

/** Build the page's JSON-LD: BreadcrumbList + Product (+ FAQPage). */
export function productPageLd({
  crumbs,
  lang,
  name,
  description,
  path,
  image,
  brand,
  sku,
  faqs,
}: {
  crumbs: Crumb[];
  lang: Lang;
  name: string;
  description: string;
  path: string;
  image: string;
  brand: string;
  sku?: string;
  faqs: Faq[];
}) {
  return [
    breadcrumbLd(crumbs, lang),
    productLd({ name, description, path, image: `${SITE_URL}${image}`, brand, sku }, lang),
    ...(faqs.length
      ? [faqPageLd(faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))]
      : []),
  ];
}

/** Hero: H1 + intro on the left, the page's single high-priority image on the right. */
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
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs items={crumbs} lang={lang} />
        <div className="mt-6 grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
            <h1 className="mt-2 text-3xl leading-tight font-bold text-primary md:text-[40px]">{h1}</h1>
            {children}
            <RfqButtons href={rfqHref} lang={lang} />
          </div>
          <Image
            src={family.image.src}
            width={family.image.width}
            height={family.image.height}
            alt={family.image.alt[lang]}
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 768px) 460px, 100vw"
            className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
          />
        </div>
      </div>
    </section>
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

/** Closing call-to-action band. */
export function RfqBand({ href, lang, subject }: { href: string; lang: Lang; subject: string }) {
  const en = lang === "en";
  return (
    <section className="mt-16 rounded-2xl bg-near-black px-6 py-10 text-on-dark md:px-10">
      <h2 className="text-xl font-bold md:text-2xl">
        {en ? `Need a price for ${subject}?` : `ต้องการราคา ${subject}?`}
      </h2>
      <p className="mt-3 max-w-2xl text-on-dark-2">
        {en
          ? "Tell us the grade, form, size and quantity, and we will send a quotation."
          : "แจ้งเกรด รูปแบบ ขนาด และจำนวนที่ต้องการ แล้วเราจะส่งใบเสนอราคาให้"}
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

/* ------------------------------------------------------------------ */
/* Family page                                                         */
/* ------------------------------------------------------------------ */

export function familyCrumbs(family: ProductFamily, lang: Lang): Crumb[] {
  return [
    { name: HOME[lang], path: "/" },
    { name: family.name[lang], path: `/${family.slug}` },
  ];
}

export function ProductFamilyPage({ family, lang }: { family: ProductFamily; lang: Lang }) {
  const en = lang === "en";
  const crumbs = familyCrumbs(family, lang);
  const rfqHref = `/contact?product=${family.slug}`;
  const propertyRows = family.grades.flatMap((g) =>
    g.properties.map((prop) => ({ grade: g.code, prop })),
  );

  return (
    <>
      <JsonLd
        data={productPageLd({
          crumbs,
          lang,
          name: family.h1[lang],
          description: family.description[lang],
          path: `/${family.slug}`,
          image: family.image.src,
          brand: family.brand,
          faqs: family.faqs,
        })}
      />
      <ProductHero
        family={family}
        lang={lang}
        crumbs={crumbs}
        eyebrow={family.brand === "VAN INTERTRADE" ? family.keyword : `${family.brand} · ${family.keyword}`}
        h1={family.h1[lang]}
        rfqHref={rfqHref}
      >
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">{family.summary[lang]}</p>
      </ProductHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        {family.body.length > 0 && (
          <div className="max-w-3xl space-y-4 leading-relaxed text-secondary">
            {family.body.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
        )}

        {family.grades.length > 0 && (
          <section aria-labelledby="grades-heading" className="mt-14">
            <h2 id="grades-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? `${family.keyword} grades` : `เกรด ${family.keyword}`}
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {family.grades.map((g) => (
                <li key={g.slug}>
                  <LocaleLink
                    href={`/${family.slug}/${g.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
                  >
                    <span className="text-lg font-bold text-primary group-hover:text-accent">{g.code}</span>
                    {g.aliases.length > 0 && (
                      <span className="mt-0.5 text-[13px] text-secondary">{g.aliases.slice(0, 2).join(" · ")}</span>
                    )}
                    <span className="mt-3 leading-relaxed text-secondary">{g.tagline[lang]}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      {en ? `View ${g.code}` : `ดู ${g.code}`}
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        {family.variants.length > 0 && (
          <section aria-labelledby="variants-heading" className="mt-14">
            <h2 id="variants-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? "Types and materials" : "ชนิดและวัสดุ"}
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {family.variants.map((v) => (
                <div key={v.name.en} className="rounded-xl border border-line bg-surface p-5">
                  <dt className="font-semibold text-primary">{v.name[lang]}</dt>
                  <dd className="mt-2 leading-relaxed text-secondary">{v.desc[lang]}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <PropertyTable
          rows={propertyRows}
          lang={lang}
          heading={{ th: "เปรียบเทียบค่าทางเทคนิคตามที่ผู้ผลิตเผยแพร่", en: "Published properties by grade" }}
          note={{
            th: "ค่าทั่วไปตามที่ผู้ผลิตเผยแพร่ ระบุแหล่งที่มาทุกค่า ดูเงื่อนไข (temper, รูปแบบ) ในหน้าของแต่ละเกรด",
            en: "Typical values as published by the producer, each with its source. See each grade's page for the temper and form they apply to.",
          }}
        />

        <FormsAndApplications forms={family.forms} applications={family.applications} lang={lang} />

        {family.industries.length > 0 && (
          <section aria-labelledby="industries-heading" className="mt-14">
            <h2 id="industries-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? "Industries" : "อุตสาหกรรมที่ใช้"}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {family.industries.map((slug) => (
                <li key={slug}>
                  <LocaleLink
                    href={`/industries/${slug}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm text-primary hover:border-accent hover:text-accent"
                  >
                    {industryLabels[slug]?.[lang] ?? slug}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <FaqList faqs={family.faqs} lang={lang} />

        <RfqBand href={rfqHref} lang={lang} subject={family.keyword} />
      </div>
    </>
  );
}
