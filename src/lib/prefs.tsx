"use client";

/**
 * Client-side language context.
 *
 * Language is NOT a stored preference — it is derived from the route. Thai
 * lives at `/`, English at `/en`, and each route group's root layout pins
 * the value here via `<LangProvider lang>`. That is what makes English
 * server-rendered and indexable: a client-only toggle (e.g. localStorage)
 * would ship Thai HTML on every first load and no English copy would ever
 * reach a crawler. One URL is exactly one language; the switcher (see
 * `LangSwitch`) navigates between the two URLs instead of swapping text in
 * place.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Lang } from "./locale";

export type { Lang };

type LangCtx = { lang: Lang };

// Default only matters for a component rendered outside any LangProvider;
// every real tree gets its value from the route group's root layout.
const LangContext = createContext<LangCtx>({ lang: "th" });

export function LangProvider({
  children,
  lang,
}: {
  children: ReactNode;
  /** Pinned by the route group's root layout — `th` under `/`, `en` under `/en`. */
  lang: Lang;
}) {
  const value = useMemo(() => ({ lang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/**
 * Inline a `th`/`en` pair and render whichever matches the route's language.
 * Resolves correctly during SSR since the language comes from the route
 * group, not localStorage — an `/en` page ships English in its HTML.
 */
export function T({ th, en }: { th: ReactNode; en: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : th}</>;
}

/** Pick a localized value from a `th`/`en` pair in plain logic (non-JSX). */
export function useT() {
  const { lang } = useLang();
  return useCallback((th: string, en: string) => (lang === "en" ? en : th), [lang]);
}
