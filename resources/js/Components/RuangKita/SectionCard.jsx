import React from 'react';
import Icon from './Icon';

export default function SectionCard({
    title,
    subtitle,
    action,
    actionHref = '#',
    children,
    className = '',
    bodyClassName = '',
    divider = false,
}) {
    return (
        <section className={`min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm ${className}`}>
            {(title || action) && (
                <div
                    className={`flex items-start justify-between gap-3 px-5 pt-5 pb-4 ${
                        divider ? 'border-b border-slate-100' : ''
                    }`}
                >
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
                    </div>
                    {action && (
                        <a
                            href={actionHref}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0 mt-0.5 transition-colors group"
                        >
                            <span className="text-blue-600 group-hover:text-blue-700">{action}</span>
                            <Icon name="chevronRight" className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700" strokeWidth={2.5} />
                        </a>
                    )}
                </div>
            )}
            <div className={bodyClassName}>{children}</div>
        </section>
    );
}
