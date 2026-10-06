import Image from "next/image";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { ArticleCards } from "@/components/ArticlePage";
import { HeroArt } from "@/components/Motion";
import { JsonLd, faqPageLd } from "@/components/JsonLd";
import { Arrow, RfqBand, btnPrimary, h2Class, linkArrow, wrap, type HeroImage } from "@/components/ProductParts";
import { articles } from "@/data/articles";
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
      `แวน อินเตอร์เทรด (ก่อตั้ง พ.ศ. ${company.foundedYearBE}) ตัวแทนจำหน่าย Materion ในประเทศไทย: Beryllium Copper, MoldMAX และ ToughMet สำหรับแม่พิมพ์และอุตสาหกรรม ขอใบเสนอราคาได้`,
  },
  en: {
    title: "Materion Distributor Thailand: Copper Alloys",
    description:
      `VAN INTERTRADE (est. ${company.foundedYearCE}), a Materion distributor in Thailand: beryllium copper, MoldMAX and ToughMet for molds and industry, plus contacts and clad metal.`,
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
      th: "ทุกค่าทางเทคนิคบนเว็บไซต์นี้ลิงก์ไปยังแหล่งที่มาที่เผยแพร่ค่านั้น ค่าที่ไม่มีแหล่งอ้างอิงจะไม่ถูกเผยแพร่",
      en: "Every property value on this site links to its published source; values without a source are not published.",
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

const choose = { th: ["เลือกวัสดุ", "ให้ตรงกับงาน"], en: ["Choose the material", "that fits the job"] };

const strip: { t: Bi; s: Bi; href: string }[] = [
  {
    t: { th: "ความรู้ด้านวัสดุ", en: "Material knowledge" },
    s: { th: "บทความและข้อมูลที่ควรรู้ก่อนเลือกเกรด", en: "Articles worth reading before you pick a grade" },
    href: "/knowledge",
  },
  {
    t: { th: "เกี่ยวกับเรา", en: "About us" },
    s: { th: `บริษัทในกรุงเทพฯ ตั้งแต่ พ.ศ. ${company.foundedYearBE}`, en: `A Bangkok company since ${company.foundedYearCE}` },
    href: "/about",
  },
  {
    t: { th: "ติดต่อเรา", en: "Contact" },
    s: { th: "โทร LINE อีเมล หรือแบบฟอร์มขอราคา", en: "Phone, LINE, email or the quote form" },
    href: "/contact",
  },
];

export function HomePage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const faqs = homeFaqs();

  return (
    <>
      <JsonLd
        // Organization + WebSite are emitted site-wide by RootShell.
        data={[faqPageLd(faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))]}
      />

      {/* Hero. The large display line is the prototype's tagline; the H1
          under it keeps the page's search wording (homeMeta / SEO skill). */}
      <section
        aria-labelledby="hero-h"
        className="overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,var(--color-tint-2)_100%)]"
      >
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(36px,5vw,72px)] pb-[clamp(40px,5vw,64px)] pt-[clamp(40px,7vw,96px)]`}
        >
          <div className="flex flex-col gap-[22px]">
            <p className="eyebrow m-0 !tracking-[.32em]">VAN MATERIALS</p>
            <p
              aria-hidden
              className="m-0 text-[clamp(48px,7vw,100px)] leading-[1.16] font-extrabold tracking-[-.01em] text-primary"
            >
              <span className="block">{en ? "Precision" : "ความแม่นยำ"}</span>
              <span className="block">{en ? "starts with material" : "เริ่มที่วัสดุ"}</span>
            </p>
            <h1
              id="hero-h"
              className="m-0 max-w-[560px] text-[clamp(18px,1.7vw,22px)] leading-[1.6] font-medium text-secondary [text-wrap:pretty]"
            >
              {en
                ? "Materion Distributor in Thailand: Beryllium Copper, MoldMAX, ToughMet"
                : "ตัวแทนจำหน่าย Materion ในประเทศไทย: Beryllium Copper, MoldMAX, ToughMet"}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-7 gap-y-3.5">
              <LocaleLink href="/contact#rfq" className={btnPrimary}>
                {en ? "Request a quote" : "ขอใบเสนอราคา"}
                <Arrow />
              </LocaleLink>
              <a href="#materials" className={`${linkArrow} py-3.5`}>
                {en ? "Explore materials" : "สำรวจวัสดุ"}
                <Arrow />
              </a>
            </div>
          </div>
          <HeroArt caption="COPPER ALLOYS · PRECISION MATERIALS">
            <Image
              src={heroImage.src}
              width={heroImage.width}
              height={heroImage.height}
              alt={heroImage.alt[lang]}
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 600px, 100vw"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          </HeroArt>
        </div>
      </section>

      {/* Product lines */}
      <section id="materials" aria-labelledby="choose-h" className="border-y border-line bg-tint">
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start gap-x-[clamp(24px,3vw,40px)] gap-y-12 py-[clamp(48px,6vw,80px)]`}
        >
          <div data-reveal="0" className="flex flex-col gap-[18px] self-center">
            <h2 id="choose-h" className="m-0 text-[clamp(34px,3.8vw,52px)] leading-[1.2] font-extrabold text-primary">
              <span className="block">{choose[lang][0]}</span>
              <span className="block">{choose[lang][1]}</span>
            </h2>
            <p className="m-0 max-w-[380px] text-[18px] leading-[1.65] text-secondary">
              {en
                ? "Copper alloys and mold materials for molds, welding and electrical work."
                : "โลหะผสมทองแดงและวัสดุแม่พิมพ์ สำหรับงานแม่พิมพ์ งานเชื่อม และงานไฟฟ้า"}
            </p>
          </div>
          {families.map((f, i) => (
            <LocaleLink
              key={f.slug}
              href={`/${f.slug}`}
              data-reveal={(i % 3) + 1}
              className="zoom-card arrow-link flex flex-col gap-3.5 text-primary"
            >
              <span className="reveal-frame block aspect-[314/191] overflow-hidden rounded-[4px] bg-[#E4E8EE]">
                <Image
                  src={f.image.src}
                  width={f.image.width}
                  height={f.image.height}
                  alt={f.image.alt[lang]}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                  className="zoom size-full object-cover"
                />
              </span>
              <span className="font-mono text-[11.5px] tracking-[.24em] uppercase">
                {f.brand ? `${f.brand} · ${f.keyword}` : f.keyword}
              </span>
              <span className="-mt-1.5 text-[21px] leading-snug font-bold">
                {f.name[lang]}
                <span aria-hidden className="arrow ml-3 text-accent">→</span>
              </span>
              <span className="-mt-1 text-[15px] leading-[1.6] text-secondary">{f.description[lang]}</span>
            </LocaleLink>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <nav aria-label={en ? "Quick links" : "ลิงก์ด่วน"} className={`${wrap} py-[clamp(28px,3vw,40px)]`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] [clip-path:inset(0_0_0_1px)]">
          {strip.map((it, i) => (
            <LocaleLink
              key={it.href}
              href={it.href}
              data-reveal={i}
              className="arrow-link flex items-center justify-between gap-4 border-l border-line px-[clamp(16px,2.6vw,36px)] py-5 text-primary"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[20px] font-bold">{it.t[lang]}</span>
                <span className="text-[14.5px] text-secondary">{it.s[lang]}</span>
              </span>
              <span aria-hidden className="arrow text-[22px] text-accent">→</span>
            </LocaleLink>
          ))}
        </div>
      </nav>

      {/* Industries */}
      <section id="applications" aria-labelledby="industries-heading" className="border-t border-line">
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-[clamp(28px,5vw,72px)] py-[clamp(56px,7vw,96px)]`}
        >
          <div data-reveal="0" className="flex flex-col gap-3.5">
            <p className="eyebrow m-0">INDUSTRIES</p>
            <h2 id="industries-heading" className={h2Class}>
              {en ? "Industries we supply" : "อุตสาหกรรมที่เราจัดหาวัสดุให้"}
            </h2>
            <p className="m-0 max-w-[420px] text-[17px] leading-[1.65] text-secondary">
              {en
                ? "Which alloys each industry uses, and why, with the grades to ask about."
                : "แต่ละอุตสาหกรรมใช้โลหะผสมใด เพราะอะไร และควรสอบถามเกรดไหน"}
            </p>
          </div>
          <ul className="m-0 list-none border-b border-line p-0">
            {industries.map((ind, i) => (
              <li key={ind.slug} data-reveal={i} className="border-t border-line">
                <LocaleLink
                  href={`/industries/${ind.slug}`}
                  className="arrow-link flex items-center justify-between gap-4 py-5 text-primary"
                >
                  <span className="text-[18px] font-semibold">{ind.name[lang]}</span>
                  <span className="flex items-center gap-3 text-right text-[14px] text-secondary">
                    <span className="hidden sm:inline">
                      {ind.fits
                        .slice(0, 2)
                        .map((fit) => getFamily(fit.family)?.keyword)
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                    <span aria-hidden className="arrow text-accent">→</span>
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we are + FAQ */}
      <section aria-labelledby="why-heading" className="border-y border-line bg-tint">
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(32px,5vw,72px)] py-[clamp(56px,7vw,96px)]`}
        >
          <div data-reveal="0" className="flex flex-col gap-5">
            <p className="eyebrow m-0">MATERION DISTRIBUTOR THAILAND</p>
            <h2 id="why-heading" className={`${h2Class} [text-wrap:balance]`}>
              {en ? "Why VAN INTERTRADE" : "ทำไมต้อง แวน อินเตอร์เทรด"}
            </h2>
            <p className="m-0 text-[17px] leading-[1.75] text-body">
              {en
                ? "VAN INTERTRADE is a Materion distributor in Thailand. We supply beryllium copper, MoldMAX mold alloys and ToughMet, along with chrome copper, clad metal, Longsun electrical contacts and standard copper alloys, for mold making and manufacturing. Prices are by quotation."
                : "แวน อินเตอร์เทรด เป็นตัวแทนจำหน่าย Materion ในประเทศไทย จัดหา Beryllium Copper, MoldMAX สำหรับแม่พิมพ์ และ ToughMet รวมถึงทองแดงโครเมียม โลหะประกบ หน้าสัมผัสไฟฟ้า Longsun และโลหะผสมทองแดงมาตรฐาน สำหรับงานแม่พิมพ์และอุตสาหกรรมการผลิต ราคาตามใบเสนอราคา"}
            </p>
            <dl className="m-0 grid gap-x-8 sm:grid-cols-2">
              {why.map((w) => (
                <div key={w.title.en} className="border-t border-line-strong py-4">
                  <dt className="text-[17px] font-bold text-primary">{w.title[lang]}</dt>
                  <dd className="m-0 mt-1.5 text-[15px] leading-[1.65] text-body">{w.body[lang]}</dd>
                </div>
              ))}
            </dl>
            <LocaleLink href="/about" className={linkArrow}>
              {en ? "About VAN INTERTRADE" : "เกี่ยวกับเรา"}
              <Arrow />
            </LocaleLink>
          </div>
          <FaqList faqs={faqs} lang={lang} className="" />
        </div>
      </section>

      {/* Knowledge */}
      <section aria-labelledby="art-h" className={`${wrap} pt-[clamp(56px,7vw,96px)]`}>
        <div data-reveal="0" className="flex flex-wrap items-end justify-between gap-5">
          <h2 id="art-h" className={h2Class}>
            {en ? "Material knowledge" : "ความรู้ด้านวัสดุ"}
          </h2>
          <LocaleLink href="/knowledge" className={linkArrow}>
            {en ? "All articles" : "บทความทั้งหมด"}
            <Arrow />
          </LocaleLink>
        </div>
        <ArticleCards items={articles.slice(0, 4)} lang={lang} />
      </section>

      <div className={`${wrap} pb-[clamp(56px,7vw,96px)]`}>
        <RfqBand
          href="/contact#rfq"
          lang={lang}
          subject=""
          title={en ? "Ready for your next job" : "พร้อมสำหรับงานถัดไปของคุณ"}
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
