import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatCard from '@/Components/RuangKita/StatCard';
import SectionCard from '@/Components/RuangKita/SectionCard';
import MiniCalendar from '@/Components/RuangKita/MiniCalendar';
import DonutChart from '@/Components/RuangKita/DonutChart';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import HeroIllustration from '@/Components/RuangKita/HeroIllustration';
import { accentStyles } from '@/Components/RuangKita/accent';
import {
    dashboardStats,
    notices,
    permits,
    quickAccess,
    weeklyOccupancy,
} from '@/Data/ruangkita';

const statIcons = {
    door: 'door',
    clock: 'clock',
    fileCheck: 'fileCheck',
    check: 'check',
    alert: 'alert',
};

const noticeIconStyles = {
    revision: { tile: 'bg-blue-50 text-blue-600', icon: 'megaphone' },
    info: { tile: 'bg-blue-50 text-blue-600', icon: 'megaphone' },
    success: { tile: 'bg-blue-50 text-blue-600', icon: 'megaphone' },
};

export default function RuangKitaDashboard() {
    const recentPermits = permits.slice(0, 4);

    return (
        <RuangKitaLayout activeTab="dashboard">
            {/* Hero greeting */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-6 py-7 md:px-9 md:py-8 text-white">
                <div className="absolute -top-12 -right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-blue-500/30 blur-2xl pointer-events-none" />
                <div className="absolute top-6 right-32 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="max-w-xl">

                        <h2 className="text-2xl md:text-[28px] font-extrabold tracking-tight leading-tight">
                            Selamat pagi, 👋<br />
                            <span className="text-blue-200">Daffa Ahmad Al Attas!</span>
                        </h2>
                        <p className="text-[13px] text-blue-100 mt-2.5 leading-relaxed max-w-md">
                            Pantau peminjaman ruang & progres tanda tangan izin kampusmu dalam satu tempat.
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5 mt-5">
                            <a
                                href="/bookings/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 text-xs font-bold shadow-lg hover:bg-blue-50 transition-all active:scale-[0.98]"
                            >
                                <Icon name="plus" className="w-4 h-4" />
                                Ajukan Ruangan
                            </a>
                            <a
                                href="/calendar"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white text-xs font-bold hover:bg-white/20 transition-all"
                            >
                                <Icon name="calendar" className="w-4 h-4" />
                                Kalender Live
                            </a>
                            <a
                                href="/permits"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white text-xs font-bold hover:bg-white/20 transition-all"
                            >
                                <Icon name="clock" className="w-4 h-4" />
                                Lacak Izin
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:block shrink-0">
                        <HeroIllustration className="w-[280px] lg:w-[320px] h-auto opacity-90" />
                    </div>
                </div>
            </section>

            {/* Statistic cards */}
            <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
                {dashboardStats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        suffix={stat.suffix}
                        accent={accentStyles[stat.accent]}
                        icon={<Icon name={statIcons[stat.icon]} className="w-5 h-5" />}
                    />
                ))}
            </section>

            {/* Recent permits + notices */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <SectionCard
                    className="lg:col-span-2"
                    title="Pengajuan Terkini"
                    subtitle="Pemantauan 4 tahap verifikasi izin secara real-time"
                    action="Lihat Semua"
                    actionHref="/permits"
                    bodyClassName="px-5 pb-2"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[560px]">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                    <th className="py-2.5 px-2 font-bold rounded-l-lg">Kegiatan</th>
                                    <th className="py-2.5 px-2 font-bold">Ruangan</th>
                                    <th className="py-2.5 px-2 font-bold">Tahap</th>
                                    <th className="py-2.5 px-2 font-bold text-right rounded-r-lg">Jadwal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentPermits.map((permit) => (
                                    <tr key={permit.id} className="hover:bg-slate-50/60 transition-colors border-b border-slate-50 last:border-b-0">
                                        <td className="py-3 px-2">
                                            <a
                                                href={`/permits/${permit.id}`}
                                                className="text-[12px] font-bold text-slate-800 hover:text-blue-600 leading-snug transition-colors"
                                            >
                                                {permit.event}
                                            </a>
                                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                                {permit.id} • {permit.ormawa}
                                            </p>
                                        </td>
                                        <td className="py-3 px-2">
                                            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                                                <Icon name="mapPin" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                {permit.room}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2">
                                            <StatusBadge stage={permit.stage} />
                                        </td>
                                        <td className="py-3 px-2 text-right">
                                            <p className="text-[11px] font-semibold text-slate-700">{permit.date}</p>
                                            <p className="text-[10px] text-slate-400">{permit.time} WIB</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>

                <SectionCard
                    title="Papan Pengumuman"
                    action="Lihat Semua"
                    actionHref="/revisions"
                    bodyClassName="px-5 pb-5"
                >
                    <div className="space-y-4">
                        {notices.map((notice) => {
                            const style = noticeIconStyles[notice.type];

                            return (
                                <a key={notice.id} href={notice.href} className="flex gap-3 group">
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.tile}`}
                                    >
                                        <Icon name={style.icon} className="w-[18px] h-[18px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11.5px] font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                                            {notice.title}
                                        </p>
                                        <p className="text-[10.5px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                                            {notice.description}
                                        </p>
                                        <p className="text-[10px] text-blue-600 font-semibold mt-1">
                                            {notice.date}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </SectionCard>
            </section>

            {/* Calendar + quick access + occupancy */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <SectionCard
                    title="Kalender Ketersediaan"
                    action="Lihat Kalender"
                    actionHref="/calendar"
                    bodyClassName="px-5 pb-5"
                >
                    <MiniCalendar
                        year={2026}
                        month={10}
                        monthLabel="November 2026"
                        today={23}
                        markedDays={[20, 22, 28, 30]}
                    />
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[10px] font-medium text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500" /> Hari ini
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400" /> Ada kegiatan
                        </span>
                    </div>
                </SectionCard>

                <SectionCard title="Akses Cepat" subtitle="Menu yang sering digunakan" bodyClassName="px-5 pb-5">
                    <div className="grid grid-cols-3 gap-2.5">
                        {quickAccess.map((item) => {
                            const accent = accentStyles[item.accent];

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`rounded-xl border ${accent.soft} px-2 py-3 flex flex-col items-center text-center hover:shadow-sm hover:-translate-y-0.5 transition-all group`}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center ${accent.text} shadow-sm group-hover:scale-105 transition-transform`}
                                    >
                                        <Icon name={item.icon} className="w-[18px] h-[18px]" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-700 mt-2 leading-tight">
                                        {item.label}
                                    </span>
                                    <span className="text-[8.5px] text-slate-400 mt-0.5 leading-tight">
                                        {item.description}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </SectionCard>

                <SectionCard
                    className="md:col-span-2 xl:col-span-1"
                    title="Performance Overview"
                    subtitle="Tingkat kelancaran izin ormawa"
                    action="Lihat Detail"
                    actionHref="/rooms"
                    bodyClassName="px-5 pb-5"
                >
                    <div className="flex items-center gap-4">
                        <DonutChart
                            segments={weeklyOccupancy}
                            centerValue="84%"
                            centerLabel="Overall"
                            size={128}
                            strokeWidth={14}
                        />

                        <div className="space-y-2 min-w-0 flex-1">
                            {[
                                { label: 'Disetujui', value: 60, color: '#10B981' },
                                { label: 'Proses Review', value: 20, color: '#2563EB' },
                                { label: 'Perlu Revisi', value: 12, color: '#F59E0B' },
                                { label: 'Ditolak/Batal', value: 8, color: '#F43F5E' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 min-w-0">
                                        <span
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="truncate">{item.label}</span>
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-700">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2">
                        <Icon name="shield" className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                        <p className="text-[9.5px] font-semibold text-blue-800 leading-snug">
                            Auto conflict check aktif. Mencegah double-booking saat ormawa submit berkas.
                        </p>
                    </div>
                </SectionCard>
            </section>
        </RuangKitaLayout>
    );
}
