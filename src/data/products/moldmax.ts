import type { Bi, Grade, Property, ProductFamily } from "./types";
import { L, priceFaq, SRC } from "./shared";

/*
 * All MoldMAX facts and numbers come from Materion's MoldMAX page
 * (SRC.moldmax), including its "Compare MoldMAX alloys with other materials"
 * table. Units are kept as Materion prints them (ksi, BTU/ft·hr·°F). The
 * table's hardness column is headed only "Rockwell Hardness" and states no
 * scale, so hardness is published as a bare Rockwell number with no scale.
 * ("B88" on that page is part of the product name "Alumold B88", not a
 * Rockwell B reading.)
 *
 * Note: not every MoldMAX grade is beryllium copper — Materion lists
 * MoldMAX V as Cu-Ni-Si-Cr and MoldMAX XL as Cu-Ni-Sn.
 */

function moldmaxProps(rockwell: string, tc: string, ys: string, ts: string, cte: string): Property[] {
  return [
    { label: L.rockwell, value: rockwell, source: SRC.moldmax },
    { label: L.thermCond, value: tc, unit: "BTU/ft·hr·°F", source: SRC.moldmax },
    { label: L.yield, value: ys, unit: "ksi", source: SRC.moldmax },
    { label: L.tensile, value: ts, unit: "ksi", source: SRC.moldmax },
    { label: L.cte, value: cte, unit: "×10⁻⁶ /°F", source: SRC.moldmax },
  ];
}

const note: Bi = {
  th: "ค่าทั่วไปจากตารางเปรียบเทียบของ Materion (ตารางเดียวกันระบุเหล็ก P-20 ไว้ที่ความแข็ง Rockwell 30 และการนำความร้อน 17 BTU/ft·hr·°F ตารางไม่ได้ระบุสเกลของค่าความแข็ง) ตรวจสอบกับ datasheet ก่อนออกแบบ",
  en: "Typical values from Materion's comparison table (the same table lists P-20 tool steel at Rockwell hardness 30 and 17 BTU/ft·hr·°F; the table does not state the Rockwell scale). Confirm against the datasheet before design.",
};

// Materion's MoldMAX page doesn't list product forms, so none are claimed;
// the forms section is hidden and sizes are confirmed per quotation.
const moldmaxForms: Bi[] = [];

const hh: Grade = {
  slug: "moldmax-hh",
  code: "MoldMAX HH",
  aliases: [],
  title: {
    th: "MoldMAX HH ทองแดงเบริลเลียมแม่พิมพ์ ความแข็งสูง",
    en: "MoldMAX HH Beryllium Copper Mold Alloy",
  },
  h1: {
    th: "MoldMAX HH ทองแดงเบริลเลียมสำหรับแม่พิมพ์ ความแข็งระดับเหล็กเครื่องมือ",
    en: "MoldMAX HH Beryllium Copper Mold Alloy",
  },
  tagline: {
    th: "แข็งเทียบเหล็กเครื่องมือ นำความร้อนสูงกว่า 4–6 เท่า (ตาม Materion)",
    en: "Tool-steel hardness with four to six times the thermal conductivity (per Materion).",
  },
  summary: {
    th: "MoldMAX HH คือทองแดงเบริลเลียมเกรดพรีเมียมสำหรับแม่พิมพ์ ที่ Materion ระบุว่ามีความแข็งและความแข็งแรงเทียบเท่าเหล็กเครื่องมือมาตรฐาน แต่นำความร้อนได้สูงกว่าสี่ถึงหกเท่า เหมาะกับ insert แกน (core) และโพรง (cavity) ที่ต้องทั้งทนสึกและดึงความร้อนออกจากชิ้นงานเร็ว",
    en: "MoldMAX HH is a premium beryllium copper mold alloy that, according to Materion, matches standard tool steels in hardness and strength while conducting heat four to six times better. It suits core and cavity inserts that must resist wear and pull heat out of the part quickly.",
  },
  description: {
    th: "MoldMAX HH ทองแดงเบริลเลียมสำหรับ insert แม่พิมพ์ แข็งระดับเหล็กเครื่องมือ นำความร้อนสูงกว่าเหล็ก ดูค่าเทียบและขอใบเสนอราคา",
    en: "MoldMAX HH beryllium copper for mold inserts: tool-steel hardness, far higher thermal conductivity, Materion comparison data and a quote from VAN INTERTRADE.",
  },
  properties: moldmaxProps("40", "75", "145", "170", "9.7"),
  propertiesNote: note,
  forms: moldmaxForms,
  applications: [
    { th: "insert แกนและโพรงแม่พิมพ์ฉีด", en: "Injection mold core and cavity inserts" },
    { th: "insert แนวแบ่งแม่พิมพ์ (parting line)", en: "Parting-line inserts" },
    { th: "สไลด์และลิฟเตอร์", en: "Sliders and lifters" },
  ],
  faqs: [
    {
      q: { th: "MoldMAX HH แข็งแค่ไหน?", en: "How hard is MoldMAX HH?" },
      a: {
        th: "ตารางเปรียบเทียบของ Materion ระบุความแข็ง Rockwell ของ MoldMAX HH ไว้ที่ 40 เทียบกับ 30 ของเหล็ก P-20 (ตารางไม่ได้ระบุสเกล)",
        en: "Materion's comparison table lists MoldMAX HH at a Rockwell hardness of 40, against 30 for P-20 tool steel (the table does not state the scale).",
      },
    },
    {
      q: { th: "ซ่อม MoldMAX HH ด้วยการเชื่อมได้ไหม?", en: "Can MoldMAX HH be weld-repaired?" },
      a: {
        th: "ได้ Materion มีลวดเติม WeldPak และ WeldPak XL สำหรับซ่อมแม่พิมพ์ MoldMAX ที่เป็นทองแดงเบริลเลียมด้วยการเชื่อม TIG ควรควบคุมไอเชื่อมตาม SDS ของ Materion",
        en: "Yes. Materion offers WeldPak and WeldPak XL filler metal for TIG repair of beryllium copper MoldMAX alloys. Control welding fumes as Materion's SDS requires.",
      },
    },
    priceFaq({ th: "MoldMAX HH", en: "MoldMAX HH" }),
  ],
};

