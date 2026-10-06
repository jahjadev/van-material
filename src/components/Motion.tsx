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
 *  - <HeroScroll>: the scroll-driven home hero (see its own comment).
 */

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

/** 0..1 position of `p` between `a` and `b`, clamped. */
const span = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Apple-style scroll-driven home hero. The section is ~2.5 screens tall and
 * its first screen stays pinned (sticky) while you scroll through it:
 *
 *   0.00–0.30  the headline drifts up and fades; the white wash clears
 *   0.00–0.90  the video plays forward with the scroll (the rod slides into
 *              the block) and backward when you scroll up
 *   0.50–0.66  the wash returns and `statement` fades in
 *   0.86–1.00  the statement fades out as the next section arrives
 *
 * The video has a keyframe every 4 frames so seeking stays smooth, and the
 * shown time eases toward the scroll target instead of jumping. With
 * reduced motion the section is one screen tall, nothing is pinned or
 * animated, and the poster (the first frame) is shown.
 */
export function HeroScroll({
  alt,
  intro,
  statement,
  captions,
}: {
  alt: string;
  intro: ReactNode;
  statement: ReactNode;
  captions: ReactNode;
}) {
  const track = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const wash = useRef<HTMLDivElement>(null);
  const introBox = useRef<HTMLDivElement>(null);
  const stmt = useRef<HTMLDivElement>(null);
  const caps = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || reducedMotion()) return;

    let target = 0;
    let shown = 0;
    let raf = 0;
    let ready = false;

    const onMeta = () => {
      ready = true;
      // iOS Safari only decodes frames for seeking after a play() call.
      v.play().then(() => v.pause()).catch(() => {});
    };
    if (v.readyState >= 1) onMeta();
    else v.addEventListener("loadedmetadata", onMeta, { once: true });

    const progress = () => {
      const t = track.current;
      const pnl = panel.current;
      if (!t || !pnl) return 0;
      const r = t.getBoundingClientRect();
      // The sticky `top` (header height). Not offsetTop: that grows while stuck.
      const top = parseFloat(getComputedStyle(pnl).top) || 0;
      const room = r.height - pnl.offsetHeight;
      return room > 0 ? Math.min(1, Math.max(0, (top - r.top) / room)) : 0;
    };

    const paint = (p: number) => {
      const out = easeInOut(span(p, 0, 0.3));
      const statementIn = easeInOut(span(p, 0.5, 0.66));
      const statementOut = easeInOut(span(p, 0.86, 1));
      if (introBox.current) {
        introBox.current.style.opacity = String(1 - out);
        introBox.current.style.transform = `translate3d(0,${(-70 * out).toFixed(1)}px,0)`;
        introBox.current.style.visibility = out >= 1 ? "hidden" : "visible";
      }
      if (wash.current) wash.current.style.opacity = String(Math.max(1 - out, statementIn * (1 - statementOut)));
      if (stmt.current) {
        const o = statementIn * (1 - statementOut);
        stmt.current.style.opacity = String(o);
        stmt.current.style.transform = `translate3d(0,${(40 * (1 - statementIn) - 40 * statementOut).toFixed(1)}px,0)`;
        stmt.current.style.visibility = o <= 0 ? "hidden" : "visible";
      }
      if (caps.current) caps.current.style.opacity = String(1 - span(p, 0, 0.12));
      if (media.current) media.current.style.transform = `scale(${(1 + 0.05 * p).toFixed(4)})`;
      target = span(p, 0, 0.9);
    };

    const tick = () => {
      raf = 0;
      if (ready && v.duration) {
        shown += (target - shown) * 0.18;
        if (Math.abs(target - shown) < 0.002) shown = target;
        const t = shown * (v.duration - 0.05);
        if (!v.seeking && Math.abs(v.currentTime - t) > 1 / 60) v.currentTime = t;
        if (shown !== target) raf = requestAnimationFrame(tick);
      } else if (!ready) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      paint(progress());
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      v.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={track}
      aria-labelledby="hero-h"
      className="hero-video relative h-[250svh] bg-[#F0F3F7] motion-reduce:h-auto"
    >
      <div
        ref={panel}
        className="sticky top-[72px] isolate flex h-[calc(100svh_-_72px)] min-h-[560px] overflow-hidden bg-[#F4F5F8] motion-reduce:static"
      >
        <div role="img" aria-label={alt} className="absolute inset-0 z-0 overflow-hidden">
          <div ref={media} className="absolute inset-0 will-change-transform">
            <div className="enter absolute inset-0">
            <video
              ref={video}
              className="media"
              poster="/images/design/hero-poster.webp"
              muted
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              disablePictureInPicture
            >
              <source src="/videos/hero-scrub-720.mp4" type="video/mp4" media="(max-width: 979px)" />
              <source src="/videos/hero-scrub-1080.mp4" type="video/mp4" />
            </video>
            </div>
          </div>
        </div>
        <div ref={wash} aria-hidden className="wash pointer-events-none absolute inset-0 z-[1]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[120px] bg-[linear-gradient(180deg,rgba(240,243,247,0),#F0F3F7)]"
        />
        <div className="content relative z-[2] mx-auto flex w-full max-w-[1240px] flex-col px-[clamp(20px,4vw,48px)] pb-[clamp(64px,7vw,104px)] pt-[clamp(40px,7vw,96px)]">
          <div className="grid">
            <div ref={introBox} className="col-start-1 row-start-1 will-change-transform">
              {intro}
            </div>
            <div
              ref={stmt}
              aria-hidden
              className="invisible col-start-1 row-start-1 self-end opacity-0 lg:self-center will-change-transform motion-reduce:hidden"
            >
              {statement}
            </div>
          </div>
        </div>
        <div ref={caps} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-7 z-[2] hidden sm:block">
          {captions}
        </div>
      </div>
    </section>
  );
}
