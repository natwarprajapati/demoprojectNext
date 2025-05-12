'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Portfolio() {
    const { colors } = useTheme();
    const { t } = useLanguage();

    return (
        <div className={`min-h-screen ${colors.background}`}>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className={`text-4xl font-bold ${colors.text} sm:text-5xl`}>{t('portfolio.title')}</h1>
                    <p className={`mt-4 text-xl ${colors.textSecondary}`}>{t('portfolio.subtitle')}</p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Project 1 */}
                    <div className={`${colors.cardBg} rounded-lg ${colors.shadow} overflow-hidden`}>
                        <div className={`h-48 ${colors.background}`}></div>
                        <div className="p-6">
                            <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('portfolio.projects.ecommerce.title')}</h3>
                            <p className={`${colors.textSecondary} mb-4`}>{t('portfolio.projects.ecommerce.description')}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>React</span>
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>Node.js</span>
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>MongoDB</span>
                            </div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className={`${colors.cardBg} rounded-lg ${colors.shadow} overflow-hidden`}>
                        <div className={`h-48 ${colors.background}`}></div>
                        <div className="p-6">
                            <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('portfolio.projects.healthcare.title')}</h3>
                            <p className={`${colors.textSecondary} mb-4`}>{t('portfolio.projects.healthcare.description')}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>Flutter</span>
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>Firebase</span>
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>AWS</span>
                            </div>
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className={`${colors.cardBg} rounded-lg ${colors.shadow} overflow-hidden`}>
                        <div className={`h-48 ${colors.background}`}></div>
                        <div className="p-6">
                            <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('portfolio.projects.analytics.title')}</h3>
                            <p className={`${colors.textSecondary} mb-4`}>{t('portfolio.projects.analytics.description')}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>Vue.js</span>
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>Python</span>
                                <span className={`px-3 py-1 bg-${colors.primary} bg-opacity-10 text-${colors.primary} rounded-full text-sm`}>TensorFlow</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 