const v: Grade = {
  slug: "moldmax-v",
  code: "MoldMAX V",
  aliases: [],
  title: {
    th: "MoldMAX V โลหะผสม Cu-Ni-Si-Cr สำหรับแม่พิมพ์",
    en: "MoldMAX V Cu-Ni-Si-Cr Mold Alloy",
  },
  h1: {
    th: "MoldMAX V โลหะผสมทองแดง Cu-Ni-Si-Cr สำหรับแม่พิมพ์",
    en: "MoldMAX V Copper-Nickel-Silicon-Chromium Mold Alloy",
  },
  tagline: {
    th: "นำความร้อนสูง ความแข็งแรงปานกลางค่อนสูง ไม่มีเบริลเลียม",
    en: "High conductivity, moderately high strength, no beryllium.",
  },
  summary: {
    th: "MoldMAX V คือโลหะผสมทองแดง-นิกเกิล-ซิลิคอน-โครเมียม (ไม่มีเบริลเลียม) สำหรับแม่พิมพ์ ที่นำความร้อนสูงและแข็งแรงปานกลางค่อนสูง Materion ระบุว่านิยมใช้ทำแกนและโพรงของแม่พิมพ์ฉีด",
    en: "MoldMAX V is a copper-nickel-silicon-chromium mold alloy, with no beryllium, that combines high thermal conductivity with moderately high strength. Materion notes it is commonly used for injection mold cores and cavities.",
  },
  description: {
    th: "MoldMAX V โลหะผสมทองแดง Cu-Ni-Si-Cr ไม่มีเบริลเลียม สำหรับแกนและโพรงแม่พิมพ์ฉีด ค่าเทียบจาก Materion และขอใบเสนอราคา",
    en: "MoldMAX V, a beryllium-free Cu-Ni-Si-Cr mold alloy for injection mold cores and cavities: Materion comparison data, uses and a quote.",
  },
  properties: moldmaxProps("28", "92", "105", "125", "9.7"),
  propertiesNote: note,
  forms: moldmaxForms,
  applications: [
    { th: "แกนและโพรงแม่พิมพ์ฉีด", en: "Injection mold cores and cavities" },
    { th: "insert ระบายความร้อนจุดร้อนในแม่พิมพ์เหล็ก", en: "Hot-spot cooling inserts in steel molds" },
  ],
  faqs: [
    {
      q: { th: "MoldMAX V มีเบริลเลียมไหม?", en: "Does MoldMAX V contain beryllium?" },
      a: {
        th: "ไม่มี Materion ระบุว่า MoldMAX V เป็นโลหะผสมทองแดง-นิกเกิล-ซิลิคอน-โครเมียม",
        en: "No. Materion describes MoldMAX V as a copper-nickel-silicon-chromium alloy.",
      },
    },
    {
      q: { th: "MoldMAX V ต่างจาก MoldMAX HH อย่างไร?", en: "How does MoldMAX V compare with MoldMAX HH?" },
      a: {
        th: "ตามตาราง Materion MoldMAX V นำความร้อนสูงกว่า (92 เทียบกับ 75 BTU/ft·hr·°F) แต่แข็งน้อยกว่า (ความแข็ง Rockwell 28 เทียบกับ 40)",
        en: "In Materion's table MoldMAX V conducts more heat (92 vs 75 BTU/ft·hr·°F) but is softer (Rockwell hardness 28 vs 40).",
      },
    },
    priceFaq({ th: "MoldMAX V", en: "MoldMAX V" }),
  ],
};

