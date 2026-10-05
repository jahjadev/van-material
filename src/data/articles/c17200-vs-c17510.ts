import type { Article } from "./types";
import { REF } from "./sources";

/*
 * Every value comes from the grade records in beryllium-copper.ts (rendered
 * through PropertyTable straight from that data, so the article can't drift
 * from the grade pages). Qualitative statements: Materion's high-strength
 * and high-conductivity CuBe pages and its magnetic-properties article
 * (which names Alloy 25 high-strength and Alloy 3 high-conductivity).
 */
export const c17200VsC17510: Article = {
  slug: "c17200-vs-c17510",
  topic: ["beryllium-copper"],
  grades: ["beryllium-copper/c17200", "beryllium-copper/c17510"],
  date: "2026-10-05",
  modified: "2026-10-05",
  image: "/images/product-cube.webp",
  title: {
    th: "เปรียบเทียบ C17200 กับ C17510 เลือกเกรดไหนดี",
    en: "C17200 vs C17510: Which Beryllium Copper?",
  },
  h1: {
    th: "เปรียบเทียบ C17200 กับ C17510: เลือก Beryllium Copper เกรดไหนดี",
    en: "C17200 vs C17510: Which Beryllium Copper Grade to Choose",
  },
  description: {
    th: "C17200 (Alloy 25) เน้นความแข็งแรง C17510 (Alloy 3) เน้นการนำไฟฟ้าและความร้อน เทียบค่าที่ Materion เผยแพร่ รูปแบบสินค้า และวิธีเลือกเกรดให้ตรงงาน",
    en: "C17200 (Alloy 25) is the strength grade; C17510 (Alloy 3) is the conductivity grade. Compare Materion's published values and forms, and how to pick.",
  },
  intro: {
    th: "เลือก C17200 เมื่อชิ้นงานต้องการความแข็งแรงและแรงสปริงสูงสุด และเลือก C17510 เมื่อการนำไฟฟ้าหรือการระบายความร้อนสำคัญกว่าความแข็งแรง ทั้งสองเป็น Beryllium Copper ของ Materion แต่อยู่คนละกลุ่ม: C17200 (Alloy 25) เป็นกลุ่มแข็งแรงสูง ส่วน C17510 (Alloy 3) เป็นกลุ่มนำไฟฟ้าสูง",
    en: "Choose C17200 when the part needs the most strength and spring force, and C17510 when electrical or thermal conductivity matters more than strength. Both are Materion beryllium coppers, but from different classes: C17200 (Alloy 25) is a high-strength alloy and C17510 (Alloy 3) a high-conductivity one.",
  },
  body: [
    { t: "h2", text: { th: "C17200 กับ C17510 ต่างกันตรงไหน?", en: "How do C17200 and C17510 differ?" } },
    {
      t: "p",
      text: {
        th: "ต่างกันที่สมดุลระหว่างความแข็งแรงกับการนำไฟฟ้า [C17200](/beryllium-copper/c17200) คือเกรดที่ Materion ระบุว่าแข็งแรงที่สุดในบรรดาโลหะผสม CuBe ที่ผลิต และนำไฟฟ้า/ความร้อนได้ดีกว่าโลหะผสมทองแดงความแข็งแรงสูงชนิดอื่น ส่วน [C17510](/beryllium-copper/c17510) เป็นโลหะผสมทองแดง-นิกเกิล-เบริลเลียม ที่ยอมลดความแข็งแรงลงเพื่อแลกกับการนำไฟฟ้าและความร้อนที่สูงกว่ามาก พร้อมทนการคลายความเค้น (stress relaxation) และคงความแข็งแรงที่อุณหภูมิสูงได้ดี",
        en: "They trade strength against conductivity. [C17200](/beryllium-copper/c17200) is the grade Materion calls the strongest CuBe alloy it makes, with conductivity well above other high-strength copper alloys. [C17510](/beryllium-copper/c17510) is a copper-nickel-beryllium alloy that gives up some strength for much higher electrical and thermal conductivity, plus good stress-relaxation resistance and good strength at elevated temperature.",
      },
    },
    {
      t: "props",
      heading: { th: "ค่าที่ Materion เผยแพร่ต่างกันเท่าไร?", en: "How do Materion's published values compare?" },
      note: {
        th: "ค่าในสภาพบ่มแข็งแล้วจากหน้าเว็บของ Materion: C17200 เป็นค่าของแท่ง (rod & bar) ส่วน C17510 เป็นค่าของแถบ (strip) รูปแบบต่างกันจึงใช้เทียบแนวโน้ม ไม่ใช่ค่าออกแบบ ตรวจสอบกับ datasheet ของ temper ที่จะใช้จริง Materion ไม่ได้ระบุความต้านทานแรงดึงของ C17510 บนหน้าเดียวกัน จึงไม่แสดงไว้",
        en: "Age-hardened values from Materion's web pages: C17200 figures are for rod and bar, C17510 figures for strip. The forms differ, so use this for direction, not design; confirm against the datasheet for the temper you will use. Materion's page gives no tensile figure for C17510, so none is shown.",
      },
      grades: [
        { family: "beryllium-copper", grade: "c17200" },
        { family: "beryllium-copper", grade: "c17510" },
      ],
    },
    {
      t: "p",
      text: {
        th: "ตัวเลขที่ต่างกันชัดที่สุดคือการนำไฟฟ้า: 25–30% IACS ของ C17200 เทียบกับ 45–60% IACS ของ C17510 และการนำความร้อน 105 เทียบกับ 240 W/m·K ส่วนโมดูลัสยืดหยุ่น ความหนาแน่น และการขยายตัวทางความร้อนใกล้เคียงกัน",
        en: "The clearest gap is conductivity: 25–30% IACS for C17200 against 45–60% IACS for C17510, and 105 against 240 W/m·K for thermal conductivity. Elastic modulus, density and thermal expansion are close.",
      },
    },
    { t: "h2", text: { th: "งานแบบไหนควรใช้ C17200?", en: "When should you use C17200?" } },
    {
      t: "p",
      text: {
        th: "ใช้ C17200 เมื่อชิ้นงานต้องรับแรงสูง รับแรงซ้ำ ๆ หรือต้องทำหน้าที่เป็นสปริง เช่น",
        en: "Use C17200 when the part takes high or repeated loads, or has to work as a spring, for example:",
      },
    },
    {
      t: "ul",
      items: [
        { th: "สปริงและชิ้นส่วนที่รับแรงซ้ำ ๆ", en: "Springs and cyclically loaded parts" },
        { th: "บูชและแบริ่งในอากาศยาน แผ่นรับการสึกหรอในเครื่องจักร", en: "Aerospace bushings and bearings, industrial wear plates" },
        { th: "อุปกรณ์ขุดเจาะน้ำมันและก๊าซ คอนเนคเตอร์ทรงกลมและโคแอกเชียล", en: "Oil and gas drilling equipment, circular and coaxial connectors" },
      ],
    },
    {
      t: "p",
      text: {
        th: "C17200 มีรูปแบบให้เลือกมาก ตั้งแต่แถบ แท่งกลม แท่งแบน แผ่นหนา ลวด ท่อ ไปจนถึงชิ้นงานตีขึ้นรูปและรีดขึ้นรูป",
        en: "C17200 comes in a wide range of forms: strip, rod, bar, plate, wire, tube, forgings and extrusions.",
      },
    },
    { t: "h2", text: { th: "งานแบบไหนควรใช้ C17510?", en: "When should you use C17510?" } },
    {
      t: "p",
      text: {
        th: "ใช้ C17510 เมื่อชิ้นงานต้องนำกระแสสูง ต้องระบายความร้อน หรือทำงานร้อนต่อเนื่องและต้องรักษาแรงกดหน้าสัมผัส เช่น คอนแทคไฟฟ้าและชิ้นส่วนสปริง ขั้วต่อยานยนต์ที่ต้องการความน่าเชื่อถือสูง และคอนแทคสปริงในสวิตช์และรีเลย์ รูปแบบหลักคือแถบและลวด",
        en: "Use C17510 when the part carries high current, has to move heat, or runs warm for long periods while holding contact force: electronic contacts and spring parts, high-reliability automotive terminals, and spring contacts in switches and relays. It is supplied mainly as strip and wire.",
      },
    },
    { t: "h2", text: { th: "ถ้าต้องการทั้งแข็งแรงและนำไฟฟ้าสูงในงานแถบ มีทางเลือกอื่นไหม?", en: "Is there an option between the two for strip parts?" } },
    {
      t: "p",
      text: {
        th: "มี Materion ออกแบบ [C17460 (Alloy 390)](/beryllium-copper/c17460) ให้นำไฟฟ้าระดับเดียวกับ Alloy 3 แต่แข็งแรงใกล้เคียง Alloy 25 โดยจัดส่งเป็นแถบที่บ่มแข็งจากโรงงานแล้ว เหมาะกับคอนแทคขนาดเล็ก ดูเกรดทั้งหมดได้ที่หน้า [Beryllium Copper](/beryllium-copper)",
        en: "Yes. Materion designed [C17460 (Alloy 390)](/beryllium-copper/c17460) to give the conductivity of Alloy 3 with the strength of Alloy 25, supplied as mill-hardened strip for small contacts. All grades are on the [beryllium copper](/beryllium-copper) page.",
      },
    },
  ],
  faqs: [
    {
      q: { th: "C17200 กับ C17510 อันไหนแข็งแรงกว่า?", en: "Which is stronger, C17200 or C17510?" },
      a: {
        th: "C17200 (Alloy 25) แข็งแรงกว่า Materion ระบุว่าเป็นโลหะผสม CuBe ที่แข็งแรงที่สุดที่ผลิต และความต้านทานแรงดึงของแท่งในสภาพบ่มแข็งสูงกว่า 1380 MPa ได้",
        en: "C17200 (Alloy 25). Materion calls it the strongest CuBe alloy it makes, with tensile strength in age-hardened rod that can exceed 1380 MPa.",
      },
    },
    {
      q: { th: "C17200 กับ C17510 อันไหนนำไฟฟ้าดีกว่า?", en: "Which conducts better, C17200 or C17510?" },
      a: {
        th: "C17510 (Alloy 3) นำไฟฟ้าดีกว่า Materion ระบุไว้ที่ 45–60% IACS เทียบกับ 25–30% IACS ของ C17200 ในสภาพบ่มแข็ง",
        en: "C17510 (Alloy 3). Materion lists it at 45–60% IACS against 25–30% IACS for C17200, both age-hardened.",
      },
    },
    {
      q: { th: "ใช้ C17510 แทน C17200 ได้ไหม?", en: "Can C17510 replace C17200?" },
      a: {
        th: "ได้เฉพาะเมื่อชิ้นงานไม่ต้องการความแข็งแรงระดับ C17200 ควรตรวจค่าความแข็งแรงของ temper ที่จะใช้กับ datasheet ก่อนเปลี่ยนเกรด และตรวจว่ารูปแบบสินค้าที่ต้องการมีในเกรดนั้น",
        en: "Only if the part does not need C17200-level strength. Check the strength of the intended temper against the datasheet before switching, and make sure the form you need exists in that grade.",
      },
    },
    {
      q: { th: "Alloy 25 และ Alloy 3 คือเกรดอะไร?", en: "What are Alloy 25 and Alloy 3?" },
      a: {
        th: "เป็นชื่อที่ Materion ใช้เรียก Alloy 25 คือ UNS C17200 และ Alloy 3 คือ UNS C17510",
        en: "They are Materion's names: Alloy 25 is UNS C17200 and Alloy 3 is UNS C17510.",
      },
    },
  ],
  refs: [REF.becuHighStrength, REF.becuHighConductivity, REF.becuMagnetic],
};
