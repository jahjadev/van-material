import { Clock, Mail, MapPin, MessageCircle, Phone, Printer } from "lucide-react";
import type { ReactNode } from "react";
import { JsonLd, breadcrumbLd, organizationLd } from "@/components/JsonLd";
import { HOME, PageHero, type Crumb } from "@/components/ProductParts";
import { RfqForm } from "@/components/RfqForm";
import { company } from "@/data/company";
import { rfqProductOptions } from "@/lib/rfqOptions";
import { SITE_URL } from "@/lib/site";
import { absUrl, type Lang } from "@/lib/locale";

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

/** LocalBusiness node for the Bangkok office, tied to the site Organization. */
function localBusinessLd(lang: Lang) {
  const c = company.contact;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: company.legalNameEn,
    alternateName: company.legalNameTh,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    telephone: c.tels[0],
    email: c.email,
    address: organizationLd(lang).address,
    geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: c.hoursSpec.days,
        opens: c.hoursSpec.opens,
        closes: c.hoursSpec.closes,
      },
    ],
    hasMap: `https://www.google.com/maps?q=${c.geo.lat},${c.geo.lng}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absUrl("/contact", lang),
  };
}

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
      <JsonLd data={[breadcrumbLd(crumbs, lang), localBusinessLd(lang)]} />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={en ? "Contact" : "ติดต่อเรา"}
        h1={en ? "Contact VAN INTERTRADE and Request a Quote" : "ติดต่อ แวน อินเตอร์เทรด และขอใบเสนอราคา"}
      >
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">
          {en
            ? "Call, message us on LINE or email for prices, grades and forms. Our office is in Saphan Sung, Bangkok."
            : "โทร LINE หรืออีเมลหาเราเพื่อสอบถามราคา เกรด และรูปแบบวัสดุ สำนักงานของเราอยู่ที่เขตสะพานสูง กรุงเทพฯ"}
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <section aria-labelledby="nap-heading" className="min-w-0">
            <h2 id="nap-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? company.legalNameEn : company.legalNameTh}
            </h2>
            <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-surface">
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
            <h2 id="map-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? "Map" : "แผนที่"}
            </h2>
            <iframe
              src={`https://www.google.com/maps?q=${c.geo.lat},${c.geo.lng}&output=embed`}
              title={en ? `Map of ${company.legalNameEn}, Bangkok` : `แผนที่ ${company.legalNameTh} กรุงเทพฯ`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-5 aspect-[4/3] w-full rounded-xl border border-line"
            />
            <a
              href={`https://www.google.com/maps?q=${c.geo.lat},${c.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-accent hover:text-primary"
            >
              {en ? "Open in Google Maps" : "เปิดใน Google Maps"}
            </a>
          </section>
        </div>

        <section id="rfq" aria-labelledby="rfq-heading" className="mt-14 scroll-mt-20">
          <h2 id="rfq-heading" className="text-xl font-bold text-primary md:text-2xl">
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
