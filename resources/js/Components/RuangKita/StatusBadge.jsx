import React from 'react';
import { stageStyles } from '@/Data/ruangkita';

export default function StatusBadge({ stage, className = '' }) {
    const style = stageStyles[stage] ?? stageStyles.submitted;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border whitespace-nowrap ${style.badge} ${className}`}
        >
            <span className={`w-1 h-1 rounded-full ${style.dot}`} />
            {style.label}
        </span>
    );
}
