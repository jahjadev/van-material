import type { ReactNode } from "react";
import { JsonLd, ORG_ID, breadcrumbLd } from "@/components/JsonLd";
import { HOME, PageHero, RfqBand, type Crumb, type HeroImage } from "@/components/ProductParts";
import { LocaleLink } from "@/components/LocaleLink";
import { company } from "@/data/company";
import { families } from "@/data/products";
import { absUrl, HREFLANG, type Lang } from "@/lib/locale";

/*
 * About page. Facts from company.ts only (legal names, founding year,
 * address, contact). Mission/vision are the legacy copy rewritten without
 * superlatives. The legacy timeline (founded 2000, Materion 2010) is NOT
 * used: it contradicts company.ts (1986) and the Materion year is
 * unconfirmed (company.materion.since is null — rendered only once set).
 * No team or warehouse photos were supplied, so none are shown.
 */

export const aboutMeta: Record<Lang, { title: string; description: string }> = {
  th: {
    title: `เกี่ยวกับ แวน อินเตอร์เทรด ก่อตั้ง พ.ศ. ${company.foundedYearBE}`,
    description:
      `รู้จัก ${company.legalNameTh} บริษัทในกรุงเทพฯ ก่อตั้ง พ.ศ. ${company.foundedYearBE} ปัจจุบันเป็นตัวแทนจำหน่าย Materion และผู้จัดหาโลหะผสมทองแดงและวัสดุแม่พิมพ์สำหรับอุตสาหกรรมไทย`,
  },
  en: {
    title: `About VAN INTERTRADE, Bangkok, Est. ${company.foundedYearCE}`,
    description:
      `About ${company.legalNameEn}, a Bangkok company founded in ${company.foundedYearCE}. Today it is a Materion distributor supplying copper alloys and mold materials to Thai industry.`,
  },
};

const heroImage: HeroImage = {
  src: "/images/about-hero.webp",
  width: 1024,
  height: 768,
  alt: {
    th: "มัดแท่งโลหะผสมทองแดงวางบนพื้นผิวสีดำมันวาว",
    en: "A bundle of copper alloy rods lying on a glossy black surface",
  },
};

