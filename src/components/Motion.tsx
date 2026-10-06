"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
 *  - <HeroVideo>: the hero's full-bleed copper video (see its own comment).
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

/**
 * Background layer of the home hero: a silent looping video of the copper
 * plate, block and rod, cropped to fill the section. Phones get the 720p
 * file, wider screens the 1080p one (both re-encoded from the prototype's
 * 4K clip). On desktop with a fine pointer it pushes in, floats, follows the
 * pointer a little and drifts down as you scroll; with reduced motion the
 * video is paused on its first frame (the poster).
 */
export function HeroVideo({ alt }: { alt: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion()) {
      video.current?.pause();
      return;
    }
    if (!finePointer() || window.innerWidth < 980) return;
    const host = scroller.current?.closest("section");
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = scroller.current;
        if (!el) return;
        const k = Math.min(window.scrollY, 900);
        el.style.transform = `translate3d(0,${(k * 0.32).toFixed(1)}px,0) scale(${(1 + (k / 900) * 0.06).toFixed(4)})`;
      });
    };
    const onMove = (e: MouseEvent) => {
      if (!host || !tilt.current) return;
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.current.style.transform = `translate3d(${(-x * 18).toFixed(1)}px,${(-y * 10).toFixed(1)}px,0) rotateY(${(x * 6).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg)`;
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
    <div role="img" aria-label={alt} className="absolute inset-0 overflow-hidden [perspective:1600px]">
      <div ref={scroller} className="absolute inset-0 will-change-transform">
        <div className="float absolute inset-[-4%]">
          <div ref={tilt} className="absolute inset-0 transition-transform duration-[900ms] ease-(--ease-out-soft)">
            <div className="enter absolute inset-0">
              <video
                ref={video}
                className="media"
                poster="/images/design/hero-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                tabIndex={-1}
                disablePictureInPicture
              >
                <source src="/videos/hero-720.mp4" type="video/mp4" media="(max-width: 979px)" />
                <source src="/videos/hero-1080.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
