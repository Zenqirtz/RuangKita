import React from 'react';
import { useLanguage } from '@/Context/LanguageContext';

export default function LanguageSwitcher({ className = '' }) {
    const { lang, setLang } = useLanguage();

    return (
        <div
            className={`inline-flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200/70 select-none ${className}`}
            role="group"
            aria-label="Pilih Bahasa / Select Language"
        >
            <button
                type="button"
                onClick={() => setLang('id')}
                className={`relative px-2 py-1 rounded-[10px] text-[11px] font-bold transition-all duration-200 ${
                    lang === 'id'
                        ? 'bg-white text-blue-600 shadow-sm shadow-slate-900/5'
                        : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Bahasa Indonesia"
            >
                ID
            </button>
            <button
                type="button"
                onClick={() => setLang('en')}
                className={`relative px-2 py-1 rounded-[10px] text-[11px] font-bold transition-all duration-200 ${
                    lang === 'en'
                        ? 'bg-white text-blue-600 shadow-sm shadow-slate-900/5'
                        : 'text-slate-400 hover:text-slate-700'
                }`}
                title="English"
            >
                EN
            </button>
        </div>
    );
}