const xl: Grade = {
  slug: "moldmax-xl",
  code: "MoldMAX XL",
  aliases: [],
  title: {
    th: "MoldMAX XL โลหะผสม Cu-Ni-Sn สำหรับแม่พิมพ์",
    en: "MoldMAX XL Cu-Ni-Sn Mold Alloy",
  },
  h1: {
    th: "MoldMAX XL โลหะผสมทองแดง Cu-Ni-Sn สำหรับแม่พิมพ์",
    en: "MoldMAX XL Copper-Nickel-Tin Mold Alloy",
  },
  tagline: {
    th: "แข็งเทียบ P-20 นำความร้อนสูงกว่า 2–3 เท่า (ตาม Materion)",
    en: "P-20 hardness with two to three times the thermal conductivity (per Materion).",
  },
  summary: {
    th: "MoldMAX XL คือโลหะผสมทองแดง-นิกเกิล-ดีบุก (Cu-Ni-Sn) ความแข็งแรงสูงสำหรับแม่พิมพ์ ที่ Materion ระบุว่าแข็งใกล้เคียงเหล็ก AISI P-20 แต่นำความร้อนได้สูงกว่าสองถึงสามเท่า",
    en: "MoldMAX XL is a high-strength copper-nickel-tin (Cu-Ni-Sn) mold alloy that, according to Materion, is about as hard as AISI P-20 tool steel while conducting heat two to three times better.",
  },
  description: {
    th: "MoldMAX XL โลหะผสม Cu-Ni-Sn สำหรับแม่พิมพ์ แข็งใกล้เคียงเหล็ก P-20 แต่นำความร้อนสูงกว่า ค่าเทียบจาก Materion และขอใบเสนอราคา",
    en: "MoldMAX XL Cu-Ni-Sn mold alloy: P-20-class hardness with higher thermal conductivity, Materion comparison data and a quote from VAN INTERTRADE.",
  },
  properties: moldmaxProps("30", "40", "105", "115", "9.3"),
  propertiesNote: note,
  forms: moldmaxForms,
  applications: [
    { th: "insert แม่พิมพ์ฉีดที่ต้องการความแข็งระดับ P-20", en: "Injection mold inserts that need P-20-class hardness" },
    { th: "ชิ้นส่วนแม่พิมพ์ที่ต้องทนแรงกระแทก", en: "Mold components that need impact strength" },
  ],
  faqs: [
    {
      q: { th: "MoldMAX XL ทำจากอะไร?", en: "What is MoldMAX XL made of?" },
      a: {
        th: "Materion ระบุว่า MoldMAX XL เป็นโลหะผสมทองแดง-นิกเกิล-ดีบุก (Cu-Ni-Sn) ไม่ใช่ทองแดงเบริลเลียม",
        en: "Materion describes MoldMAX XL as a copper-nickel-tin (Cu-Ni-Sn) alloy, not a beryllium copper.",
      },
    },
    priceFaq({ th: "MoldMAX XL", en: "MoldMAX XL" }),
  ],
};

