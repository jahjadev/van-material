"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { mainNav } from "@/data/nav";
import { useLang, useT } from "@/lib/prefs";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const { lang } = useLang();
  const t = useT();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close menus when the route changes.
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
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

  const desktopNavRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [openMenu]);

  const label = (item: { label: string; labelEn: string }) =>
    lang === "en" ? item.labelEn : item.label;

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:text-white"
      >
        {t("ไปที่เนื้อหาหลัก", "Skip to main content")}
      </a>

      <nav
        aria-label={t("เมนูหลัก", "Main menu")}
        className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-6"
      >
        <Logo lang={lang} />

        <ul ref={desktopNavRef} className="hidden items-center gap-1 lg:flex">
          {mainNav.map((group) =>
            group.children ? (
              <li
                key={group.labelEn}
                className="relative"
                onMouseEnter={() => setOpenMenu(group.labelEn)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-[15px] text-primary/85 hover:text-primary"
                  aria-expanded={openMenu === group.labelEn}
                  aria-controls={`nav-menu-${group.labelEn}`}
                  onClick={() =>
                    setOpenMenu(openMenu === group.labelEn ? null : group.labelEn)
                  }
                >
                  {label(group)}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform",
                      openMenu === group.labelEn && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {openMenu === group.labelEn && (
                  <div
                    id={`nav-menu-${group.labelEn}`}
                    className="absolute left-1/2 top-full w-[280px] -translate-x-1/2 pt-2"
                  >
                    <ul className="overflow-hidden rounded-md border border-line bg-surface p-2 shadow-lg">
                      {group.children.map((c) => (
                        <li key={c.href}>
                          <LocaleLink
                            href={c.href}
                            className="block rounded-sm px-3 py-2 text-[14px] text-primary hover:bg-background"
                          >
                            {label(c)}
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={group.labelEn}>
                <LocaleLink
                  href={group.href!}
                  className={cn(
                    "rounded-md px-3 py-2 text-[15px] text-primary/85 hover:text-primary",
                    pathname === group.href && "text-primary",
                  )}
                >
                  {label(group)}
                </LocaleLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch className="hidden md:flex" />

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-primary lg:hidden"
            aria-label={mobileOpen ? t("ปิด", "Close") : t("เมนู", "Menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 top-14 z-40 overflow-y-auto bg-surface lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("เมนูหลัก", "Main menu")}
          >
            <div className="mx-auto max-w-[1200px] px-4 py-6">
              <ul className="divide-y divide-line">
                {mainNav.map((group) => (
                  <li key={group.labelEn} className="py-2">
                    {group.children ? (
                      <details>
                        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[18px] font-semibold text-primary">
                          {label(group)}
                          <ChevronDown className="size-5" aria-hidden />
                        </summary>
                        <ul className="pb-2">
                          {group.children.map((c) => (
                            <li key={c.href}>
                              <LocaleLink
                                href={c.href}
                                className="block py-2.5 text-[15px] text-secondary hover:text-primary"
                              >
                                {label(c)}
                              </LocaleLink>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <LocaleLink
                        href={group.href!}
                        className="block py-3 text-[18px] font-semibold text-primary"
                      >
                        {label(group)}
                      </LocaleLink>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[13px] text-secondary">
                  {t("ภาษา", "Language")}
                </span>
                <LangSwitch />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
