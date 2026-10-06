import { LocaleLink } from "@/components/LocaleLink";
import { cn } from "@/lib/cn";
import { pickLang, type Lang } from "@/lib/locale";

/**
 * Stacked text wordmark: a heavy "VAN" over a tracked-out "INTERTRADE".
 *
 * Plain server component: `lang` is passed down from whichever route-group
 * root layout rendered (see src/lib/locale.ts / ruling #6), not read from a
 * client context — this component has no interactivity of its own.
 */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "md" | "sm" }) {
  return (
    <span className={cn("flex flex-col leading-none text-primary", className)}>
      <span className={cn("font-extrabold tracking-[.02em]", size === "md" ? "text-[30px]" : "text-[28px]")}>VAN</span>
      <span className={cn("mt-[3px] font-bold tracking-[.18em]", size === "md" ? "text-[10.5px]" : "text-[10px]")}>
        INTERTRADE
      </span>
    </span>
  );
}

export function Logo({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <LocaleLink
      href="/"
      aria-label={pickLang(lang, "แวน อินเตอร์เทรด หน้าแรก", "VAN INTERTRADE home")}
      className={cn("shrink-0", className)}
    >
      <Wordmark />
    </LocaleLink>
  );
}
