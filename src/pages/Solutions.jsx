import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Snowflake, Droplets, Car, Plane, Cpu } from 'lucide-react';
import FAQSection from '../components/FAQSection';

// Reuse assets or placeholders if necessary, though we likely have them imported in Home.
import evImage from '../assets/ev.png';
import moldImage from '../assets/mold.png';
import oilgasImage from '../assets/oilgas.png';
import automotiveImage from '../assets/automotive.png';
import aerospaceImage from '../assets/aerospace.png';
import contactsImage from '../assets/contacts.png';

import SEO from '../components/SEO';

const Solutions = () => {
    const { language, t } = useLanguage();

    const faqs = language === 'th' ? [
        {
            question: "Van Intertrade เป็นตัวแทนจำหน่าย Materion อย่างเป็นทางการใช่หรือไม่?",
            answer: "ใช่ บริษัท แวน อินเตอร์เทรด จำกัด ได้รับการแต่งตั้งเป็นตัวแทนจำหน่าย (Authorized Distributor) อย่างเป็นทางการจาก Materion Corporation สหรัฐอเมริกา เพียงผู้เดียวในประเทศไทยมายาวนานกว่า 20 ปี"
        },
        {
            question: "มีสินค้าทองแดงเบริลเลียมในสต็อกพร้อมส่งหรือไม่?",
            answer: "เรามีสต็อกสินค้าเกรดมาตรฐาน (Standard Grades) เช่น C17200, MoldMAX HH, ToughMet พร้อมจัดส่งทันที สำหรับเกรดพิเศษสามารถสั่งนำเข้าได้โดยทีมงานมืออาชีพ"
        },
        {
            question: "สามารถขอใบรับรองวัสดุ (CoC/Mill Sheet) ได้หรือไม่?",
            answer: "ได้ สินค้าทุกชิ้นจาก Materion จะมีใบรับรองคุณภาพวัสดุ (Certificate of Conformance) และ Mill Test Report เพื่อยืนยันว่าเป็นของแท้และได้มาตรฐาน"
        },
        {
            question: "มีบริการตัดแบ่งขายตามขนาดที่ต้องการหรือไม่?",
            answer: "เรามีบริการตัดแบ่ง (Cut to size) ตามขนาดที่ลูกค้าต้องการ ไม่ว่าจะเป็นแบบแท่ง หรือแบบแผ่น เพื่อความสะดวกประหยัดเวลาของลูกค้า"
        }
    ] : [
        {
            question: "Is Van Intertrade an official Materion distributor?",
            answer: "Yes, Van Intertrade Co., Ltd. is the official Authorized Distributor for Materion Corporation in Thailand, serving the industry for over 20 years."
        },
        {
            question: "Do you have Beryllium Copper in stock?",
            answer: "We maintain stock of standard grades like C17200, MoldMAX HH, and ToughMet 3 for immediate delivery. Special grades can be imported upon request."
        },
        {
            question: "Can you provide Material Certifications (CoC)?",
            answer: "Absolutely. All Materion materials come with full traceability, Certificate of Conformance (CoC), and Mill Test Reports."
        },
        {
            question: "Do you offer cut-to-size services?",
            answer: "Yes, we offer precision cutting services for both rod and plate materials to meet your specific manufacturing requirements."
        }
    ];

    const faqSchema = {
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    };

    const seoData = {
        title: t('seo.solutions.title'),
        description: t('seo.solutions.desc'),
        type: 'website',
        jsonLd: {
            '@type': 'CollectionPage',
            'name': 'Solutions',
            'description': t('seo.solutions.desc'),
            ...faqSchema // Merge FAQ Schema
        }
    };

    const solutions = [
        {
            id: 'ev',
            title: t('solutions_page.items.ev.title'),
            icon: <Zap className="w-6 h-6 text-yellow-500" />,
            description: t('solutions_page.items.ev.desc'),
            features: t('solutions_page.items.ev.features') || [], // fallback if array is undefined
            image: evImage,
            color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
        },
        {
            id: 'mold',
            title: t('solutions_page.items.mold.title'),
            icon: <Snowflake className="w-6 h-6 text-blue-500" />,
            description: t('solutions_page.items.mold.desc'),
            features: t('solutions_page.items.mold.features') || [],
            image: moldImage,
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        },
        {
            id: 'oilgas',
            title: t('solutions_page.items.oilgas.title'),
            icon: <Droplets className="w-6 h-6 text-amber-700" />,
            description: t('solutions_page.items.oilgas.desc'),
            features: t('solutions_page.items.oilgas.features') || [],
            image: oilgasImage,
            color: "bg-amber-700/10 text-amber-700 dark:text-amber-500"
        },
        {
            id: 'auto',
            title: t('solutions_page.items.auto.title'),
            icon: <Car className="w-6 h-6 text-red-500" />,
            description: t('solutions_page.items.auto.desc'),
            features: t('solutions_page.items.auto.features') || [],
            image: automotiveImage,
            color: "bg-red-500/10 text-red-600 dark:text-red-400"
        },
        {
            id: 'aero',
            title: t('solutions_page.items.aero.title'),
            icon: <Plane className="w-6 h-6 text-sky-500" />,
            description: t('solutions_page.items.aero.desc'),
            features: t('solutions_page.items.aero.features') || [],
            image: aerospaceImage,
            color: "bg-sky-500/10 text-sky-600 dark:text-sky-400"
        },
        {
            id: 'contacts',
            title: t('solutions_page.items.contacts.title'),
            icon: <Cpu className="w-6 h-6 text-indigo-500" />,
            description: t('solutions_page.items.contacts.desc'),
            features: t('solutions_page.items.contacts.features') || [],
            image: contactsImage,
            color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        }
    ];

    return (
        <div className="bg-background dark:bg-[#0a0a0a] min-h-screen pt-24 pb-16">
            <SEO {...seoData} />
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-white mb-6">
                        {t('solutions_page.title')}
                    </h1>
                    <p className="text-xl text-secondary dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('solutions_page.subtitle')}
                    </p>
                </motion.div>

                {/* Solutions List */}
                <div className="space-y-24">
                    {solutions.map((sol, index) => (
                        <motion.div
                            key={sol.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    <img
                                        src={sol.image}
                                        alt={sol.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${sol.color} font-medium text-sm`}>
                                    {sol.icon}
                                    <span>{sol.id.toUpperCase()}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white">
                                    {sol.title}
                                </h2>
                                <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed">
                                    {sol.description}
                                </p>

                                <ul className="space-y-3 pt-4">
                                    {Array.isArray(sol.features) && sol.features.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-secondary dark:text-gray-400">
                                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6">
                                    <button className="text-accent hover:text-blue-600 font-medium flex items-center gap-2 group transition-colors">
                                        {t('hero.cta_products')} <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-32 p-12 bg-gray-50 dark:bg-[#111] rounded-3xl text-center space-y-8"
                >
                    <h3 className="text-3xl font-bold text-primary dark:text-white">
                        {t('solutions_page.cta.title')}
                    </h3>
                    <p className="text-lg text-secondary dark:text-gray-400 max-w-2xl mx-auto">
                        {t('solutions_page.cta.desc')}
                    </p>
                    <a
                        href="https://line.me/R/ti/p/@vanintertrade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all"
                    >
                        {t('solutions_page.cta.button')}
                    </a>
                </motion.div>

                {/* FAQ Section for GEO */}
                <div className="mt-24">
                    <FAQSection
                        data={faqs}
                        title={language === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Solutions;
