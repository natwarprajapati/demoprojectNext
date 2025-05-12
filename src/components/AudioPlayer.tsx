'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AudioPlayerProps {
    text: string;
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
}

export default function AudioPlayer({
    text,
    lang,
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0
}: AudioPlayerProps) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
    const { currentLanguage } = useLanguage();

    // Map language codes to speech synthesis voices with fallbacks
    const getVoiceForLanguage = (lang: string) => {
        const voices = window.speechSynthesis.getVoices();
        const languageMap: { [key: string]: string[] } = {
            'en': ['en-US', 'en-GB'],
            'hi': ['hi-IN'],
            'gu': ['gu-IN', 'hi-IN'] // Fallback to Hindi if Gujarati not available
        };

        const targetLangs = languageMap[lang] || ['en-US'];

        // Try each language in order
        for (const targetLang of targetLangs) {
            const voice = voices.find(voice => voice.lang === targetLang);
            if (voice) {
                return voice;
            }
        }

        // If no specific voice found, try to find any voice that supports the language
        return voices.find(voice => voice.lang.startsWith(lang)) || null;
    };

    const playAudio = () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            try {
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();
                setError(null);

                const utterance = new SpeechSynthesisUtterance(text);

                // Get the appropriate voice for the current language
                const voice = getVoiceForLanguage(currentLanguage);
                if (voice) {
                    utterance.voice = voice;
                } else {
                    setError('Voice not available for this language');
                    return;
                }

                // Configure the speech
                utterance.lang = lang || currentLanguage;
                utterance.rate = rate;
                utterance.pitch = pitch;
                utterance.volume = volume;

                // Set up event listeners
                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = (event) => {
                    setIsSpeaking(false);
                    setError('Error playing audio');
                    console.error('Speech synthesis error:', event);
                };

                // Store the utterance reference
                speechRef.current = utterance;

                // Play the speech
                window.speechSynthesis.speak(utterance);
            } catch (err) {
                setError('Error initializing speech synthesis');
                console.error('Speech synthesis error:', err);
            }
        } else {
            setError('Speech synthesis not supported in this browser');
        }
    };

    const stopAudio = () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setError(null);
        }
    };

    // Load voices when component mounts
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                // Voices are loaded
                return;
            }
            // If voices aren't loaded yet, wait for the 'voiceschanged' event
            window.speechSynthesis.onvoiceschanged = () => {
                // Voices are now loaded
            };
        };

        loadVoices();
        return () => {
            stopAudio();
        };
    }, []);

    return (
        <div className="inline-flex items-center">
            <button
                onClick={playAudio}
                onMouseLeave={stopAudio}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-label={`Play audio for: ${text}`}
                disabled={isSpeaking}
            >
                {isSpeaking ? (
                    <span className="animate-pulse">🔊</span>
                ) : (
                    <span>🔈</span>
                )}
            </button>
            {error && (
                <span className="ml-2 text-xs text-red-500" title={error}>
                    ⚠️
                </span>
            )}
        </div>
    );
} 