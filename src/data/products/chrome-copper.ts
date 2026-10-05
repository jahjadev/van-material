import type { ProductFamily } from "./types";
import { priceFaq } from "./shared";

/*
 * Chrome copper: no brand is named in the client's legacy copy and no
 * datasheet was provided, so the brand is VAN INTERTRADE, there are no grade
 * pages, and no numeric values are published — only standard, qualitative
 * engineering facts about Cu-Cr and Cu-Cr-Zr.
 */

export const chromeCopper: ProductFamily = {
  slug: "chrome-copper",
  brand: "VAN INTERTRADE",
  keyword: "Chrome Copper (CrCu / CrCuZr)",
  name: { th: "Chrome Copper (ทองแดงโครเมียม)", en: "Chrome Copper" },
  title: {
    th: "CrCu / CrCuZr ทองแดงโครเมียม สำหรับหัวเชื่อม",
    en: "CrCu & CrCuZr Chrome Copper for Electrodes",
  },
  h1: {
    th: "CrCu และ CrCuZr ทองแดงโครเมียม (Chrome Copper) สำหรับงานเชื่อมความต้านทาน",
    en: "CrCu and CrCuZr Chrome Copper",
  },
  summary: {
    th: "Chrome Copper (ทองแดงโครเมียม, CrCu) คือโลหะผสมทองแดงที่เติมโครเมียมเล็กน้อยแล้วทำให้แข็งด้วยการบ่มแข็ง จึงแข็งกว่าทองแดงบริสุทธิ์มากแต่ยังนำไฟฟ้าและความร้อนได้ดี ส่วน CrCuZr (ทองแดงโครเมียมเซอร์โคเนียม) เติมเซอร์โคเนียมเพิ่มเพื่อให้ต้านการอ่อนตัวเมื่อร้อนได้ดีขึ้น ทั้งสองเป็นวัสดุหลักของหัวเชื่อมจุด (spot welding electrode)",
    en: "Chrome copper (CrCu) is a copper alloy with a small chromium addition that is hardened by ageing, so it is much harder than pure copper while still conducting electricity and heat well. CrCuZr adds zirconium for better resistance to softening when hot. Both are standard materials for resistance spot-welding electrodes.",
  },
  description: {
    th: "CrCu และ CrCuZr ทองแดงโครเมียมสำหรับหัวเชื่อมจุด อิเล็กโทรด และชิ้นส่วนนำไฟฟ้าที่ต้องทนร้อน ความต่างของสองเกรด และขอใบเสนอราคา",
    en: "CrCu and CrCuZr chrome copper for spot-welding electrodes, electrode holders and hot-running conductive parts: how the two differ and how to get a quote.",
  },
  body: [
    {
      th: "ในงานเชื่อมจุด หัวเชื่อมต้องนำกระแสสูงผ่านชิ้นงาน ทนแรงกดซ้ำ ๆ และไม่อ่อนตัวจากความร้อนสะสม ทองแดงบริสุทธิ์นำไฟฟ้าดีแต่อ่อนเกินไป CrCu และ CrCuZr จึงเป็นจุดสมดุลระหว่างการนำไฟฟ้ากับความแข็ง",
      en: "A spot-welding electrode has to carry high current into the work, take repeated clamping force and not soften as heat builds up. Pure copper conducts well but is too soft, so CrCu and CrCuZr are the usual balance between conductivity and hardness.",
    },
  ],
  image: {
    src: "/images/hero-rod-light.webp",
    width: 1024,
    height: 1024,
    alt: {
      th: "แท่งทองแดงกลมหลายขนาดวางซ้อนกันบนพื้นสีขาว",
      en: "Round copper alloy rods in several diameters laid on a white surface",
    },
  },
  grades: [],
  variants: [
    {
      name: { th: "CrCu (ทองแดงโครเมียม)", en: "CrCu (copper-chromium)" },
      desc: {
        th: "เกรดพื้นฐานสำหรับหัวเชื่อมจุดและชิ้นส่วนนำไฟฟ้าที่ต้องแข็งกว่าทองแดงบริสุทธิ์",
        en: "The general-purpose grade for spot-welding electrodes and conductive parts that must be harder than pure copper.",
      },
    },
    {
      name: { th: "CrCuZr (ทองแดงโครเมียมเซอร์โคเนียม)", en: "CrCuZr (copper-chromium-zirconium)" },
      desc: {
        th: "เติมเซอร์โคเนียมเพื่อต้านการอ่อนตัวเมื่อร้อนได้ดีขึ้น เหมาะกับงานเชื่อมรอบสูงหรือเชื่อมเหล็กเคลือบผิว",
        en: "Zirconium added for better softening resistance at temperature, suited to high-rate welding or welding coated steel.",
      },
    },
  ],
  forms: [],
  applications: [
    { th: "หัวเชื่อมจุดและแคปหัวเชื่อม", en: "Spot-welding electrodes and caps" },
    { th: "ล้อเชื่อมตะเข็บ (seam welding wheel)", en: "Seam-welding wheels" },
    { th: "ด้ามจับและแขนหัวเชื่อม", en: "Electrode holders and arms" },
    { th: "ชิ้นส่วนนำไฟฟ้าที่ทำงานในอุณหภูมิสูง", en: "Conductive parts that run hot" },
  ],
  industries: ["automotive"],
  faqs: [
    {
      q: { th: "CrCu กับ CrCuZr ต่างกันอย่างไร?", en: "What is the difference between CrCu and CrCuZr?" },
      a: {
        th: "ทั้งสองเป็นทองแดงโครเมียมที่ทำให้แข็งด้วยการบ่มแข็ง CrCuZr เติมเซอร์โคเนียมเพิ่มเพื่อต้านการอ่อนตัวเมื่อร้อนได้ดีขึ้น จึงนิยมในงานเชื่อมรอบสูงหรือเชื่อมเหล็กเคลือบผิว",
        en: "Both are age-hardened chrome coppers. CrCuZr adds zirconium for better resistance to softening at temperature, so it is preferred for high-rate welding or welding coated steel.",
      },
    },
    {
      q: { th: "ทำไมหัวเชื่อมจุดไม่ใช้ทองแดงบริสุทธิ์?", en: "Why aren't spot-welding electrodes made of pure copper?" },
      a: {
        th: "ทองแดงบริสุทธิ์นำไฟฟ้าดีแต่อ่อนและเสียรูปเร็วภายใต้แรงกดและความร้อน CrCu และ CrCuZr แข็งกว่ามากโดยยังนำไฟฟ้าได้ดี หัวเชื่อมจึงคงรูปได้นานกว่า",
        en: "Pure copper conducts well but is soft and deforms quickly under force and heat. CrCu and CrCuZr are much harder while still conducting well, so the electrode keeps its shape longer.",
      },
    },
    priceFaq({ th: "ทองแดงโครเมียม CrCu / CrCuZr", en: "CrCu / CrCuZr chrome copper" }),
  ],
};
