import { ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd, faqPageLd, organizationLd, websiteLd } from "@/components/JsonLd";
import { PageHero, RfqBand, type HeroImage } from "@/components/ProductParts";
import { company } from "@/data/company";
import { industries } from "@/data/industries";
import { families, getFamily, type Bi, type Faq } from "@/data/products";
import type { Lang } from "@/lib/locale";

/*
 * Home page. "Materion distributor" wording follows the client's own legacy
 * copy ("ตัวแทนจำหน่ายอย่างเป็นทางการของ Materion ในประเทศไทย"); no
 * "exclusive/only/sole" claim and no partnership year (company.materion.since
 * is null). FAQ answers are generated from company.ts and product data so
 * they cannot drift from what the rest of the site states.
 */

export const homeMeta: Record<Lang, { title: string; description: string }> = {
  th: {
    title: "ตัวแทนจำหน่าย Materion ประเทศไทย โลหะผสมทองแดง",
    description:
      "แวน อินเตอร์เทรด (ก่อตั้ง พ.ศ. 2529) ตัวแทนจำหน่าย Materion ในประเทศไทย: Beryllium Copper, MoldMAX และ ToughMet สำหรับแม่พิมพ์และอุตสาหกรรม ขอใบเสนอราคาได้",
  },
  en: {
    title: "Materion Distributor Thailand: Copper Alloys",
    description:
      "VAN INTERTRADE (est. 1986), a Materion distributor in Thailand: beryllium copper, MoldMAX and ToughMet for molds and industry, plus contacts and clad metal.",
  },
};

const heroImage: HeroImage = {
  src: "/images/home-hero.webp",
  width: 1024,
  height: 768,
  alt: {
    th: "แท่งโลหะผสมทองแดงกลมหลายแท่งลอยอยู่บนพื้นหลังสีขาว",
    en: "Several round copper alloy rods floating against a white background",
  },
};

const t = company.contact;

/** "a, b and c" / "a, b และ c" */
function joinList(items: string[], lang: Lang): string {
  if (items.length <= 1) return items.join("");
  const and = lang === "en" ? " and " : " และ ";
  return `${items.slice(0, -1).join(", ")}${and}${items[items.length - 1]}`;
}

function homeFaqs(): Faq[] {
  const materion = families.filter((f) => f.brand === "Materion");
  const materionList = (lang: Lang) =>
    joinList(
      materion.map((f) => `${f.keyword} (${f.grades.map((g) => g.code).join(", ")})`),
      lang,
    );

  const becu = getFamily("beryllium-copper")!;
  const tm = getFamily("toughmet")!;
  const forms = (items: Bi[], lang: Lang) =>
    joinList(items.map((f) => (lang === "en" ? f.en.toLowerCase() : f.th)), lang);

  return [
    {
      q: { th: "แวน อินเตอร์เทรด คือใคร?", en: "Who is VAN INTERTRADE?" },
      a: {
        th: `${company.legalNameTh} (${company.legalNameEn}) เป็นบริษัทในกรุงเทพฯ ก่อตั้งเมื่อ พ.ศ. ${company.foundedYearBE} และเป็นตัวแทนจำหน่าย Materion ในประเทศไทย จัดหาโลหะผสมทองแดงและวัสดุแม่พิมพ์ให้อุตสาหกรรมไทย`,
        en: `${company.legalNameEn} is a Bangkok company founded in ${company.foundedYearCE} and a Materion distributor in Thailand, supplying copper alloys and mold materials to Thai industry.`,
      },
    },
    {
      q: {
        th: "แวน อินเตอร์เทรด จำหน่ายสินค้า Materion อะไรบ้าง?",
        en: "Which Materion products does VAN INTERTRADE supply?",
      },
      a: {
        th: `${materionList("th")} นอกจากนี้ยังมีหน้าสัมผัสไฟฟ้าของ Longsun ทองแดงโครเมียม โลหะประกบ และโลหะผสมทองแดงมาตรฐาน`,
        en: `${materionList("en")}. VAN INTERTRADE also supplies Longsun electrical contacts, chrome copper, clad metal and standard copper alloys.`,
      },
    },
    {
      q: { th: "มีวัสดุในรูปแบบใดบ้าง?", en: "In what forms are the materials available?" },
      a: {
        th: `Materion ผลิต Beryllium Copper เป็น${forms(becu.forms, "th")} และผลิต ToughMet เป็น${forms(tm.forms, "th")} ขนาดและรูปแบบที่จัดหาได้ยืนยันในใบเสนอราคา`,
        en: `Materion produces beryllium copper as ${forms(becu.forms, "en")}, and ToughMet as ${forms(tm.forms, "en")}. Available sizes and forms are confirmed in your quotation.`,
      },
    },
    {
      q: { th: "ขอใบเสนอราคาได้อย่างไร?", en: "How do I get a quote?" },
      a: {
        th: `แจ้งเกรด รูปแบบ ขนาด และจำนวนที่ต้องการผ่านแบบฟอร์มขอใบเสนอราคาในหน้าติดต่อเรา โทร ${t.telsDisplay[0]} LINE ${t.lineId} หรืออีเมล ${t.email} ราคาเสนอเป็นใบเสนอราคาต่อครั้ง`,
        en: `Send the grade, form, size and quantity through the quote request form on the contact page, call ${t.telsDisplay[0]}, message LINE ${t.lineId} or email ${t.email}. Prices are quoted per enquiry.`,
      },
    },
  ];
}

