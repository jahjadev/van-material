import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Assets
import berylliumImage from '../assets/product-cube.png';
import moldImage from '../assets/product-moldmax.png';
import toughmetImage from '../assets/product-toughmet.png';
import standardImage from '../assets/product-standard.png';
import cladImage from '../assets/product-clad.png';
import contactsImage from '../assets/product-contacts.png';

import SEO from '../components/SEO';

const Products = () => {
    const { t } = useLanguage();

    const seoData = {
        title: t('seo.products.title'),
        description: t('seo.products.desc'),
        type: 'website',
        jsonLd: {
            '@type': 'CollectionPage',
            'mainEntity': {
                '@type': 'ItemList',
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'item': {
                            '@type': 'Product',
                            'name': 'Copper Beryllium (CuBe)',
                            'description': 'High performance copper alloy with high strength and thermal conductivity.',
                            'image': 'https://www.vanintertrade.com/assets/product-cube.png' // Placeholder absolute URL
                        }
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'item': {
                            '@type': 'Product',
                            'name': 'MoldMAX®',
                            'description': 'Premium mold tooling alloy for plastic injection molding.',
                            'image': 'https://www.vanintertrade.com/assets/product-moldmax.png'
                        }
                    },
                    {
                        '@type': 'ListItem',
                        'position': 3,
                        'item': {
                            '@type': 'Product',
                            'name': 'ToughMet®',
                            'description': 'High strength spinodal copper-nickel-tin alloy for harsh environments.',
                            'image': 'https://www.vanintertrade.com/assets/product-toughmet.png'
                        }
                    },
                    {
                        '@type': 'ListItem',
                        'position': 4,
                        'item': {
                            '@type': 'Product',
                            'name': 'Standard Copper Alloys',
                            'description': 'C1100, C5191, C5210 for general electronics and engineering.',
                            'image': 'https://www.vanintertrade.com/assets/product-standard.png'
                        }
                    }
                ]
            }
        }
    };

    const categories = [
        {
            ...t('products.categories.cube'), // Auto-spread title, desc, features, grades
            image: berylliumImage,
        },
        {
            ...t('products.categories.mold'),
            image: moldImage,
        },
        {
            ...t('products.categories.toughmet'),
            image: toughmetImage,
        },
        {
            ...t('products.categories.standard'),
            image: standardImage,
        },
        {
            ...t('products.categories.clad'),
            image: cladImage,
        },
        {
            ...t('products.categories.contacts'),
            image: contactsImage,
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-background dark:bg-[#0a0a0a] text-primary dark:text-white px-6">
            <SEO {...seoData} />
            <div className="max-w-6xl mx-auto py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('products.title')}</h1>
                    <p className="text-xl text-secondary dark:text-gray-400 max-w-3xl mx-auto">
                        {t('products.subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-surface dark:bg-[#111] rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow overflow-hidden group"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-4 text-accent">{cat.title}</h2>
                                <p className="text-secondary dark:text-gray-300 mb-6 min-h-[80px]">
                                    {cat.desc}
                                </p>

                                <div className="space-y-4 mb-8">
                                    {cat.features.map((feat) => (
                                        <div key={feat} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block">
                                        Available Grades
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.grades.map(grade => (
                                            <span key={grade} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                                                {grade}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
