"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LocaleLink } from "@/components/LocaleLink";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { SearchPanel } from "@/components/SearchPanel";
import { mainNav } from "@/data/nav";
import { useLang, useT } from "@/lib/prefs";
import type { SearchEntry } from "@/lib/searchIndex";
import { cn } from "@/lib/cn";

/*
 * apple.com-style global nav: a 48px translucent bar with small centered
 * links. "Materials" opens a full-width flyout with large product links and
 * blurs the page behind it; phones get a full-screen menu with big type.
 */

const RFQ_HREF = "/contact#rfq";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 17 17" aria-hidden>
      <circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11.2 11.2l4.3 4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      {open ? (
        <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      ) : (
        <path d="M2.5 6.5h13M2.5 11.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function Nav({ search }: { search: SearchEntry[] }) {
  const pathname = usePathname();
  const { lang } = useLang();
  const t = useT();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const searchBtn = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close everything when the route changes.
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [openMenu]);

  const label = (item: { label: string; labelEn: string }) => (lang === "en" ? item.labelEn : item.label);
  const flyout = mainNav.find((g) => g.children && g.labelEn === openMenu);

  const closeSearch = (refocus: boolean) => {
    setSearchOpen(false);
    if (refocus) searchBtn.current?.focus();
  };

  const navText = "text-[12px] text-primary/80 transition-colors hover:text-primary";

  return (
    <>
      {(flyout || searchOpen) && (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-white/30 backdrop-blur-md"
          onClick={() => {
            setOpenMenu(null);
            setSearchOpen(false);
          }}
        />
      )}
      <header
        ref={headerRef}
        onMouseLeave={() => setOpenMenu(null)}
        className="sticky inset-x-0 top-0 z-50 bg-[rgba(250,250,252,.8)] backdrop-blur-xl backdrop-saturate-[1.8]"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:text-white"
        >
          {t("ข้ามไปยังเนื้อหา", "Skip to content")}
        </a>

        <nav
          aria-label={t("เมนูหลัก", "Main navigation")}
          className="mx-auto flex h-[var(--nav-h)] max-w-[1024px] items-center justify-between gap-6 px-[22px]"
        >
          <Logo lang={lang} />

          <ul className="hidden flex-1 items-center justify-center gap-[clamp(20px,3.4vw,44px)] lg:flex">
            {mainNav.map((group) =>
              group.children ? (
                <li key={group.labelEn} onMouseEnter={() => setOpenMenu(group.labelEn)}>
                  <button
                    type="button"
                    className={cn(navText, "py-3", openMenu === group.labelEn && "text-primary")}
                    aria-expanded={openMenu === group.labelEn}
                    aria-controls="nav-flyout"
                    onClick={() => setOpenMenu(openMenu === group.labelEn ? null : group.labelEn)}
                  >
                    {label(group)}
                  </button>
                </li>
              ) : (
                <li key={group.labelEn} onMouseEnter={() => setOpenMenu(null)}>
                  <LocaleLink href={group.href!} className={cn(navText, "py-3")}>
                    {label(group)}
                  </LocaleLink>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-4">
            <LangSwitch className="hidden sm:flex" />
            <button
              ref={searchBtn}
              type="button"
              aria-label={t("ค้นหาวัสดุ", "Search materials")}
              aria-expanded={searchOpen}
              aria-controls="search-panel"
              onClick={() => {
                setMobileOpen(false);
                setOpenMenu(null);
                if (searchOpen) closeSearch(false);
                else setSearchOpen(true);
              }}
              className="flex size-8 items-center justify-center text-primary/80 transition-colors hover:text-primary"
            >
              <SearchIcon />
            </button>
            <LocaleLink
              href={RFQ_HREF}
              className="hidden rounded-full bg-accent px-3 py-1 text-[12px] text-white transition-colors hover:bg-accent-hover hover:text-white lg:inline-flex"
            >
              {t("ขอใบเสนอราคา", "Request a quote")}
            </LocaleLink>
            <button
              type="button"
              aria-label={mobileOpen ? t("ปิดเมนู", "Close menu") : t("เปิดเมนู", "Open menu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setSearchOpen(false);
                setMobileOpen((v) => !v);
              }}
              className="flex size-8 items-center justify-center text-primary/80 lg:hidden"
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </nav>

        {flyout && (
          <div id="nav-flyout" className="hidden border-t border-black/5 lg:block">
            <div className="mx-auto grid max-w-[1024px] grid-cols-[1.4fr_1fr] gap-12 px-[22px] pb-14 pt-10">
              <div>
                <p className="m-0 mb-3 text-[12px] text-secondary">{t("วัสดุทั้งหมด", "Explore all materials")}</p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {flyout.children!.map((c) => (
                    <li key={c.href}>
                      <LocaleLink
                        href={c.href}
                        className="text-[24px] leading-[1.2] font-semibold tracking-[-.01em] text-primary hover:text-link"
                      >
                        {label(c)}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="m-0 mb-3 text-[12px] text-secondary">{t("เพิ่มเติม", "More")}</p>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[14px] font-semibold">
                  <li>
                    <LocaleLink href="/#applications" className="text-primary hover:text-link">
                      {t("การใช้งานในอุตสาหกรรม", "Industry applications")}
                    </LocaleLink>
                  </li>
                  <li>
                    <LocaleLink href="/knowledge" className="text-primary hover:text-link">
                      {t("ความรู้ด้านวัสดุ", "Material knowledge")}
                    </LocaleLink>
                  </li>
                  <li>
                    <LocaleLink href={RFQ_HREF} className="text-primary hover:text-link">
                      {t("ขอใบเสนอราคา", "Request a quote")}
                    </LocaleLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div
            id="mobile-menu"
            className="h-[calc(100dvh_-_var(--nav-h))] overflow-y-auto bg-[rgba(250,250,252,.98)] px-[22px] pb-10 pt-4 lg:hidden"
          >
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {mainNav.map((group) =>
                group.children ? (
                  <li key={group.labelEn}>
                    <p className="m-0 mb-2 mt-1 text-[12px] text-secondary">{label(group)}</p>
                    <ul className="m-0 mb-4 flex list-none flex-col gap-1.5 p-0">
                      {group.children.map((c) => (
                        <li key={c.href}>
                          <LocaleLink href={c.href} className="text-[24px] leading-[1.25] font-semibold text-primary">
                            {label(c)}
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={group.labelEn}>
                    <LocaleLink href={group.href!} className="text-[24px] leading-[1.6] font-semibold text-primary">
                      {label(group)}
                    </LocaleLink>
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex items-center justify-between">
              <LocaleLink
                href={RFQ_HREF}
                className="rounded-full bg-accent px-[22px] py-[11px] text-[17px] text-white hover:text-white"
              >
                {t("ขอใบเสนอราคา", "Request a quote")}
              </LocaleLink>
              <LangSwitch />
            </div>
          </div>
        )}

        {searchOpen && <SearchPanel entries={search} rfqHref={RFQ_HREF} onClose={closeSearch} />}
      </header>
    </>
  );
}
