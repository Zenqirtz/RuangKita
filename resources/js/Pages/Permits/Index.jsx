import React, { useMemo, useState, useEffect } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import { stageStyles } from '@/Data/ruangkita';
import { useLanguage } from '@/Context/LanguageContext';

const filterConfigs = [
    { id: 'all', key: 'permits.filter_all', fallback: 'Semua Pengajuan' },
    { id: 'active', key: 'permits.filter_active', fallback: 'Sedang Berjalan' },
    { id: 'revision', key: 'permits.filter_revision', fallback: 'Perlu Revisi', isAlert: true },
    { id: 'approved', key: 'permits.filter_approved', fallback: 'Disetujui' },
    { id: 'history', key: 'permits.filter_history', fallback: 'Riwayat Selesai' },
];

export default function PermitsIndex({ permits = [], stats = {} }) {
    const { t } = useLanguage();
    const [filter, setFilter] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const initial = params.get('filter');
            if (initial && ['all', 'active', 'revision', 'approved', 'history'].includes(initial)) {
                return initial;
            }
        }
        return 'all';
    });
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const f = params.get('filter');
            if (f && ['all', 'active', 'revision', 'approved', 'history'].includes(f)) {
                setFilter(f);
            }
        }
    }, []);

    const filtered = useMemo(() => {
        return permits.filter((permit) => {
            let matchesFilter = true;
            if (filter === 'active') {
                matchesFilter = ['submitted', 'admin', 'leadership'].includes(permit.stage);
            } else if (filter === 'revision') {
                matchesFilter = permit.stage === 'revision';
            } else if (filter === 'approved') {
                matchesFilter = permit.stage === 'approved';
            } else if (filter === 'history') {
                matchesFilter = ['approved', 'rejected'].includes(permit.stage);
            }

            const haystack = `${permit.event} ${permit.id} ${permit.room} ${permit.ormawa}`.toLowerCase();
            const matchesQuery = haystack.includes(query.toLowerCase().trim());

            return matchesFilter && matchesQuery;
        });
    }, [filter, query, permits]);

    const activeCount = stats.active ?? permits.filter((p) => ['submitted', 'admin', 'leadership'].includes(p.stage)).length;
    const approvedCount = stats.approved ?? permits.filter((p) => p.stage === 'approved').length;
    const revisionCount = stats.revision ?? permits.filter((p) => p.stage === 'revision').length;
    const historyCount = permits.filter((p) => ['approved', 'rejected'].includes(p.stage)).length;

    const getFilterCount = (id) => {
        if (id === 'all') return permits.length;
        if (id === 'active') return activeCount;
        if (id === 'revision') return revisionCount;
        if (id === 'approved') return approvedCount;
        if (id === 'history') return historyCount;
        return 0;
    };

    return (
        <RuangKitaLayout activeTab="permits">
            {/* Header: Title + Primary Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        {t('permits.title', 'Pusat Peminjaman & Izin')}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 max-w-xl">
                        {t('permits.subtitle', 'Satu pintu untuk membuat pengajuan baru, melacak status izin, memperbaiki berkas revisi, dan melihat riwayat peminjaman.')}
                    </p>
                </div>
                <a
                    href="/bookings/create"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/25 hover:bg-blue-700 transition-all hover:scale-[1.01] active:scale-[0.99] shrink-0"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    {t('permits.new_booking', 'Pengajuan Baru')}
                </a>
            </div>

            {/* Revision Alert Banner (if any) */}
            {revisionCount > 0 && filter !== 'revision' && (
                <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon name="alert" className="w-[18px] h-[18px]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-rose-900">
                                {t('permits.revision_alert_title', '{count} Pengajuan Memerlukan Tindakan Revisi').replace('{count}', revisionCount)}
                            </p>
                            <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
                                {t('permits.revision_alert_desc', 'Verifikator memberikan catatan perbaikan. Segera perbaiki dokumen agar proses persetujuan dapat dilanjutkan.')}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFilter('revision')}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors shrink-0 shadow-sm"
                    >
                        {t('permits.view_revisions', 'Lihat Berkas Revisi')}
                        <Icon name="chevronRight" className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {[
                    { label: t('permits.stat_total', 'Total Pengajuan'), value: String(stats.total ?? permits.length), icon: 'clipboardList', accent: 'text-blue-600 bg-blue-50', filterId: 'all' },
                    { label: t('permits.stat_active', 'Sedang Berjalan'), value: String(activeCount), icon: 'clock', accent: 'text-violet-600 bg-violet-50', filterId: 'active' },
                    { label: t('permits.stat_revision', 'Perlu Revisi'), value: String(revisionCount), icon: 'alert', accent: revisionCount > 0 ? 'text-rose-600 bg-rose-100/80' : 'text-slate-500 bg-slate-100', filterId: 'revision' },
                    { label: t('permits.stat_history', 'Riwayat Selesai'), value: String(historyCount), icon: 'check', accent: 'text-emerald-600 bg-emerald-50', filterId: 'history' },
                ].map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        onClick={() => setFilter(item.filterId)}
                        className={`text-left min-w-0 bg-white rounded-2xl border transition-all p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md ${
                            filter === item.filterId ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-100 hover:border-slate-200'
                        }`}
                    >
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
                            <Icon name={item.icon} className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xl font-extrabold text-slate-900 leading-tight">{item.value}</p>
                            <p className="text-[11px] font-semibold text-slate-400 leading-tight mt-0.5 truncate">{item.label}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Integrated Table/List Section */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Filter Tabs + Search */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/40">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                        {filterConfigs.map((item) => {
                            const count = getFilterCount(item.id);
                            const isActive = filter === item.id;
                            const hasAlertBadge = item.isAlert && count > 0;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setFilter(item.id)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                                    }`}
                                >
                                    {t(item.key, item.fallback)}
                                    <span
                                        className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-bold ${
                                            hasAlertBadge
                                                ? isActive
                                                    ? 'bg-rose-500 text-white'
                                                    : 'bg-rose-100 text-rose-700'
                                                : isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-slate-200/70 text-slate-600'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative w-full lg:w-72">
                        <Icon
                            name="search"
                            className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={t('permits.search_placeholder', 'Cari kegiatan, ormawa, atau kode izin...')}
                            className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400 shadow-sm"
                        />
                    </div>
                </div>

                {/* Permits List */}
                <div className="divide-y divide-slate-100">
                    {filtered.map((permit) => {
                        const style = stageStyles[permit.stage] || {
                            label: permit.stage,
                            progress: 'bg-slate-300',
                            progressValue: 20,
                        };

                        return (
                            <div
                                key={permit.id}
                                className="flex flex-col md:flex-row md:items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition-colors"
                            >
                                <div
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                                        permit.stage === 'revision'
                                            ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                                            : permit.stage === 'approved'
                                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                                              : 'bg-blue-50 text-blue-600 border border-blue-200/60'
                                    }`}
                                >
                                    <Icon
                                        name={permit.stage === 'revision' ? 'alert' : permit.stage === 'approved' ? 'check' : 'clipboardList'}
                                        className="w-5 h-5"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <a
                                            href={`/permits/${permit.id}`}
                                            className="text-[13px] font-bold text-slate-900 hover:text-blue-600 transition-colors"
                                        >
                                            {permit.event}
                                        </a>
                                        <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-semibold">
                                            {permit.id}
                                        </span>
                                        {permit.ormawa && (
                                            <span className="text-[10px] font-medium text-slate-500">
                                                • {permit.ormawa}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mt-1 text-[11px] text-slate-500 font-medium">
                                        <span className="inline-flex items-center gap-1.5 text-slate-600">
                                            <Icon name="door" className="w-3.5 h-3.5 text-slate-400" />
                                            {permit.room}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-slate-600">
                                            <Icon name="calendar" className="w-3.5 h-3.5 text-slate-400" />
                                            {permit.date} • {permit.time}
                                        </span>
                                        {permit.participants > 0 && (
                                            <span className="inline-flex items-center gap-1.5 text-slate-600">
                                                <Icon name="users" className="w-3.5 h-3.5 text-slate-400" />
                                                {permit.participants} {t('common.participants', 'peserta')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Revision Note Pill if applicable */}
                                    {permit.stage === 'revision' && permit.notes && (
                                        <div className="mt-2.5 p-2.5 rounded-xl bg-rose-50/90 border border-rose-200/80 text-[10.5px] text-rose-800 flex items-start gap-2">
                                            <Icon name="alert" className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                                            <div>
                                                <strong className="font-semibold text-rose-900">{t('permits.revision_note_label', 'Catatan Revisi:')}</strong>{' '}
                                                <span>{permit.notes}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Progress Bar for In-Progress stages */}
                                    {!['approved', 'rejected', 'revision'].includes(permit.stage) && (
                                        <div className="flex items-center gap-2.5 mt-2.5 max-w-sm">
                                            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-1.5 rounded-full ${style.progress}`}
                                                    style={{ width: `${style.progressValue}%` }}
                                                />
                                            </div>
                                            <span className="text-[9.5px] font-bold text-slate-400">{style.progressValue}%</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-2.5 md:w-64 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-50">
                                    <StatusBadge stage={permit.stage} />

                                    {permit.stage === 'approved' && (
                                        <a
                                            href={`/permits/${permit.id}/letter`}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10.5px] font-bold transition-colors"
                                            title={t('permits.download_letter_title', 'Unduh Surat Izin Resmi')}
                                        >
                                            <Icon name="download" className="w-3.5 h-3.5" />
                                            {t('permits.download_letter', 'Surat')}
                                        </a>
                                    )}

                                    <a
                                        href={`/permits/${permit.id}`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-[10.5px] font-bold text-slate-700 transition-colors"
                                    >
                                        {t('common.detail', 'Detail')}
                                        <Icon name="chevronRight" className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="px-5 py-16 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
                                <Icon name="clipboardList" className="w-7 h-7" />
                            </div>
                            <p className="text-sm font-bold text-slate-700">{t('permits.empty_title', 'Tidak ada pengajuan pada kategori ini')}</p>
                            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                                {t('permits.empty_desc', 'Coba pilih filter lain atau buat pengajuan peminjaman ruangan baru.')}
                            </p>
                            <a
                                href="/bookings/create"
                                className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <Icon name="plus" className="w-3.5 h-3.5" />
                                {t('permits.new_booking', 'Pengajuan Baru')}
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom Guidance Info */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <Icon name="info" className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-[11px] text-blue-900 leading-relaxed">
                    Setiap peminjaman diproses bertahap mulai dari verifikasi kelengkapan berkas oleh admin hingga tanda tangan surat izin oleh pimpinan. Notifikasi perubahan status akan muncul otomatis pada dashboard Anda.
                </p>
            </div>
        </RuangKitaLayout>
    );
}
