'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
    const { colors } = useTheme();
    const { t } = useLanguage();

    return (
        <div className={`min-h-screen ${colors.background}`}>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className={`text-4xl font-bold ${colors.text} sm:text-5xl`}>{t('services.title')}</h1>
                    <p className={`mt-4 text-xl ${colors.textSecondary}`}>{t('services.subtitle')}</p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Web Development */}
                    <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow}`}>
                        <div className={`w-12 h-12 bg-${colors.primary} rounded-lg flex items-center justify-center mb-4`}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('services.web.title')}</h3>
                        <p className={colors.textSecondary}>{t('services.web.description')}</p>
                    </div>

                    {/* Mobile Development */}
                    <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow}`}>
                        <div className={`w-12 h-12 bg-${colors.primary} rounded-lg flex items-center justify-center mb-4`}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('services.mobile.title')}</h3>
                        <p className={colors.textSecondary}>{t('services.mobile.description')}</p>
                    </div>

                    {/* UI/UX Design */}
                    <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow}`}>
                        <div className={`w-12 h-12 bg-${colors.primary} rounded-lg flex items-center justify-center mb-4`}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </div>
                        <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('services.design.title')}</h3>
                        <p className={colors.textSecondary}>{t('services.design.description')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 