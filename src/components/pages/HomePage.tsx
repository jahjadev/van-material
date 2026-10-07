import Image from "next/image";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { HeroScroll } from "@/components/Motion";
import { JsonLd, faqPageLd } from "@/components/JsonLd";
import { Arrow, btnPrimary, btnSecondary, h2Class, linkArrow } from "@/components/ProductParts";
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

/*
 * apple.com-style home page: a scroll-driven hero, big centered product
 * tiles on light grey, a sideways-scrolling row of industry cards, then a
 * short "why us" with the FAQ. Product names stay in English (they are the
 * names buyers search for); taglines restate what each family page already
 * says, nothing new.
 */
const L = {
  h1: { th: "ความแม่นยำ เริ่มที่วัสดุ", en: "Precision starts with material." },
  sub: { th: "ทองแดงอัลลอยและวัสดุแม่พิมพ์ สำหรับงานอุตสาหกรรม", en: "Copper alloys and mold materials for industrial work." },
  heroAlt: { th: "แผ่น บล็อก และแท่งทองแดงอัลลอย", en: "Copper alloy plate, block and rod" },
  statement: { th: "ตัวแทนจำหน่าย Materion ในประเทศไทย", en: "Materion distributor in Thailand." },
} satisfies Record<string, Bi>;

/** Taglines per family, restating each family page's own summary. */
const TAG: Record<string, Bi> = {
  "beryllium-copper": {
    th: "แข็งแรง นำไฟฟ้า และนำความร้อน ในวัสดุเดียว",
    en: "Strength and conductivity in one alloy.",
  },
  moldmax: { th: "ระบายความร้อนในแม่พิมพ์ได้ดีกว่าเหล็ก", en: "Pulls heat out of the mold better than steel." },
  toughmet: { th: "Cu-Ni-Sn สำหรับบูชและแบริ่งงานหนัก", en: "Cu-Ni-Sn for heavy-duty bushings and bearings." },
  "chrome-copper": { th: "CrCu และ CrCuZr สำหรับหัวเชื่อมจุด", en: "CrCu and CrCuZr for spot-welding electrodes." },
  "standard-copper-alloys": {
    th: "ฟอสเฟอร์บรอนซ์และทองแดงบริสุทธิ์ มาตรฐาน JIS",
    en: "JIS phosphor bronze and high-purity copper.",
  },
  "clad-metal": { th: "Cu/Al/Cu และ Ag/Cu ใช้โลหะราคาสูงเฉพาะจุดที่จำเป็น", en: "Costly metal only where it is needed." },
  "electrical-contacts": { th: "หน้าสัมผัสไฟฟ้าฐานเงินจาก Longsun", en: "Silver-based contacts from Longsun." },
};

const FEATURED = ["beryllium-copper", "moldmax"];

/** `name` is read only by screen readers and crawlers, so each link's text
 * says where it goes ("Learn more about MoldMAX") instead of a bare repeat. */
