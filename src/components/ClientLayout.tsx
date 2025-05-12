'use client';

import { ThemeProvider } from "@/context/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from 'next/link';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <header className="sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="text-2xl font-bold">
                                    WebDevCo
                                </Link>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <Link href="/" className="hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                                <Link href="/about" className="hover:text-blue-600 transition-colors">
                                    About
                                </Link>
                                <Link href="/services" className="hover:text-blue-600 transition-colors">
                                    Services
                                </Link>
                                <Link href="/portfolio" className="hover:text-blue-600 transition-colors">
                                    Portfolio
                                </Link>
                                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                                    Blog
                                </Link>
                                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                                    Contact
                                </Link>
                            </nav>
                            <div className="flex items-center space-x-4">
                                <ThemeSwitcher />
                                <Link
                                    href="/contact"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-grow">
                    {children}
                </main>
                <footer className="bg-gray-800 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">WebDevCo</h3>
                                <p className="text-gray-300">
                                    We create stunning websites and powerful web applications.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                                            Portfolio
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Services</h4>
                                <ul className="space-y-2">
                                    <li className="text-gray-300">Web Development</li>
                                    <li className="text-gray-300">Mobile Development</li>
                                    <li className="text-gray-300">UI/UX Design</li>
                                    <li className="text-gray-300">Digital Marketing</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                                <ul className="space-y-2">
                                    <li className="text-gray-300">contact@webdevco.com</li>
                                    <li className="text-gray-300">+1 (555) 123-4567</li>
                                    <li className="text-gray-300">123 Business Street</li>
                                    <li className="text-gray-300">City, Country</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                            <p>&copy; {new Date().getFullYear()} WebDevCo. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
} 