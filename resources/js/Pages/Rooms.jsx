import React, { useMemo, useState } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { roomStatusStyles } from '@/Data/ruangkita';
import { accentStyles } from '@/Components/RuangKita/accent';
import { useLanguage } from '@/Context/LanguageContext';

const categories = [
    { id: 'all', key: 'rooms.cat_all', fallback: 'Semua Ruangan' },
    { id: 'Ruang Kelas & Diskusi', key: 'rooms.cat_class', fallback: 'Ruang Kelas & Diskusi' },
    { id: 'Laboratorium & Studio', key: 'rooms.cat_lab', fallback: 'Laboratorium & Studio' },
    { id: 'Ruang Penunjang', key: 'rooms.cat_support', fallback: 'Ruang Penunjang' },
];

export default function Rooms({ rooms = [], stats = {} }) {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [query, setQuery] = useState('');

    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {
            const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
            const q = query.toLowerCase().trim();
            const matchesQuery =
                !q ||
                room.name.toLowerCase().includes(q) ||
                room.code.toLowerCase().includes(q) ||
                (room.campus && room.campus.toLowerCase().includes(q)) ||
                (room.floor && room.floor.toLowerCase().includes(q));

            return matchesCategory && matchesQuery;
        });
    }, [rooms, selectedCategory, query]);

    return (
        <RuangKitaLayout activeTab="rooms">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{t('rooms.title', 'Daftar Ruangan')}</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        {t('rooms.subtitle', 'Ruang kelas, laboratorium praktik, dan ruang penunjang Vokasi UB (Veteran & Dieng).')}
                    </p>
                </div>
                <a
                    href="/bookings/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors shrink-0"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    {t('rooms.apply_room', 'Ajukan Ruangan')}
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { label: t('rooms.total_rooms', 'Total ruangan'), value: String(stats.totalRooms ?? rooms.length), icon: 'door', accent: accentStyles.blue },
                    { label: t('rooms.available_today', 'Tersedia hari ini'), value: String(stats.availableToday ?? rooms.length), icon: 'check', accent: accentStyles.emerald },
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

            {/* Category Filters + Search */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        const count = cat.id === 'all' ? rooms.length : rooms.filter((r) => r.category === cat.id).length;

                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                                }`}
                            >
                                <span>{t(cat.key, cat.fallback)}</span>
                                <span
                                    className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-bold ${
                                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full lg:w-72">
                    <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('rooms.search_placeholder', 'Cari nama ruangan, lab, atau kampus...')}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredRooms.map((room) => {
                    const accent = accentStyles[room.accent] ?? accentStyles.blue;
                    const status = roomStatusStyles[room.status] ?? roomStatusStyles.available;

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
                                <span className="absolute top-3 left-3 text-[9px] font-bold text-slate-600 bg-white/85 backdrop-blur px-2 py-1 rounded-lg">
                                    {room.code}
                                </span>
                                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full border bg-white/90 ${status.badge}`}>
                                    {room.status === 'available' ? t('rooms.status_available', 'Tersedia') : t('rooms.status_booked', 'Terjadwal')}
                                </span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{room.name}</h3>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">{room.floor}</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed mt-2.5 line-clamp-2">
                                    {room.description}
                                </p>

                                <div className="flex items-center gap-4 mt-3.5">
                                    <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-700">
                                        <Icon name="users" className="w-3.5 h-3.5 text-slate-400" />
                                        {t('rooms.capacity', 'Kapasitas:')} {room.capacity} {t('rooms.people', 'orang')}
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
                                        {t('rooms.view_schedule', 'Lihat Jadwal')}
                                    </a>
                                    <a
                                        href="/bookings/create"
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600 text-white text-[10.5px] font-bold hover:bg-blue-700 transition-colors"
                                    >
                                        <Icon name="plus" className="w-3.5 h-3.5" />
                                        {t('rooms.apply', 'Ajukan')}
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
                    <h3 className="text-xs font-bold text-slate-700 mt-3">{t('rooms.need_other_title', 'Butuh ruangan lain?')}</h3>
                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1 max-w-[220px]">
                        {t('rooms.need_other_desc', 'Mencakup ruang kelas, lab praktik, dan ruang penunjang di Kampus Veteran & Dieng. Hubungi admin untuk kebutuhan khusus.')}
                    </p>
                    <a
                        href="/docs/"
                        className="mt-3 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                    >
                        {t('rooms.contact_admin', 'Hubungi admin fakultas')}
                    </a>
                </article>
            </section>
        </RuangKitaLayout>
    );
}
