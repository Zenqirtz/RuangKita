import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { roomStatusStyles } from '@/Data/ruangkita';
import { accentStyles } from '@/Components/RuangKita/accent';

export default function Rooms({ rooms = [], stats = {} }) {
    return (
        <RuangKitaLayout activeTab="rooms">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Daftar Ruangan</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Satu gedung fakultas, lima ruangan utama untuk kegiatan ormawa.
                    </p>
                </div>
                <a
                    href="/bookings/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    Ajukan Ruangan
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { label: 'Total ruangan', value: String(stats.totalRooms ?? rooms.length), icon: 'door', accent: accentStyles.blue },
                    { label: 'Tersedia hari ini', value: String(stats.availableToday ?? rooms.length), icon: 'check', accent: accentStyles.emerald },
                ].map((item) => (
                    <div key={item.label} className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent.tile}`}>
                            <Icon name={item.icon} className="w-[18px] h-[18px]" />
                        </div>
                        <div>
                            <p className="text-lg font-extrabold text-slate-900 leading-tight">{item.value}</p>
                            <p className="text-[10px] font-medium text-slate-400 leading-tight mt-0.5">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {rooms.map((room) => {
                    const accent = accentStyles[room.accent];
                    const status = roomStatusStyles[room.status];

                    return (
                        <article
                            key={room.id}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                            <div className={`relative h-28 bg-gradient-to-br ${accent.soft} flex items-center justify-center overflow-hidden`}>
                                <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-white/40" />
                                <div className="absolute -left-8 -top-10 w-24 h-24 rounded-full bg-white/30" />
                                <div className={`relative w-14 h-14 rounded-2xl ${accent.solid} flex items-center justify-center shadow-lg ${accent.ring} ring-4`}>
                                    <Icon name="door" className="w-7 h-7" />
                                </div>
                                <span className="absolute top-3 left-3 text-[9px] font-bold text-slate-500 bg-white/80 backdrop-blur px-2 py-1 rounded-lg">
                                    {room.code}
                                </span>
                                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full border bg-white/90 ${status.badge}`}>
                                    {status.label}
                                </span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{room.name}</h3>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">{room.floor}</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed mt-2.5 line-clamp-2">
                                    {room.description}
                                </p>

                                <div className="flex items-center gap-4 mt-3.5">
                                    <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-700">
                                        <Icon name="users" className="w-3.5 h-3.5 text-slate-400" />
                                        Kapasitas: {room.capacity} orang
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-3.5">
                                    {room.facilities.slice(0, 3).map((facility) => (
                                        <span
                                            key={facility}
                                            className="text-[9px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md"
                                        >
                                            {facility}
                                        </span>
                                    ))}
                                    {room.facilities.length > 3 && (
                                        <span className="text-[9px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                                            +{room.facilities.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                                    <a
                                        href="/calendar"
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 text-[10.5px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <Icon name="calendar" className="w-3.5 h-3.5" />
                                        Lihat Jadwal
                                    </a>
                                    <a
                                        href="/bookings/create"
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600 text-white text-[10.5px] font-bold hover:bg-blue-700 transition-colors"
                                    >
                                        <Icon name="plus" className="w-3.5 h-3.5" />
                                        Ajukan
                                    </a>
                                </div>
                            </div>
                        </article>
                    );
                })}

                <article className="rounded-2xl border border-dashed border-slate-200 bg-white/50 p-6 flex flex-col items-center justify-center text-center min-h-[320px]">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                        <Icon name="help" className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 mt-3">Butuh ruangan lain?</h3>
                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1 max-w-[200px]">
                        Versi pertama RuangKita mencakup satu gedung dan lima ruangan utama. Hubungi admin untuk
                        kebutuhan khusus.
                    </p>
                    <a
                        href="/guidelines"
                        className="mt-3 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                    >
                        Hubungi admin fakultas
                    </a>
                </article>
            </section>
        </RuangKitaLayout>
    );
}
