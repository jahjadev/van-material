import { company } from "@/data/company";
import type { Bi, Faq } from "./types";

/**
 * Public Materion pages that the sourced property values cite. Each value in
 * the data files was read off one of these pages on 2026-10-05.
 */
export const SRC = {
  becuHighStrength:
    "https://www.materion.com/en/products/performance-materials/high-performance-alloys/high-strength-copper-beryllium",
  becuHighConductivity:
    "https://www.materion.com/en/products/performance-materials/high-performance-alloys/high-conductivity-copper-beryllium-alloys",
  moldmax:
    "https://www.materion.com/en/products/performance-materials/high-performance-alloys/moldmax-alloys",
  toughmet:
    "https://www.materion.com/en/products/performance-materials/high-performance-alloys/toughmet-alloys",
} as const;

const tel = company.contact.telsDisplay[0];
const line = company.contact.lineId;

/**
 * The "how much does X cost" FAQ every family and grade carries. Prices are
 * by quotation only (no list prices, no MOQ/stock/lead-time promises), so the
 * answer explains *why* and how to ask.
 */
export function priceFaq(name: Bi): Faq {
  return {
    q: {
      th: `${name.th} ราคาเท่าไร?`,
      en: `What is the price of ${name.en}?`,
    },
    a: {
      th: `ราคา ${name.th} เสนอเป็นใบเสนอราคาต่อครั้ง เพราะราคาขึ้นกับเกรด รูปแบบ (เช่น แท่ง แผ่น แถบ) ขนาด และจำนวนที่สั่ง แจ้งรายละเอียดเหล่านี้ผ่านแบบฟอร์มขอใบเสนอราคา โทร ${tel} หรือ LINE ${line} แล้วทีมงานจะเสนอราคาให้`,
      en: `Prices for ${name.en} are quoted per enquiry, because they depend on the grade, the form (rod, plate, strip and so on), the size and the quantity. Send those details through the quote form, by phone on ${tel} or on LINE ${line}, and we will quote.`,
    },
  };
}

/** Labels for the industry slugs stored on each family (pages come in Task 4). */
export const industryLabels: Record<string, Bi> = {
  "plastic-mold": { th: "แม่พิมพ์พลาสติก", en: "Plastic molds" },
  ev: { th: "ยานยนต์ไฟฟ้า (EV)", en: "Electric vehicles" },
  "oil-gas": { th: "น้ำมันและก๊าซ", en: "Oil & gas" },
  aerospace: { th: "อากาศยาน", en: "Aerospace" },
  automotive: { th: "ยานยนต์", en: "Automotive" },
  switchgear: { th: "สวิตช์เกียร์และอุปกรณ์ตัดต่อไฟฟ้า", en: "Switchgear" },
};

/** Property labels reused across grades so comparison rows line up. */
export const L = {
  tensile: { th: "ความต้านทานแรงดึง (Tensile strength)", en: "Tensile strength" },
  tensileExceed: {
    th: "ความต้านทานแรงดึงสูงสุด (สูงได้เกินค่านี้)",
    en: "Ultimate tensile strength (can exceed)",
  },
  yield: { th: "ความต้านทานแรงคราก (Yield strength)", en: "Yield strength" },
  hardness: { th: "ความแข็ง (Rockwell C)", en: "Hardness (Rockwell C)" },
  elecCond: { th: "การนำไฟฟ้า", en: "Electrical conductivity" },
  thermCond: { th: "การนำความร้อน", en: "Thermal conductivity" },
  modulus: { th: "โมดูลัสยืดหยุ่น (Elastic modulus)", en: "Elastic modulus" },
  density: { th: "ความหนาแน่น", en: "Density" },
  cte: {
    th: "สัมประสิทธิ์การขยายตัวทางความร้อน",
    en: "Thermal expansion coefficient",
  },
} satisfies Record<string, Bi>;
