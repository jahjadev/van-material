import type { Grade, ProductFamily } from "./types";
import { L, priceFaq, SRC } from "./shared";

/*
 * All ToughMet facts and numbers come from Materion's ToughMet page
 * (SRC.toughmet): temper names, UNS numbers, the per-temper tensile and
 * hardness statements, and the "Technical Details" block for ToughMet 3 TS
 * rod, tube & wire.
 */

const tm3: Grade = {
  slug: "toughmet-3",
  code: "ToughMet 3",
  aliases: ["UNS C72900", "UNS C96900", "ToughMet 3 AT", "ToughMet 3 CX", "ToughMet 3 TS"],
  title: {
    th: "ToughMet 3 (C72900) โลหะผสม Cu-Ni-Sn ทนการสึกหรอ",
    en: "ToughMet 3 (C72900) Cu-Ni-Sn Bearing Alloy",
  },
  h1: {
    th: "ToughMet 3 โลหะผสม Cu-Ni-Sn สำหรับบูชและแบริ่งรับโหลดสูง",
    en: "ToughMet 3 Copper-Nickel-Tin Alloy",
  },
  tagline: {
    th: "มี temper AT, CX และ TS ใช้ในบูชฐานล้ออากาศยานและเครื่องมือขุดเจาะ",
    en: "AT, CX and TS tempers, used in landing-gear bushings and drilling tools.",
  },
  summary: {
    th: "ToughMet 3 คือโลหะผสมทองแดง-นิกเกิล-ดีบุก (Cu-Ni-Sn) แบบ spinodal ของ Materion ที่ให้ความแข็งแรงสูง ต้านการติดกัน (anti-galling) และทนการสึกหรอและการกัดกร่อน มีให้เลือกหลาย temper: AT และ TS (UNS C72900) และ CX (UNS C96900) Materion ระบุว่า ToughMet 3 ใช้อยู่ในเครื่องบินพาณิชย์หลักทุกรุ่นในปัจจุบัน",
    en: "ToughMet 3 is Materion's spinodal copper-nickel-tin (Cu-Ni-Sn) alloy, giving high strength, anti-galling behaviour and resistance to wear and corrosion. It comes in several tempers: AT and TS (UNS C72900) and CX (UNS C96900). Materion states that ToughMet 3 is used on all models of mainline commercial aircraft today.",
  },
  description: {
    th: "ToughMet 3 (C72900/C96900) โลหะผสม Cu-Ni-Sn จาก Materion temper AT, CX, TS ค่าความแข็งแรงพร้อมแหล่งอ้างอิง งานบูช แบริ่ง และขอใบเสนอราคา",
    en: "ToughMet 3 (UNS C72900 / C96900) Cu-Ni-Sn alloy from Materion: AT, CX and TS tempers, sourced strength data, bearing uses and a quote.",
  },
  properties: [
    { label: { th: "ความต้านทานแรงดึง ToughMet 3 AT (สูงสุดถึง)", en: "Tensile strength, ToughMet 3 AT (up to)" }, value: "140", unit: "ksi", source: SRC.toughmet },
    { label: { th: "ความต้านทานแรงดึง ToughMet 3 TS (สูงสุดถึง)", en: "Tensile strength, ToughMet 3 TS (up to)" }, value: "150", unit: "ksi", source: SRC.toughmet },
    { label: { th: "ความต้านทานแรงดึง ToughMet 3 CX (สูงสุดถึง)", en: "Tensile strength, ToughMet 3 CX (up to)" }, value: "120", unit: "ksi", source: SRC.toughmet },
    { label: { th: "ความแข็ง ToughMet 3 CX (สูงสุดถึง)", en: "Hardness, ToughMet 3 CX (up to)" }, value: "34", unit: "HRC", source: SRC.toughmet },
    { label: { th: "โมดูลัสยืดหยุ่น (TS)", en: "Elastic modulus (TS)" }, value: "144", unit: "GPa", source: SRC.toughmet },
    { label: { th: "การนำความร้อน (TS)", en: "Thermal conductivity (TS)" }, value: "38", unit: "W/m·°C", source: SRC.toughmet },
    { label: { th: "ความหนาแน่น (TS)", en: "Density (TS)" }, value: "9.00", unit: "g/cm³", source: SRC.toughmet },
    { label: { ...L.cte, en: `${L.cte.en} (TS)`, th: `${L.cte.th} (TS)` }, value: "16.4", unit: "×10⁻⁶ /°C (20–100 °C)", source: SRC.toughmet },
  ],
  propertiesNote: {
    th: "ค่าจากหน้า ToughMet ของ Materion ค่าที่ระบุ (TS) มาจากข้อมูล ToughMet 3 TS แบบแท่ง ท่อ และลวด ตรวจสอบกับ datasheet ของ temper ที่เลือกก่อนออกแบบ",
    en: "Values from Materion's ToughMet page; rows marked (TS) are for ToughMet 3 TS rod, tube and wire. Confirm against the datasheet for your temper before design.",
  },
  forms: [
    { th: "แผ่นหนา (plate)", en: "Plate" },
    { th: "แท่งกลม (rod)", en: "Rod" },
    { th: "ท่อ (tube)", en: "Tube" },
    { th: "แท่งเหลี่ยม/แบน (bar)", en: "Bar" },
    { th: "ลวด (wire)", en: "Wire" },
  ],
  applications: [
    { th: "บูชและแบริ่งฐานล้อ ล้อ และเบรกอากาศยาน", en: "Aircraft landing gear, wheel and brake bushings and bearings" },
    { th: "เครื่องมือขุดเจาะ MWD/LWD และแบริ่งดอกสว่าน", en: "MWD/LWD and directional drilling tools, drill-bit bearings" },
    { th: "บูชและแบริ่งเครื่องจักรหนักและเหมือง", en: "Heavy-equipment and mining bushings and bearings" },
    { th: "แผ่นรับการสึกหรอ (wear plate)", en: "Wear plates" },
  ],
  faqs: [
    {
      q: { th: "ToughMet 3 AT, CX และ TS ต่างกันอย่างไร?", en: "What is the difference between ToughMet 3 AT, CX and TS?" },
      a: {
        th: "ตามข้อมูล Materion: AT (UNS C72900) ความต้านทานแรงดึงสูงสุดถึง 140 ksi และคงความแข็งแรงที่อุณหภูมิสูง; CX (UNS C96900) สูงสุดถึง 120 ksi ความแข็งสูงสุด 34 HRC กลึงง่าย; TS (UNS C72900) สูงสุดถึง 150 ksi และทนสึกหรอที่สุดในทุก temper",
        en: "Per Materion: AT (UNS C72900) reaches up to 140 ksi tensile and keeps its strength at elevated temperature; CX (UNS C96900) reaches up to 120 ksi and up to 34 HRC with excellent machinability; TS (UNS C72900) reaches up to 150 ksi and is the most wear-resistant temper.",
      },
    },
    {
      q: { th: "ToughMet 3 มีเบริลเลียมไหม?", en: "Does ToughMet 3 contain beryllium?" },
      a: {
        th: "ไม่มี Materion ระบุว่า ToughMet ปราศจากทั้งตะกั่วและเบริลเลียม",
        en: "No. Materion states that ToughMet alloys are lead- and beryllium-free.",
      },
    },
    priceFaq({ th: "ToughMet 3", en: "ToughMet 3" }),
  ],
};

