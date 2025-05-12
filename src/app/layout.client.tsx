'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import Link from "next/link";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

// Client component for the header
function Header() {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Your Logo</h1>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            {t('nav.home')}
                        </Link>
                        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            {t('nav.about')}
                        </Link>
                        <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            {t('nav.services')}
                        </Link>
                        <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            {t('nav.portfolio')}
                        </Link>
                        <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            {t('nav.blog')}
                        </Link>
                        <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            {t('nav.contact')}
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            {t('nav.getStarted')}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Client component for the footer
function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            {t('footer.company')}
                        </h3>
                        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                            {t('footer.description')}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            {t('footer.quickLinks')}
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('nav.about')}
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('nav.services')}
                                </a>
                            </li>
                            <li>
                                <a href="/portfolio" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('nav.portfolio')}
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('nav.blog')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            {t('footer.services')}
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="/services#web" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('services.webdev.title')}
                                </a>
                            </li>
                            <li>
                                <a href="/services#mobile" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('services.mobiledev.title')}
                                </a>
                            </li>
                            <li>
                                <a href="/services#ui" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    {t('services.uiux.title')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            {t('footer.contact')}
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-base text-gray-500 dark:text-gray-400">
                                {t('footer.address')}
                            </li>
                            <li className="text-base text-gray-500 dark:text-gray-400">
                                {t('footer.phone')}
                            </li>
                            <li className="text-base text-gray-500 dark:text-gray-400">
                                {t('footer.email')}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        © {new Date().getFullYear()} Your Company. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

// Client layout component
export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <LanguageProvider>
                        <div className="min-h-screen flex flex-col">
                            <Header />
                            <main className="flex-grow">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: "WebDevCo - Modern Web Solutions",
    description: "Professional web development and design services",
}; 