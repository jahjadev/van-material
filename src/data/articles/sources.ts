import { SRC } from "@/data/products/shared";
import type { Ref } from "./types";

/**
 * Reference pages the articles cite. The Materion product pages (`SRC.*`)
 * are the same ones the product data cites; the rest were fetched and read
 * on 2026-10-05 for Task 7.
 */
export const REF = {
  becuHighStrength: { title: "Materion — High-Strength Copper-Beryllium Alloys", url: SRC.becuHighStrength },
  becuHighConductivity: {
    title: "Materion — High-Conductivity Copper-Beryllium Alloys",
    url: SRC.becuHighConductivity,
  },
  becuMagnetic: {
    title: "Materion — In Our Element: What Are the Magnetic Properties of Copper Beryllium?",
    url: SRC.becuMagnetic,
  },
  moldmax: { title: "Materion — MoldMAX Alloys", url: SRC.moldmax },
  sds: {
    title: "Materion — Safety Data Sheet: Copper Beryllium Wrought Alloy (A10, SDS US, rev. 05-07-2025)",
    url: "https://www.materion.com/en/resources/environmental-health-safety/safety-data-sheets/DownloadSds?sdsId=A10_COPPER+BERYLLIUM+WROUGHT+ALLOY+_SDS-US_English.pdf",
  },
  ehs: {
    title: "Materion — Environmental, Health & Safety resources",
    url: "https://www.materion.com/en/resources/environmental-health-safety",
  },
  berylliumSafety: { title: "Materion — Beryllium Safety (berylliumsafety.com)", url: "https://www.berylliumsafety.com/" },
  alcavilC18200: {
    title: "ALCAVIL — RWMA Class 2 C18200 (CuCr) technical data",
    url: "https://www.alcavil.com.mx/en/materials/class-2",
  },
  alcavilC18150: {
    title: "ALCAVIL — RWMA Class 2 C18150 (CuCrZr) technical data",
    url: "https://www.alcavil.com.mx/en/materials/class-2-c18150",
  },
  ampcoCuCrZr: {
    title: "AMPCO METAL Academy — CuCrZr vs. Pure Copper",
    url: "https://academy.ampcometal.com/cucrzr-vs-pure-copper",
  },
} satisfies Record<string, Ref>;
