import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Building2, Globe, Users, History, TrendingUp, Handshake } from 'lucide-react';

// Assets (Using placeholders or re-using existing relevant ones for now)
import officeImage from '../assets/hero-minimal.png'; // Temporary fallback

import SEO from '../components/SEO';

const About = () => {
    const { t } = useLanguage();

    const seoData = {
        title: t('seo.about.title'),
        description: t('seo.about.desc'),
        type: 'profile',
        jsonLd: {
            '@type': 'AboutPage',
            'mainEntity': {
                '@type': 'Organization',
                'name': 'Van Intertrade Co., Ltd.',
                'foundingDate': '2000'
            }
        }
    };

    const stats = [
        { label: "Years Experience", value: "20+" },
        { label: "Global Partners", value: "5+" },
        { label: "Industries Served", value: "10+" },
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-[#0a0a0a] text-primary dark:text-white">
            <SEO {...seoData} />
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={officeImage}
                        alt="Van Intertrade Office"
                        className="w-full h-full object-cover dark:opacity-40 filter brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="relative z-10 h-full flex items-center justify-center text-center px-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                            {t('about.hero.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light">
                            {t('about.hero.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-24">
                <div className="grid md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/80 dark:bg-[#111]/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl text-center"
                        >
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-secondary dark:text-gray-400 font-medium tracking-wide">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
                {/* Mission & Vision Bento */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-10 rounded-3xl bg-surface dark:bg-[#111] border border-gray-100 dark:border-gray-800"
                    >
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-accent mb-6">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{t('about.mission.title')}</h2>
                        <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed">
                            {t('about.mission.desc')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-10 rounded-3xl bg-surface dark:bg-[#111] border border-gray-100 dark:border-gray-800"
                    >
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-accent mb-6">
                            <Globe className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{t('about.vision.title')}</h2>
                        <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed">
                            {t('about.vision.desc')}
                        </p>
                    </motion.div>
                </div>

                {/* Materion Partnership */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl overflow-hidden relative bg-[#000] text-white"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                        alt="Industrial Partnership"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />

                    <div className="relative z-20 p-12 md:p-20 max-w-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
                                <img src="/src/assets/logo-materion.png" alt="Materion" className="w-full h-full object-contain" />
                            </div>
                            <div className="h-12 w-px bg-white/30" />
                            <Handshake className="w-8 h-8 text-accent" />
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Materion Corporation</h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {t('about.partners.materion')}
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm">
                                Authorized Distributor
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20 text-sm">
                                Certified Excellence
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">{t('about.history.title')}</h2>
                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:dark:via-gray-700 before:to-transparent">
                        {t('about.history.timeline').map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background dark:border-[#0a0a0a] bg-accent group-hover:bg-blue-600 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-white shadow-lg">
                                    <History className="w-4 h-4" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-surface dark:bg-[#111] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-accent font-bold mb-1 block">{item.year}</span>
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-secondary dark:text-gray-400 text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
