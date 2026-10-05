import type { ProductFamily } from "./types";
import { priceFaq } from "./shared";

/*
 * Electrical contacts from Longsun (brand named in the client's legacy copy).
 * Structures and materials listed there: solid / bi-metal / tri-metal rivets,
 * buttons, wire; AgNi, AgSnO2, AgCdO, AgW, CuW. No Longsun page was fetched,
 * so no numeric values are published; variants only, no grade pages.
 */

export const electricalContacts: ProductFamily = {
  slug: "electrical-contacts",
  brand: "Longsun",
  keyword: "Silver Electrical Contacts",
  name: { th: "Electrical Contacts (หน้าสัมผัสไฟฟ้า)", en: "Electrical Contacts" },
  title: {
    th: "Silver Electrical Contacts หน้าสัมผัสไฟฟ้าเงิน",
    en: "Silver Electrical Contacts & Rivets by Longsun",
  },
  h1: {
    th: "Silver Electrical Contacts หน้าสัมผัสไฟฟ้าและหมุดคอนแทค จาก Longsun",
    en: "Silver Electrical Contacts and Contact Rivets from Longsun",
  },
  summary: {
    th: "Silver Electrical Contacts (หน้าสัมผัสไฟฟ้าฐานเงิน) คือชิ้นส่วนที่ทำหน้าที่ต่อและตัดวงจรในรีเลย์ คอนแทคเตอร์ สวิตช์ และเบรกเกอร์ แวน อินเตอร์เทรด จำหน่ายหน้าสัมผัสของ Longsun ทั้งหมุดคอนแทค (rivet) แบบตัน สองโลหะ และสามโลหะ ปุ่มคอนแทค (button) และลวด ในวัสดุ AgNi, AgSnO2, AgCdO รวมถึง AgW และ CuW สำหรับงานกำลังสูง",
    en: "Silver electrical contacts are the parts that make and break the circuit in relays, contactors, switches and circuit breakers. VAN INTERTRADE supplies Longsun contacts as solid, bi-metal and tri-metal rivets, buttons and wire, in AgNi, AgSnO2 and AgCdO, plus AgW and CuW for high-power duty.",
  },
  description: {
    th: "หน้าสัมผัสไฟฟ้าฐานเงินจาก Longsun: หมุดคอนแทคแบบตัน สองโลหะ สามโลหะ ปุ่ม และลวด วัสดุ AgNi, AgSnO2, AgCdO, AgW, CuW ขอใบเสนอราคาจากแวน อินเตอร์เทรด",
    en: "Longsun silver electrical contacts: solid, bi-metal and tri-metal rivets, buttons and wire in AgNi, AgSnO2, AgCdO, AgW and CuW. Request a quote.",
  },
  body: [
    {
      th: "การเลือกหน้าสัมผัสมีสองเรื่อง: วัสดุ ซึ่งกำหนดความต้านทานหน้าสัมผัส การต้านการเชื่อมติด และการทนการสึกกร่อนจากอาร์ก และโครงสร้าง ซึ่งกำหนดว่าจะใช้เงินเท่าไร หมุดสองโลหะและสามโลหะใช้วัสดุฐานเงินเฉพาะหน้าสัมผัสบนแกนทองแดง ช่วยลดปริมาณเงินเมื่อเทียบกับหมุดแบบตัน",
      en: "Choosing a contact comes down to two things. The material sets contact resistance, resistance to welding and resistance to arc erosion. The structure sets how much silver you pay for: bi-metal and tri-metal rivets put the silver alloy only on the contact face over a copper body, using less silver than a solid rivet.",
    },
  ],
  image: {
    src: "/images/product-contacts.webp",
    width: 1024,
    height: 1024,
    alt: {
      th: "หมุดคอนแทคไฟฟ้าสีเงินและสีทองแดงหลายขนาดวางเรียงเป็นแถว",
      en: "Rows of silver and copper-coloured electrical contact rivets in several sizes",
    },
  },
  grades: [],
  variants: [
    {
      name: { th: "หมุดคอนแทคแบบตัน (solid rivet)", en: "Solid rivets" },
      desc: {
        th: "ทั้งชิ้นเป็นวัสดุหน้าสัมผัส ขึ้นรูปง่าย เหมาะกับหมุดขนาดเล็ก",
        en: "Made entirely of the contact material; simple to produce and suited to small rivets.",
      },
    },
    {
      name: { th: "หมุดสองโลหะ (bi-metal rivet)", en: "Bi-metal rivets" },
      desc: {
        th: "หัววัสดุฐานเงินบนก้านทองแดง ใช้เงินน้อยกว่าหมุดแบบตัน",
        en: "Silver-alloy head on a copper shank, using less silver than a solid rivet.",
      },
    },
    {
      name: { th: "หมุดสามโลหะ (tri-metal rivet)", en: "Tri-metal rivets" },
      desc: {
        th: "วัสดุฐานเงินทั้งสองด้านโดยมีแกนทองแดงตรงกลาง สำหรับจุดที่ต้องสัมผัสทั้งสองหน้า",
        en: "Silver alloy on both faces with a copper core, for parts that make contact on both sides.",
      },
    },
    {
      name: { th: "ปุ่มคอนแทคและลวด (buttons, wire)", en: "Buttons and wire" },
      desc: {
        th: "ปุ่มคอนแทคสำหรับเชื่อมหรือบัดกรีลงบนแขนคอนแทค และลวดวัสดุหน้าสัมผัสสำหรับขึ้นรูปเอง",
        en: "Contact buttons for welding or brazing onto contact arms, and contact-material wire for your own forming.",
      },
    },
    {
      name: { th: "AgNi (เงิน-นิกเกิล)", en: "AgNi (silver-nickel)" },
      desc: {
        th: "ความต้านทานหน้าสัมผัสต่ำและคงที่ นิยมในรีเลย์และสวิตช์กระแสต่ำถึงปานกลาง",
        en: "Low, stable contact resistance; common in low- to medium-current relays and switches.",
      },
    },
    {
      name: { th: "AgSnO2 (เงิน-ดีบุกออกไซด์)", en: "AgSnO2 (silver-tin oxide)" },
      desc: {
        th: "ต้านการเชื่อมติดและทนอาร์กได้ดี เป็นทางเลือกที่ไม่มีแคดเมียมแทน AgCdO",
        en: "Good resistance to welding and arc erosion; the usual cadmium-free alternative to AgCdO.",
      },
    },
    {
      name: { th: "AgCdO (เงิน-แคดเมียมออกไซด์)", en: "AgCdO (silver-cadmium oxide)" },
      desc: {
        th: "วัสดุหน้าสัมผัสแบบดั้งเดิมสำหรับงานตัดต่อกระแส มีแคดเมียมซึ่งถูกจำกัดตามกฎหมายในหลายตลาด ควรตรวจสอบข้อกำหนดของตลาดปลายทาง",
        en: "A traditional switching material. It contains cadmium, which is restricted by regulation in many markets, so check the rules for your destination market.",
      },
    },
    {
      name: { th: "AgW และ CuW (ทังสเตนคอมโพสิต)", en: "AgW and CuW (tungsten composites)" },
      desc: {
        th: "วัสดุโลหะผงที่มีทังสเตน ทนอาร์กและการสึกกร่อนสูง สำหรับเบรกเกอร์และงานตัดต่อกำลังสูง",
        en: "Powder-metallurgy tungsten composites with high arc and erosion resistance, for breakers and high-power switching.",
      },
    },
  ],
  forms: [],
  applications: [
    { th: "รีเลย์", en: "Relays" },
    { th: "คอนแทคเตอร์ (แมกเนติก)", en: "Contactors" },
    { th: "เบรกเกอร์", en: "Circuit breakers" },
    { th: "สวิตช์", en: "Switches" },
  ],
  industries: ["switchgear"],
  faqs: [
    {
      q: { th: "หมุดสองโลหะกับสามโลหะต่างกันอย่างไร?", en: "What is the difference between bi-metal and tri-metal rivets?" },
      a: {
        th: "หมุดสองโลหะมีวัสดุฐานเงินเฉพาะที่หัวบนก้านทองแดง ส่วนหมุดสามโลหะมีวัสดุฐานเงินทั้งสองด้านโดยมีแกนทองแดงตรงกลาง ใช้กับจุดที่ต้องสัมผัสทั้งสองหน้า",
        en: "A bi-metal rivet has silver alloy only on the head over a copper shank. A tri-metal rivet has silver alloy on both faces with a copper core, for parts that make contact on both sides.",
      },
    },
    {
      q: { th: "ควรเลือก AgSnO2 หรือ AgCdO?", en: "Should I choose AgSnO2 or AgCdO?" },
      a: {
        th: "AgSnO2 เป็นทางเลือกที่ไม่มีแคดเมียม ต้านการเชื่อมติดและทนอาร์กได้ดี ส่วน AgCdO มีแคดเมียมซึ่งถูกจำกัดในหลายตลาด ควรตรวจสอบข้อกำหนดของตลาดปลายทางก่อนเลือก",
        en: "AgSnO2 is the cadmium-free option with good resistance to welding and arcing. AgCdO contains cadmium, which many markets restrict, so check your destination market's rules first.",
      },
    },
    priceFaq({ th: "หน้าสัมผัสไฟฟ้า", en: "electrical contacts" }),
  ],
};
