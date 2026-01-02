import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Globe, Shield, Zap, Award, Factory } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

// Import Assets
import heroRodLight from '../assets/hero-rod-light.png';
import heroRodDark from '../assets/hero-rod-dark.png';
import evImage from '../assets/ev.png';
import moldImage from '../assets/mold.png';
import oilgasImage from '../assets/oilgas.png';
import automotiveImage from '../assets/automotive.png';
import aerospaceImage from '../assets/aerospace.png';
import contactsImage from '../assets/contacts.png';

const Home = () => {
    const { t } = useLanguage();

    const seoData = {
        title: t('seo.home.title'),
        description: t('seo.home.desc'),
        type: 'website',
        jsonLd: {
            '@type': 'WebSite',
            'url': 'https://www.vanintertrade.com',
            'potentialAction': {
                '@type': 'SearchAction',
                'target': 'https://www.vanintertrade.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
            }
        }
    };

    const industries = [
        { key: 'auto', image: automotiveImage },
        { key: 'ev', image: evImage },
        { key: 'aero', image: aerospaceImage },
        { key: 'contacts', image: contactsImage },
        { key: 'mold', image: moldImage },
        { key: 'energy', image: oilgasImage },
    ];

    return (
        <div className="bg-background dark:bg-[#0a0a0a] min-h-screen">
            <SEO {...seoData} />
            {/* Hero Section - Apple Minimal Style */}
            {/* Added mix-blend-mode logic via CSS group-dark strategies or simplified background matching */}
            <section className="relative min-h-screen flex items-center bg-white dark:bg-black overflow-hidden pt-16">
                <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="z-10 order-2 md:order-1 text-center md:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary dark:text-white leading-[1.1]">
                            {t('hero.title')}
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-secondary dark:text-gray-400 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                            {t('hero.subtitle')}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="bg-primary dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                {t('hero.cta_products')} <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="text-accent hover:text-blue-600 px-8 py-4 font-medium transition-all flex items-center justify-center">
                                {t('hero.cta_learn')} <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Visual Content - Floating Minimal Object */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative order-1 md:order-2 flex justify-center items-center"
                    >
                        <div className="relative w-full aspect-square max-w-[700px]">
                            {/* Theme Switched Images */}
                            <img
                                src={heroRodLight}
                                alt="Beryllium Copper Rods"
                                className="absolute inset-0 w-full h-full object-contain dark:opacity-0 transition-opacity duration-500 drop-shadow-xl"
                            />
                            <img
                                src={heroRodDark}
                                alt="Beryllium Copper Rods"
                                className="absolute inset-0 w-full h-full object-contain opacity-0 dark:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_30px_rgba(255,150,100,0.3)]"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Industries Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary dark:text-white">
                        {t('products.subtitle')}
                    </h2>
                    <div className="w-20 h-1 bg-accent rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {industries.map((ind, index) => (
                        <Link to="/solutions" key={ind.key}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-gray-900"
                            >
                                <img
                                    src={ind.image}
                                    alt={t(`home_extra.industries.${ind.key}.name`)}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{t(`home_extra.industries.${ind.key}.name`)}</h3>
                                    <p className="text-gray-200">
                                        {t(`home_extra.industries.${ind.key}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Brief About Section */}
            <section className="py-24 bg-gray-50 dark:bg-[#111] px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-bold text-primary dark:text-white">{t('home_extra.partners.title')}</h2>
                    <p className="text-lg text-secondary dark:text-gray-400">
                        {t('home_extra.partners.desc')}
                    </p>
                    <div className="flex justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
                        {/* Placeholders for logos if needed */}
                        <div className="text-2xl font-bold tracking-widest text-primary dark:text-white">MATERION</div>
                        <div className="text-xl font-bold tracking-widest text-primary dark:text-white">VAN INTERTRADE</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
