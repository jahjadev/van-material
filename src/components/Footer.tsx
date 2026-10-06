import { LocaleLink } from "@/components/LocaleLink";
import { footerGroups } from "@/data/nav";
import { company } from "@/data/company";
import type { Lang } from "@/lib/locale";

/**
 * apple.com-style footer: light grey, 12px type, a short note, link columns,
 * then the legal line. Plain server component: `lang` is passed down from
 * whichever route-group root layout rendered — no interactivity here, so no
 * client context read (see ruling #6).
 */
export function Footer({ lang }: { lang: Lang }) {
  const { contact } = company;
  const en = lang === "en";
  const year = new Date().getFullYear();
  const link = "text-secondary hover:text-primary hover:underline";

  return (
    <footer id="site-footer" className="bg-footer text-[12px] leading-[1.5] text-secondary">
      <div className="mx-auto max-w-[1024px] px-[22px] pb-5 pt-[17px]">
        <p className="m-0 border-b border-line pb-4">
          {en
            ? `${company.legalNameEn} is a Materion distributor in Thailand, founded in Bangkok in ${company.foundedYearCE}. Property values on this site link to their published sources; prices are quoted per enquiry.`
            : `${company.legalNameTh} ตัวแทนจำหน่าย Materion ในประเทศไทย ก่อตั้งในกรุงเทพฯ เมื่อ พ.ศ. ${company.foundedYearBE} ค่าทางเทคนิคบนเว็บไซต์นี้ลิงก์ไปยังแหล่งที่มาที่เผยแพร่ และราคาเสนอตามใบเสนอราคาแต่ละครั้ง`}
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-5 md:grid-cols-4">
          {footerGroups.map((group) => (
            <nav key={group.titleEn} aria-label={en ? group.titleEn : group.title}>
              <h2 className="m-0 mb-2.5 text-[12px] font-semibold text-primary">{en ? group.titleEn : group.title}</h2>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <LocaleLink href={l.href} className={link}>
                      {en ? l.labelEn : l.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="m-0 mb-2.5 text-[12px] font-semibold text-primary">{en ? "Contact" : "ติดต่อ"}</h2>
            <address className="flex flex-col gap-2 not-italic">
              <span>{en ? contact.addressEn : contact.addressTh}</span>
              <a href={`tel:${contact.tels[0]}`} className={link}>
                {contact.telsDisplay[0]}
              </a>
              <a href={`tel:${contact.tels[1]}`} className={link}>
                {contact.telsDisplay[1]}
              </a>
              <a href={`mailto:${contact.email}`} className={link}>
                {contact.email}
              </a>
              <a href={contact.lineUrl} target="_blank" rel="noopener noreferrer" className={link}>
                LINE {contact.lineId}
              </a>
              <span>{en ? contact.hoursEn : contact.hoursTh}</span>
            </address>
          </div>
        </div>

        <p className="m-0 mt-8 border-t border-line pt-4">
          {en ? "Need a price? " : "ต้องการราคา? "}
          <LocaleLink href="/contact#rfq" className="text-link hover:underline">
            {en ? "Request a quote" : "ขอใบเสนอราคา"}
          </LocaleLink>{" "}
          {en ? `or call ${contact.telsDisplay[0]}.` : `หรือโทร ${contact.telsDisplay[0]}`}
        </p>

        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="m-0">
            Copyright © {year} {company.legalNameEn}. {en ? "All rights reserved." : "สงวนลิขสิทธิ์"}
          </p>
          <p className="m-0 flex flex-wrap items-center gap-x-3">
            <LocaleLink href="/privacy" className={link}>
              {en ? "Privacy notice" : "นโยบายความเป็นส่วนตัว"}
            </LocaleLink>
            <span aria-hidden className="text-line">|</span>
            <a href={company.url} target="_blank" rel="noopener noreferrer" className={link}>
              {en ? "VAN INTERTRADE audio-visual (vaninter.com)" : "VAN INTERTRADE ระบบเสียงและภาพ (vaninter.com)"}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