const protherm: Grade = {
  slug: "protherm",
  code: "PROtherm",
  aliases: [],
  title: {
    th: "PROtherm BeCu นำความร้อนสูงสำหรับแม่พิมพ์",
    en: "PROtherm High-Conductivity BeCu Mold Alloy",
  },
  h1: {
    th: "PROtherm ทองแดงเบริลเลียมนำความร้อนสูง สำหรับแม่พิมพ์",
    en: "PROtherm High-Conductivity Beryllium Copper Mold Alloy",
  },
  tagline: {
    th: "นำความร้อนสูงสุดในสี่เกรดที่เปรียบเทียบ สำหรับจุดที่ต้องระบายความร้อนมาก",
    en: "The highest thermal conductivity of the four grades compared, for heat-critical spots.",
  },
  summary: {
    th: "PROtherm คือทองแดงเบริลเลียมนำความร้อนสูงที่มีความแข็งแรงดี Materion ระบุว่าเป็นโลหะผสมที่นำความร้อนสูงที่สุดในบรรดาโลหะผสมที่มีความต้านทานแรงดึงเกิน 100,000 psi จึงเหมาะกับจุดในแม่พิมพ์ที่ระบายความร้อนยากที่สุด",
    en: "PROtherm is a high-conductivity beryllium copper with good strength. Materion states it has the highest conductivity of any alloy with tensile strength above 100,000 psi, which makes it the pick for the hardest-to-cool spots in a mold.",
  },
  description: {
    th: "PROtherm ทองแดงเบริลเลียมนำความร้อนสูงจาก Materion สำหรับจุดร้อนในแม่พิมพ์และงานเป่าพลาสติก ค่าเทียบ การใช้งาน และขอใบเสนอราคา",
    en: "PROtherm high-conductivity beryllium copper from Materion for mold hot spots and blow molding: comparison data, typical uses and a quote.",
  },
  properties: moldmaxProps("20", "145", "90", "105", "9.8"),
  propertiesNote: note,
  forms: moldmaxForms,
  applications: [
    { th: "insert ระบายความร้อนจุดร้อน (hot spot)", en: "Hot-spot cooling inserts" },
    { th: "ปลายหัวฉีด hot runner", en: "Hot runner tips" },
    { th: "ชิ้นส่วนในแม่พิมพ์เป่าอะลูมิเนียม", en: "Components in aluminium blow molds" },
  ],
  faqs: [
    {
      q: { th: "ควรเลือก PROtherm หรือ MoldMAX HH?", en: "Should I choose PROtherm or MoldMAX HH?" },
      a: {
        th: "เลือก PROtherm เมื่อการระบายความร้อนสำคัญที่สุด (145 BTU/ft·hr·°F ตามตาราง Materion) และเลือก MoldMAX HH เมื่อต้องการความแข็งสูงกว่า (ความแข็ง Rockwell 40 เทียบกับ 20)",
        en: "Choose PROtherm when heat removal comes first (145 BTU/ft·hr·°F in Materion's table) and MoldMAX HH when you need more hardness (Rockwell hardness 40 against 20).",
      },
    },
    priceFaq({ th: "PROtherm", en: "PROtherm" }),
  ],
};

