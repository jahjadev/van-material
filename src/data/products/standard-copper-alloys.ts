import type { Bi, Grade, ProductFamily } from "./types";
import { priceFaq } from "./shared";

/*
 * Standard copper alloys (JIS designations C5191, C5210, C1100). No brand
 * is named in the client's legacy copy and no datasheet was provided, so the
 * brand is VAN INTERTRADE and no numeric property values are published
 * (no fetched Materion/Longsun source covers these grades). Copy sticks to
 * standard, qualitative facts about phosphor bronze and tough-pitch copper.
 *
 * Forms are not claimed (the legacy copy names none for this line); sizes and
 * forms are confirmed per quotation.
 */

const noForms: Bi[] = [];

const c5191: Grade = {
  slug: "c5191",
  code: "C5191",
  aliases: ["JIS C5191", "Phosphor bronze C5191"],
  title: {
    th: "C5191 Phosphor Bronze ฟอสเฟอร์บรอนซ์",
    en: "C5191 Phosphor Bronze",
  },
  h1: {
    th: "C5191 Phosphor Bronze (ฟอสเฟอร์บรอนซ์)",
    en: "C5191 Phosphor Bronze",
  },
  tagline: {
    th: "ฟอสเฟอร์บรอนซ์มาตรฐาน JIS สำหรับขั้วต่อและสปริงในงานอิเล็กทรอนิกส์",
    en: "JIS phosphor bronze for terminals and springs in electronics.",
  },
  summary: {
    th: "C5191 คือฟอสเฟอร์บรอนซ์ (โลหะผสมทองแดง-ดีบุก-ฟอสฟอรัส) ตามมาตรฐาน JIS ที่ขึ้นรูปได้ดี มีความยืดหยุ่นแบบสปริง ทนความล้าและทนสึกหรอ จึงใช้กันแพร่หลายในขั้วต่อ คอนเนคเตอร์ และสปริงในอุปกรณ์อิเล็กทรอนิกส์ทั่วไป",
    en: "C5191 is a JIS phosphor bronze (a copper-tin-phosphorus alloy) that forms well and offers good spring properties, fatigue resistance and wear resistance, which is why it is widely used for terminals, connectors and springs in general electronics.",
  },
  description: {
    th: "C5191 Phosphor Bronze (ฟอสเฟอร์บรอนซ์) มาตรฐาน JIS สำหรับขั้วต่อ คอนเนคเตอร์ และสปริง เทียบกับ C5210 และขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "C5191 phosphor bronze (JIS) for terminals, connectors and springs: what it is, how it compares with C5210, and a quote from VAN INTERTRADE.",
  },
  properties: [],
  forms: noForms,
  applications: [
    { th: "ขั้วต่อและคอนเนคเตอร์", en: "Terminals and connectors" },
    { th: "สปริงและแผ่นสปริงในสวิตช์", en: "Springs and switch spring parts" },
    { th: "ชิ้นส่วนอิเล็กทรอนิกส์ทั่วไป", en: "General electronic parts" },
  ],
  faqs: [
    {
      q: { th: "C5191 คือวัสดุอะไร?", en: "What material is C5191?" },
      a: {
        th: "C5191 คือฟอสเฟอร์บรอนซ์ (ทองแดง-ดีบุก-ฟอสฟอรัส) ตามมาตรฐาน JIS ใช้ทำขั้วต่อ คอนเนคเตอร์ และสปริง",
        en: "C5191 is a JIS phosphor bronze (copper-tin-phosphorus) used for terminals, connectors and springs.",
      },
    },
    {
      q: { th: "C5191 กับ C5210 ต่างกันอย่างไร?", en: "What is the difference between C5191 and C5210?" },
      a: {
        th: "ทั้งคู่เป็นฟอสเฟอร์บรอนซ์ C5210 มีดีบุกมากกว่า จึงแข็งแรงและให้แรงสปริงสูงกว่า ส่วน C5191 ขึ้นรูปได้ง่ายกว่า",
        en: "Both are phosphor bronzes. C5210 carries more tin, so it is stronger with more spring force, while C5191 is easier to form.",
      },
    },
    priceFaq({ th: "C5191", en: "C5191" }),
  ],
};

