import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

const SEO = ({
    title,
    description,
    keywords,
    image = '/src/assets/logo-van.png',
    type = 'website',
    jsonLd
}) => {
    const { language, t } = useLanguage();
    const siteName = 'Van Intertrade Co., Ltd.';
    const currentUrl = window.location.href;
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    // Use provided keywords or fallback to default from context
    const metaKeywords = keywords || t('seo.keywords');

    const defaultJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Van Intertrade Co., Ltd.',
        'url': 'https://www.vanintertrade.com', // Placeholder URL
        'logo': 'https://www.vanintertrade.com/logo.png', // Placeholder
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+66-2-123-4567', // Placeholder
            'contactType': 'sales',
            'areaServed': ['TH', 'SE Asia'],
            'availableLanguage': ['Thai', 'English']
        },
        'sameAs': [
            'https://www.facebook.com/vanintertrade',
            'https://www.linkedin.com/company/van-intertrade'
        ]
    };

    const schema = jsonLd ? { ...defaultJsonLd, ...jsonLd } : defaultJsonLd;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <html lang={language} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={language === 'th' ? 'th_TH' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
            {jsonLd && jsonLd['@type'] === 'FAQPage' && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
            {jsonLd && jsonLd['@type'] === 'Product' && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
