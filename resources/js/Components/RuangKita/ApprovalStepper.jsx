import React from 'react';
import Icon from './Icon';
import { approvalStages } from '@/Data/ruangkita';

export default function ApprovalStepper({ stage = 'submitted', compact = false }) {
    const currentIndex = stage === 'revision' ? 1 : Math.max(approvalStages.findIndex((item) => item.key === stage), 0);
    const isRevision = stage === 'revision';

    return (
        <div className="w-full">
            <div className="relative">
                <div className="absolute left-[12.5%] right-[12.5%] top-[17px] h-0.5 bg-slate-200 rounded-full" />
                <div
                    className={`absolute left-[12.5%] top-[17px] h-0.5 rounded-full transition-all duration-500 ${
                        isRevision ? 'bg-rose-400' : 'bg-blue-600'
                    }`}
                    style={{ width: `${(currentIndex / (approvalStages.length - 1)) * 75}%` }}
                />

                <div className="relative grid grid-cols-4">
                    {approvalStages.map((item, index) => {
                        const isDone = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        const isPending = index > currentIndex;

                        let circleClass = 'bg-white border-2 border-slate-200 text-slate-300';
                        if (isDone) {
                            circleClass = 'bg-blue-600 border-2 border-blue-600 text-white';
                        }
                        if (isCurrent) {
                            circleClass = isRevision
                                ? 'bg-rose-500 border-2 border-rose-500 text-white ring-4 ring-rose-100'
                                : 'bg-blue-600 border-2 border-blue-600 text-white ring-4 ring-blue-100';
                        }

                        return (
                            <div key={item.key} className="flex flex-col items-center text-center px-1">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${circleClass}`}
                                >
                                    <Icon
                                        name={isDone ? 'checkSmall' : item.icon}
                                        className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}
                                        strokeWidth={2.5}
                                    />
                                </div>
                                <p
                                    className={`mt-2 text-[10px] leading-tight font-bold ${
                                        isCurrent
                                            ? isRevision
                                                ? 'text-rose-600'
                                                : 'text-blue-600'
                                            : isDone
                                              ? 'text-slate-700'
                                              : 'text-slate-400'
                                    }`}
                                >
                                    {item.label}
                                </p>
                                {!compact && (
                                    <p className="hidden sm:block text-[9px] text-slate-400 leading-snug mt-0.5">
                                        {isPending ? 'Menunggu' : isDone ? 'Selesai' : isRevision ? 'Perlu revisi' : 'Sedang diproses'}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