const tm2: Grade = {
  slug: "toughmet-2",
  code: "ToughMet 2",
  aliases: ["ToughMet 2 CX90", "UNS C96970"],
  title: {
    th: "ToughMet 2 (C96970) Cu-Ni-Sn บูชเครื่องจักรหนัก",
    en: "ToughMet 2 CX90 (C96970) Bushing Alloy",
  },
  h1: {
    th: "ToughMet 2 CX90 (UNS C96970) สำหรับบูชและแบริ่งเครื่องจักรหนัก",
    en: "ToughMet 2 CX90 (UNS C96970) Bushing and Bearing Alloy",
  },
  tagline: {
    th: "ทางเลือกต้นทุนต่ำกว่า ToughMet 3 CX105 สำหรับแบริ่งแบบปลอก",
    en: "A lower-cost alternative to ToughMet 3 CX105 for plain bearings.",
  },
  summary: {
    th: "ToughMet 2 CX90 (UNS C96970) คือโลหะผสม Cu-Ni-Sn ของ Materion สำหรับบูชและแบริ่งเครื่องจักรหนัก ผลิตด้วยเทคโนโลยี EquaCast Materion ระบุว่าให้สมรรถนะเท่า ToughMet 3 CX105 ในแบริ่งแบบปลอก แบริ่งกันรุน และแบริ่งเชิงเส้น แต่ต้นทุนต่ำกว่า และนำความร้อนได้ดีกว่า ToughMet 3 ช่วยถนอมสารหล่อลื่น",
    en: "ToughMet 2 CX90 (UNS C96970) is Materion's Cu-Ni-Sn alloy for heavy-equipment bushings and bearings, made with its EquaCast technology. Materion says it gives the same performance as ToughMet 3 CX105 in plain sleeve, thrust and linear bearings at a lower cost, and its higher thermal conductivity than ToughMet 3 helps protect the lubricant.",
  },
  description: {
    th: "ToughMet 2 CX90 (UNS C96970) โลหะผสม Cu-Ni-Sn จาก Materion สำหรับบูชเครื่องจักรหนัก ค่าความแข็งแรงพร้อมแหล่งอ้างอิง และขอใบเสนอราคา",
    en: "ToughMet 2 CX90 (UNS C96970) Cu-Ni-Sn alloy from Materion for heavy-equipment bushings: sourced strength data, uses and a quote from VAN INTERTRADE.",
  },
  properties: [
    { label: { th: "ความต้านทานแรงดึง (มากกว่า)", en: "Tensile strength (in excess of)" }, value: "105", unit: "ksi", source: SRC.toughmet },
    { label: { th: "ความแข็ง (มากกว่า)", en: "Hardness (exceeding)" }, value: "27", unit: "HRC", source: SRC.toughmet },
  ],
  propertiesNote: {
    th: "ค่าจากหน้า ToughMet ของ Materion ตรวจสอบกับ datasheet ของ ToughMet 2 CX ก่อนออกแบบ",
    en: "Values from Materion's ToughMet page. Confirm against the ToughMet 2 CX datasheet before design.",
  },
  forms: [],
  applications: [
    { th: "บูชและแบริ่งเครื่องจักรหนัก", en: "Heavy-equipment bushings and bearings" },
    { th: "แบริ่งแบบปลอก แบริ่งกันรุน และแบริ่งเชิงเส้น", en: "Plain sleeve, thrust and linear bearings" },
    { th: "บูชบุ้งกี๋รถขุดและแบริ่งช่วงล่างเครื่องจักรเหมือง", en: "Excavator bucket bushings and mining undercarriage bearings" },
  ],
  faqs: [
    {
      q: { th: "ToughMet 2 ต่างจาก ToughMet 3 อย่างไร?", en: "How does ToughMet 2 differ from ToughMet 3?" },
      a: {
        th: "Materion ระบุว่า ToughMet 2 CX ให้สมรรถนะเท่า ToughMet 3 CX105 ในแบริ่งแบบปลอก กันรุน และเชิงเส้น ด้วยต้นทุนต่ำกว่า ทนกัดกร่อนใกล้เคียงกันในสภาพแวดล้อมส่วนใหญ่ และนำความร้อนได้ดีกว่า",
        en: "Materion says ToughMet 2 CX matches ToughMet 3 CX105 in plain sleeve, thrust and linear bearings at a lower cost, has similar corrosion resistance in most environments, and conducts heat better.",
      },
    },
    priceFaq({ th: "ToughMet 2", en: "ToughMet 2" }),
  ],
};

