"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/*
 * Scroll effects, kept out of the server components:
 *  - <Reveal>: elements marked `data-reveal="<n>"` that start below the fold
 *    fade/slide in once, staggered by n × 80 ms; a `.reveal-frame` inside
 *    also unveils from the bottom. Content already on screen is never
 *    hidden, and nothing is hidden without JS, so crawlers and no-JS
 *    visitors always see the full page.
 *  - <HeroScroll>: the scroll-driven home hero (see its own comment).
 */

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

/** Widest the video is ever shown, in CSS px: the 2560 px file at 2x DPR. */
const MAX_FRAME_W = 1280;

/**
 * apple.com-style scroll-driven home hero. The section is ~2.2 screens tall
 * (~1.9 on portrait phones)
 * and its first screen stays pinned (sticky) while you scroll through it:
 *
 *   0.00–0.35  the headline fades; the rounded video frame grows and moves
 *              to the middle of the screen
 *   0.05–0.85  the video plays forward with the scroll (the rod slides into
 *              the block) and backward when you scroll up
 *   0.72–0.95  the frame settles back and `statement` takes the headline's
 *              place, then the page scrolls on
 *
 * The frame always fills the space under the headline, so the pinned screen
 * never shows an empty band: on landscape screens it is the largest 16:9
 * frame that fits (never past MAX_FRAME_W, so the 2560 px video is not
 * upscaled on a 2x screen); on portrait phones it fills the remaining
 * height and plays an upright 1080x1920 cut of the clip, then widens to
 * the full screen width. All files have a keyframe every 8 frames so
 * seeking stays smooth, and the shown time eases toward the scroll target. With reduced motion nothing is pinned or
 * animated and the poster (the first frame) is shown.
 */
