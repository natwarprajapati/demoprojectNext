'use client';

import { useTheme } from '@/context/ThemeContext';

const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'blue', name: 'Blue', icon: '🌊' },
];

export default function ThemeSwitcher() {
    const { theme, setTheme, colors } = useTheme();

    return (
        <div className="relative">
            <div className="flex items-center space-x-2">
                <span className="text-sm">{themes.find(t => t.id === theme)?.icon}</span>
                <div className="flex space-x-1">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id as 'light' | 'dark' | 'blue')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${theme === t.id
                                ? `${colors.primary} bg-opacity-10`
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                            aria-label={`Switch to ${t.name} theme`}
                        >
                            {t.icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
} 