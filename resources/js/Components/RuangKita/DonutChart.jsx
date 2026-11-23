import React from 'react';

export default function DonutChart({
    segments = [],
    centerValue = '0%',
    centerLabel = '',
    size = 132,
    strokeWidth = 16,
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let cumulative = 0;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#EEF2F7"
                    strokeWidth={strokeWidth}
                />
                {segments.map((segment) => {
                    const dash = (segment.value / 100) * circumference;
                    const gap = 3;
                    const offset = -(cumulative / 100) * circumference;
                    cumulative += segment.value;

                    return (
                        <circle
                            key={segment.label}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={`${Math.max(dash - gap, 0)} ${circumference}`}
                            strokeDashoffset={offset}
                        />
                    );
                })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-slate-900 leading-none">{centerValue}</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-1 text-center leading-tight">
                    {centerLabel}
                </span>
            </div>
        </div>
    );
}
