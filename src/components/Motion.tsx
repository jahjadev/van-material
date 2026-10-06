"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/*
 * The prototype's three scroll effects, kept out of the server components:
 *  - <ScrollProgress>: a thin accent line under the header that fills as the
 *    page scrolls (runs even with reduced motion — it's a position readout,
 *    not an animation).
 *  - <Reveal>: elements marked `data-reveal="<n>"` that start below the fold
 *    fade/slide in once, staggered by n × 80 ms; a `.reveal-frame` inside
 *    also unveils from the bottom. Content already on screen is never
 *    hidden, and nothing is hidden without JS, so crawlers and no-JS
 *    visitors always see the full page.
 *  - <HeroArt>: the hero picture drifts up and fades a little as you scroll
 *    past it, floats gently, and tilts toward the pointer — desktop with a
 *    fine pointer only. There is no fade-in: the picture is the page's LCP
 *    element and must paint at full opacity on first frame.
 */

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-accent will-change-transform" />
    </div>
  );
}

export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (reducedMotion()) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.remove("reveal-pending");
          io.unobserve(en.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.revealDone) return;
        el.dataset.revealDone = "1";
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        el.style.setProperty("--reveal-delay", `${(Number(el.dataset.reveal) || 0) * 80}ms`);
        el.classList.add("reveal-pending");
        io.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      // Never leave anything hidden if the observer goes away mid-route.
      document.querySelectorAll(".reveal-pending").forEach((el) => el.classList.remove("reveal-pending"));
    };
  }, [pathname]);
  return null;
}

export function HeroArt({ children, caption }: { children: ReactNode; caption: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;
    const host = scroller.current?.closest("section");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = scroller.current;
        if (!el) return;
        const k = Math.min(window.scrollY, 700);
        el.style.transform = `translate3d(0,${(-k * 0.14).toFixed(1)}px,0)`;
        el.style.opacity = (1 - (k / 700) * 0.35).toFixed(3);
      });
    };
    const onMove = (e: MouseEvent) => {
      if (!host || !tilt.current) return;
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.current.style.transform = `rotateY(${(x * 6).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      if (tilt.current) tilt.current.style.transform = "";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    host?.addEventListener("mousemove", onMove);
    host?.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      host?.removeEventListener("mousemove", onMove);
      host?.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <div className="relative w-full max-w-[640px] [perspective:1400px]">
        <div
          aria-hidden
          className="absolute inset-x-[4%] -bottom-[6%] h-[14%] animate-[van-fade_1500ms_var(--ease-out-soft)_500ms_both] bg-[radial-gradient(ellipse_at_center,rgba(10,23,51,.18),rgba(10,23,51,0)_68%)]"
        />
        <div ref={scroller} className="will-change-transform">
          <div className="motion-safe:md:animate-[van-float_10s_ease-in-out_1.7s_infinite]">
            <div
              ref={tilt}
              className="transition-transform duration-700 ease-(--ease-out-soft) [transform-style:preserve-3d]"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      <p className="m-0 text-center font-mono text-[11px] tracking-[.28em] text-secondary">{caption}</p>
    </div>
  );
}
