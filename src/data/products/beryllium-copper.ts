import type { Grade, ProductFamily } from "./types";
import { L, priceFaq, SRC } from "./shared";

/*
 * Alias ↔ UNS mapping verified 2026-10-05 against Materion's
 * high-conductivity CuBe page (SRC.becuHighConductivity), which states:
 * "Alloy 390 and Alloy 390E offer the electrical conductivity of Alloy 3
 * (C17510) or Alloy 174 (C17410) along with the high strength of Alloy 25
 * (C17200)" and "Mill hardened Alloy 390 strip (UNS C17460)".
 *
 * The beryllium-content range from the brief (0.2–2%) is NOT published: no
 * fetched Materion page states it.
 */

const c17200: Grade = {
  slug: "c17200",
  code: "C17200",
  aliases: ["Alloy 25", "UNS C17200", "BeCu 25"],
  title: {
    th: "C17200 Beryllium Copper (Alloy 25) แข็งแรงสูง",
    en: "C17200 Beryllium Copper (Alloy 25)",
  },
  h1: {
    th: "C17200 Beryllium Copper (Alloy 25) เกรดแข็งแรงสูง",
    en: "C17200 Beryllium Copper (Alloy 25)",
  },
  tagline: {
    th: "เกรดที่แข็งแรงที่สุดในกลุ่ม CuBe ของ Materion มีทั้งแท่ง แผ่น แถบ ลวด และท่อ",
    en: "The highest-strength CuBe grade Materion makes, in rod, plate, strip, wire and tube.",
  },
  summary: {
    th: "C17200 (Materion Alloy 25) คือเบริลเลียมคอปเปอร์เกรดความแข็งแรงสูง ซึ่ง Materion ระบุว่าแข็งแรงที่สุดในบรรดาโลหะผสมทองแดงเบริลเลียมทั้งหมดที่ผลิต หลังบ่มแข็ง (age hardening) จะได้ทั้งความแข็งแรงระดับชิ้นส่วนรับแรงและการนำไฟฟ้า/ความร้อนที่สูงกว่าโลหะผสมทองแดงความแข็งแรงสูงชนิดอื่น จึงเป็นตัวเลือกแรกสำหรับสปริง บูช และชิ้นส่วนที่ต้องทนล้า",
    en: "C17200 (Materion Alloy 25) is the high-strength beryllium copper grade, and Materion describes it as the strongest of all the copper-beryllium alloys it makes. After age hardening it pairs load-bearing strength with electrical and thermal conductivity well above other high-strength copper alloys, which makes it the default choice for springs, bushings and fatigue-loaded parts.",
  },
  description: {
    th: "C17200 Beryllium Copper (Alloy 25) จาก Materion: ค่าทางเทคนิคพร้อมแหล่งอ้างอิง รูปแบบสินค้า งานที่เหมาะ และขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "C17200 beryllium copper (Materion Alloy 25): sourced properties, available forms, typical uses, and a quote from VAN INTERTRADE in Thailand.",
  },
  properties: [
    { label: L.tensileExceed, value: "1380", unit: "MPa (200 ksi)", source: SRC.becuHighStrength },
    { label: L.elecCond, value: "25–30", unit: "% IACS", source: SRC.becuHighStrength },
    { label: L.thermCond, value: "105", unit: "W/m·K", source: SRC.becuHighStrength },
    { label: L.modulus, value: "131", unit: "GPa", source: SRC.becuHighStrength },
    { label: L.density, value: "8.36", unit: "g/cm³", source: SRC.becuHighStrength },
    { label: L.cte, value: "17.5", unit: "×10⁻⁶ /°C (20–200 °C)", source: SRC.becuHighStrength },
  ],
  propertiesNote: {
    th: "ค่าจาก Materion สำหรับ Alloy 25 แบบแท่ง (rod & bar) ในสภาพบ่มแข็งแล้ว ค่าจริงขึ้นกับ temper และรูปแบบสินค้า ตรวจสอบกับ datasheet ก่อนออกแบบ",
    en: "Materion figures for Alloy 25 rod & bar in the age-hardened condition. Actual values depend on temper and product form; confirm against the datasheet before design.",
  },
  forms: [
    { th: "แถบ (strip)", en: "Strip" },
    { th: "แท่งกลม (rod)", en: "Rod" },
    { th: "แท่งเหลี่ยม/แบน (bar)", en: "Bar" },
    { th: "แผ่นหนา (plate)", en: "Plate" },
    { th: "ลวด (wire)", en: "Wire" },
    { th: "ท่อ (tube)", en: "Tube" },
    { th: "ชิ้นงานตีขึ้นรูปและรีดขึ้นรูป (forging, extrusion)", en: "Forgings and extrusions" },
  ],
  applications: [
    { th: "อุปกรณ์ขุดเจาะน้ำมันและก๊าซ", en: "Oil & gas drilling equipment" },
    { th: "บูชและแบริ่งในอากาศยาน", en: "Aerospace bushings and bearings" },
    { th: "แผ่นรับการสึกหรอในเครื่องจักร (wear plate)", en: "Industrial wear plates" },
    { th: "คอนเนคเตอร์ทรงกลมและโคแอกเชียล", en: "Circular and coaxial connectors" },
    { th: "สปริงและชิ้นส่วนที่รับแรงซ้ำ ๆ", en: "Springs and cyclically loaded parts" },
  ],
  faqs: [
    {
      q: { th: "C17200 กับ Alloy 25 คือวัสดุเดียวกันไหม?", en: "Is C17200 the same as Alloy 25?" },
      a: {
        th: "ใช่ C17200 คือหมายเลข UNS ส่วน Alloy 25 คือชื่อที่ Materion ใช้เรียกเกรดเดียวกันนี้",
        en: "Yes. C17200 is the UNS number and Alloy 25 is Materion's name for the same grade.",
      },
    },
    {
      q: { th: "C17200 นำไฟฟ้าได้เท่าไร?", en: "What is the electrical conductivity of C17200?" },
      a: {
        th: "Materion ระบุค่าการนำไฟฟ้าของ Alloy 25 แบบแท่งในสภาพบ่มแข็งไว้ที่ 25–30% IACS หากงานเน้นการนำไฟฟ้ามากกว่าความแข็งแรง ให้พิจารณา C17510 (Alloy 3)",
        en: "Materion lists Alloy 25 rod and bar in the age-hardened condition at 25–30% IACS. If conductivity matters more than strength, look at C17510 (Alloy 3).",
      },
    },
    priceFaq({ th: "C17200", en: "C17200" }),
  ],
};

