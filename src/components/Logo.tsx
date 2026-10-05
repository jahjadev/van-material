"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/prefs";

/** Text wordmark — VAN (copper accent) INTERTRADE (ink). */
export function Logo({ className }: { className?: string }) {
  const t = useT();
  return (
    <LocaleLink
      href="/"
      aria-label={t("แวน อินเตอร์เทรด หน้าแรก", "VAN INTERTRADE home")}
      className={cn("inline-flex items-baseline gap-1.5 font-bold", className)}
    >
      <span className="text-[20px] tracking-tight text-accent">VAN</span>
      <span className="text-[15px] tracking-tight text-primary">
        INTERTRADE
      </span>
    </LocaleLink>
  );
}