export const moldmax: ProductFamily = {
  slug: "moldmax",
  brand: "Materion",
  keyword: "MoldMAX",
  name: { th: "MoldMAX", en: "MoldMAX" },
  title: {
    th: "MoldMAX โลหะผสมทองแดงสำหรับแม่พิมพ์ จาก Materion",
    en: "MoldMAX Mold Alloys from Materion, Thailand",
  },
  h1: {
    th: "MoldMAX โลหะผสมทองแดงสำหรับแม่พิมพ์พลาสติก จาก Materion",
    en: "MoldMAX Plastic Tooling Alloys from Materion",
  },
  summary: {
    th: "MoldMAX คือกลุ่มโลหะผสมฐานทองแดงของ Materion สำหรับแม่พิมพ์ฉีดและแม่พิมพ์เป่าพลาสติก ที่รวมความแข็งแรง การนำความร้อน และการขัดเงาได้ดีไว้ด้วยกัน ช่วยให้รอบการผลิตสั้นลงและชิ้นงานพลาสติกมีคุณภาพดีขึ้น แวน อินเตอร์เทรด จำหน่าย MoldMAX HH, MoldMAX V, MoldMAX XL และ PROtherm ในประเทศไทย",
    en: "MoldMAX is Materion's range of copper-based alloys for plastic injection and blow molds, combining strength, thermal conductivity and good polishability so molds run shorter cycles and produce better parts. VAN INTERTRADE supplies MoldMAX HH, MoldMAX V, MoldMAX XL and PROtherm in Thailand.",
  },
  description: {
    th: "MoldMAX โลหะผสมทองแดงสำหรับแม่พิมพ์ฉีดและเป่าพลาสติก จาก Materion ระบายความร้อนดีกว่าเหล็ก เทียบเกรด HH, V, XL, PROtherm และขอใบเสนอราคา",
    en: "MoldMAX copper mold alloys from Materion for injection and blow molds: compare HH, V, XL and PROtherm against tool steel and request a quote.",
  },
  body: [
    {
      th: "Materion ระบุว่า MoldMAX แข็งแรงและทนสึกได้ระดับเหล็กเครื่องมือ แต่นำความร้อนได้สูงกว่าสูงสุดถึงสิบเท่า เมื่อใส่เป็น insert ในแม่พิมพ์เหล็กจะช่วยดับจุดร้อน ลดหรือตัดความจำเป็นของช่องน้ำหล่อเย็นในจุดที่เจาะยาก และลดความต่างอุณหภูมิในแม่พิมพ์ ทำให้ควบคุมขนาดชิ้นงานได้แม่นขึ้น การหดตัวและการบิดงอหลังขึ้นรูปน้อยลง",
      en: "Materion says MoldMAX matches tool steels for strength and wear resistance while conducting heat up to ten times better. Used as inserts in steel molds, it cools hot spots, reduces or removes the need for cooling channels where they are hard to drill, and evens out mold temperatures for tighter tolerances and less post-mold shrinkage and warping.",
    },
    {
      th: "ไม่ใช่ทุกเกรดเป็นทองแดงเบริลเลียม: MoldMAX HH และ PROtherm เป็นทองแดงเบริลเลียม ส่วน MoldMAX V เป็น Cu-Ni-Si-Cr และ MoldMAX XL เป็น Cu-Ni-Sn เลือกเกรดตามสมดุลระหว่างความแข็งกับการนำความร้อนที่แม่พิมพ์ต้องการ",
      en: "Not every grade is beryllium copper: MoldMAX HH and PROtherm are, while MoldMAX V is Cu-Ni-Si-Cr and MoldMAX XL is Cu-Ni-Sn. Choose by the balance of hardness and thermal conductivity the mold needs.",
    },
  ],
  image: {
    src: "/images/product-moldmax.webp",
    width: 1024,
    height: 1024,
    alt: {
      th: "ชิ้นส่วนแม่พิมพ์ MoldMAX สีทองแดงที่กลึงเป็นร่องฟันเฟืองและรูเกลียว",
      en: "Machined copper-coloured MoldMAX mold component with a gear-tooth recess and threaded ports",
    },
  },
  grades: [hh, v, xl, protherm],
  variants: [],
  forms: moldmaxForms,
  applications: [
    { th: "insert แกนและโพรงแม่พิมพ์", en: "Core and cavity inserts" },
    { th: "insert แนวแบ่งแม่พิมพ์ (parting line)", en: "Parting-line inserts" },
    { th: "สไลด์และลิฟเตอร์", en: "Sliders and lifters" },
    { th: "ปลายหัวฉีด hot runner", en: "Hot runner tips" },
    { th: "ชิ้นส่วนแม่พิมพ์เป่าพลาสติก", en: "Blow mold components" },
  ],
  industries: ["plastic-mold"],
  faqs: [
    {
      q: { th: "MoldMAX คืออะไร?", en: "What is MoldMAX?" },
      a: {
        th: "MoldMAX คือกลุ่มโลหะผสมฐานทองแดงของ Materion สำหรับแม่พิมพ์ฉีดและเป่าพลาสติก ที่แข็งแรงระดับเหล็กเครื่องมือแต่นำความร้อนได้สูงกว่ามาก ช่วยลดรอบการผลิต",
        en: "MoldMAX is Materion's range of copper-based alloys for plastic injection and blow molds. It offers tool-steel-class strength with much higher thermal conductivity, which shortens cycle times.",
      },
    },
    {
      q: { th: "MoldMAX ทุกเกรดเป็นทองแดงเบริลเลียมหรือไม่?", en: "Is every MoldMAX grade beryllium copper?" },
      a: {
        th: "ไม่ MoldMAX HH และ PROtherm เป็นทองแดงเบริลเลียม ส่วน MoldMAX V เป็น Cu-Ni-Si-Cr และ MoldMAX XL เป็น Cu-Ni-Sn",
        en: "No. MoldMAX HH and PROtherm are beryllium copper; MoldMAX V is Cu-Ni-Si-Cr and MoldMAX XL is Cu-Ni-Sn.",
      },
    },
    priceFaq({ th: "MoldMAX", en: "MoldMAX" }),
  ],
};