const c17410: Grade = {
  slug: "c17410",
  code: "C17410",
  aliases: ["Alloy 174", "UNS C17410"],
  title: {
    th: "C17410 Beryllium Copper (Alloy 174) งานสปริง",
    en: "C17410 Beryllium Copper (Alloy 174)",
  },
  h1: {
    th: "C17410 Beryllium Copper (Alloy 174) สำหรับคอนเนคเตอร์สปริง",
    en: "C17410 Beryllium Copper (Alloy 174)",
  },
  tagline: {
    th: "แถบ CuBe สำหรับคอนเนคเตอร์สปริง ขึ้นรูปซับซ้อนได้ง่าย",
    en: "CuBe strip for spring connectors that forms into complex shapes.",
  },
  summary: {
    th: "C17410 (Materion Alloy 174) คือเบริลเลียมคอปเปอร์แบบแถบสำหรับคอนเนคเตอร์สปริง ที่ Materion ระบุว่านำไฟฟ้าได้ราวสองเท่าของทองเหลือง รับการเสียบ-ถอดซ้ำได้หลายรอบ และขึ้นรูปเป็นชิ้นงานซับซ้อนได้ง่าย เดิมออกแบบมาสำหรับอุตสาหกรรมยานยนต์และโทรคมนาคม",
    en: "C17410 (Materion Alloy 174) is a beryllium copper strip for spring connectors that, according to Materion, conducts about twice as well as brass, survives many repeated mating cycles and forms easily into complex shapes. It was originally designed for automotive and telecom connectors.",
  },
  description: {
    th: "C17410 Beryllium Copper (Alloy 174) แถบสำหรับคอนเนคเตอร์สปริง จาก Materion รูปแบบ การใช้งาน และขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "C17410 beryllium copper (Materion Alloy 174) strip for spring connectors: what it is, coatings, typical uses, and a quote from VAN INTERTRADE.",
  },
  properties: [],
  forms: [
    { th: "แถบ (strip)", en: "Strip" },
    { th: "แถบเคลือบดีบุก (tin-coated strip)", en: "Tin-coated strip" },
    { th: "แถบฝังโลหะมีค่า (precious-metal inlay)", en: "Strip with precious-metal inlay" },
  ],
  applications: [
    { th: "คอนเนคเตอร์ยานยนต์", en: "Automotive connectors" },
    { th: "คอนเนคเตอร์และคอนแทคโทรคมนาคม/ดาต้าเซ็นเตอร์", en: "Telecom and data-centre connectors" },
    { th: "คอนแทคสปริงขนาดเล็กที่ต้องรักษาแรงกด", en: "Miniature spring contacts that must hold contact force" },
  ],
  faqs: [
    {
      q: { th: "C17410 ต่างจาก C17200 อย่างไร?", en: "How does C17410 differ from C17200?" },
      a: {
        th: "C17200 (Alloy 25) เน้นความแข็งแรงสูงสุด ส่วน C17410 (Alloy 174) เป็นแถบสำหรับคอนเนคเตอร์สปริงที่เน้นการนำไฟฟ้า ความทนต่อการเสียบ-ถอดซ้ำ และการขึ้นรูปง่าย",
        en: "C17200 (Alloy 25) is chosen for maximum strength. C17410 (Alloy 174) is a connector spring strip chosen for conductivity, repeated-cycle life and easy forming.",
      },
    },
    {
      q: { th: "C17410 มีแบบเคลือบผิวไหม?", en: "Is C17410 available coated?" },
      a: {
        th: "Materion ระบุว่า Alloy 174 มีแบบเคลือบดีบุกและแบบฝังโลหะมีค่า แจ้งความต้องการในใบขอราคาได้",
        en: "Materion offers Alloy 174 with tin coatings or precious-metal inlays. State what you need in your quote request.",
      },
    },
    priceFaq({ th: "C17410", en: "C17410" }),
  ],
};

