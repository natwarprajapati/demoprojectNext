'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'blue';

interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    cardBg: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
    success: string;
    error: string;
    warning: string;
    info: string;
}

const themeColors: Record<Theme, ThemeColors> = {
    light: {
        primary: 'text-blue-600',
        secondary: 'text-blue-800',
        background: 'bg-gray-50',
        cardBg: 'bg-white',
        text: 'text-gray-900',
        textSecondary: 'text-gray-600',
        border: 'border-gray-200',
        shadow: 'shadow-md',
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600',
    },
    dark: {
        primary: 'text-purple-400',
        secondary: 'text-purple-300',
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        border: 'border-gray-700',
        shadow: 'shadow-lg shadow-gray-900/50',
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400',
        info: 'text-blue-400',
    },
    blue: {
        primary: 'text-cyan-500',
        secondary: 'text-cyan-700',
        background: 'bg-blue-50',
        cardBg: 'bg-white',
        text: 'text-blue-900',
        textSecondary: 'text-blue-700',
        border: 'border-blue-200',
        shadow: 'shadow-md shadow-blue-100',
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600',
    },
};

// const themeColors: Record<Theme, ThemeColors> = {
//     light: {
//         primary: 'text-indigo-600',
//         secondary: 'text-indigo-800',
//         background: 'bg-gray-50',
//         cardBg: 'bg-white',
//         text: 'text-gray-900',
//         textSecondary: 'text-gray-600',
//         border: 'border-gray-200',
//         shadow: 'shadow-md shadow-gray-100',
//         success: 'text-emerald-600',
//         error: 'text-rose-600',
//         warning: 'text-amber-500',
//         info: 'text-sky-500',
//     },
//     dark: {
//         primary: 'text-violet-400',
//         secondary: 'text-violet-300',
//         background: 'bg-gray-950',
//         cardBg: 'bg-gray-800/90',
//         text: 'text-gray-100',
//         textSecondary: 'text-gray-400',
//         border: 'border-gray-700',
//         shadow: 'shadow-lg shadow-gray-950/80',
//         success: 'text-emerald-400',
//         error: 'text-rose-400',
//         warning: 'text-amber-400',
//         info: 'text-sky-400',
//     },
//     blue: {
//         primary: 'text-sky-500',
//         secondary: 'text-sky-600',
//         background: 'bg-sky-50',
//         cardBg: 'bg-white',
//         text: 'text-sky-900',
//         textSecondary: 'text-sky-700',
//         border: 'border-sky-200',
//         shadow: 'shadow-md shadow-sky-100',
//         success: 'text-emerald-500',
//         error: 'text-rose-500',
//         warning: 'text-amber-500',
//         info: 'text-sky-500',
//     },
//     // Added a new modern gradient theme option
//     modern: {
//         primary: 'text-fuchsia-500',
//         secondary: 'text-fuchsia-600',
//         background: 'bg-gradient-to-br from-gray-50 to-gray-100',
//         cardBg: 'bg-white/90 backdrop-blur-sm',
//         text: 'text-gray-900',
//         textSecondary: 'text-gray-500',
//         border: 'border-gray-200/80',
//         shadow: 'shadow-md shadow-fuchsia-100/50',
//         success: 'text-emerald-500',
//         error: 'text-rose-500',
//         warning: 'text-amber-500',
//         info: 'text-blue-500',
//     }
// };
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => { },
    colors: themeColors.light,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Get saved theme from localStorage or use system preference
        const savedTheme = localStorage.getItem('theme') as Theme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('theme', theme);
            // Remove all theme classes
            document.body.classList.remove('light', 'dark', 'blue');
            // Add current theme class
            document.body.classList.add(theme);
            // Update color scheme meta tag
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme, mounted]);

    // Don't render children until we've determined the theme
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, colors: themeColors[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
} 