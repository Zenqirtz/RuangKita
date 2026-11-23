import React from 'react';

/**
 * Ilustrasi hero bergaya flat: tanaman + tumpukan buku,
 * mengikuti nuansa banner pada referensi desain.
 */
export default function HeroIllustration({ className = '' }) {
    return (
        <svg
            viewBox="0 0 340 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <circle cx="270" cy="54" r="46" fill="#BFDBFE" fillOpacity="0.35" />
            <circle cx="70" cy="44" r="26" fill="#BFDBFE" fillOpacity="0.3" />
            <circle cx="310" cy="130" r="34" fill="#BFDBFE" fillOpacity="0.25" />
            <path
                d="M196 52c8-5 17-5 25 0M205 44c7-4 14-4 20 0"
                stroke="#93C5FD"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
            />

            {/* Pot tanaman */}
            <ellipse cx="76" cy="184" rx="40" ry="7" fill="#1E3A8A" fillOpacity="0.08" />
            <path d="M52 138h48l-6 42a6 6 0 0 1-6 5H64a6 6 0 0 1-6-5l-6-42Z" fill="#FFFFFF" />
            <path d="M52 138h48l-1.4 10H53.4L52 138Z" fill="#E2E8F0" />
            <path d="M75 138c0-18-8-30-22-36" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
            <path d="M76 138c0-22 9-36 24-42" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
            <path d="M76 138c-2-12 2-24 10-32" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="52" cy="98" rx="17" ry="9" transform="rotate(-32 52 98)" fill="#22C55E" />
            <ellipse cx="98" cy="92" rx="18" ry="9.5" transform="rotate(28 98 92)" fill="#16A34A" />
            <ellipse cx="86" cy="104" rx="15" ry="8" transform="rotate(12 86 104)" fill="#4ADE80" />
            <ellipse cx="66" cy="80" rx="12" ry="7" transform="rotate(-16 66 80)" fill="#4ADE80" />

            {/* Tumpukan buku */}
            <ellipse cx="214" cy="186" rx="78" ry="9" fill="#1E3A8A" fillOpacity="0.1" />
            <rect x="138" y="150" width="154" height="30" rx="7" fill="#F59E0B" />
            <rect x="282" y="157" width="12" height="17" rx="2" fill="#FEF3C7" />
            <path d="M150 174h128" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <rect x="138" y="150" width="12" height="30" rx="6" fill="#D97706" />

            <rect x="148" y="120" width="144" height="30" rx="7" fill="#2563EB" />
            <rect x="282" y="127" width="12" height="17" rx="2" fill="#DBEAFE" />
            <path d="M160 144h118" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <rect x="148" y="120" width="12" height="30" rx="6" fill="#1D4ED8" />

            <rect x="136" y="90" width="152" height="30" rx="7" fill="#3B82F6" />
            <rect x="280" y="97" width="12" height="17" rx="2" fill="#EFF6FF" />
            <path d="M148 114h122" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <rect x="136" y="90" width="12" height="30" rx="6" fill="#1E40AF" />
            <path d="M254 90h8l-4 12-4-12Z" fill="#F87171" />

            {/* Aksen bintang */}
            <path d="M305 76l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" fill="#60A5FA" fillOpacity="0.7" />
            <path d="M122 66l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="#93C5FD" fillOpacity="0.8" />
        </svg>
    );
}