const c5210: Grade = {
  slug: "c5210",
  code: "C5210",
  aliases: ["JIS C5210", "Phosphor bronze C5210"],
  title: {
    th: "C5210 Phosphor Bronze ฟอสเฟอร์บรอนซ์งานสปริง",
    en: "C5210 Spring Phosphor Bronze",
  },
  h1: {
    th: "C5210 Phosphor Bronze (ฟอสเฟอร์บรอนซ์) สำหรับงานสปริง",
    en: "C5210 Phosphor Bronze for Springs",
  },
  tagline: {
    th: "ฟอสเฟอร์บรอนซ์ดีบุกสูงกว่า C5191 ให้แรงสปริงมากกว่า",
    en: "Higher-tin phosphor bronze than C5191, for more spring force.",
  },
  summary: {
    th: "C5210 คือฟอสเฟอร์บรอนซ์ตามมาตรฐาน JIS ที่มีดีบุกมากกว่า C5191 จึงแข็งแรงและให้แรงสปริงสูงกว่า นิยมใช้กับสปริงและคอนแทคที่ต้องคงแรงกดได้นาน",
    en: "C5210 is a JIS phosphor bronze with more tin than C5191, which makes it stronger with more spring force. It is the usual choice for springs and contacts that must hold their force over time.",
  },
  description: {
    th: "C5210 Phosphor Bronze มาตรฐาน JIS สำหรับสปริงและคอนแทค แข็งแรงกว่า C5191 รายละเอียด การใช้งาน และขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "C5210 phosphor bronze (JIS) for springs and contacts, stronger than C5191: what it is, typical uses and a quote from VAN INTERTRADE.",
  },
  properties: [],
  forms: noForms,
  applications: [
    { th: "สปริงแผ่นและสปริงขดขนาดเล็ก", en: "Flat and small coil springs" },
    { th: "คอนแทคในสวิตช์และรีเลย์", en: "Switch and relay contacts" },
    { th: "คอนเนคเตอร์ที่ต้องคงแรงกด", en: "Connectors that must hold contact force" },
  ],
  faqs: [
    {
      q: { th: "ควรเลือก C5210 เมื่อไร?", en: "When should I choose C5210?" },
      a: {
        th: "เลือก C5210 เมื่องานต้องการแรงสปริงและความแข็งแรงมากกว่าที่ C5191 ให้ได้ เช่น สปริงและคอนแทคที่ต้องคงแรงกดนาน",
        en: "Choose C5210 when the part needs more spring force and strength than C5191 gives, such as springs and contacts that must hold their force.",
      },
    },
    priceFaq({ th: "C5210", en: "C5210" }),
  ],
};

const c1100: Grade = {
  slug: "c1100",
  code: "C1100",
  aliases: ["JIS C1100", "Tough-pitch copper", "ETP copper"],
  title: {
    th: "C1100 Tough-Pitch Copper ทองแดงบริสุทธิ์",
    en: "C1100 Tough-Pitch Copper",
  },
  h1: {
    th: "C1100 Tough-Pitch Copper (ทองแดงบริสุทธิ์สูง)",
    en: "C1100 Tough-Pitch Copper",
  },
  tagline: {
    th: "ทองแดงบริสุทธิ์สูง นำไฟฟ้าและความร้อนดีเยี่ยม ขึ้นรูปง่าย",
    en: "High-purity copper with excellent conductivity and formability.",
  },
  summary: {
    th: "C1100 คือทองแดงบริสุทธิ์สูงชนิด tough-pitch ตามมาตรฐาน JIS ที่นำไฟฟ้าและความร้อนได้ดีเยี่ยม ดัด พับ และขึ้นรูปได้ง่าย จึงเป็นวัสดุพื้นฐานของบัสบาร์ ขั้วต่อ และชิ้นส่วนนำไฟฟ้าทั่วไป",
    en: "C1100 is a JIS high-purity tough-pitch copper with excellent electrical and thermal conductivity that bends, folds and forms easily, making it the base material for busbars, terminals and general conductive parts.",
  },
  description: {
    th: "C1100 Tough-Pitch Copper ทองแดงบริสุทธิ์สูงมาตรฐาน JIS สำหรับบัสบาร์ ขั้วต่อ และชิ้นส่วนนำไฟฟ้า รายละเอียดและขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "C1100 tough-pitch copper (JIS) for busbars, terminals and conductive parts: what it is, typical uses and a quote from VAN INTERTRADE in Thailand.",
  },
  properties: [],
  forms: noForms,
  applications: [
    { th: "บัสบาร์และตัวนำในตู้ไฟฟ้า", en: "Busbars and switchboard conductors" },
    { th: "ขั้วต่อและชิ้นส่วนนำไฟฟ้า", en: "Terminals and conductive parts" },
    { th: "ชิ้นส่วนระบายความร้อน", en: "Heat-dissipating parts" },
  ],
  faqs: [
    {
      q: { th: "C1100 เหมาะกับงานแบบไหน?", en: "What is C1100 used for?" },
      a: {
        th: "C1100 เหมาะกับงานที่ต้องการการนำไฟฟ้าหรือความร้อนสูงและไม่ต้องรับแรงสปริง เช่น บัสบาร์ ขั้วต่อ และชิ้นส่วนระบายความร้อน",
        en: "C1100 suits parts that need high electrical or thermal conductivity without spring duty, such as busbars, terminals and heat-dissipating parts.",
      },
    },
    priceFaq({ th: "C1100", en: "C1100" }),
  ],
};

