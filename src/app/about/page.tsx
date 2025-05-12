'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
    const { colors } = useTheme();
    const { t } = useLanguage();

    return (
        <div className={`min-h-screen ${colors.background}`}>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className={`text-4xl font-bold ${colors.text} sm:text-5xl`}>{t('about.title')}</h1>
                    <p className={`mt-4 text-xl ${colors.textSecondary}`}>{t('about.subtitle')}</p>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className={`${colors.cardBg} p-8 rounded-lg ${colors.shadow}`}>
                            <h2 className={`text-2xl font-bold ${colors.text} mb-4`}>{t('about.mission')}</h2>
                            <p className={colors.textSecondary}>
                                {t('about.mission.text')}
                            </p>
                        </div>

                        <div className={`${colors.cardBg} p-8 rounded-lg ${colors.shadow}`}>
                            <h2 className={`text-2xl font-bold ${colors.text} mb-4`}>{t('about.vision')}</h2>
                            <p className={colors.textSecondary}>
                                {t('about.vision.text')}
                            </p>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className={`text-2xl font-bold ${colors.text} mb-8 text-center`}>{t('about.values')}</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow} text-center`}>
                                <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('about.values.quality')}</h3>
                            </div>
                            <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow} text-center`}>
                                <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('about.values.innovation')}</h3>
                            </div>
                            <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow} text-center`}>
                                <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('about.values.integrity')}</h3>
                            </div>
                            <div className={`${colors.cardBg} p-6 rounded-lg ${colors.shadow} text-center`}>
                                <h3 className={`text-xl font-bold ${colors.text} mb-2`}>{t('about.values.collaboration')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 