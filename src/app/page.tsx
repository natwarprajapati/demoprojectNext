'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  // Function to read text aloud
  const readAloud = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Read the page content when it loads
  useEffect(() => {
    const pageContent = `
      ${t('home.hero.title')}
      ${t('home.hero.subtitle')}
      ${t('home.hero.description')}
      ${t('home.features.title')}
      ${t('home.features.items.0.title')}
      ${t('home.features.items.0.description')}
      ${t('home.features.items.1.title')}
      ${t('home.features.items.1.description')}
      ${t('home.features.items.2.title')}
      ${t('home.features.items.2.description')}
    `;
    readAloud(pageContent);
  }, []);

  return (
    <div className={`min-h-screen ${colors?.background}`} role="main" aria-label="Home page">
      {/* Hero Section */}
      <section className="relative py-20" aria-labelledby="hero-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              id="hero-title"
              className={`text-5xl font-extrabold ${colors?.text} sm:text-6xl`}
            >
              {t('home.hero.title')}
              <AudioPlayer text={`${t('home.hero.title')}. ${t('home.hero.subtitle')}. ${t('home.hero.description')}`} />
            </h1>
            <p
              className={`mt-4 text-xl ${colors?.textSecondary}`}
            >
              {t('home.hero.subtitle')}
            </p>
            <p
              className={`mt-6 text-lg ${colors?.textSecondary}`}
            >
              {t('home.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* ChatBot Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${colors?.text} mb-4`}>
              Chat with AI Assistant
            </h2>
            <p className={`text-xl ${colors?.textSecondary}`}>
              Get instant answers to your questions
            </p>
          </div>
          <ChatBot />
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 ${colors?.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${colors?.text} mb-4`}>
              {t('home.services.title')}
            </h2>
            <p className={`text-xl ${colors?.textSecondary}`}>
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className={`${colors?.cardBg} p-6 rounded-lg ${colors?.shadow}`}>
              <div className={`w-12 h-12 bg-${colors?.primary} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                <svg className={`w-6 h-6 text-${colors?.primary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${colors?.text} mb-2`}>{t('services.webdev.title')}</h3>
              <p className={colors?.textSecondary}>{t('services.webdev.description')}</p>
            </div>

            {/* Mobile Development */}
            <div className={`${colors?.cardBg} p-6 rounded-lg ${colors?.shadow}`}>
              <div className={`w-12 h-12 bg-${colors?.primary} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                <svg className={`w-6 h-6 text-${colors?.primary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${colors?.text} mb-2`}>{t('services.mobiledev.title')}</h3>
              <p className={colors?.textSecondary}>{t('services.mobiledev.description')}</p>
            </div>

            {/* UI/UX Design */}
            <div className={`${colors?.cardBg} p-6 rounded-lg ${colors?.shadow}`}>
              <div className={`w-12 h-12 bg-${colors?.primary} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                <svg className={`w-6 h-6 text-${colors?.primary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${colors?.text} mb-2`}>{t('services.uiux.title')}</h3>
              <p className={colors?.textSecondary}>{t('services.uiux.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-20 ${colors?.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold ${colors?.text} mb-6`}>
                {t('home.about.title')}
              </h2>
              <p className={`text-lg ${colors?.textSecondary} mb-8`}>
                {t('home.about.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className={`w-6 h-6 text-${colors?.success} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={colors?.textSecondary}>{t('about.values.quality')}</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-6 h-6 text-${colors?.success} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={colors?.textSecondary}>{t('about.values.innovation')}</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-6 h-6 text-${colors?.success} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={colors?.textSecondary}>{t('about.values.integrity')}</span>
                </li>
              </ul>
            </div>
            <div className={`${colors?.cardBg} h-96 rounded-lg ${colors?.shadow}`}></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`bg-gradient-to-r from-${colors?.primary} to-${colors?.secondary} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className={`text-xl ${colors?.textSecondary} mb-8`}>
            {t('contact.subtitle')}
          </p>
          <Link
            href="/contact"
            className={`${colors?.cardBg} ${colors?.text} px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors inline-block`}
          >
            {t('contact.getInTouch')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" aria-labelledby="features-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="features-title"
            className={`text-3xl font-bold ${colors?.text} text-center mb-12`}
          >
            {t('home.features.title')}
            <AudioPlayer text={t('home.features.title')} />
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`${colors?.cardBg} rounded-lg ${colors?.shadow} p-6`}
                role="article"
                aria-labelledby={`feature-${index}-title`}
              >
                <h3
                  id={`feature-${index}-title`}
                  className={`text-xl font-bold ${colors?.text} mb-2`}
                >
                  {t(`home.features.items.${index}.title`)}
                  <AudioPlayer text={`${t(`home.features.items.${index}.title`)}. ${t(`home.features.items.${index}.description`)}`} />
                </h3>
                <p className={`${colors?.textSecondary}`}>
                  {t(`home.features.items.${index}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className={`${colors.cardBg} ${colors.text} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WebDevCo</h3>
              <p className={colors.textSecondary}>
                Transforming ideas into digital reality
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className={`${colors.textSecondary} hover:${colors.text}`}>About</Link></li>
                <li><Link href="/services" className={`${colors.textSecondary} hover:${colors.text}`}>Services</Link></li>
                <li><Link href="/portfolio" className={`${colors.textSecondary} hover:${colors.text}`}>Portfolio</Link></li>
                <li><Link href="/contact" className={`${colors.textSecondary} hover:${colors.text}`}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className={colors.textSecondary}>Web Development</li>
                <li className={colors.textSecondary}>Mobile Development</li>
                <li className={colors.textSecondary}>UI/UX Design</li>
                <li className={colors.textSecondary}>Digital Marketing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className={colors.textSecondary}>contact@webdevco.com</li>
                <li className={colors.textSecondary}>+1 (555) 123-4567</li>
                <li className={colors.textSecondary}>123 Business Street</li>
                <li className={colors.textSecondary}>City, Country</li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${colors.border} mt-12 pt-8 text-center ${colors.textSecondary}`}>
            <p>&copy; 2024 WebDevCo. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
