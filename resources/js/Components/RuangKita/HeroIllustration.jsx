import React from 'react';

/**
 * Ilustrasi hero: tanaman hias Pilea + tumpukan 3 buku bergaya flat modern.
 */
export default function HeroIllustration({ className = '' }) {
    return (
        <img
            src="/images/hero-illustration.svg"
            alt="Hero Illustration"
            className={className}
        />
    );
}
