import type { ProductFamily } from "./types";
import { priceFaq } from "./shared";

/*
 * Clad metal: layups from the client's legacy copy (Cu/Al/Cu, Ag/Cu, custom).
 * No brand is named there, so the brand is VAN INTERTRADE. No numeric values
 * are published; no grade pages (variants only).
 */

export const cladMetal: ProductFamily = {
  slug: "clad-metal",
  brand: "VAN INTERTRADE",
  keyword: "Clad Metal",
  name: { th: "Clad Metal (โลหะประกบ)", en: "Clad Metal" },
  title: {
    th: "Clad Metal โลหะประกบ Cu/Al/Cu และ Ag/Cu",
    en: "Clad Metals: Cu/Al/Cu, Ag/Cu & Custom Layups",
  },
  h1: {
    th: "Clad Metal (โลหะประกบ) Cu/Al/Cu, Ag/Cu และโครงสร้างตามสั่ง",
    en: "Clad Metal: Cu/Al/Cu, Ag/Cu and Custom Layups",
  },
  summary: {
    th: "Clad Metal (โลหะประกบ หรือโลหะหุ้ม) คือแผ่นหรือแถบที่ยึดโลหะต่างชนิดตั้งแต่สองชั้นขึ้นไปเข้าด้วยกันอย่างถาวร ให้ผิวแต่ละด้านทำหน้าที่ต่างกัน และใช้วัสดุราคาแพงเฉพาะตรงที่จำเป็น แวน อินเตอร์เทรด จัดหาโลหะประกบ Cu/Al/Cu, Ag/Cu และโครงสร้างชั้นตามแบบของลูกค้า",
    en: "Clad metal is sheet or strip in which two or more different metals are permanently bonded in layers, so each face can do a different job and the expensive metal goes only where it is needed. VAN INTERTRADE supplies Cu/Al/Cu, Ag/Cu and custom layups to customer drawings.",
  },
  description: {
    th: "Clad Metal โลหะประกบ Cu/Al/Cu และ Ag/Cu สำหรับตัวนำไฟฟ้า หน้าสัมผัส และงานระบายความร้อน ใช้วัสดุแพงเฉพาะจุดที่จำเป็น ขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "Clad metal in Cu/Al/Cu, Ag/Cu and custom layups for conductors, contacts and thermal management, using costly metal only where it is needed. Request a quote.",
  },
  body: [
    {
      th: "ข้อดีหลักของโลหะประกบคือออกแบบคุณสมบัติได้ตามชั้น: ผิวทองแดงสำหรับการต่อและบัดกรี แกนอะลูมิเนียมเพื่อลดน้ำหนักและต้นทุน หรือชั้นเงินบาง ๆ เฉพาะบริเวณหน้าสัมผัสแทนการใช้เงินทั้งชิ้น",
      en: "The point of cladding is designing properties layer by layer: copper faces for joining and soldering, an aluminium core to cut weight and cost, or a thin silver layer only where contact happens instead of a solid silver part.",
    },
  ],
  image: {
    src: "/images/product-clad.webp",
    width: 1024,
    height: 1024,
    alt: {
      th: "ภาพตัดขวางแถบโลหะประกบ แสดงชั้นทองแดงสลับกับชั้นโลหะสีเงิน",
      en: "Cross-section of a clad metal strip showing copper layers alternating with silver-grey metal layers",
    },
  },
  grades: [],
  variants: [
    {
      name: { th: "Cu/Al/Cu (ทองแดง/อะลูมิเนียม/ทองแดง)", en: "Cu/Al/Cu (copper/aluminium/copper)" },
      desc: {
        th: "ผิวทองแดงสองด้านประกบแกนอะลูมิเนียม เบากว่าและประหยัดกว่าทองแดงล้วน แต่ยังต่อและบัดกรีได้แบบทองแดง",
        en: "Copper on both faces over an aluminium core: lighter and cheaper than solid copper while still joining and soldering like copper.",
      },
    },
    {
      name: { th: "Ag/Cu (เงิน/ทองแดง)", en: "Ag/Cu (silver/copper)" },
      desc: {
        th: "ชั้นเงินบนฐานทองแดง ใช้เงินเฉพาะผิวหน้าสัมผัส ลดปริมาณเงินในชิ้นงาน",
        en: "A silver layer on a copper base, putting silver only on the contact surface to cut the silver content of the part.",
      },
    },
    {
      name: { th: "โครงสร้างชั้นตามสั่ง", en: "Custom layups" },
      desc: {
        th: "กำหนดชนิดโลหะ ลำดับชั้น และสัดส่วนความหนาตามแบบงาน แจ้งรายละเอียดเพื่อประเมินความเป็นไปได้และเสนอราคา",
        en: "Metals, layer order and thickness ratio set to your drawing. Send the details for a feasibility check and quotation.",
      },
    },
  ],
  forms: [],
  applications: [
    { th: "บัสบาร์และตัวเชื่อมต่อในแบตเตอรี่", en: "Busbars and battery connectors" },
    { th: "หน้าสัมผัสไฟฟ้าที่ลดการใช้เงิน", en: "Electrical contacts with reduced silver" },
    { th: "ชิ้นส่วนกระจายความร้อน", en: "Heat-spreading parts" },
  ],
  industries: ["ev", "switchgear"],
  faqs: [
    {
      q: { th: "Clad Metal คืออะไร?", en: "What is clad metal?" },
      a: {
        th: "Clad Metal คือวัสดุที่ยึดโลหะต่างชนิดตั้งแต่สองชั้นขึ้นไปเข้าด้วยกันอย่างถาวร เพื่อรวมคุณสมบัติของแต่ละชนิดไว้ในแผ่นหรือแถบเดียว",
        en: "Clad metal is material in which two or more different metals are permanently bonded in layers, combining their properties in one sheet or strip.",
      },
    },
    {
      q: { th: "ทำไมเลือก Cu/Al/Cu แทนทองแดงล้วน?", en: "Why choose Cu/Al/Cu over solid copper?" },
      a: {
        th: "แกนอะลูมิเนียมทำให้ชิ้นงานเบาลงและใช้ทองแดงน้อยลง ขณะที่ผิวทองแดงยังต่อและบัดกรีได้เหมือนเดิม",
        en: "The aluminium core makes the part lighter and uses less copper, while the copper faces still join and solder as before.",
      },
    },
    priceFaq({ th: "Clad Metal", en: "clad metal" }),
  ],
};
