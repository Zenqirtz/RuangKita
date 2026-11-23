import React from 'react';

/**
 * Ilustrasi hero bergaya flat: tanaman hias Pilea + tumpukan 3 buku,
 * render langsung sebagai SVG vektor tajam tanpa request HTTP tambahan.
 */
export default function HeroIllustration({ className = '' }) {
    return (
        <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <defs>
                <g id="heroSparkle">
                    <path
                        d="M0 -9 C0 -1 1 0 9 0 C1 0 0 1 0 9 C0 1 -1 0 -9 0 C-1 0 0 -1 0 -9 Z"
                        fill="#93C5FD"
                    />
                </g>
            </defs>

            {/* Ambient Floating Orbs */}
            <circle cx="82" cy="85" r="28" fill="#8BB2FE" fillOpacity="0.22" />
            <circle cx="210" cy="98" r="68" fill="#8BB2FE" fillOpacity="0.18" />
            <circle cx="296" cy="104" r="58" fill="#8BB2FE" fillOpacity="0.25" />
            <circle cx="340" cy="184" r="46" fill="#8BB2FE" fillOpacity="0.16" />

            {/* Breezy Motion Wind Curves */}
            <path
                d="M216 95 C225 85, 238 85, 248 93"
                stroke="#93C5FD"
                strokeWidth="2.6"
                strokeLinecap="round"
                opacity="0.6"
            />
            <path
                d="M227 87 C234 78, 245 78, 253 85"
                stroke="#93C5FD"
                strokeWidth="2.6"
                strokeLinecap="round"
                opacity="0.6"
            />

            {/* Sparkles */}
            <use href="#heroSparkle" x="138" y="118" opacity="0.85" />
            <use href="#heroSparkle" x="336" y="136" transform="scale(1.2) translate(-28, -10)" opacity="0.75" />

            {/* Soft Shadows */}
            <ellipse cx="88" cy="247" rx="26" ry="4" fill="#0C2072" fillOpacity="0.35" />
            <ellipse cx="236" cy="244" rx="76" ry="5" fill="#0C2072" fillOpacity="0.3" />

            {/* Tanaman Pot */}
            <g id="heroPlant">
                {/* Batang */}
                <path d="M88 194 C88 175, 87 148, 87 135" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
                <path d="M88 174 C80 164, 70 160, 58 158" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M86 182 C74 180, 64 179, 52 184" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M88 166 C98 156, 108 154, 116 153" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />

                {/* Daun Bulat Pilea */}
                <circle cx="76" cy="126" r="14" fill="#22C55E" />
                <ellipse cx="110" cy="142" rx="18" ry="14" transform="rotate(12 110 142)" fill="#16A34A" />
                <ellipse cx="58" cy="146" rx="16" ry="13" transform="rotate(-18 58 146)" fill="#22C55E" />
                <ellipse cx="50" cy="174" rx="16" ry="13" transform="rotate(-12 50 174)" fill="#22C55E" />
                <ellipse cx="98" cy="167" rx="17" ry="13" transform="rotate(6 98 167)" fill="#4ADE80" />
                <ellipse cx="118" cy="154" rx="18" ry="13" transform="rotate(24 118 154)" fill="#15803D" />

                {/* Pot Putih */}
                <path d="M62 193 H114 L107 242 A5 5 0 0 1 102 246 H74 A5 5 0 0 1 69 242 Z" fill="#FFFFFF" />
                <path d="M62 193 H114 L112.5 205 H63.5 Z" fill="#E2E8F0" />
            </g>

            {/* Tumpukan 3 Buku */}
            <g id="heroBooks">
                {/* 1. Buku Bawah (Amber / Emas) */}
                <g id="heroBookBottom">
                    <rect x="306" y="213" width="17" height="21" rx="3" fill="#FEF3C7" />
                    <rect x="153" y="207" width="160" height="33" rx="7" fill="#E58B0E" />
                    <rect x="153" y="207" width="14" height="33" rx="7" fill="#C26A04" />
                    <line x1="167" y1="230" x2="301" y2="230" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* 2. Buku Tengah (Biru Sedang) */}
                <g id="heroBookMiddle">
                    <rect x="306" y="178" width="17" height="21" rx="3" fill="#DBEAFE" />
                    <rect x="153" y="172" width="160" height="33" rx="7" fill="#2563EB" />
                    <rect x="153" y="172" width="14" height="33" rx="7" fill="#1D4ED8" />
                    <line
                        x1="167"
                        y1="195"
                        x2="301"
                        y2="195"
                        stroke="#93C5FD"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.85"
                    />
                </g>

                {/* 3. Buku Atas (Biru Terang + Pita Merah) */}
                <g id="heroBookTop">
                    <rect x="306" y="143" width="17" height="21" rx="3" fill="#EFF6FF" />
                    <rect x="153" y="137" width="160" height="33" rx="7" fill="#3B82F6" />
                    <rect x="153" y="137" width="14" height="33" rx="7" fill="#1E40AF" />
                    <line
                        x1="167"
                        y1="160"
                        x2="301"
                        y2="160"
                        stroke="#BFDBFE"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.9"
                    />
                    <polygon points="280,137 285,151 290,137" fill="#EF4444" />
                </g>
            </g>
        </svg>
    );
}
