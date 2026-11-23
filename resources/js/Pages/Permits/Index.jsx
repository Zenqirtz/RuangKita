import React, { useMemo, useState } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import { permits, stageStyles } from '@/Data/ruangkita';

const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'admin', label: 'Verifikasi Admin' },
    { id: 'leadership', label: 'Persetujuan Pimpinan' },
    { id: 'approved', label: 'Disetujui' },
    { id: 'revision', label: 'Perlu Revisi' },
];

export default function PermitsIndex({ permits = [], stats = {} }) {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        return permits.filter((permit) => {
            const matchesFilter = filter === 'all' || permit.stage === filter;
            const haystack = `${permit.event} ${permit.id} ${permit.room} ${permit.ormawa}`.toLowerCase();
            const matchesQuery = haystack.includes(query.toLowerCase().trim());

            return matchesFilter && matchesQuery;
        });
    }, [filter, query]);

    const activeCount = stats.active ?? 0;
    const approvedCount = stats.approved ?? 0;
    const revisionCount = stats.revision ?? 0;

    return (
        <RuangKitaLayout activeTab="permits">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tracking Izin</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Pantau setiap tahap persetujuan tanpa perlu datang ke kantor administrasi.
                    </p>
                </div>
                <a
                    href="/bookings/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    Pengajuan Baru
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Pengajuan aktif', value: String(activeCount), icon: 'clock', accent: 'text-violet-600 bg-violet-50' },
                    { label: 'Rata-rata persetujuan', value: '2,4 hari', icon: 'trending', accent: 'text-blue-600 bg-blue-50' },
                    { label: 'Izin disetujui', value: String(approvedCount), icon: 'check', accent: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Perlu revisi', value: String(revisionCount), icon: 'alert', accent: 'text-rose-600 bg-rose-50' },
                ].map((item) => (
                    <div key={item.label} className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
                            <Icon name={item.icon} className="w-[18px] h-[18px]" />
                        </div>
                        <div>
                            <p className="text-lg font-extrabold text-slate-900 leading-tight">{item.value}</p>
                            <p className="text-[10px] font-medium text-slate-400 leading-tight mt-0.5">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                        {filters.map((item) => {
                            const count =
                                item.id === 'all'
                                    ? permits.length
                                    : permits.filter((permit) => permit.stage === item.id).length;
                            const isActive = filter === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setFilter(item.id)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                            : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                                            isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative w-full lg:w-64">
                        <Icon
                            name="search"
                            className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Cari kegiatan atau ID izin..."
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {filtered.map((permit) => {
                        const style = stageStyles[permit.stage];

                        return (
                            <div
                                key={permit.id}
                                className="flex flex-col md:flex-row md:items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors"
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                        permit.stage === 'revision'
                                            ? 'bg-rose-50 text-rose-600'
                                            : permit.stage === 'approved'
                                              ? 'bg-emerald-50 text-emerald-600'
                                              : 'bg-blue-50 text-blue-600'
                                    }`}
                                >
                                    <Icon name={permit.stage === 'revision' ? 'alert' : 'file'} className="w-[18px] h-[18px]" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <a
                                            href={`/permits/${permit.id}`}
                                            className="text-[12.5px] font-bold text-slate-800 hover:text-blue-600 transition-colors"
                                        >
                                            {permit.event}
                                        </a>
                                        <span className="text-[9px] font-mono text-slate-400">{permit.id}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-slate-400 font-medium">
                                        <span className="inline-flex items-center gap-1">
                                            <Icon name="door" className="w-3 h-3" />
                                            {permit.room}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Icon name="calendar" className="w-3 h-3" />
                                            {permit.date} • {permit.time}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Icon name="users" className="w-3 h-3" />
                                            {permit.participants} peserta
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2.5 max-w-md">
                                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full ${style.progress}`}
                                                style={{ width: `${style.progressValue}%` }}
                                            />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400">{style.progressValue}%</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-3 md:w-56 shrink-0">
                                    <StatusBadge stage={permit.stage} />
                                    <a
                                        href={`/permits/${permit.id}`}
                                        className="inline-flex items-center gap-1 text-[10.5px] font-bold text-blue-600 hover:text-blue-700"
                                    >
                                        Detail
                                        <Icon name="chevronRight" className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="px-5 py-14 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto">
                                <Icon name="search" className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold text-slate-600 mt-3">Tidak ada pengajuan ditemukan</p>
                            <p className="text-[10px] text-slate-400 mt-1">Coba ubah filter atau kata kunci pencarian.</p>
                        </div>
                    )}
                </div>
            </section>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <Icon name="info" className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-[10.5px] text-blue-800 leading-relaxed">
                    Setiap perubahan status dikirim sebagai notifikasi. Rata-rata waktu persetujuan saat ini{' '}
                    <span className="font-bold">2,4 hari kerja</span>, turun dari 4-5 hari pada proses manual.
                </p>
            </div>
        </RuangKitaLayout>
    );
}