const c17510: Grade = {
  slug: "c17510",
  code: "C17510",
  aliases: ["Alloy 3", "UNS C17510"],
  title: {
    th: "C17510 Beryllium Copper (Alloy 3) นำไฟฟ้าสูง",
    en: "C17510 High-Conductivity BeCu (Alloy 3)",
  },
  h1: {
    th: "C17510 Beryllium Copper (Alloy 3) เกรดนำไฟฟ้าสูง",
    en: "C17510 High-Conductivity Beryllium Copper (Alloy 3)",
  },
  tagline: {
    th: "CuNiBe นำไฟฟ้าและความร้อนสูง ทนการคลายความเค้นได้ดี",
    en: "Copper-nickel-beryllium with high conductivity and good stress-relaxation resistance.",
  },
  summary: {
    th: "C17510 (Materion Alloy 3) คือเบริลเลียมคอปเปอร์เกรดนำไฟฟ้าสูงชนิดทองแดง-นิกเกิล-เบริลเลียม ที่ให้ความแข็งแรงดีควบคู่กับการนำไฟฟ้าและความร้อนสูง ทนการคลายความเค้น (stress relaxation) และคงความแข็งแรงที่อุณหภูมิสูงได้ดี เหมาะกับชิ้นส่วนที่ต้องนำกระแสหรือระบายความร้อนมากกว่ารับแรงสูงสุด",
    en: "C17510 (Materion Alloy 3) is a high-conductivity copper-nickel-beryllium alloy that offers good strength together with high electrical and thermal conductivity, good stress-relaxation resistance and good strength at elevated temperature. It suits parts that must carry current or move heat rather than take the highest loads.",
  },
  description: {
    th: "C17510 Beryllium Copper (Alloy 3) เกรดนำไฟฟ้าสูงจาก Materion: ค่าการนำไฟฟ้าและความร้อนพร้อมแหล่งอ้างอิง งานที่เหมาะ และขอใบเสนอราคา",
    en: "C17510 high-conductivity beryllium copper (Materion Alloy 3): sourced conductivity and thermal data, typical uses, and a quote from VAN INTERTRADE.",
  },
  properties: [
    { label: L.elecCond, value: "45–60", unit: "% IACS", source: SRC.becuHighConductivity },
    { label: L.thermCond, value: "240", unit: "W/m·K", source: SRC.becuHighConductivity },
    { label: L.modulus, value: "138", unit: "GPa", source: SRC.becuHighConductivity },
    { label: L.density, value: "8.83", unit: "g/cm³", source: SRC.becuHighConductivity },
    { label: L.cte, value: "17.6", unit: "×10⁻⁶ /°C (20–200 °C)", source: SRC.becuHighConductivity },
  ],
  propertiesNote: {
    th: "ค่าจาก Materion สำหรับ Alloy 3 แบบแถบ (strip) ในสภาพบ่มแข็งแล้ว ค่าจริงขึ้นกับ temper และรูปแบบสินค้า ตรวจสอบกับ datasheet ก่อนออกแบบ",
    en: "Materion figures for Alloy 3 strip in the age-hardened condition. Actual values depend on temper and product form; confirm against the datasheet before design.",
  },
  forms: [
    { th: "แถบ (strip)", en: "Strip" },
    { th: "ลวด (wire)", en: "Wire" },
  ],
  applications: [
    { th: "คอนแทคไฟฟ้าและชิ้นส่วนสปริง", en: "Electronic contacts and spring parts" },
    { th: "ขั้วต่อยานยนต์ที่ต้องการความน่าเชื่อถือสูง", en: "High-reliability automotive terminals" },
    { th: "คอนแทคสปริงในสวิตช์และรีเลย์", en: "Spring contacts for switches and relays" },
  ],
  faqs: [
    {
      q: { th: "ควรเลือก C17510 หรือ C17200?", en: "Should I choose C17510 or C17200?" },
      a: {
        th: "เลือก C17200 (Alloy 25) เมื่อความแข็งแรงสำคัญที่สุด และเลือก C17510 (Alloy 3) เมื่อการนำไฟฟ้า/ความร้อนสำคัญกว่า โดย Materion ระบุ Alloy 3 ไว้ที่ 45–60% IACS เทียบกับ 25–30% IACS ของ Alloy 25",
        en: "Choose C17200 (Alloy 25) when strength comes first and C17510 (Alloy 3) when conductivity comes first. Materion lists Alloy 3 at 45–60% IACS against 25–30% IACS for Alloy 25.",
      },
    },
    {
      q: { th: "C17510 คือ Alloy 3 ใช่ไหม?", en: "Is C17510 the same as Alloy 3?" },
      a: {
        th: "ใช่ C17510 คือหมายเลข UNS ของ Materion Alloy 3",
        en: "Yes. C17510 is the UNS number of Materion Alloy 3.",
      },
    },
    priceFaq({ th: "C17510", en: "C17510" }),
  ],
};