export const standardCopperAlloys: ProductFamily = {
  slug: "standard-copper-alloys",
  brand: "VAN INTERTRADE",
  keyword: "Standard Copper Alloys",
  name: { th: "Standard Copper Alloys (ทองแดงผสมมาตรฐาน)", en: "Standard Copper Alloys" },
  title: {
    th: "Standard Copper Alloys ฟอสเฟอร์บรอนซ์และทองแดง",
    en: "Standard Copper Alloys: Phosphor Bronze & Copper",
  },
  h1: {
    th: "Standard Copper Alloys ฟอสเฟอร์บรอนซ์และทองแดงมาตรฐาน JIS",
    en: "Standard Copper Alloys: Phosphor Bronze and Copper",
  },
  summary: {
    th: "Standard Copper Alloys คือโลหะผสมทองแดงเกรดมาตรฐาน JIS ที่ใช้กันทั่วไปในงานอิเล็กทรอนิกส์และไฟฟ้า แวน อินเตอร์เทรด จัดหาฟอสเฟอร์บรอนซ์สำหรับขั้วต่อและสปริง และทองแดงบริสุทธิ์สูงสำหรับงานนำไฟฟ้า เมื่องานไม่ต้องการสมรรถนะระดับ Beryllium Copper",
    en: "Standard copper alloys are the everyday JIS grades used across electronics and electrical work. VAN INTERTRADE supplies phosphor bronze for terminals and springs and high-purity copper for conductors, for parts that don't need beryllium copper performance.",
  },
  description: {
    th: "โลหะผสมทองแดงมาตรฐาน JIS: ฟอสเฟอร์บรอนซ์สำหรับขั้วต่อและสปริง และทองแดงบริสุทธิ์สูงสำหรับงานไฟฟ้า เทียบเกรดและขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "Standard JIS copper alloys: phosphor bronze for terminals and springs and high-purity copper for conductors. Compare grades and request a quote.",
  },
  body: [
    {
      th: "ฟอสเฟอร์บรอนซ์ให้แรงสปริงและทนความล้าในราคาที่เข้าถึงง่ายกว่าโลหะผสมสมรรถนะสูง ส่วนทองแดง tough-pitch เน้นการนำไฟฟ้าและการขึ้นรูป ถ้างานต้องการทั้งแรงสปริงสูงและนำไฟฟ้าดีพร้อมกัน ให้ดู Beryllium Copper",
      en: "Phosphor bronze gives spring force and fatigue resistance at a lower cost than high-performance alloys, while tough-pitch copper is about conductivity and formability. If a part needs high spring force and high conductivity together, look at beryllium copper.",
    },
  ],
  image: {
    src: "/images/product-standard.webp",
    width: 1010,
    height: 640,
    alt: {
      th: "ม้วนแถบทองแดงสองม้วนกับขั้วต่อขนาดเล็กที่ปั๊มขึ้นรูปวางข้างกัน",
      en: "Two coils of copper alloy strip beside a pile of small stamped connector terminals",
    },
  },
  grades: [c5191, c5210, c1100],
  variants: [],
  forms: [],
  applications: [
    { th: "ขั้วต่อและคอนเนคเตอร์", en: "Terminals and connectors" },
    { th: "สปริงและคอนแทคในสวิตช์และรีเลย์", en: "Springs and switch and relay contacts" },
    { th: "บัสบาร์และตัวนำไฟฟ้า", en: "Busbars and conductors" },
  ],
  industries: ["automotive", "switchgear"],
  faqs: [
    {
      q: { th: "ฟอสเฟอร์บรอนซ์คืออะไร?", en: "What is phosphor bronze?" },
      a: {
        th: "ฟอสเฟอร์บรอนซ์คือโลหะผสมทองแดง-ดีบุกที่เติมฟอสฟอรัสเล็กน้อย ให้แรงสปริง ทนความล้า และทนสึกหรอ ใช้ทำขั้วต่อ คอนเนคเตอร์ และสปริง",
        en: "Phosphor bronze is a copper-tin alloy with a small phosphorus addition. It offers spring force, fatigue resistance and wear resistance, and is used for terminals, connectors and springs.",
      },
    },
    {
      q: { th: "เมื่อไรควรใช้ Beryllium Copper แทนฟอสเฟอร์บรอนซ์?", en: "When should I use beryllium copper instead of phosphor bronze?" },
      a: {
        th: "เมื่องานต้องการแรงสปริงหรือความแข็งแรงสูงกว่าที่ฟอสเฟอร์บรอนซ์ให้ได้ หรือต้องการทั้งความแข็งแรงและการนำไฟฟ้าสูงพร้อมกัน",
        en: "When the part needs more spring force or strength than phosphor bronze can give, or needs high strength and high conductivity at the same time.",
      },
    },
    priceFaq({ th: "โลหะผสมทองแดงมาตรฐาน", en: "standard copper alloys" }),
  ],
};
