import { LocaleLink } from "@/components/LocaleLink";
import { Wordmark } from "@/components/Logo";
import { footerGroups } from "@/data/nav";
import { company } from "@/data/company";
import type { Lang } from "@/lib/locale";

/**
 * Plain server component: `lang` is passed down from whichever route-group
 * root layout rendered — no interactivity here, so no client context read
 * (see ruling #6).
 */
export function Footer({ lang }: { lang: Lang }) {
  const { contact } = company;
  const en = lang === "en";
  const year = new Date().getFullYear();
  const heading = "m-0 mb-1 font-mono text-[11.5px] font-medium tracking-[.22em] uppercase text-secondary";

  return (
    <footer id="site-footer" className="border-t border-line bg-footer">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-9 px-[clamp(20px,4vw,48px)] pb-7 pt-14">
        <div className="flex flex-col gap-3.5">
          <Wordmark size="sm" />
          <p className="m-0 max-w-[280px] text-[14.5px] leading-[1.65] text-secondary">
            {en
              ? `${company.legalNameEn}: copper alloys and mold materials for Thai industry. Founded in ${company.foundedYearCE}.`
              : `${company.legalNameTh} ผู้จัดจำหน่ายโลหะผสมทองแดงและวัสดุแม่พิมพ์ สำหรับอุตสาหกรรมไทย ก่อตั้งเมื่อ พ.ศ. ${company.foundedYearBE}`}
          </p>
          <address className="flex flex-col gap-2 font-mono text-[13px] not-italic leading-relaxed text-body">
            <span>{en ? contact.addressEn : contact.addressTh}</span>
            <span className="flex flex-wrap gap-x-2">
              <a href={`tel:${contact.tels[0]}`} className="hover:text-accent">
                {contact.telsDisplay[0]}
              </a>
              <span aria-hidden>·</span>
              <a href={`tel:${contact.tels[1]}`} className="hover:text-accent">
                {contact.telsDisplay[1]}
              </a>
            </span>
            <a href={`mailto:${contact.email}`} className="hover:text-accent">
              {contact.email}
            </a>
            <a href={contact.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              LINE {contact.lineId}
            </a>
          </address>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.titleEn} aria-label={en ? group.titleEn : group.title} className="flex flex-col gap-2.5">
            <h2 className={heading}>{en ? group.titleEn : group.title}</h2>
            {group.links.map((l) => (
              <LocaleLink key={l.href} href={l.href} className="text-[15px] text-primary hover:text-accent">
                {en ? l.labelEn : l.label}
              </LocaleLink>
            ))}
            {group.titleEn === "Company" && (
              <LocaleLink
                href="/contact#rfq"
                className="arrow-link mt-1.5 inline-flex gap-2 text-[15px] font-semibold text-accent hover:text-accent-hover"
              >
                {en ? "Request a quote" : "ขอใบเสนอราคา"}
                <span aria-hidden className="arrow">→</span>
              </LocaleLink>
            )}
          </nav>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-3.5 px-[clamp(20px,4vw,48px)] pb-8 pt-5">
        <div className="flex w-full max-w-[240px] items-center gap-4">
          <span className="h-px flex-1 bg-[#C9D0DB]" />
          <span className="whitespace-nowrap font-mono text-[10.5px] tracking-[.28em] text-secondary">VAN INTERTRADE</span>
          <span className="h-px flex-1 bg-[#C9D0DB]" />
        </div>
        <p className="m-0 max-w-[720px] text-center text-[12.5px] leading-relaxed text-muted">
          © {year} {company.legalNameEn}. {en ? "All rights reserved." : "สงวนลิขสิทธิ์"} ·{" "}
          {en ? contact.hoursEn : contact.hoursTh} ·{" "}
          <LocaleLink href="/privacy" className="underline underline-offset-2 hover:text-accent">
            {en ? "Privacy notice" : "นโยบายความเป็นส่วนตัว"}
          </LocaleLink>{" "}
          ·{" "}
          <a href={company.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent">
            {en ? "VAN INTERTRADE audio-visual systems (vaninter.com)" : "VAN INTERTRADE ระบบเสียงและภาพ (vaninter.com)"}
          </a>
        </p>
      </div>
    </footer>
  );
}