const c17460: Grade = {
  slug: "c17460",
  code: "C17460",
  aliases: ["Alloy 390", "UNS C17460"],
  title: {
    th: "C17460 Beryllium Copper (Alloy 390) แถบคอนแทค",
    en: "C17460 Beryllium Copper (Alloy 390)",
  },
  h1: {
    th: "C17460 Beryllium Copper (Alloy 390) แถบชุบแข็งจากโรงงาน",
    en: "C17460 Beryllium Copper (Alloy 390) Strip",
  },
  tagline: {
    th: "แถบ mill-hardened ที่รวมการนำไฟฟ้าสูงกับความแข็งแรงสูง",
    en: "Mill-hardened strip combining high conductivity with high strength.",
  },
  summary: {
    th: "C17460 (Materion Alloy 390) คือแถบเบริลเลียมคอปเปอร์ที่ชุบแข็งมาจากโรงงาน (mill hardened) ซึ่ง Materion ออกแบบให้นำไฟฟ้าได้ระดับเดียวกับ Alloy 3 หรือ Alloy 174 แต่แข็งแรงใกล้เคียง Alloy 25 พร้อมทนการคลายความเค้นได้ดี จึงเหมาะกับคอนแทคขนาดเล็กที่ต้องการความน่าเชื่อถือสูง",
    en: "C17460 (Materion Alloy 390) is a mill-hardened beryllium copper strip that Materion designed to give the conductivity of Alloy 3 or Alloy 174 with the strength of Alloy 25, plus good stress-relaxation resistance. That makes it a fit for small, high-reliability contacts.",
  },
  description: {
    th: "C17460 Beryllium Copper (Alloy 390) แถบ mill hardened จาก Materion สำหรับคอนแทคขนาดเล็ก รายละเอียด การใช้งาน และขอใบเสนอราคา",
    en: "C17460 beryllium copper (Materion Alloy 390), a mill-hardened strip for small, high-reliability contacts: what it is, uses, and how to request a quote.",
  },
  properties: [],
  forms: [{ th: "แถบชุบแข็งจากโรงงาน (mill-hardened strip)", en: "Mill-hardened strip" }],
  applications: [
    { th: "คอนแทคสัญญาณและกำลังไฟขนาดเล็ก", en: "Small signal and power interconnects" },
    { th: "คอนเนคเตอร์ที่ใช้งานในสภาพแวดล้อมรุนแรง", en: "Connectors for harsh environments" },
  ],
  faqs: [
    {
      q: { th: "C17460 ต้องอบบ่มแข็งเองหลังขึ้นรูปไหม?", en: "Does C17460 need heat treatment after forming?" },
      a: {
        th: "Alloy 390 จำหน่ายเป็นแถบที่ชุบแข็งมาจากโรงงานแล้ว (mill hardened) ตรวจสอบเงื่อนไขการขึ้นรูปของ temper ที่เลือกกับ datasheet ของ Materion",
        en: "Alloy 390 is supplied as mill-hardened strip, so it arrives already hardened. Check the forming limits of your chosen temper in the Materion datasheet.",
      },
    },
    priceFaq({ th: "C17460", en: "C17460" }),
  ],
};

