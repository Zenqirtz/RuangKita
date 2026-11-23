import React from 'react';

const sizes = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
};

export default function StatCard({ label, value, suffix, icon, accent, iconClassName = '' }) {
    const safeAccent = accent ?? {
        tile: 'bg-blue-50 text-blue-600',
        text: 'text-blue-600',
    };

    return (
        <div className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start gap-3">
                <div className={`${sizes.md} ${safeAccent.tile} flex items-center justify-center shrink-0`}>
                    <span className={iconClassName}>{icon}</span>
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-slate-500 leading-tight truncate">{label}</p>
                    <p className="text-[22px] font-extrabold text-slate-900 leading-tight mt-1">{value}</p>
                    <p className={`text-[10px] font-semibold ${safeAccent.text} mt-1 leading-tight truncate`}>{suffix}</p>
                </div>
            </div>
        </div>
    );
}
