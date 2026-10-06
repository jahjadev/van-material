import { Clock, Mail, MapPin, MessageCircle, Phone, Printer } from "lucide-react";
import type { ReactNode } from "react";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { HOME, PageHero, type Crumb } from "@/components/ProductParts";
import { RfqForm } from "@/components/RfqForm";
import { ClickToLoadMap } from "@/components/ClickToLoadMap";
import { company } from "@/data/company";
import { rfqProductOptions } from "@/lib/rfqOptions";
import type { Lang } from "@/lib/locale";

export const contactMeta: Record<Lang, { title: string; description: string }> = {
  th: {
    title: "ติดต่อ แวน อินเตอร์เทรด และขอใบเสนอราคา",
    description:
      "ติดต่อ บริษัท แวน อินเตอร์เทรด จำกัด เพื่อขอใบเสนอราคาโลหะผสมทองแดงและวัสดุแม่พิมพ์ โทร 02-728-0150 LINE @vanintertrade ที่อยู่ เขตสะพานสูง กรุงเทพฯ",
  },
  en: {
    title: "Contact VAN INTERTRADE & Request a Quote",
    description:
      "Contact VAN INTERTRADE in Saphan Sung, Bangkok for a quotation on copper alloys and mold materials. Phone 02-728-0150, LINE @vanintertrade, Mon–Fri 08.30–17.30.",
  },
};

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 px-5 py-4">
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold text-primary">{label}</dt>
        <dd className="mt-1 break-words text-secondary">{children}</dd>
      </div>
    </div>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const c = company.contact;
  const crumbs: Crumb[] = [
    { name: HOME[lang], path: "/" },
    { name: en ? "Contact" : "ติดต่อเรา", path: "/contact" },
  ];
  const ic = "size-5";

  return (
    <>
      {/* Address, geo, hours and the sales contactPoint live on the site-wide
          Organization node (RootShell) — no separate LocalBusiness node. */}
      <JsonLd data={[breadcrumbLd(crumbs, lang)]} />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={en ? "Contact" : "ติดต่อเรา"}
        h1={en ? "Contact VAN INTERTRADE and Request a Quote" : "ติดต่อ แวน อินเตอร์เทรด และขอใบเสนอราคา"}
      >
        <p>
          {en
            ? "Call, message us on LINE or email for prices, grades and forms. Our office is in Saphan Sung, Bangkok."
            : "โทร LINE หรืออีเมลหาเราเพื่อสอบถามราคา เกรด และรูปแบบวัสดุ สำนักงานของเราอยู่ที่เขตสะพานสูง กรุงเทพฯ"}
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        <div className="grid gap-8 md:grid-cols-2">
          <section aria-labelledby="nap-heading" className="min-w-0">
            <h2 id="nap-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
              {en ? company.legalNameEn : company.legalNameTh}
            </h2>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              <Row icon={<MapPin className={ic} aria-hidden />} label={en ? "Address" : "ที่อยู่"}>
                <address className="not-italic">
                  {(en ? c.addressLinesEn : c.addressLinesTh).map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
              </Row>
              <Row icon={<Phone className={ic} aria-hidden />} label={en ? "Telephone" : "โทรศัพท์"}>
                {c.telsDisplay.map((d, i) => (
                  <span key={d}>
                    {i > 0 && ", "}
                    <a href={`tel:${c.tels[i]}`} className="whitespace-nowrap hover:text-accent">{d}</a>
                  </span>
                ))}
              </Row>
              <Row icon={<Printer className={ic} aria-hidden />} label={en ? "Fax" : "แฟกซ์"}>
                {c.faxDisplay}
              </Row>
              <Row icon={<Mail className={ic} aria-hidden />} label={en ? "Email" : "อีเมล"}>
                <a href={`mailto:${c.email}`} className="hover:text-accent">{c.email}</a>
              </Row>
              <Row icon={<MessageCircle className={ic} aria-hidden />} label="LINE">
                <a href={c.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{c.lineId}</a>
              </Row>
              <Row icon={<Clock className={ic} aria-hidden />} label={en ? "Business hours" : "เวลาทำการ"}>
                {en ? c.hoursEn : c.hoursTh}
              </Row>
            </dl>
          </section>

          <section aria-labelledby="map-heading" className="min-w-0">
            <h2 id="map-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
              {en ? "Map" : "แผนที่"}
            </h2>
            <ClickToLoadMap
              src={`https://www.google.com/maps?q=${c.geo.lat},${c.geo.lng}&output=embed`}
              title={en ? `Map of ${company.legalNameEn}, Bangkok` : `แผนที่ ${company.legalNameTh} กรุงเทพฯ`}
              buttonLabel={en ? "Show map" : "แสดงแผนที่"}
              note={
                en
                  ? "The map loads from Google only when you press the button, and Google then receives your IP address and device information."
                  : "แผนที่จะโหลดจาก Google เมื่อคุณกดปุ่มเท่านั้น และเมื่อโหลดแล้ว Google จะได้รับหมายเลข IP และข้อมูลอุปกรณ์ของคุณ"
              }
            />
            <a
              href={`https://www.google.com/maps?q=${c.geo.lat},${c.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
            >
              {en ? "Open in Google Maps" : "เปิดใน Google Maps"}
            </a>
          </section>
        </div>

        <section id="rfq" aria-labelledby="rfq-heading" className="mt-16 scroll-mt-24">
          <h2 id="rfq-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
            {en ? "Request a quote" : "ขอใบเสนอราคา"}
          </h2>
          <div className="mt-5">
            <RfqForm lang={lang} products={rfqProductOptions()} />
          </div>
        </section>
      </div>
    </>
  );
}
