import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import { useLanguage } from '@/Context/LanguageContext';

export default function History({ history = [] }) {
    const { t, lang } = useLanguage();
    const approvedCount = history.filter((item) => item.stage === 'approved').length;
    const rejectedCount = history.filter((item) => item.stage === 'rejected').length;

    return (
        <RuangKitaLayout activeTab="history">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{t('nav.history', 'Riwayat Peminjaman')}</h1>
                <p className="text-xs text-slate-400 mt-1">
                    {t('history.subtitle', 'Arsip peminjaman ruangan yang telah selesai diverifikasi atau diproses.')}
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {[
                    { label: t('history.total', 'Total Arsip'), value: history.length, unit: t('history.unit', 'kegiatan') },
                    { label: t('stage.approved', 'Disetujui'), value: approvedCount, unit: lang === 'en' ? 'permits' : 'izin' },
                    { label: t('stage.rejected', 'Ditolak'), value: rejectedCount, unit: lang === 'en' ? 'files' : 'berkas' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                        <p className="text-[10px] font-semibold text-slate-400">{stat.label}</p>
                        <p className="text-2xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                        <p className="text-[9.5px] text-slate-400 mt-0.5">{stat.unit}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h2 className="text-sm font-extrabold text-slate-900">{t('history.title', 'Daftar Peminjaman Selesai')}</h2>
                </div>

                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mb-3">
                            <Icon name="clock" className="w-7 h-7" />
                        </div>
                        <p className="text-sm font-bold text-slate-600">{t('history.empty', 'Belum ada riwayat')}</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                            {t('history.empty_desc', 'Pengajuan yang sudah disetujui atau ditolak akan otomatis diarsipkan di sini.')}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[640px]">
                            <thead>
                                <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                    <th className="pb-3 px-2">ID & {t('dash.table_event', 'Kegiatan')}</th>
                                    <th className="pb-3 px-2">{t('dash.table_room', 'Ruangan')}</th>
                                    <th className="pb-3 px-2">{t('common.date', 'Tanggal')} & {t('common.time', 'Waktu')}</th>
                                    <th className="pb-3 px-2">{t('common.duration', 'Durasi')}</th>
                                    <th className="pb-3 px-2">{t('common.status', 'Status')}</th>
                                    <th className="pb-3 px-2 text-right">{t('common.action', 'Aksi')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {history.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-3 px-2">
                                            <a
                                                href={`/permits/${row.id}`}
                                                className="text-[12px] font-bold text-slate-800 hover:text-blue-600 transition-colors"
                                            >
                                                {row.event}
                                            </a>
                                            <p className="text-[10px] text-slate-400 mt-0.5">
                                                {row.id} • {row.ormawa}
                                            </p>
                                        </td>
                                        <td className="py-3 px-2 text-[11px] font-medium text-slate-600">
                                            {row.room}
                                        </td>
                                        <td className="py-3 px-2">
                                            <p className="text-[11px] font-semibold text-slate-700">{row.date}</p>
                                            <p className="text-[9.5px] text-slate-400">{row.time} WIB</p>
                                        </td>
                                        <td className="py-3 px-2 text-[11px] font-medium text-slate-600">
                                            {row.duration}
                                        </td>
                                        <td className="py-3 px-2">
                                            <StatusBadge stage={row.stage} />
                                        </td>
                                        <td className="py-3 px-2 text-right">
                                            <a
                                                href={`/permits/${row.id}`}
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700"
                                            >
                                                {t('common.detail', 'Detail')}
                                                <Icon name="arrowRight" className="w-3 h-3" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </RuangKitaLayout>
    );
}
