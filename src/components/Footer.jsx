import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 py-12 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="md:flex md:justify-between grid grid-cols-2 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="text-lg font-bold text-gray-900 dark:text-white">
                            Van Material
                        </Link>
                        <p className="mt-4 text-sm max-w-xs">
                            {t('footer.distributor')}
                        </p>
                    </div>

                    {/* Columns */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">{t('nav.products')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/products" className="hover:underline hover:text-accent">{t('footer.links.cube')}</Link></li>
                            <li><Link to="/products" className="hover:underline hover:text-accent">{t('footer.links.mold')}</Link></li>
                            <li><Link to="/products" className="hover:underline hover:text-accent">{t('footer.links.standard')}</Link></li>
                            <li><Link to="/products" className="hover:underline hover:text-accent">{t('footer.links.clad')}</Link></li>
                            <li><Link to="/products" className="hover:underline hover:text-accent">{t('footer.links.contacts')}</Link></li>
                            <li><Link to="/solutions" className="hover:underline hover:text-accent">{t('nav.solutions')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">{t('footer.company')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:underline hover:text-accent">{t('nav.about')}</Link></li>
                            <li><Link to="/contact" className="hover:underline hover:text-accent">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>{t('footer.copyright')}</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:underline">{t('footer.links.privacy')}</Link>
                        <Link to="/terms" className="hover:underline">{t('footer.links.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