export const berylliumCopper: ProductFamily = {
  slug: "beryllium-copper",
  brand: "Materion",
  keyword: "Beryllium Copper",
  name: { th: "Beryllium Copper (เบริลเลียมคอปเปอร์)", en: "Beryllium Copper" },
  title: {
    th: "Beryllium Copper เบริลเลียมคอปเปอร์ จาก Materion",
    en: "Beryllium Copper Alloys from Materion, Thailand",
  },
  h1: {
    th: "Beryllium Copper (เบริลเลียมคอปเปอร์) จาก Materion",
    en: "Beryllium Copper Alloys from Materion",
  },
  summary: {
    th: "Beryllium Copper (ทองแดงเบริลเลียม, CuBe หรือ BeCu) คือกลุ่มโลหะผสมทองแดงที่ทำให้แข็งได้ด้วยการบ่มแข็ง (age hardening) จึงได้ทั้งความแข็งแรงสูงและการนำไฟฟ้า/ความร้อนที่ดีในวัสดุเดียว แวน อินเตอร์เทรด จำหน่าย Beryllium Copper ของ Materion ในประเทศไทย ตั้งแต่เกรดแข็งแรงสูง C17200 ไปจนถึงเกรดนำไฟฟ้าสูง",
    en: "Beryllium copper (CuBe or BeCu) is a family of copper alloys hardened by age hardening, which gives high strength and good electrical and thermal conductivity in one material. VAN INTERTRADE supplies Materion beryllium copper in Thailand, from the high-strength C17200 grade to the high-conductivity grades.",
  },
  description: {
    th: "Beryllium Copper (เบริลเลียมคอปเปอร์) ของ Materion ครบทั้งเกรดแข็งแรงสูงและนำไฟฟ้าสูง เทียบเกรด รูปแบบ แท่ง แผ่น แถบ ลวด ท่อ และขอใบเสนอราคา",
    en: "Materion beryllium copper in Thailand: compare the high-strength and high-conductivity grades, see forms from rod to strip, and request a quotation.",
  },
  body: [
    {
      th: "เกรดแบ่งตามสิ่งที่งานต้องการเป็นหลัก ถ้าต้องการแรงสปริงและความทนล้าสูงสุด ให้เริ่มที่ C17200 (Alloy 25) ถ้าต้องการนำกระแสหรือระบายความร้อนมากขึ้นโดยยังแข็งแรงพอ ให้ดู C17510 (Alloy 3) ส่วนงานคอนเนคเตอร์แบบแถบมี C17410 (Alloy 174) และ C17460 (Alloy 390)",
      en: "Pick the grade by what the part needs most. For the highest spring force and fatigue life, start with C17200 (Alloy 25). To carry more current or move more heat while keeping useful strength, look at C17510 (Alloy 3). For connector strip there are C17410 (Alloy 174) and C17460 (Alloy 390).",
    },
    {
      th: "Beryllium Copper ไม่เป็นแม่เหล็กและไม่เกิดประกายไฟเมื่อกระทบ การใช้งานชิ้นงานสำเร็จปกติไม่มีข้อกังวลพิเศษ แต่ฝุ่น ไอ หรือละอองที่เกิดจากการเจียร ขัด เชื่อม หรือกลึงแบบแห้ง ต้องควบคุมตามเอกสารความปลอดภัย (SDS) ของ Materion และกฎหมายที่เกี่ยวข้อง",
      en: "Beryllium copper is non-magnetic and non-sparking. Finished parts need no special handling, but dust, fumes or mist from grinding, polishing, welding or dry machining must be controlled as Materion's safety data sheet and local regulations require.",
    },
  ],
  image: {
    src: "/images/product-cube.webp",
    width: 1024,
    height: 1024,
    alt: {
      th: "แท่งกลมและแท่งแบน Beryllium Copper หลายขนาดวางเรียงบนแท่นสีขาว",
      en: "Beryllium copper round rods and flat bars in several sizes on a white stand",
    },
  },
  grades: [c17200, c17510, c17410, c17460],
  variants: [],
  forms: [
    { th: "แท่งกลม (rod)", en: "Rod" },
    { th: "แท่งเหลี่ยม/แบน (bar)", en: "Bar" },
    { th: "แผ่นหนา (plate)", en: "Plate" },
    { th: "แถบ (strip)", en: "Strip" },
    { th: "ลวด (wire)", en: "Wire" },
    { th: "ท่อ (tube)", en: "Tube" },
  ],
  applications: [
    { th: "สปริงและคอนแทคไฟฟ้า", en: "Springs and electrical contacts" },
    { th: "คอนเนคเตอร์ยานยนต์และ EV", en: "Automotive and EV connectors" },
    { th: "บูชและแบริ่งรับโหลดสูง", en: "High-load bushings and bearings" },
    { th: "เครื่องมือ non-sparking", en: "Non-sparking tools" },
    { th: "ชิ้นส่วนอากาศยานและงานขุดเจาะน้ำมัน", en: "Aerospace and oil & gas components" },
  ],
  industries: ["ev", "automotive", "aerospace", "oil-gas"],
  faqs: [
    {
      q: { th: "Beryllium Copper คืออะไร?", en: "What is beryllium copper?" },
      a: {
        th: "Beryllium Copper (CuBe/BeCu) คือโลหะผสมทองแดงที่ทำให้แข็งด้วยการบ่มแข็ง ได้ความแข็งแรงสูงพร้อมการนำไฟฟ้าและความร้อนที่ดี ไม่เป็นแม่เหล็กและไม่เกิดประกายไฟ",
        en: "Beryllium copper (CuBe/BeCu) is a copper alloy hardened by age hardening. It combines high strength with good electrical and thermal conductivity, and it is non-magnetic and non-sparking.",
      },
    },
    {
      q: { th: "C17200 กับ C17510 ต่างกันอย่างไร?", en: "What is the difference between C17200 and C17510?" },
      a: {
        th: "C17200 (Alloy 25) คือเกรดแข็งแรงสูง ส่วน C17510 (Alloy 3) คือเกรดนำไฟฟ้าสูง Materion ระบุการนำไฟฟ้าในสภาพบ่มแข็งไว้ที่ 25–30% IACS สำหรับ Alloy 25 และ 45–60% IACS สำหรับ Alloy 3",
        en: "C17200 (Alloy 25) is the high-strength grade and C17510 (Alloy 3) is the high-conductivity grade. In the age-hardened condition Materion lists 25–30% IACS for Alloy 25 and 45–60% IACS for Alloy 3.",
      },
    },
    {
      q: { th: "กลึงหรือเจียร Beryllium Copper ปลอดภัยไหม?", en: "Is it safe to machine beryllium copper?" },
      a: {
        th: "ชิ้นงานสำเร็จใช้งานได้ตามปกติ ความเสี่ยงอยู่ที่ฝุ่น ไอ หรือละอองจากการเจียร ขัด เชื่อม หรือกลึงแบบแห้ง ซึ่งต้องควบคุมตาม SDS ของ Materion และกฎหมายที่เกี่ยวข้อง",
        en: "Finished parts are handled normally. The hazard is dust, fumes or mist from grinding, polishing, welding or dry machining, which must be controlled as Materion's SDS and local regulations require.",
      },
    },
    priceFaq({ th: "Beryllium Copper", en: "beryllium copper" }),
  ],
};
