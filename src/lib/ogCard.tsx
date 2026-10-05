import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "./site";

/**
 * Shared renderer for the per-route OpenGraph / Twitter share cards.
 *
 * Every route segment that wants its own card exports a short
 * `opengraph-image.tsx` that calls `ogCard()`, plus a `twitter-image.tsx`
 * that re-exports it. The layout, palette, and font loading live here so
 * the cards stay one visual system instead of dozens of diverging copies.
 * Modelled on `VAN/src/lib/ogCard.tsx` (sibling production site), recoloured
 * to this site's copper accent (see `src/app/globals.css`).
 *
 * FONTS — the reason a TTF is committed to the repo. `next/og` (Satori) only
 * embeds glyphs from fonts you hand it, and its bundled default (Geist) is
 * Latin-only. Nearly every title on this site has a Thai sibling, so a
 * Latin-only font would render tofu boxes for the Thai cards. IBM Plex Sans
 * Thai covers Thai + Latin. Committed rather than fetched at build time so
 * builds stay deterministic and don't depend on the network. WOFF2 is
 * deliberately not used — Satori cannot parse it; these are static TTFs.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Brand tokens, mirroring src/app/globals.css's --color-accent / --color-near-black.
const ACCENT = "#a6530f";
const INK = "#1c1a18";
const TEXT = "#ffffff";
const TEXT_DIM = "#ededed";
const META = "#a6a6ab";
const FOOTER = "#9c988f";

const FONT_DIR = join(process.cwd(), "src/assets/fonts");

const SITE_HOST = new URL(SITE_URL).hostname.replace(/^www\./, "");

type LoadedFonts = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: "normal";
}[];

// One read per build process, not per image — this module renders ~100 cards.
let fontCache: Promise<LoadedFonts> | null = null;

function loadFonts(): Promise<LoadedFonts> {
  fontCache ??= (async () => {
    const [regular, semibold] = await Promise.all([
      readFile(join(FONT_DIR, "IBMPlexSansThai-Regular.ttf")),
      readFile(join(FONT_DIR, "IBMPlexSansThai-SemiBold.ttf")),
    ]);
    return [
      {
        name: "Plex Thai",
        data: regular.buffer.slice(
          regular.byteOffset,
          regular.byteOffset + regular.byteLength,
        ) as ArrayBuffer,
        weight: 400,
        style: "normal",
      },
      {
        name: "Plex Thai",
        data: semibold.buffer.slice(
          semibold.byteOffset,
          semibold.byteOffset + semibold.byteLength,
        ) as ArrayBuffer,
        weight: 600,
        style: "normal",
      },
    ] satisfies LoadedFonts;
  })();
  return fontCache;
}

/**
 * Trim to a character budget on a word boundary. Satori's
 * `-webkit-line-clamp` support is unreliable for mixed Thai/Latin runs, and
 * Thai doesn't use spaces between words, so measuring by character count and
 * cutting in JS is the predictable option. Thai gets a hard slice (no spaces
 * to fall back on), which is fine — the ellipsis reads as truncation either
 * way.
 */
function clamp(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

/** Shrink the headline as it gets longer so long Thai titles still fit. */
function titleSize(len: number): number {
  if (len <= 28) return 82;
  if (len <= 55) return 66;
  if (len <= 90) return 54;
  return 46;
}

export async function ogCard({
  eyebrowTh,
  eyebrowEn,
  title,
  subtitle,
}: {
  /**
   * Section label, split by script on purpose. Positive `letterSpacing`
   * makes Satori detach Thai combining vowels and tone marks from their
   * base consonant, so only the Latin half is letterspaced and the Thai
   * half is left at its natural tracking.
   */
  eyebrowTh: string;
  eyebrowEn: string;
  title: string;
  subtitle?: string;
}) {
  const fonts = await loadFonts();
  const shownTitle = clamp(title, 110);
  const shownSubtitle = subtitle ? clamp(subtitle, 155) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: TEXT,
          padding: "68px 80px",
          fontFamily: "Plex Thai",
        }}
      >
        {/* Accent rule + section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{ width: 14, height: 52, background: ACCENT, borderRadius: 3 }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              fontSize: 26,
              fontWeight: 600,
              color: META,
            }}
          >
            <span style={{ display: "flex" }}>{clamp(eyebrowTh, 28)}</span>
            <span style={{ display: "flex", color: "#55555c" }}>·</span>
            <span style={{ display: "flex", letterSpacing: 5 }}>
              {clamp(eyebrowEn, 24)}
            </span>
          </div>
        </div>

        {/* Headline + supporting line */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize(shownTitle.length),
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: -0.5,
              color: TEXT,
            }}
          >
            {shownTitle}
          </div>
          {shownSubtitle && (
            <div
              style={{
                display: "flex",
                fontSize: 27,
                fontWeight: 400,
                lineHeight: 1.45,
                color: TEXT_DIM,
              }}
            >
              {shownSubtitle}
            </div>
          )}
        </div>

        {/* Brand footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid #2a2a2e`,
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
            <span style={{ color: ACCENT }}>VAN</span>
            <span style={{ color: TEXT, marginLeft: 12 }}>INTERTRADE</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: FOOTER }}>
            {SITE_HOST}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