export function HeroScroll({
  alt,
  intro,
  statement,
}: {
  alt: string;
  intro: ReactNode;
  statement: ReactNode;
}) {
  const track = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const introBox = useRef<HTMLDivElement>(null);
  const stmt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || reducedMotion()) return;

    let target = 0;
    let shown = 0;
    let raf = 0;
    let ready = false;
    // Landscape: uniform scale + shift. Portrait: the frame's box moves from
    // its resting rectangle to the whole pinned panel (no scaling, so the
    // video is never stretched; object-cover just shows more of it).
    let grow = { s: 1, dy: 0 };
    let rect: { from: number[]; to: number[] } | null = null;

    const onMeta = () => {
      ready = true;
      // iOS Safari only decodes frames for seeking after a play() call.
      v.play().then(() => v.pause()).catch(() => {});
    };
    if (v.readyState >= 1) onMeta();
    else v.addEventListener("loadedmetadata", onMeta, { once: true });

    const measure = () => {
      const f = frame.current;
      const box = stage.current;
      const pnl = panel.current;
      if (!f || !box || !pnl) return;
      const pw = pnl.clientWidth;
      const ph = pnl.clientHeight;
      f.style.cssText = "";
      if (window.matchMedia("(orientation: portrait)").matches) {
        // [top, left, width, height] relative to the panel.
        rect = { from: [box.offsetTop, 22, pw - 44, box.clientHeight - 22], to: [0, 0, pw, ph] };
        grow = { s: 1, dy: 0 };
        return;
      }
      rect = null;
      // Landscape: the largest 16:9 frame that fits the space under the
      // headline (CSS can't know that height, so it is set here).
      const availW = box.clientWidth - 44;
      const availH = box.clientHeight - 22;
      f.style.width = `${Math.round(Math.max(Math.min(1080, availW, (availH * 16) / 9), Math.min(availW, 320)))}px`;
      const w = f.offsetWidth;
      const h = f.offsetHeight;
      const top = box.offsetTop + f.offsetTop;
      // Grow to fill the screen, but never past the video's real size
      // (MAX_FRAME_W) and never taller than the pinned panel.
      const targetW = Math.min(MAX_FRAME_W, pw - 44, ((ph - 24) * 16) / 9);
      const sc = Math.max(1, Math.min(targetW / w, ph / h));
      grow = { s: sc, dy: (ph - h * sc) / 2 - top };
    };

    const progress = () => {
      const t = track.current;
      const pnl = panel.current;
      if (!t || !pnl) return 0;
      const r = t.getBoundingClientRect();
      // The sticky `top` (nav height). Not offsetTop: that grows while stuck.
      const top = parseFloat(getComputedStyle(pnl).top) || 0;
      const room = r.height - pnl.offsetHeight;
      return room > 0 ? Math.min(1, Math.max(0, (top - r.top) / room)) : 0;
    };

    const paint = (p: number) => {
      const m = easeInOut(span(p, 0, 0.35)) - easeInOut(span(p, 0.72, 0.95));
      const introOut = easeInOut(span(p, 0, 0.25));
      const stmtIn = easeInOut(span(p, 0.8, 0.95));
      if (introBox.current) {
        introBox.current.style.opacity = String(1 - introOut);
        introBox.current.style.transform = `translate3d(0,${(-30 * introOut).toFixed(1)}px,0)`;
        introBox.current.style.visibility = introOut >= 1 ? "hidden" : "visible";
      }
      if (stmt.current) {
        stmt.current.style.opacity = String(stmtIn);
        stmt.current.style.transform = `translate3d(0,${(24 * (1 - stmtIn)).toFixed(1)}px,0)`;
        stmt.current.style.visibility = stmtIn <= 0 ? "hidden" : "visible";
      }
      const f = frame.current;
      if (f && rect) {
        const [t, l, w, h] = rect.from.map((v, i) => v + (rect!.to[i] - v) * m);
        f.style.position = "absolute";
        f.style.top = `${t.toFixed(1)}px`;
        f.style.left = `${l.toFixed(1)}px`;
        f.style.width = `${w.toFixed(1)}px`;
        f.style.height = `${h.toFixed(1)}px`;
        f.style.borderRadius = `${(24 * (1 - m)).toFixed(1)}px`;
      } else if (f) {
        const s = 1 + (grow.s - 1) * m;
        f.style.transform = `translate3d(0,${(grow.dy * m).toFixed(1)}px,0) scale(${s.toFixed(4)})`;
        f.style.borderRadius = `${(24 / s).toFixed(1)}px`;
      }
      target = span(p, 0.05, 0.85);
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
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      v.removeEventListener("loadedmetadata", onMeta);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={track} aria-labelledby="hero-h" className="relative h-[220svh] bg-white portrait:h-[190svh] motion-reduce:h-auto">
      <div
        ref={panel}
        className="sticky top-[var(--nav-h)] flex h-[calc(100svh_-_var(--nav-h))] min-h-[600px] flex-col items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:pb-16"
      >
        <div className="relative z-[2] grid w-full px-[22px] pt-[clamp(28px,6vh,72px)] text-center">
          <div ref={introBox} className="col-start-1 row-start-1 will-change-transform">
            {intro}
          </div>
          <div
            ref={stmt}
            aria-hidden
            className="invisible col-start-1 row-start-1 self-center opacity-0 will-change-transform motion-reduce:hidden"
          >
            {statement}
          </div>
        </div>
        <div
          ref={stage}
          className="relative z-[1] mt-[clamp(20px,4vh,44px)] flex min-h-0 w-full flex-1 items-start justify-center px-[22px] pb-[22px] portrait:static motion-reduce:flex-none"
        >
          <div
            ref={frame}
            role="img"
            aria-label={alt}
            className="relative aspect-video w-[min(1080px,100%,calc((100svh_-_var(--nav-h)_-_330px)*1.7778))] origin-top overflow-hidden rounded-[24px] bg-[#f5f5f7] will-change-transform portrait:aspect-auto portrait:h-full portrait:w-full motion-reduce:portrait:h-[62svh]"
          >
            <div className="enter absolute inset-0">
              <video
                ref={video}
                className="absolute inset-0 size-full object-cover"
                poster="/images/design/hero-poster.webp"
                muted
                playsInline
                preload="auto"
                aria-hidden
                tabIndex={-1}
                disablePictureInPicture
              >
                <source src="/videos/hero-portrait.mp4" type="video/mp4" media="(orientation: portrait)" />
                <source src="/videos/hero-1080.mp4" type="video/mp4" media="(max-width: 799px)" />
                <source src="/videos/hero-1440.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
