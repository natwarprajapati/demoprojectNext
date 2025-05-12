'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import AudioPlayer from '@/components/AudioPlayer';

export default function Blog() {
    const { t, currentLanguage } = useLanguage();
    const { colors } = useTheme();

    const blogPosts = [
        {
            id: 'web-dev',
            title: t('blog.posts.webDev.title'),
            description: t('blog.posts.webDev.description'),
            date: t('blog.posts.webDev.date'),
            readTime: t('blog.posts.webDev.readTime'),
            category: t('blog.categories.webDevelopment'),
            image: '/images/blog/web-dev.jpg',
        },
        {
            id: 'mobile-dev',
            title: t('blog.posts.mobileDev.title'),
            description: t('blog.posts.mobileDev.description'),
            date: t('blog.posts.mobileDev.date'),
            readTime: t('blog.posts.mobileDev.readTime'),
            category: t('blog.categories.mobileDevelopment'),
            image: '/images/blog/mobile-dev.jpg',
        },
        {
            id: 'ui-ux',
            title: t('blog.posts.uiUx.title'),
            description: t('blog.posts.uiUx.description'),
            date: t('blog.posts.uiUx.date'),
            readTime: t('blog.posts.uiUx.readTime'),
            category: t('blog.categories.uiUxDesign'),
            image: '/images/blog/ui-ux.jpg',
        },
    ];

    return (
        <main className={`container mx-auto px-4 py-8 ${colors.background}`}>
            <header className="text-center mb-12">
                <h1 className={`text-4xl font-bold mb-4 ${colors.text}`}>
                    <AudioPlayer text={t('blog.title')} lang={currentLanguage} />
                </h1>
                <p className={`text-xl ${colors.textSecondary}`}>
                    <AudioPlayer text={t('blog.subtitle')} lang={currentLanguage} />
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <article
                        key={post.id}
                        className={`${colors.cardBg} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${colors.border}`}
                    >
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Image Placeholder</span>
                        </div>
                        <div className="p-6">
                            <span className={`inline-block ${colors.primary} text-xs font-semibold px-2.5 py-0.5 rounded mb-2`}>
                                {post.category}
                            </span>
                            <h2 className={`text-xl font-semibold mb-2 ${colors.text}`}>
                                <AudioPlayer text={post.title} lang={currentLanguage} />
                            </h2>
                            <p className={`${colors.textSecondary} mb-4`}>
                                <AudioPlayer text={post.description} lang={currentLanguage} />
                            </p>
                            <div className={`flex justify-between items-center text-sm ${colors.textSecondary} mb-4`}>
                                <span>{post.date}</span>
                                <span>{post.readTime}</span>
                            </div>
                            <a
                                href={`/blog/${post.id}`}
                                className={`inline-flex items-center ${colors.primary} hover:${colors.secondary}`}
                            >
                                {t('blog.readMore')}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
} 