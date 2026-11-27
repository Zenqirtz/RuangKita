import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/Context/LanguageContext';

const WEEKDAYS = { en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], id: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'] };

function buildCells(year, month) {
    const firstDay = new Date(year, month, 1);
    const offset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = offset - 1; i >= 0; i -= 1) {
        cells.push({ day: daysInPrevMonth - i, muted: true });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
        cells.push({ day, muted: false });
    }

    let nextDay = 1;
    while (cells.length % 7 !== 0) {
        cells.push({ day: nextDay, muted: true });
        nextDay += 1;
    }

    return cells;
}

export default function MiniCalendar({
    year = 2026,
    month = 10,
    monthLabel: defaultMonthLabel,
    today = 23,
    markedDays = [],
    className = '',
}) {
    const { lang, t } = useLanguage();
    const [viewDate, setViewDate] = useState(() => new Date(year, month, 1));
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const cells = useMemo(() => buildCells(currentYear, currentMonth), [currentYear, currentMonth]);
    const [selected, setSelected] = useState(today);

    const isOriginalMonth = currentYear === year && currentMonth === month;

    const displayMonthLabel = useMemo(() => {
        if (isOriginalMonth && defaultMonthLabel) {
            return defaultMonthLabel;
        }
        return viewDate.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { month: 'long', year: 'numeric' });
    }, [viewDate, isOriginalMonth, defaultMonthLabel, lang]);

    const handlePrevMonth = () => {
        setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    return (
        <div className={className}>
            {/* Centered Month & Year */}
            <div className="mb-3 text-center">
                <span className="text-xs font-bold text-slate-800">{displayMonthLabel}</span>
            </div>

            {/* Weekdays and Dates Grid */}
            <div className="grid grid-cols-7 gap-y-1">
                {WEEKDAYS[lang].map((day) => (
                    <div key={day} className="text-[10px] font-semibold text-slate-400 text-center py-1">
                        {day}
                    </div>
                ))}

                {cells.map((cell, index) => {
                    const isToday = isOriginalMonth && !cell.muted && cell.day === today;
                    const isSelected = isOriginalMonth && !cell.muted && cell.day === selected;
                    const isMarked = isOriginalMonth && !cell.muted && markedDays.includes(cell.day);

                    return (
                        <button
                            key={`${cell.day}-${index}`}
                            type="button"
                            onClick={() => !cell.muted && setSelected(cell.day)}
                            className={[
                                'relative h-7 w-7 mx-auto rounded-lg text-[11px] font-semibold flex items-center justify-center transition-colors',
                                cell.muted ? 'text-slate-300 cursor-default' : 'hover:bg-slate-100',
                                isSelected
                                    ? 'bg-blue-600 text-white hover:bg-blue-600 shadow-sm shadow-blue-600/25'
                                    : isMarked
                                      ? 'text-rose-500'
                                      : 'text-slate-600',
                            ].join(' ')}
                        >
                            {cell.day}
                            {isMarked && !isSelected && (
                                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-rose-400" />
                            )}
                            {isToday && !isSelected && (
                                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-blue-500" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer with Legend on Left & Pagination on Right */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[10px] font-medium text-slate-500">
                <div className="flex items-center gap-3.5">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> {t('common.today', 'Hari ini')}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400" /> {t('common.booking_marked', 'Ada pengajuan')}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        aria-label={t('common.previous_month', 'Bulan sebelumnya')}
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        aria-label={t('common.next_month', 'Bulan berikutnya')}
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
