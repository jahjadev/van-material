import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
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
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-near-black text-on-dark-2">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(2,1fr)]">
          <div>
            <div className="flex items-baseline gap-1.5 font-bold">
              <span className="text-[20px] text-accent-light">VAN</span>
              <span className="text-[15px] text-white">INTERTRADE</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-on-dark-2">
              {lang === "en" ? (
                <>
                  {company.legalNameEn} — distributor of high-performance
                  copper and mold alloys for Thai industry. Founded in{" "}
                  {company.foundedYearCE}.
                </>
              ) : (
                <>
                  {company.legalNameTh} — ผู้จัดจำหน่ายโลหะผสมทองแดงและวัสดุแม่พิมพ์
                  ประสิทธิภาพสูง สำหรับอุตสาหกรรมไทย บริษัทก่อตั้งเมื่อ พ.ศ. {company.foundedYearBE}
                </>
              )}
            </p>
            <ul className="mt-6 space-y-2.5 text-[13px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{lang === "en" ? contact.addressEn : contact.addressTh}</span>
              </li>
              <li className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <Phone className="size-4 shrink-0" aria-hidden />
                <a href={`tel:${contact.tels[0]}`} className="whitespace-nowrap hover:text-white">
                  {contact.telsDisplay[0]}
                </a>
                <span aria-hidden>·</span>
                <a href={`tel:${contact.tels[1]}`} className="whitespace-nowrap hover:text-white">
                  {contact.telsDisplay[1]}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0" aria-hidden />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={contact.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LINE Official"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line-dark hover:bg-white/10"
              >
                <MessageCircle className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.titleEn} aria-label={lang === "en" ? group.titleEn : group.title}>
              <h2 className="text-[13px] font-semibold text-white">
                {lang === "en" ? group.titleEn : group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <LocaleLink
                      href={l.href}
                      className="text-[13px] leading-snug hover:text-white"
                    >
                      {lang === "en" ? l.labelEn : l.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line-dark pt-6 text-[12px] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalNameEn}.{" "}
            {lang === "en" ? "Est. 1986." : `ก่อตั้ง พ.ศ. ${company.foundedYearBE}.`}{" "}
            {lang === "en" ? "All rights reserved." : "สงวนลิขสิทธิ์"}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{lang === "en" ? contact.hoursEn : contact.hoursTh}</span>
            <LocaleLink href="/privacy" className="underline decoration-line-dark underline-offset-2 hover:text-white">
              {lang === "en" ? "Privacy notice" : "นโยบายความเป็นส่วนตัว"}
            </LocaleLink>
          </p>
        </div>

        <p className="mt-4 text-[12px]">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-dark underline-offset-2 hover:text-white"
          >
            {lang === "en"
              ? "VAN INTERTRADE — audio-visual systems (vaninter.com)"
              : "VAN INTERTRADE — ระบบเสียงและภาพ (vaninter.com)"}
          </a>
        </p>
      </div>
    </footer>
  );
}
