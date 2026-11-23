import React from 'react';
import { usePage } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatCard from '@/Components/RuangKita/StatCard';
import SectionCard from '@/Components/RuangKita/SectionCard';
import MiniCalendar from '@/Components/RuangKita/MiniCalendar';
import DonutChart from '@/Components/RuangKita/DonutChart';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import HeroIllustration from '@/Components/RuangKita/HeroIllustration';
import { accentStyles } from '@/Components/RuangKita/accent';
import { quickAccess } from '@/Data/ruangkita';

const statIcons = {
    door: 'door',
    clock: 'clock',
    fileCheck: 'fileCheck',
    check: 'check',
    alert: 'alert',
};

const now = new Date();
const thisYear = now.getFullYear();
const thisMonth = now.getMonth(); // 0-based
const thisDay = now.getDate();

export default function RuangKitaDashboard({ recentPermits = [], stats = {} }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';
    const user = auth?.user;
    const heroTitle = isAdmin ? 'Selamat datang kembali,' : user ? 'Selamat datang kembali, 👋' : 'Selamat datang di RuangKita, 👋';
    const heroName = isAdmin ? 'Admin RuangKita!' : user?.name ? `${user.name}!` : 'Civitas Akademika UB!';

    const liveStats = isAdmin
        ? [
            { label: 'Total Pengajuan', value: String(stats.total ?? 0), suffix: null, accent: 'blue', icon: 'fileCheck' },
            { label: 'Menunggu Verifikasi', value: String(stats.adminReview ?? 0), suffix: null, accent: 'violet', icon: 'clock' },
            { label: 'Tahap Pimpinan', value: String(stats.leadership ?? 0), suffix: null, accent: 'amber', icon: 'door' },
            { label: 'Izin Disetujui', value: String(stats.approved ?? 0), suffix: null, accent: 'emerald', icon: 'check' },
            { label: 'Perlu Revisi', value: String(stats.revision ?? 0), suffix: null, accent: 'rose', icon: 'alert' },
        ]
        : [
            { label: 'Pengajuan Aktif', value: String(stats.total ?? 0), suffix: null, accent: 'blue', icon: 'fileCheck' },
            { label: 'Menunggu Verifikasi', value: String(stats.adminReview ?? 0), suffix: null, accent: 'violet', icon: 'clock' },
            { label: 'Tahap Pimpinan', value: String(stats.leadership ?? 0), suffix: null, accent: 'amber', icon: 'door' },
            { label: 'Disetujui', value: String(stats.approved ?? 0), suffix: null, accent: 'emerald', icon: 'check' },
            { label: 'Perlu Revisi', value: String(stats.revision ?? 0), suffix: null, accent: 'rose', icon: 'alert' },
        ];

    const occupancyRate = stats.occupancyRate ?? 0;

    const donutSegments = [
        { label: 'Disetujui', value: stats.approved ?? 0, color: '#10B981' },
        { label: 'Proses Verifikasi', value: (stats.adminReview ?? 0) + (stats.leadership ?? 0), color: '#2563EB' },
        { label: 'Perlu Revisi', value: stats.revision ?? 0, color: '#F59E0B' },
    ].filter((s) => s.value > 0);

    const hasDonut = donutSegments.length > 0;

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
                            {heroTitle}<br />
                            <span className="text-blue-200">{heroName}</span>
                        </h2>
                        <p className="text-[13px] text-blue-100 mt-2.5 leading-relaxed max-w-md">
                            {isAdmin
                                ? 'Kelola ketersediaan ruang, verifikasi permohonan izin ormawa, dan pantau persetujuan pimpinan.'
                                : 'Pantau peminjaman ruang & progres tanda tangan izin kampusmu dalam satu tempat.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5 mt-5">
                            <a
                                href={isAdmin ? '/permits' : '/bookings/create'}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 text-xs font-bold shadow-lg hover:bg-blue-50 transition-all active:scale-[0.98]"
                            >
                                <Icon name={isAdmin ? 'fileCheck' : 'plus'} className="w-4 h-4" />
                                {isAdmin ? 'Verifikasi Izin Masuk' : 'Ajukan Ruangan'}
                            </a>
                            <a
                                href={isAdmin ? '/rooms' : '/calendar'}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white text-xs font-bold hover:bg-white/20 transition-all"
                            >
                                <Icon name={isAdmin ? 'door' : 'calendar'} className="w-4 h-4" />
                                {isAdmin ? 'Kelola Ruangan' : 'Kalender Live'}
                            </a>
                            <a
                                href={isAdmin ? '/calendar' : '/permits'}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white text-xs font-bold hover:bg-white/20 transition-all"
                            >
                                <Icon name={isAdmin ? 'calendar' : 'clock'} className="w-4 h-4" />
                                {isAdmin ? 'Kalender Live' : 'Lacak Izin'}
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:block shrink-0">
                        <HeroIllustration className="w-[280px] lg:w-[320px] h-auto opacity-90" />
                    </div>
                </div>
            </section>

            {/* Statistic cards (live from DB) */}
            <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
                {liveStats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        suffix={stat.suffix}
                        accent={accentStyles[stat.accent] ?? accentStyles.blue}
                        icon={<Icon name={statIcons[stat.icon]} className="w-5 h-5" />}
                    />
                ))}
            </section>

            {/* Recent permits (live from DB) + occupancy */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <SectionCard
                    className="lg:col-span-2"
                    title="Pengajuan Terkini"
                    subtitle="Data langsung dari database — diperbarui setiap submit"
                    action="Lihat Semua"
                    actionHref="/permits"
                    bodyClassName="px-5 pb-2"
                >
                    {recentPermits.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mb-3">
                                <Icon name="file" className="w-7 h-7" />
                            </div>
                            <p className="text-sm font-bold text-slate-500">Belum ada pengajuan</p>
                            <p className="text-xs text-slate-400 mt-1">
                                Ajukan peminjaman ruangan pertama untuk memulai.
                            </p>
                            <a
                                href="/bookings/create"
                                className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                            >
                                <Icon name="plus" className="w-3.5 h-3.5" />
                                Ajukan Sekarang
                            </a>
                        </div>
                    ) : (
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
                    )}
                </SectionCard>

                {/* Performance overview from live stats */}
                <SectionCard
                    title="Performance Overview"
                    subtitle="Tingkat kelancaran izin ormawa"
                    action="Lihat Semua"
                    actionHref="/permits"
                    bodyClassName="px-5 pb-5"
                >
                    {hasDonut ? (
                        <>
                            <div className="flex items-center gap-4">
                                <DonutChart
                                    segments={donutSegments}
                                    centerValue={`${occupancyRate}%`}
                                    centerLabel="Disetujui"
                                    size={128}
                                    strokeWidth={14}
                                />

                                <div className="space-y-2 min-w-0 flex-1">
                                    {donutSegments.map((item) => (
                                        <div key={item.label} className="flex items-center justify-between gap-2">
                                            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 min-w-0">
                                                <span
                                                    className="w-2 h-2 rounded-full shrink-0"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <span className="truncate">{item.label}</span>
                                            </span>
                                            <span className="text-[11px] font-bold text-slate-700">{item.value}</span>
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
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center mb-3">
                                <Icon name="trending" className="w-6 h-6 text-slate-300" />
                            </div>
                            <p className="text-xs font-bold text-slate-500">Belum ada data statistik</p>
                            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                Chart akan muncul setelah ada pengajuan masuk.
                            </p>
                        </div>
                    )}
                </SectionCard>
            </section>

            {/* Calendar + quick access */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SectionCard
                    title="Kalender Ketersediaan"
                    action="Lihat Kalender"
                    actionHref="/calendar"
                    bodyClassName="px-5 pb-5"
                >
                    <MiniCalendar
                        year={thisYear}
                        month={thisMonth}
                        monthLabel={new Date(thisYear, thisMonth, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                        today={thisDay}
                        markedDays={recentPermits
                            .filter((p) => {
                                const d = new Date(p.isoDate);
                                return d.getFullYear() === thisYear && d.getMonth() === thisMonth;
                            })
                            .map((p) => new Date(p.isoDate).getDate())}
                    />
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[10px] font-medium text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500" /> Hari ini
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400" /> Ada pengajuan
                        </span>
                    </div>
                </SectionCard>

                <SectionCard
                    title="Akses Cepat"
                    subtitle="Menu yang sering digunakan"
                    className="h-full flex flex-col"
                    bodyClassName="px-5 pb-5 flex-1 flex flex-col"
                >
                    <div className="grid h-full flex-1 grid-cols-3 grid-rows-2 gap-3">
                        {quickAccess.map((item) => {
                            const accent = accentStyles[item.accent] ?? accentStyles.blue;

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`rounded-2xl border ${accent.soft} p-3 sm:p-4 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all group`}
                                >
                                    <div
                                        className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center ${accent.text} shadow-sm group-hover:scale-105 transition-transform`}
                                    >
                                        <Icon name={item.icon} className="w-5 h-5" />
                                    </div>
                                    <span className="text-[11.5px] font-bold text-slate-700 mt-2.5 leading-tight">
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-1">
                                        {item.description}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </SectionCard>
            </section>
        </RuangKitaLayout>
    );
}