export function AboutPage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const c = company.contact;
  const crumbs: Crumb[] = [
    { name: HOME[lang], path: "/" },
    { name: en ? "About" : "เกี่ยวกับเรา", path: "/about" },
  ];
  const materionFamilies = families.filter((f) => f.brand === "Materion");
  const since = company.materion.since;

  const facts: { k: string; v: ReactNode }[] = [
    { k: en ? "Company" : "ชื่อบริษัท", v: en ? company.legalNameEn : `${company.legalNameTh} (${company.legalNameEn})` },
    { k: en ? "Founded" : "ก่อตั้ง", v: en ? String(company.foundedYearCE) : `${company.foundedMonthTh} พ.ศ. ${company.foundedYearBE}` },
    { k: en ? "Address" : "ที่อยู่", v: en ? c.addressEn : c.addressTh },
    {
      k: en ? "Telephone" : "โทรศัพท์",
      v: c.telsDisplay.map((d, i) => (
        <span key={d}>
          {i > 0 && ", "}
          <a href={`tel:${c.tels[i]}`} className="hover:text-accent">{d}</a>
        </span>
      )),
    },
    { k: en ? "Email" : "อีเมล", v: <a href={`mailto:${c.email}`} className="hover:text-accent">{c.email}</a> },
    { k: "LINE", v: <a href={c.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{c.lineId}</a> },
    { k: en ? "Business hours" : "เวลาทำการ", v: en ? c.hoursEn : c.hoursTh },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(crumbs, lang),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: absUrl("/about", lang),
            inLanguage: HREFLANG[lang],
            name: aboutMeta[lang].title,
            mainEntity: { "@id": ORG_ID },
          },
        ]}
      />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={en ? "About us" : "เกี่ยวกับเรา"}
        h1={
          en
            ? `About VAN INTERTRADE: A Bangkok Company Founded in ${company.foundedYearCE}`
            : `เกี่ยวกับ แวน อินเตอร์เทรด: บริษัทในกรุงเทพฯ ก่อตั้งเมื่อ พ.ศ. ${company.foundedYearBE}`
        }
        image={heroImage}
      >
        <p>
          {en
            ? `${company.legalNameEn} was founded in Bangkok in ${company.foundedYearCE}. We are a Materion distributor in Thailand and supply copper alloys and mold materials to Thai manufacturers, from mold makers to suppliers in the automotive, EV, energy and electrical industries.`
            : `${company.legalNameTh} ก่อตั้งในกรุงเทพฯ เมื่อ พ.ศ. ${company.foundedYearBE} เป็นตัวแทนจำหน่าย Materion ในประเทศไทย และจัดหาโลหะผสมทองแดงและวัสดุแม่พิมพ์ให้ผู้ผลิตไทย ตั้งแต่ผู้ทำแม่พิมพ์ไปจนถึงซัพพลายเออร์ในอุตสาหกรรมยานยนต์ EV พลังงาน และไฟฟ้า`}
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        <div className="grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">{en ? "Our mission" : "พันธกิจ"}</h2>
            <p className="mt-4 leading-relaxed text-secondary">
              {en
                ? "To connect Thai manufacturers with high-performance materials from Materion and our other producers, together with the technical information needed to choose the right grade and form for each part."
                : "เชื่อมผู้ผลิตไทยกับวัสดุประสิทธิภาพสูงจาก Materion และผู้ผลิตอื่นที่เราเป็นตัวแทน พร้อมข้อมูลทางเทคนิคที่จำเป็นต่อการเลือกเกรดและรูปแบบวัสดุให้เหมาะกับชิ้นงานแต่ละชิ้น"}
            </p>
          </section>
          <section>
            <h2 className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">{en ? "Our vision" : "วิสัยทัศน์"}</h2>
            <p className="mt-4 leading-relaxed text-secondary">
              {en
                ? "To be a dependable, technically informed source of copper alloys and mold materials for industry in Thailand, including the EV, aerospace and energy sectors."
                : "เป็นแหล่งจัดหาโลหะผสมทองแดงและวัสดุแม่พิมพ์ที่เชื่อถือได้และมีข้อมูลทางเทคนิครองรับ สำหรับอุตสาหกรรมในประเทศไทย รวมถึงภาคยานยนต์ไฟฟ้า อากาศยาน และพลังงาน"}
            </p>
          </section>
        </div>

        <section aria-labelledby="partners-heading" data-reveal="0" className="mt-16">
          <h2 id="partners-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
            {en ? "Producers we represent" : "ผู้ผลิตที่เราเป็นตัวแทน"}
          </h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="border-t border-line-strong pt-5 pb-2">
              <dt className="font-semibold text-primary">Materion</dt>
              <dd className="mt-2 leading-relaxed text-secondary">
                {en
                  ? "We are a Materion distributor in Thailand for "
                  : "เราเป็นตัวแทนจำหน่าย Materion ในประเทศไทย สำหรับ "}
                {materionFamilies.map((f, i) => (
                  <span key={f.slug}>
                    {i > 0 && (i === materionFamilies.length - 1 ? (en ? " and " : " และ ") : ", ")}
                    <LocaleLink href={`/${f.slug}`} className="font-medium text-accent hover:text-accent-hover">
                      {f.keyword}
                    </LocaleLink>
                  </span>
                ))}
                {en ? "." : ""}
                {since !== null && (en ? ` Authorised since ${since}.` : ` ได้รับแต่งตั้งตั้งแต่ปี ${since}`)}
              </dd>
            </div>
            <div className="border-t border-line-strong pt-5 pb-2">
              <dt className="font-semibold text-primary">Longsun</dt>
              <dd className="mt-2 leading-relaxed text-secondary">
                {en ? "Silver-based " : "หน้าสัมผัสไฟฟ้าฐานเงิน "}
                <LocaleLink href="/electrical-contacts" className="font-medium text-accent hover:text-accent-hover">
                  {en ? "electrical contacts" : "(Electrical Contacts)"}
                </LocaleLink>
                {en
                  ? ": contact rivets, buttons and wire for relays, contactors, switches and breakers."
                  : " ได้แก่ หมุดคอนแทค ปุ่ม และลวด สำหรับรีเลย์ คอนแทคเตอร์ สวิตช์ และเบรกเกอร์"}
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="facts-heading" data-reveal="0" className="mt-16">
          <h2 id="facts-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
            {en ? "Company details" : "ข้อมูลบริษัท"}
          </h2>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {facts.map((f) => (
              <div key={f.k} className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-primary">{f.k}</dt>
                <dd className="min-w-0 break-words text-secondary">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 leading-relaxed text-secondary">
            {en
              ? "This site covers VAN INTERTRADE's copper alloy and mold materials business. The company's main website, "
              : "เว็บไซต์นี้ครอบคลุมธุรกิจโลหะผสมทองแดงและวัสดุแม่พิมพ์ของแวน อินเตอร์เทรด ส่วนเว็บไซต์หลักของบริษัท "}
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
            >
              {new URL(company.url).hostname.replace(/^www\./, "")}
            </a>
            {en ? ", covers the company's other lines of business." : " ครอบคลุมธุรกิจด้านอื่นของบริษัท"}
          </p>
        </section>

        <RfqBand
          href="/contact#rfq"
          lang={lang}
          subject=""
          title={en ? "Talk to us about your material" : "ปรึกษาเรื่องวัสดุกับเรา"}
          body={
            en
              ? "Send the product, grade, form, size and quantity, and we will reply with a quotation."
              : "แจ้งสินค้า เกรด รูปแบบ ขนาด และจำนวน แล้วเราจะตอบกลับพร้อมใบเสนอราคา"
          }
        />
      </div>
    </>
  );
}
