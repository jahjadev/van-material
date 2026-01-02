import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' }, // Assuming 'brand.name' or similar for Home, but usually manual
        { path: '/products', label: t('nav.products') },
        { path: '/solutions', label: t('nav.solutions') },
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled || isOpen
                    ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold font-display tracking-tight text-primary dark:text-white">
                    Van<span className="text-accent">Material</span>
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex bg-gray-100/50 dark:bg-white/5 px-2 py-1 rounded-full border border-gray-200/50 dark:border-white/10">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    clsx(
                                        'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                                        isActive
                                            ? 'text-primary dark:text-white bg-white dark:bg-white/10 shadow-sm'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'
                                    )
                                }
                            >
                                {link.path === '/' && link.label === 'Home' ? 'Home' : link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 border-l border-gray-200 dark:border-white/10 pl-6">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-300 flex items-center gap-1 font-mono text-sm uppercase"
                            aria-label="Toggle Language"
                        >
                            <Globe className="w-4 h-4" />
                            {language}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-300"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-primary dark:text-white"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-card border-b border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            'text-lg font-medium p-4 rounded-xl transition-colors',
                                            isActive
                                                ? 'bg-accent/10 text-accent'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                                        )
                                    }
                                >
                                    {link.path === '/' && link.label === 'Home' ? 'Home' : link.label}
                                </NavLink>
                            ))}
                            <div className="h-px bg-gray-100 dark:bg-white/10 my-2" />
                            <div className="flex justify-between items-center px-4">
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Settings</span>
                                <div className="flex gap-4">
                                    <button onClick={toggleLanguage} className="text-sm font-bold uppercase text-primary dark:text-white border border-gray-200 dark:border-white/10 px-3 py-1 rounded-lg">
                                        {language === 'en' ? 'THAI' : 'ENG'}
                                    </button>
                                    <button onClick={toggleTheme} className="p-1 text-primary dark:text-white">
                                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