const why: { title: Bi; body: Bi }[] = [
  {
    title: { th: `ก่อตั้งเมื่อ พ.ศ. ${company.foundedYearBE}`, en: `Founded in ${company.foundedYearCE}` },
    body: {
      th: `${company.legalNameTh} ก่อตั้งในกรุงเทพฯ เมื่อ พ.ศ. ${company.foundedYearBE}`,
      en: `${company.legalNameEn} was founded in Bangkok in ${company.foundedYearCE}.`,
    },
  },
  {
    title: { th: "ตัวแทนจำหน่าย Materion", en: "Materion distributor" },
    body: {
      th: "จำหน่าย Beryllium Copper, MoldMAX และ ToughMet ของ Materion ในประเทศไทย",
      en: "Supplies Materion beryllium copper, MoldMAX and ToughMet in Thailand.",
    },
  },
  {
    title: { th: "ข้อมูลเทคนิคพร้อมแหล่งอ้างอิง", en: "Sourced technical data" },
    body: {
      th: "ทุกค่าทางเทคนิคบนเว็บไซต์นี้ระบุแหล่งที่มาที่ผู้ผลิตเผยแพร่ ค่าที่ไม่มีแหล่งอ้างอิงจะไม่ถูกเผยแพร่",
      en: "Every property value on this site links to the producer page it comes from; values without a source are not published.",
    },
  },
  {
    title: { th: "ราคาตามใบเสนอราคา", en: "Quoted per enquiry" },
    body: {
      th: "ราคาขึ้นกับเกรด รูปแบบ ขนาด และจำนวน แจ้งรายละเอียดแล้วทีมงานจะเสนอราคาให้",
      en: "Prices depend on grade, form, size and quantity. Send the details and we will quote.",
    },
  },
];

export function HomePage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const faqs = homeFaqs();

  return (
    <>
      <JsonLd
        data={[
          organizationLd(lang),
          websiteLd(lang),
          faqPageLd(faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }))),
        ]}
      />
      <PageHero
        lang={lang}
        eyebrow={en ? `VAN INTERTRADE · Est. ${company.foundedYearCE}` : `แวน อินเตอร์เทรด · ก่อตั้ง พ.ศ. ${company.foundedYearBE}`}
        h1={
          en
            ? "Materion Distributor in Thailand: Beryllium Copper, MoldMAX, ToughMet"
            : "ตัวแทนจำหน่าย Materion ในประเทศไทย: Beryllium Copper, MoldMAX, ToughMet"
        }
        rfqHref="/contact#rfq"
        image={heroImage}
      >
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">
          {en
            ? "VAN INTERTRADE is a Materion distributor in Thailand. We supply beryllium copper, MoldMAX mold alloys and ToughMet, along with chrome copper, clad metal, Longsun electrical contacts and standard copper alloys, for mold making and manufacturing. Prices are by quotation."
            : "แวน อินเตอร์เทรด เป็นตัวแทนจำหน่าย Materion ในประเทศไทย จัดหา Beryllium Copper, MoldMAX สำหรับแม่พิมพ์ และ ToughMet รวมถึงทองแดงโครเมียม โลหะประกบ หน้าสัมผัสไฟฟ้า Longsun และโลหะผสมทองแดงมาตรฐาน สำหรับงานแม่พิมพ์และอุตสาหกรรมการผลิต ราคาตามใบเสนอราคา"}
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <section aria-labelledby="products-heading">
          <h2 id="products-heading" className="text-xl font-bold text-primary md:text-2xl">
            {en ? "Product lines" : "กลุ่มสินค้า"}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((f) => (
              <li key={f.slug}>
                <LocaleLink
                  href={`/${f.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  {f.brand !== "VAN INTERTRADE" && (
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-accent">{f.brand}</span>
                  )}
                  <span className="mt-1 text-lg font-bold text-primary group-hover:text-accent">{f.name[lang]}</span>
                  <span className="mt-2 leading-relaxed text-secondary">{f.description[lang]}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {en ? "View" : "ดูรายละเอียด"}
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="industries-heading" className="mt-14">
          <h2 id="industries-heading" className="text-xl font-bold text-primary md:text-2xl">
            {en ? "Industries we supply" : "อุตสาหกรรมที่เราจัดหาวัสดุให้"}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <LocaleLink
                  href={`/industries/${ind.slug}`}
                  className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-line bg-surface px-5 py-3 font-semibold text-primary hover:border-accent hover:text-accent"
                >
                  {ind.name[lang]}
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </LocaleLink>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="why-heading" className="mt-14">
          <h2 id="why-heading" className="text-xl font-bold text-primary md:text-2xl">
            {en ? "Why VAN INTERTRADE" : "ทำไมต้อง แวน อินเตอร์เทรด"}
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title.en} className="rounded-xl border border-line bg-surface p-5">
                <dt className="font-semibold text-primary">{w.title[lang]}</dt>
                <dd className="mt-2 leading-relaxed text-secondary">{w.body[lang]}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm">
            <LocaleLink href="/about" className="font-semibold text-accent hover:text-primary">
              {en ? "About VAN INTERTRADE" : "เกี่ยวกับเรา"}
            </LocaleLink>
          </p>
        </section>

        <FaqList faqs={faqs} lang={lang} />

        <RfqBand
          href="/contact#rfq"
          lang={lang}
          subject=""
          title={en ? "Request a quotation" : "ขอใบเสนอราคา"}
          body={
            en
              ? "Tell us the product, grade, form, size and quantity, and we will send a quotation."
              : "แจ้งสินค้า เกรด รูปแบบ ขนาด และจำนวนที่ต้องการ แล้วเราจะส่งใบเสนอราคาให้"
          }
        />
      </div>
    </>
  );
}
