import React from 'react';

/**
 * Ilustrasi SVG tanaman dan tumpukan buku untuk banner dashboard.
 */
export default function HeroIllustration({ className = '' }) {
    return (
        <img
            src="/images/hero-illustration.svg"
            alt="Ilustrasi tanaman dan tumpukan buku"
            className={className}
            aria-hidden="true"
        />
    );
}
