import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: {
            products: "Products",
            solutions: "Solutions",
            about: "About Us",
            contact: "Contact",
            language: "Language",
        },
        seo: {
            home: {
                title: "Van Intertrade - Authorized Materion Distributor Thailand",
                desc: "Official distributor of Materion performance alloys in Thailand. High-performance Copper Beryllium, MoldMAX, and ToughMet alloys for EV, Aerospace, and Oil & Gas."
            },
            products: {
                title: "High Performance Copper Alloys Catalog - Van Intertrade",
                desc: "Browse our catalog of Beryllium Copper, MoldMAX, ToughMet, and Electronic Alloys. Available in rod, bar, tube, wire, and plate forms."
            },
            solutions: {
                title: "Engineering Material Solutions for Industry - Van Intertrade",
                desc: "Material solutions for Electric Vehicles, Aerospace, Oil & Gas, and Heavy Industry. Solving thermal management and high-strength challenges."
            },
            about: {
                title: "About Van Intertrade - Leading Alloy Distributor in SE Asia",
                desc: "Over 20 years of experience supplying high-performance materials to Thai industries. Trusted partner of Materion Corporation."
            },
            contact: {
                title: "Contact Us - Request a Quote for High Performance Alloys",
                desc: "Get a quote for Beryllium Copper, MoldMAX, or ToughMet alloys. Contact our engineering sales team in Bangkok for technical assistance."
            },
            keywords: "Beryllium Copper, C17200, C17200 Thailand, Copper Beryllium Alloy, C5191, C5191 Thailand, Materion Thailand, MoldMAX, ToughMet, CrCu, Chromium Copper, CrCuZr, Copper Chromium Zirconium, Ag Contact, Silver Contact, Bi-metal Contact, Tri-metal Contact, AgNi, AgSnO2, AgCdO, Electronic Alloys, EV Materials, Aerospace Alloys, Oil and Gas Materials, Van Intertrade, Electrical Contact Materials, Copper Alloy Supplier Thailand"
        },
        brand: {
            name: "Van Intertrade",
            suffix: "Co., Ltd."
        },
        hero: {
            title: "Advanced Materials for Future Industries",
            subtitle: "The official distributor of Materion in Thailand. Providing high-performance Copper Alloys, Clad Metals, and Electrical Contacts.",
            cta_learn: "Learn More",
            cta_products: "View Products",
        },
        products: {
            title: "High Performance Alloys",
            subtitle: "Powering the future of EV, Energy, and Industrial sectors.",
            categories: {
                cube: {
                    title: "Copper Beryllium Alloys",
                    desc: "The highest performance copper alloys available. Combining high strength with innovative thermal management.",
                    features: ["High Strength", "High Conductivity", "Wear Resistance", "Corrosion Resistance"],
                    grades: ["Alloy 25", "Alloy 174", "Alloy 3", "Alloy 390"]
                },
                mold: {
                    title: "MoldMAX® Alloys",
                    desc: "Premium mold tooling alloys that provide superior thermal conductivity and hardness.",
                    features: ["Faster Cycle Times", "Improved Plastic Part Quality", "Extended Tool Life"],
                    grades: ["MoldMAX HH", "MoldMAX V", "MoldMAX XL", "PROTHERM"]
                },
                toughmet: {
                    title: "ToughMet® Alloys",
                    desc: "The world's highest strength spinodal copper-nickel-tin alloys, engineered for extreme conditions.",
                    features: ["Anti-Galling", "High Load Bearing", "Sour Gas Resistant"],
                    grades: ["ToughMet 3", "ToughMet 2"]
                },
                standard: {
                    title: "Standard Copper Alloys",
                    desc: "High-quality standard copper alloys known for excellent machinability and conductivity for general electronics.",
                    features: ["Good Conductivity", "Excellent Formability", "Cost-effective"],
                    grades: ["C5191", "C5210", "C1100"]
                },
                clad: {
                    title: "Clad Metals",
                    desc: "Advanced composite metals combining properties of different materials for optimal performance and cost efficiency.",
                    features: ["Tailored Properties", "Material Saving", "Thermal Management"],
                    grades: ["Cu/Al/Cu", "Ag/Cu", "Custom Layups"]
                },
                contacts: {
                    title: "Electrical Contacts (Longsun)",
                    desc: "Precision electrical contacts including solid, bi-metal, and tri-metal rivets, plus powder metallurgy contacts for high-voltage applications.",
                    features: ["Solid / Bi-metal / Tri-metal", "AgNi, AgSnO2, AgCdO", "AgW, CuW (High Power)"],
                    grades: ["Rivets", "Buttons", "Wire", "AgNi", "AgSnO2"]
                }
            }
        },
        about: {
            hero: {
                title: "Innovating for the Future",
                subtitle: "Van Intertrade has been a pillar of industrial excellence in Thailand for over two decades."
            },
            mission: {
                title: "Our Mission",
                desc: "To bridge the gap between world-class material science and local industrial capability. We don't just supply alloys; we engineer solutions. By delivering Materion's advanced high-performance materials with precise technical expertise, we empower Thai manufacturers to overcome complex engineering challenges—from electrifying the future of mobility to powering critical infrastructure—ensuring they compete and win on the global stage."
            },
            vision: {
                title: "Our Vision",
                desc: "To become the catalyst for Southeast Asia's industrial revolution. We envision a future where local industries are defined by innovation, resilience, and sustainability. Through unyielding dedication to quality and deep technical partnership, we aim to be the backbone of the region's technological advancement, setting new standards for what is possible in the EV, Aerospace, and Energy sectors."
            },
            history: {
                title: "Our Journey",
                timeline: [
                    { year: "2000", title: "Founded", desc: "Established in Bangkok as a specialized metal distributor." },
                    { year: "2010", title: "Materion Partnership", desc: "Appointed as official distributor for Materion Performance Alloys." },
                    { year: "2025", title: "Digital Transformation", desc: "Launching new digital platforms to better serve our customers." }
                ]
            },
            partners: {
                title: "Official Partners",
                desc: "We are proud to represent global leaders in material science.",
                materion: "Materion Corporation is a global leader in advanced materials and services, enabling technologies to make the world better."
            }
        },
        solutions_page: {
            title: "Industry Solutions",
            subtitle: "Engineered materials solving critical challenges in the world's most demanding industries.",
            items: {
                ev: {
                    title: "Electric Vehicles (EV)",
                    desc: "Advanced copper alloys engineered for the next generation of electric mobility. Our materials ensure maximum efficiency in battery connectors, charging pins, and power distribution systems.",
                    features: ["Superior electrical conductivity (up to 85% IACS)", "High stress relaxation resistance", "Thermal management optimization", "Durability in high-vibration environments"]
                },
                mold: {
                    title: "Industrial Molds",
                    desc: "MoldMAX® alloys revolutionize plastic injection molding. By significantly improving cooling rates, our materials reduce cycle times and improve part quality.",
                    features: ["Up to 50% cycle time reduction", "Uniform heat dissipation", "High hardness and wear resistance", "Excellent polishing properties"]
                },
                oilgas: {
                    title: "Oil & Gas",
                    desc: "ToughMet® alloys provide unmatched strength and corrosion resistance for downhole drilling tools. Designed to withstand the harshest subterranean environments.",
                    features: ["Non-galling and anti-seizing", "High tensile strength (up to 140 ksi)", "Resistance to H2S and chloride corrosion", "Non-magnetic properties"]
                },
                auto: {
                    title: "Automotive",
                    desc: "Comprehensive material solutions for conventional and hybrid vehicles, focusing on sensor reliability, connector stability, and powertrain efficiency.",
                    features: ["High-temperature connector reliability", "Vibration resistance for sensors", "Thermal management for power electronics", "Cost-effective alloy alternatives"]
                },
                aero: {
                    title: "Aerospace",
                    desc: "High-performance alloys meeting the strict demands of aerospace applications. From landing gear bushings to flight-critical actuators.",
                    features: ["High strength-to-weight ratio", "Extreme temperature tolerance", "Gall resistant bearing materials", "Fracture toughness"]
                },
                contacts: {
                    title: "Electrical Contact Materials",
                    desc: "Precision engineered rivet and button contacts for high-reliability switching in breakers, contactors, and relays (Longsun Group).",
                    features: ["Low contact resistance", "Anti-welding properties", "High arc erosion resistance", "Optimized bi-metal/tri-metal structures"]
                }
            },
            cta: {
                title: "Need a Custom Solution?",
                desc: "Our engineers can help you select or design the perfect alloy for your specific application requirements.",
                button: "Contact Sales Application"
            }
        },
        home_extra: {
            industries: {
                auto: { name: "Automotive", desc: "Advanced connectors and sensors for modern mobility." },
                ev: { name: "Electric Vehicles", desc: "High conductivity alloys for battery and connector efficiency." },
                aero: { name: "Aerospace", desc: "High-strength reliability for flight-critical components." },
                contacts: { name: "Electrical Contacts", desc: "Precision rivets and buttons for switching applications." },
                mold: { name: "Industrial Molds", desc: "MoldMAX® alloys for superior cooling and cycle time reduction." },
                energy: { name: "Oil & Gas", desc: "ToughMet® non-galling alloys for extreme downhole conditions." }
            },
            partners: {
                title: "Authorized Partners",
                desc: "Van Intertrade Co., Ltd. is proud to be the official distributor for Materion in Thailand, bringing world-class high-performance alloys to local industries."
            }
        },
        contact: {
            hero: {
                title: "Contact Us",
                subtitle: "Our team of engineers and material experts is ready to assist with your project."
            },
            info: {
                call: "Call Us",
                phone_value: "02-728-0150 , 086-303-8051",
                email: "Email Sales",
                email_value: "van@vaninter.com",
                hours: "Mon-Fri 8:30 - 17:30",
                visit: "Visit Office",
                address: "Van Intertrade Co., Ltd.\nBangkok, Thailand"
            },
            form: {
                title: "Send us a message",
                name: "Your Name",
                email: "Email Address",
                message: "How can we help?",
                submit: "Send Message",
                success: "Message sent successfully!"
            }
        },
        footer: {
            copyright: "© 2025 Van Intertrade Co., Ltd. All rights reserved.",
            distributor: "Your trusted partner for high-performance copper alloys and engineering materials.",
            company: "Company",
            links: {
                cube: "Copper Beryllium",
                mold: "MoldMAX",
                standard: "Standard Copper Alloys",
                clad: "Clad Metals",
                contacts: "Electrical Contacts",
                privacy: "Privacy Policy",
                terms: "Terms of Use"
            }
        }
    },
    th: {
        nav: {
            products: "สินค้า",
            solutions: "โซลูชั่น",
            about: "เกี่ยวกับเรา",
            contact: "ติดต่อเรา",
            language: "ภาษา",
        },
        seo: {
            home: {
                title: "Van Intertrade - ตัวแทนจำหน่าย Materion ทองแดงเบริลเลียม ผู้นำเข้าหนึ่งเดียวในไทย",
                desc: "ศูนย์รวมวัสดุอุตสาหกรรมครบวงจร ตัวแทนจำหน่ายอย่างเป็นทางการ Materion จำหน่ายเบริลเลียมคอปเปอร์ (Beryllium Copper) MoldMAX และ ToughMet ราคาส่ง สำหรับโรงงานอุตสาหกรรม จัดซื้อวัสดุเกรดพิเศษ"
            },
            products: {
                title: "แคตตาล็อกสินค้าอุตสาหกรรม - ทองแดงเบริลเลียม และโลหะเกรดพิเศษ (Beryllium Copper Catalog)",
                desc: "เลือกซื้อทองแดงเบริลเลียม (Beryllium Copper) แบบแท่ง แผ่น ลวด ท่อ เกรด C17200, MoldMAX HH, ToughMet 3 พร้อมใบรับรองวัสดุ (CoC) สำหรับงานแม่พิมพ์และชิ้นส่วนอิเล็กทรอนิกส์"
            },
            solutions: {
                title: "โซลูชั่นวัสดุวิศวกรรมสำหรับโรงงานและไลน์ผลิต - Van Intertrade",
                desc: "บริการที่ปรึกษาด้านวัสดุสำหรับวิศวกรโรงงาน แก้ปัญหาชิ้นส่วนสึกหรอ การจัดการความร้อนในแม่พิมพ์ (Mold Cooling) และชิ้นส่วน EV ด้วยวัสดุเกรด World-Class"
            },
            about: {
                title: "เกี่ยวกับ Van Intertrade - ซัพพลายเออร์วัสดุอุตสาหกรรมชั้นนำกว่า 20 ปี",
                desc: "บริษัท แวน อินเตอร์เทรด จำกัด ผู้เชี่ยวชาญด้านการจัดหาและนำเข้าโลหะผสมพิเศษ (Specialty Alloys) คู่ค้าที่เชื่อถือได้ของฝ่ายจัดซื้อและวิศวกรโรงงานทั่วประเทศไทย"
            },
            contact: {
                title: "ติดต่อขอใบเสนอราคา (Request Quote) - ทองแดงเบริลเลียมและวัสดุอุตสาหกรรม",
                desc: "ติดต่อฝ่ายขายและวิศวกรรมเพื่อขอใบเสนอราคา (Quotation) เช็คสต็อกสินค้า ปรึกษาเกรดวัสดุ โทร: 02-XXX-XXXX หรือ Email: sales@vanintertrade.com"
            },
            keywords: "ทองแดงเบริลเลียม, เบริลเลียมคอปเปอร์, C17200, C17200 ราคา, C17200 ประเทศไทย, C5191, C5191 ราคา, C5191 ประเทศไทย, Beryllium Copper Thailand, MoldMAX, ToughMet, CrCu, ทองแดงโครเมี่ยม, CrCuZr, ทองแดง CrCu, ทองแดงโครเมียมเซอร์โคเนียม, Ag contact, หน้าสัมผัสเงิน, Bi-metal contact, หน้าสัมผัสสองโลหะ, Tri-metal contact, AgNi, AgSnO2, AgCdO, วัสดุเกรดพิเศษ, โลหะนำเข้า, แวน อินเตอร์เทรด, ชิ้นส่วน EV, แม่พิมพ์อุตสาหกรรม, วัสดุวิศวกรรม, โลหะผสมทองแดง, ซัพพลายเออร์ทองแดง, จำหน่ายทองแดงเบริลเลียม, ราคาทองแดงเบริลเลียม, Materion ประเทศไทย"
        },
        brand: {
            name: "แวน อินเตอร์เทรด",
            suffix: "จํากัด"
        },
        hero: {
            title: "นวัตกรรมวัสดุสำหรับอุตสาหกรรมแห่งอนาคต",
            subtitle: "ตัวแทนจำหน่ายอย่างเป็นทางการของ Materion ในประเทศไทย ผู้นำด้านโลหะผสมทองแดงประสิทธิภาพสูง วัสดุ Clad และหน้าสัมผัสไฟฟ้า",
            cta_learn: "เรียนรู้เพิ่มเติม",
            cta_products: "ดูสินค้า",
        },
        products: {
            title: "โลหะผสมประสิทธิภาพสูง",
            subtitle: "ขับเคลื่อนอนาคตของอุตสาหกรรม EV, พลังงาน และอุตสาหกรรมหนัก",
            categories: {
                cube: {
                    title: "ทองแดงเบริลเลียม (Copper Beryllium)",
                    desc: "โลหะผสมทองแดงประสิทธิภาพสูงสุด ผสานความแข็งแกร่งสูงเข้ากับการจัดการความร้อนที่เป็นนวัตกรรม",
                    features: ["ความแข็งแรงสูง", "นำไฟฟ้าสูง", "ทนต่อการสึกหรอ", "ทนต่อการกัดกร่อน"],
                    grades: ["Alloy 25", "Alloy 174", "Alloy 3", "Alloy 390"]
                },
                mold: {
                    title: "MoldMAX® (สำหรับแม่พิมพ์)",
                    desc: "โลหะผสมสำหรับแม่พิมพ์เกรดพรีเมียม ให้การนำความร้อนและความแข็งที่เหนือกว่า",
                    features: ["รอบการผลิตเร็วขึ้น", "คุณภาพชิ้นงานพลาสติกดีขึ้น", "อายุการใช้งานแม่พิมพ์ยาวนาน"],
                    grades: ["MoldMAX HH", "MoldMAX V", "MoldMAX XL", "PROTHERM"]
                },
                toughmet: {
                    title: "ToughMet® (โลหะแกร่ง)",
                    desc: "โลหะผสมทองแดง-นิกเกิล-ดีบุก สไปโนดัลที่มีความแข็งแรงสูงสุดในโลก ออกแบบมาเพื่อสภาวะสุดขั้ว",
                    features: ["ป้องกันการติดขัด (Anti-Galling)", "รับน้ำหนักได้สูง", "ทนต่อก๊าซเปรี้ยว (Sour Gas)"],
                    grades: ["ToughMet 3", "ToughMet 2"]
                },
                standard: {
                    title: "โลหะผสมทองแดงมาตรฐาน",
                    desc: "โลหะผสมทองแดงคุณภาพสูง เป็นที่รู้จักในด้านความสามารถในการขึ้นรูปและการนำไฟฟ้าที่ดีเยี่ยมสำหรับอิเล็กทรอนิกส์ทั่วไป",
                    features: ["นำไฟฟ้าดี", "ขึ้นรูปง่ายเยี่ยมยอด", "คุ้มค่าราคา"],
                    grades: ["C5191", "C5210", "C1100"]
                },
                clad: {
                    title: "โลหะหุ้ม (Clad Metals)",
                    desc: "โลหะคอมโพสิตขั้นสูงที่รวมคุณสมบัติของวัสดุต่างชนิดเพื่อประสิทธิภาพสูงสุดและความคุ้มค่า",
                    features: ["ปรับแต่งคุณสมบัติได้", "ประหยัดวัสดุ", "การจัดการความร้อน"],
                    grades: ["Cu/Al/Cu", "Ag/Cu", "โครงสร้างตามสั่ง"]
                },
                contacts: {
                    title: "หน้าสัมผัสไฟฟ้า (Electrical Contacts)",
                    desc: "หน้าสัมผัสไฟฟ้าความแม่นยำสูง รวมถึงหมุดย้ำแบบตัน สองโลหะ และสามโลหะ พร้อมหน้าสัมผัสโลหะผงสำหรับไฟฟ้าแรงสูง",
                    features: ["แบบตัน / สองโลหะ / สามโลหะ", "AgNi, AgSnO2, AgCdO", "AgW, CuW (กำลังสูง)"],
                    grades: ["Rivets", "Buttons", "Wire", "AgNi", "AgSnO2"]
                }
            }
        },
        home_extra: {
            industries: {
                auto: { name: "ยานยนต์", desc: "ขั้วต่อและเซ็นเซอร์ขั้นสูงสำหรับการขับเคลื่อนสมัยใหม่" },
                ev: { name: "ยานยนต์ไฟฟ้า", desc: "โลหะผสมนำไฟฟ้าสูงเพื่อประสิทธิภาพแบตเตอรี่และขั้วต่อ" },
                aero: { name: "อากาศยาน", desc: "ความน่าเชื่อถือความแข็งแรงสูงสำหรับชิ้นส่วนสำคัญต่อการบิน" },
                contacts: { name: "หน้าสัมผัสไฟฟ้า", desc: "รีเวทและปุ่มความแม่นยำสูงสำหรับการใช้งานสวิตช์" },
                mold: { name: "แม่พิมพ์อุตสาหกรรม", desc: "โลหะผสม MoldMAX® เพื่อการระบายความร้อนที่เหนือกว่าและการลดเวลาต่อรอบ" },
                energy: { name: "น้ำมันและก๊าซ", desc: "โลหะผสม ToughMet® ไม่เกิดการถลอกสำหรับสภาพแวดล้อมใต้ดินที่รุนแรง" }
            },
            partners: {
                title: "พันธมิตรอย่างเป็นทางการ",
                desc: "บริษัท แวน อินเตอร์เทรด จำกัด ภูมิใจที่ได้เป็นตัวแทนจำหน่ายอย่างเป็นทางการสำหรับ Materion ในประเทศไทย นำโลหะผสมประสิทธิภาพสูงระดับโลกมาสู่อุตสาหกรรมในท้องถิ่น"
            }
        },
        about: {
            hero: {
                title: "นวัตกรรมเพื่ออนาคต",
                subtitle: "แวน อินเตอร์เทรด เป็นเสาหลักแห่งความเป็นเลิศทางอุตสาหกรรมในประเทศไทยมากว่าสองทศวรรษ"
            },
            mission: {
                title: "พันธกิจของเรา",
                desc: "เพื่อเป็นสะพานเชื่อมระหว่างวิทยาศาสตร์วัสดุระดับโลกกับขีดความสามารถทางอุตสาหกรรมของไทย เราไม่ได้เพียงแค่จัดจำหน่ายโลหะผสม แต่เราสร้างสรรค์โซลูชัน ด้วยการส่งมอบวัสดุประสิทธิภาพสูงจาก Materion พร้อมความเชี่ยวชาญทางเทคนิคที่แม่นยำ เรามุ่งมั่นที่จะเสริมสร้างศักยภาพให้ผู้ผลิตไทยก้าวข้ามความท้าทายทางวิศวกรรมที่ซับซ้อน ตั้งแต่การขับเคลื่อนยานยนต์ไฟฟ้าแห่งอนาคตไปจนถึงโครงสร้างพื้นฐานที่สำคัญ เพื่อให้มั่นใจว่าอุตสาหกรรมไทยสามารถแข่งขันและยืนหยัดได้ในเวทีโลก"
            },
            vision: {
                title: "วิสัยทัศน์ของเรา",
                desc: "เพื่อเป็นกลไกสำคัญในการขับเคลื่อนการปฏิวัติอุตสาหกรรมของเอเชียตะวันออกเฉียงใต้ เรามองเห็นอนาคตที่อุตสาหกรรมในภูมิภาคถูกนิยามด้วยนวัตกรรม ความยั่งยืน และความแข็งแกร่ง ด้วยความทุ่มเทอย่างไม่ย่อท้อต่อคุณภาพและการเป็นพันธมิตรทางเทคนิคที่ลึกซึ้ง เราตั้งเป้าที่จะเป็นกระดูกสันหลังของความก้าวหน้าทางเทคโนโลยีในภูมิภาค สร้างมาตรฐานใหม่ให้กับความเป็นไปได้ในภาคยานยนต์ไฟฟ้า อากาศยาน และพลังงาน"
            },
            history: {
                title: "การเดินทางของเรา",
                timeline: [
                    { year: "2543", title: "ก่อตั้งบริษัท", desc: "ก่อตั้งขึ้นในกรุงเทพฯ ในฐานะผู้จัดจำหน่ายโลหะเฉพาะทาง" },
                    { year: "2553", title: "พันธมิตรกับ Materion", desc: "ได้รับแต่งตั้งให้เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ Materion Performance Alloys" },
                    { year: "2568", title: "การเปลี่ยนแปลงสู่ดิจิทัล", desc: "เปิดตัวแพลตฟอร์มดิจิทัลใหม่เพื่อให้บริการลูกค้าได้ดียิ่งขึ้น" }
                ]
            },
            partners: {
                title: "พันธมิตรอย่างเป็นทางการ",
                desc: "เราภูมิใจที่เป็นตัวแทนของผู้นำระดับโลกด้านวัสดุศาสตร์",
                materion: "Materion Corporation คือผู้นำระดับโลกด้านวัสดุขั้นสูงและบริการ ที่ช่วยให้เทคโนโลยีต่างๆ พัฒนาโลกให้ดีขึ้น"
            }
        },
        solutions_page: {
            title: "โซลูชั่นอุตสาหกรรม",
            subtitle: "วัสดุวิศวกรรมที่แก้โจทย์ท้าทายสำคัญในอุตสาหกรรมที่มีความต้องการสูงที่สุดในโลก",
            items: {
                ev: {
                    title: "ยานยนต์ไฟฟ้า (EV)",
                    desc: "โลหะผสมทองแดงขั้นสูงที่ออกแบบมาเพื่อยุคถัดไปของการขับเคลื่อนด้วยไฟฟ้า วัสดุของเรารับประกันประสิทธิภาพสูงสุดในขั้วต่อแบตเตอรี่ พินชาร์จ และระบบจ่ายไฟ",
                    features: ["การนำไฟฟ้าที่เหนือชั้น (สูงถึง 85% IACS)", "ต้านทานการคลายตัวจากความเครียดสูง", "การจัดการความร้อนที่เหมาะสม", "ความทนทานในสภาพแวดล้อมที่มีการสั่นสะเทือนสูง"]
                },
                mold: {
                    title: "แม่พิมพ์อุตสาหกรรม",
                    desc: "โลหะผสม MoldMAX® ปฏิวัติการฉีดขึ้นรูปพลาสติก ด้วยการปรับปรุงอัตราการระบายความร้อนอย่างมีนัยสำคัญ วัสดุของเราช่วยลดเวลาต่อรอบและปรับปรุงคุณภาพชิ้นงาน",
                    features: ["ลดเวลาต่อรอบการผลิตได้สูงสุด 50%", "การระบายความร้อนที่สม่ำเสมอ", "ความแข็งสูงและต้านทานการสึกหรอ", "คุณสมบัติการขัดเงาที่ยอดเยี่ยม"]
                },
                oilgas: {
                    title: "น้ำมันและก๊าซ",
                    desc: "โลหะผสม ToughMet® มอบความแข็งแกร่งและการต้านทานการกัดกร่อนที่ไม่มีใครเทียบได้สำหรับเครื่องมือขุดเจาะใต้ดิน ออกแบบมาเพื่อทนต่อสภาพแวดล้อมที่รุนแรงที่สุด",
                    features: ["ไม่เกิดการถลอกและป้องกันการยึดติด", "ความต้านทานแรงดึงสูง (สูงถึง 140 ksi)", "ต้านทานการกัดกร่อนจาก H2S และคลอไรด์", "คุณสมบัติไม่เป็นแม่เหล็ก"]
                },
                auto: {
                    title: "ยานยนต์",
                    desc: "โซลูชั่นวัสดุครบวงจรสำหรับยานยนต์ทั่วไปและไฮบริด เน้นความน่าเชื่อถือของเซ็นเซอร์ ความเสถียรของขั้วต่อ และประสิทธิภาพของระบบส่งกำลัง",
                    features: ["ความน่าเชื่อถือของขั้วต่ออุณหภูมิสูง", "ต้านทานการสั่นสะเทือนสำหรับเซ็นเซอร์", "การจัดการความร้อนสำหรับอิเล็กทรอนิกส์กำลัง", "ทางเลือกโลหะผสมที่คุ้มค่า"]
                },
                aero: {
                    title: "อากาศยาน",
                    desc: "โลหะผสมประสิทธิภาพสูงที่ตอบสนองความต้องการที่เข้มงวดของการใช้งานด้านอากาศยาน ตั้งแต่บูชล้อลงจอดไปจนถึงแอคชูเอเตอร์ที่สำคัญต่อการบิน",
                    features: ["อัตราส่วนความแข็งแรงต่อน้ำหนักสูง", "ความทนทานต่ออุณหภูมิที่รุนแรง", "วัสดุตลับลูกปืนที่ต้านทานการถลอก", "ความเหนียวต้านทานการแตกหัก"]
                },
                contacts: {
                    title: "วัสดุหน้าสัมผัสไฟฟ้า",
                    desc: "รีเวทและปุ่มหน้าสัมผัสวิศวกรรมความแม่นยำสูงสำหรับการสลับที่มีความน่าเชื่อถือสูงในเบรกเกอร์ คอนแทคเตอร์ และรีเลย์ (Longsun Group)",
                    features: ["ความต้านทานการสัมผัสต่ำ", "คุณสมบัติป้องกันการเชื่อมติด", "ต้านทานการสึกกร่อนจากอาร์คสูง", "โครงสร้างไบเมทัล/ทริเมทัลที่เหมาะสม"]
                }
            },
            cta: {
                title: "ต้องการโซลูชั่นที่ปรับแต่งเฉพาะ?",
                desc: "วิศวกรของเราสามารถช่วยคุณเลือกหรือออกแบบโลหะผสมที่สมบูรณ์แบบสำหรับความต้องการเฉพาะแอปพลิเคชันของคุณ",
                button: "ติดต่อฝ่ายขาย"
            }
        },
        contact: {
            hero: {
                title: "ติดต่อเรา",
                subtitle: "ทีมวิศวกรและผู้เชี่ยวชาญด้านวัสดุของเราพร้อมให้ความช่วยเหลือเกี่ยวกับโครงการของคุณ"
            },
            info: {
                call: "โทรหาเรา",
                phone_value: "02-728-0150 , 086-303-8051",
                email: "อีเมลฝ่ายขาย",
                email_value: "van@vaninter.com",
                hours: "จันทร์-ศุกร์ 8:30 - 17:30",
                visit: "เยี่ยมชมสำนักงาน",
                address: "บริษัท แวน อินเตอร์เทรด จำกัด\nกรุงเทพมหานคร, ประเทศไทย"
            },
            form: {
                title: "ส่งข้อความถึงเรา",
                name: "ชื่อของคุณ",
                email: "อีเมล",
                message: "มีอะไรให้เราช่วย?",
                submit: "ส่งข้อความ",
                success: "ส่งข้อความเรียบร้อย!"
            }
        },
        footer: {
            copyright: "© 2025 บริษัท แวน อินเตอร์เทรด จำกัด สงวนลิขสิทธิ์",
            distributor: "คู่ค้าที่คุณไว้วางใจสำหรับโลหะผสมทองแดงประสิทธิภาพสูงและวัสดุวิศวกรรม",
            company: "บริษัท",
            links: {
                cube: "ทองแดงเบริลเลียม",
                mold: "MoldMAX",
                standard: "ทองแดงมาตรฐาน",
                clad: "โลหะหุ้ม (Clad)",
                contacts: "หน้าสัมผัสไฟฟ้า",
                privacy: "นโยบายความเป็นส่วนตัว",
                terms: "เงื่อนไขการใช้งาน"
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('th'); // Default to Thai

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'th' : 'en'));
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
