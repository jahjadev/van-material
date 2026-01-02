import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import contactBg from '../assets/hero-rod-dark.png';
import SEO from '../components/SEO';

const Contact = () => {
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = `Inquiry from Website: ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

        const mailtoLink = `mailto:van@vaninter.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        alert(t('contact.form.success'));
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16 min-h-screen bg-background"
        >
            <SEO
                title={t('seo.contact.title')}
                description={t('seo.contact.desc')}
            />

            {/* Hero Section */}
            <div className="relative h-[40vh] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${contactBg})` }}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold mb-4 font-display"
                    >
                        {t('contact.hero.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light"
                    >
                        {t('contact.hero.subtitle')}
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-primary mb-8">
                            Get in Touch
                        </motion.h2>

                        <div className="grid gap-8">
                            <motion.div variants={itemVariants} className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
                                <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                                    <Phone className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{t('contact.info.call')}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 font-mono text-lg">{t('contact.info.phone_value')}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('contact.info.hours')}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
                                <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                                    <Mail className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{t('contact.info.email')}</h3>
                                    <a href={`mailto:${t('contact.info.email_value')}`} className="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors">
                                        {t('contact.info.email_value')}
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group">
                                <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                                    <MapPin className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{t('contact.info.visit')}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {t('contact.info.address')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('contact.form.title')}</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">We usually respond within 24 hours.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('contact.form.name')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('contact.form.email')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    placeholder="john@company.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('contact.form.message')}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                                    placeholder="Tell us about your requirements..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                            >
                                <span>{t('contact.form.submit')}</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            {/* Note: I will append the FAQ section below the main layout or integrate it into a separate route if preferred, but for now I'll add it to the bottom of the page structure if suitable, or create a flexible layout.
            Wait, the Contact page is a split layout occupying 100vh. Adding detailed FAQs might break the layout. 
            Better strategy: Add FAQ to the SOLUTIONS page or create a dedicated section at the bottom of ABOUT/SOLUTIONS. 
            Let's add it to Solutions.jsx as it fits "Engineering" queries well.
            */}
        </motion.div>
    );
};

export default Contact;