function TileButtons({ slug, name, lang }: { slug: string; name: string; lang: Lang }) {
  const en = lang === "en";
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-3.5">
      <LocaleLink href={`/${slug}`} className={btnPrimary}>
        {en ? "Learn more" : "ดูรายละเอียด"}
        <span className="sr-only">{en ? ` about ${name}` : ` ${name}`}</span>
      </LocaleLink>
      <LocaleLink href={`/contact?product=${slug}#rfq`} className={btnSecondary}>
        {en ? "Get a quote" : "ขอใบเสนอราคา"}
        <span className="sr-only">{en ? ` for ${name}` : ` ${name}`}</span>
      </LocaleLink>
    </div>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const faqs = homeFaqs();
  const featured = FEATURED.map((s) => getFamily(s)!);
  const others = families.filter((f) => !FEATURED.includes(f.slug));

  return (
    <>
      <JsonLd
        // Organization + WebSite are emitted site-wide by RootShell.
        data={[faqPageLd(faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))]}
      />

      <HeroScroll
        alt={L.heroAlt[lang]}
        intro={
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-3">
            <p className="eyebrow m-0">VAN INTERTRADE</p>
            <h1
              id="hero-h"
              className="m-0 text-[clamp(40px,6.4vw,80px)] leading-[1.05] font-semibold tracking-[-.025em] text-primary [text-wrap:balance]"
            >
              {L.h1[lang]}
            </h1>
            <p className="m-0 text-[clamp(19px,2vw,28px)] leading-[1.25] tracking-[-.01em] text-primary">{L.sub[lang]}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3.5">
              <LocaleLink href="/contact#rfq" className={btnPrimary}>
                {en ? "Request a quote" : "ขอใบเสนอราคา"}
              </LocaleLink>
              <a href="#materials" className={btnSecondary}>
                {en ? "Explore materials" : "สำรวจวัสดุ"}
              </a>
            </div>
          </div>
        }
        statement={
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-3">
            <p className="eyebrow m-0">Materion</p>
            <p className="m-0 text-[clamp(36px,5.4vw,64px)] leading-[1.08] font-semibold tracking-[-.025em] text-primary [text-wrap:balance]">
              {L.statement[lang]}
            </p>
            <p className="m-0 text-[clamp(17px,1.8vw,24px)] text-secondary">Beryllium Copper · MoldMAX · ToughMet</p>
          </div>
        }
      />

      {/* Product tiles */}
      <section id="materials" aria-labelledby="materials-h" className="scroll-mt-[var(--nav-h)] bg-white">
        <h2 id="materials-h" className="sr-only">
          {en ? "Materials" : "วัสดุ"}
        </h2>
        <div className="flex flex-col gap-3 px-0 md:px-3">
          {featured.map((f) => (
            <article
              key={f.slug}
              data-reveal="0"
              className="overflow-hidden bg-tint px-[22px] pt-[clamp(44px,6vw,64px)] text-center"
            >
              {f.brand && <p className="eyebrow m-0">{f.brand}</p>}
              <h3 className="m-0 mt-1 text-[clamp(40px,5.6vw,56px)] leading-[1.07] font-semibold tracking-[-.02em] text-primary">
                {f.name.en}
              </h3>
              <p className="m-0 mt-1.5 text-[clamp(19px,2.2vw,28px)] leading-[1.2] tracking-[-.01em] text-primary">
                {TAG[f.slug][lang]}
              </p>
              <TileButtons slug={f.slug} name={f.name[lang]} lang={lang} />
              <div className="mx-auto mt-10 max-w-[760px]">
                <Image
                  src={f.image.src}
                  width={f.image.width}
                  height={f.image.height}
                  alt={f.image.alt[lang]}
                  sizes="(min-width: 800px) 760px, 100vw"
                  className="block aspect-[16/9] w-full rounded-t-[18px] object-cover"
                />
              </div>
            </article>
          ))}

          <div className="grid gap-3 md:grid-cols-2">
            {others.map((f) => (
              <article
                key={f.slug}
                data-reveal="0"
                className="flex flex-col overflow-hidden bg-tint px-[22px] pt-[clamp(40px,5vw,56px)] text-center"
              >
                {f.brand && <p className="eyebrow m-0">{f.brand}</p>}
                <h3 className="m-0 mt-1 text-[clamp(32px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-.02em] text-primary">
                  {f.name.en}
                </h3>
                <p className="m-0 mt-1.5 text-[clamp(17px,1.6vw,21px)] leading-[1.3] text-primary">{TAG[f.slug][lang]}</p>
                <TileButtons slug={f.slug} name={f.name[lang]} lang={lang} />
                <div className="mx-auto mt-auto w-full max-w-[520px] pt-8">
                  <Image
                    src={f.image.src}
                    width={f.image.width}
                    height={f.image.height}
                    alt={f.image.alt[lang]}
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="block aspect-[16/10] w-full rounded-t-[18px] object-cover"
                  />
                </div>
              </article>
            ))}
            <article
              data-reveal="0"
              className="flex flex-col items-center justify-center bg-tint px-[22px] py-[clamp(48px,6vw,72px)] text-center"
            >
              <p className="eyebrow m-0">{en ? "Knowledge" : "คลังความรู้"}</p>
              <h3 className="m-0 mt-1 text-[clamp(32px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-.02em] text-primary">
                {en ? "Choose the right grade." : "เลือกเกรดให้ตรงกับงาน"}
              </h3>
              <p className="m-0 mt-1.5 max-w-[440px] text-[clamp(17px,1.6vw,21px)] leading-[1.3] text-primary">
                {en
                  ? "Plain-language guides with every figure sourced."
                  : "บทความอ่านง่าย ทุกตัวเลขมีแหล่งอ้างอิง"}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3.5">
                <LocaleLink href="/knowledge" className={btnPrimary}>
                  {en ? "Read the guides" : "อ่านบทความ"}
                </LocaleLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Industries: sideways-scrolling cards */}
      <section id="applications" aria-labelledby="apps-h" className="scroll-mt-[var(--nav-h)] overflow-hidden bg-white py-[clamp(64px,9vw,120px)]">
        <div className="mx-auto max-w-[1024px] px-[22px]">
          <h2 id="apps-h" className={h2Class}>
            {en ? "Built into every industry." : "อยู่ในทุกอุตสาหกรรม"}
          </h2>
          <p className="m-0 mt-2 max-w-[640px] text-[clamp(17px,1.6vw,21px)] text-secondary">
            {en
              ? "Which alloys each industry uses, why, and which grades to ask about."
              : "แต่ละอุตสาหกรรมใช้โลหะผสมใด เพราะอะไร และควรสอบถามเกรดไหน"}
          </p>
        </div>
        <ul className="m-0 mt-10 flex list-none snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[22px] px-[max(22px,calc((100vw_-_1024px)/2_+_22px))] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {industries.map((ind) => (
            <li key={ind.slug} className="shrink-0 snap-start">
              <LocaleLink
                href={`/industries/${ind.slug}`}
                className="zoom-card group relative block h-[480px] w-[300px] overflow-hidden rounded-[18px] bg-tint md:h-[560px] md:w-[360px]"
              >
                <Image
                  src={ind.image.src}
                  width={ind.image.width}
                  height={ind.image.height}
                  alt={ind.image.alt[lang]}
                  sizes="360px"
                  className="zoom absolute inset-0 size-full object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-2/3 bg-[linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,0))]"
                />
                <span className="relative flex flex-col gap-1 p-7 text-left text-white">
                  <span className="text-[12px] font-semibold opacity-90">
                    {ind.fits
                      .slice(0, 2)
                      .map((fit) => getFamily(fit.family)?.name.en)
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  <span className="text-[28px] leading-[1.14] font-semibold tracking-[-.01em]">{ind.name[lang]}</span>
                </span>
              </LocaleLink>
            </li>
          ))}
        </ul>
      </section>

      {/* Why us + FAQ */}
      <section aria-labelledby="why-h" className="bg-tint py-[clamp(64px,9vw,120px)]">
        <div className="mx-auto max-w-[980px] px-[22px] text-center">
          <p className="eyebrow m-0">{en ? "Why VAN INTERTRADE" : "ทำไมต้อง แวน อินเตอร์เทรด"}</p>
          <h2 id="why-h" className={`${h2Class} mt-1 [text-wrap:balance]`}>
            {en ? "A Materion distributor in Thailand." : "ตัวแทนจำหน่าย Materion ในประเทศไทย"}
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[clamp(17px,1.6vw,21px)] leading-[1.45] text-secondary">
            {en
              ? "VAN INTERTRADE supplies beryllium copper, MoldMAX mold alloys and ToughMet, along with chrome copper, clad metal, Longsun electrical contacts and standard copper alloys, for mold making and manufacturing. Every property value on this site links to its published source, and prices are by quotation."
              : "แวน อินเตอร์เทรด จัดหา Beryllium Copper, MoldMAX สำหรับแม่พิมพ์ และ ToughMet รวมถึงทองแดงโครเมียม โลหะประกบ หน้าสัมผัสไฟฟ้า Longsun และโลหะผสมทองแดงมาตรฐาน สำหรับงานแม่พิมพ์และอุตสาหกรรมการผลิต ทุกค่าทางเทคนิคบนเว็บไซต์นี้ลิงก์ไปยังแหล่งที่มา และราคาเป็นไปตามใบเสนอราคา"}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <LocaleLink href="/about" className={linkArrow}>
              {en ? "About us" : "เกี่ยวกับเรา"}
              <Arrow />
            </LocaleLink>
            <LocaleLink href="/beryllium-copper" className={linkArrow}>
              {en ? "Beryllium copper grades" : "ดูเกรดทองแดงเบริลเลียม"}
              <Arrow />
            </LocaleLink>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-[760px] px-[22px]">
          <FaqList faqs={faqs} lang={lang} className="" />
        </div>
      </section>

      {/* Knowledge */}
      <section aria-labelledby="art-h" className="bg-white py-[clamp(64px,9vw,120px)]">
        <div className="mx-auto max-w-[1024px] px-[22px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="art-h" className={h2Class}>
              {en ? "Material knowledge." : "ความรู้ด้านวัสดุ"}
            </h2>
            <LocaleLink href="/knowledge" className={linkArrow}>
              {en ? "All articles" : "บทความทั้งหมด"}
              <Arrow />
            </LocaleLink>
          </div>
          <ul className="m-0 mt-8 grid list-none gap-5 p-0 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <li key={a.slug} data-reveal={i}>
                <LocaleLink
                  href={`/knowledge/${a.slug}`}
                  className="flex h-full flex-col rounded-[18px] bg-tint p-7 text-primary transition-transform duration-300 hover:scale-[1.015] hover:text-primary"
                >
                  <span className="text-[21px] leading-[1.2] font-semibold tracking-[-.01em] [text-wrap:pretty]">
                    {a.title[lang]}
                  </span>
                  <span className="mt-3 text-[15px] leading-[1.45] text-secondary [text-wrap:pretty]">{a.description[lang]}</span>
                  <span className="mt-auto pt-5 text-[15px] text-link">
                    {en ? "Read more" : "อ่านต่อ"} ›
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="cta-h" className="bg-tint py-[clamp(64px,9vw,120px)] text-center">
        <div className="mx-auto max-w-[760px] px-[22px]">
          <h2 id="cta-h" className={`${h2Class} [text-wrap:balance]`}>
            {en ? "Ready for your next job." : "พร้อมสำหรับงานถัดไปของคุณ"}
          </h2>
          <p className="m-0 mt-3 text-[clamp(17px,1.6vw,21px)] text-secondary">
            {en
              ? "Tell us the grade, form, size and quantity. We will send a quotation."
              : "แจ้งเกรด รูปแบบ ขนาด และจำนวน แล้วเราจะส่งใบเสนอราคาให้"}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            <LocaleLink href="/contact#rfq" className={btnPrimary}>
              {en ? "Request a quote" : "ขอใบเสนอราคา"}
            </LocaleLink>
            <a href={company.contact.lineUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              LINE {company.contact.lineId}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