export const toughmet: ProductFamily = {
  slug: "toughmet",
  brand: "Materion",
  keyword: "ToughMet",
  name: { th: "ToughMet", en: "ToughMet" },
  title: {
    th: "ToughMet โลหะผสม Cu-Ni-Sn ทนสึกหรอ จาก Materion",
    en: "ToughMet Cu-Ni-Sn Bearing & Bushing Alloys",
  },
  h1: {
    th: "ToughMet (Cu-Ni-Sn) โลหะผสมทองแดงแข็งแรงสูง ต้านการติดกัน จาก Materion",
    en: "ToughMet Copper-Nickel-Tin Alloys from Materion",
  },
  summary: {
    th: "ToughMet คือกลุ่มโลหะผสมทองแดง-นิกเกิล-ดีบุก (Cu-Ni-Sn) ความแข็งแรงสูงของ Materion ที่ต้านการติดกัน (anti-galling) ทนการสึกหรอภายใต้โหลดหนัก ทนการกัดกร่อนและการแตกร้าวจากความเค้นในน้ำทะเล คลอไรด์ และซัลไฟด์ ไม่เป็นแม่เหล็ก และปราศจากตะกั่วและเบริลเลียม แวน อินเตอร์เทรด จำหน่าย ToughMet 3 และ ToughMet 2 ในประเทศไทย",
    en: "ToughMet is Materion's family of high-strength copper-nickel-tin (Cu-Ni-Sn) alloys. They resist galling, wear under heavy load, and corrosion and stress-corrosion cracking in seawater, chlorides and sulfides; they are non-magnetic and free of lead and beryllium. VAN INTERTRADE supplies ToughMet 3 and ToughMet 2 in Thailand.",
  },
  description: {
    th: "ToughMet โลหะผสม Cu-Ni-Sn จาก Materion สำหรับบูชและแบริ่งรับโหลดหนัก อากาศยาน งานขุดเจาะ และเครื่องจักรหนัก เทียบ ToughMet 3 กับ 2 และขอใบเสนอราคา",
    en: "ToughMet Cu-Ni-Sn alloys from Materion for heavy-load bushings and bearings in aerospace, drilling and heavy equipment. Compare the grades and request a quote.",
  },
  body: [
    {
      th: "ToughMet ได้ความแข็งแรงจากการปรับสภาพทางความร้อนแบบ spinodal และมีคุณสมบัติลื่นในตัว ทำให้เหมาะกับบูชและแบริ่งที่ทำงานในสภาพหนัก Materion ระบุว่าในงานอากาศยาน ToughMet ทำงานได้ต่อเนื่องอย่างปลอดภัยเป็นเวลานานแม้สารหล่อลื่นขาดหาย และในงานเหมืองและก่อสร้างช่วยยืดอายุชิ้นส่วนที่สัมผัสฝุ่นซิลิกา ฝุ่นถ่านหิน และเกลือ",
      en: "ToughMet gets its strength from spinodal heat treatment and has natural lubricity, which suits bushings and bearings in harsh service. Materion notes that in aircraft it can run safely for extended periods if lubrication fails, and in mining and construction it extends the life of parts exposed to silica, coal dust and salt.",
    },
  ],
  image: {
    src: "/images/product-toughmet.webp",
    width: 1024,
    height: 1024,
    alt: {
      th: "บูช แหวน และตลับลูกปืนสีทองแดงหลายขนาดบนโต๊ะโลหะ",
      en: "Copper-coloured bushings, rings and a ball bearing in several sizes on a metal table",
    },
  },
  grades: [tm3, tm2],
  variants: [],
  forms: [
    { th: "แผ่นหนา (plate)", en: "Plate" },
    { th: "แท่งกลม (rod)", en: "Rod" },
    { th: "ท่อ (tube)", en: "Tube" },
    { th: "แท่งเหลี่ยม/แบน (bar)", en: "Bar" },
    { th: "ลวด (wire)", en: "Wire" },
    { th: "ชิ้นงานหล่อ (cast shapes)", en: "Cast shapes" },
  ],
  applications: [
    { th: "บูชและแบริ่งฐานล้ออากาศยาน", en: "Aircraft landing gear bushings and bearings" },
    { th: "เครื่องมือขุดเจาะน้ำมันและก๊าซ", en: "Oil & gas drilling tools" },
    { th: "บูชและแบริ่งเครื่องจักรเหมืองและก่อสร้าง", en: "Mining and construction equipment bushings and bearings" },
    { th: "แหวนกันรุนในเกียร์ยานยนต์", en: "Automotive gearbox thrust washers" },
    { th: "แผ่นรองแท่นอัดรีด (extrusion press plate)", en: "Extrusion press plates" },
  ],
  industries: ["aerospace", "oil-gas", "automotive"],
  faqs: [
    {
      q: { th: "ToughMet คืออะไร?", en: "What is ToughMet?" },
      a: {
        th: "ToughMet คือโลหะผสมทองแดง-นิกเกิล-ดีบุก (Cu-Ni-Sn) แบบ spinodal ของ Materion ที่แข็งแรงสูง ต้านการติดกัน ทนสึกหรอและกัดกร่อน ใช้ทำบูชและแบริ่งรับโหลดหนัก",
        en: "ToughMet is Materion's spinodal copper-nickel-tin (Cu-Ni-Sn) alloy. It is strong, anti-galling, and resistant to wear and corrosion, and it is used for heavily loaded bushings and bearings.",
      },
    },
    {
      q: { th: "ToughMet เป็นแม่เหล็กหรือไม่?", en: "Is ToughMet magnetic?" },
      a: {
        th: "ไม่ Materion ระบุว่า ToughMet ไม่เป็นแม่เหล็ก",
        en: "No. Materion lists ToughMet alloys as non-magnetic.",
      },
    },
    priceFaq({ th: "ToughMet", en: "ToughMet" }),
  ],
};
