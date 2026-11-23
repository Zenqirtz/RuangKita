import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/Data/translations';

const LanguageContext = createContext({
    lang: 'id',
    setLang: () => {},
    t: (key, fallback) => fallback ?? key,
});

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('ruangkita_lang');
            if (saved === 'en' || saved === 'id') {
                return saved;
            }
        }
        return 'id';
    });

    const setLang = (newLang) => {
        setLangState(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('ruangkita_lang', newLang);
        }
    };

    const t = (key, fallback) => {
        const currentDict = translations[lang] ?? translations.id;
        if (currentDict && key in currentDict) {
            return currentDict[key];
        }
        // Fallback to Indonesian if missing in current language
        if (translations.id && key in translations.id) {
            return translations.id[key];
        }
        return fallback ?? key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
