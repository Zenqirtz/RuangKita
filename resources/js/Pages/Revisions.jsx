import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import { useLanguage } from '@/Context/LanguageContext';

export default function Revisions({ revisions = [] }) {
    const { t } = useLanguage();

    return (
        <RuangKitaLayout activeTab="revisions">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{t('rev.title', 'Catatan Revisi')}</h1>
                <p className="text-xs text-slate-400 mt-1">
                    {t('rev.subtitle', 'Tindak lanjuti catatan petugas agar pengajuan dapat diproses kembali.')}
                </p>
            </div>

            {revisions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                        <Icon name="check" className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">{t('rev.empty_title', 'Tidak ada pengajuan yang perlu direvisi')}</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                        {t('rev.empty_desc', 'Semua pengajuanmu sedang dalam proses atau sudah disetujui. Pantau progres di halaman Peminjaman & Izin.')}
                    </p>
                    <a
                        href="/permits"
                        className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                    >
                        <Icon name="clock" className="w-3.5 h-3.5" />
                        {t('rev.track_btn', 'Lacak Izin')}
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                                <Icon name="alert" className="w-[18px] h-[18px]" />
                            </div>
                            <div>
                                <p className="text-[11.5px] font-bold text-rose-700">
                                    {t('rev.alert_title', '{count} pengajuan memerlukan revisi').replace('{count}', revisions.length)}
                                </p>
                                <p className="text-[10px] text-rose-600 mt-0.5">
                                    {t('rev.alert_desc', 'Segera perbaiki dan kirim ulang dokumen agar slot ruangan tidak dilepas.')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {revisions.map((revision) => (
                        <div
                            key={revision.id}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                        <Icon name="file" className="w-[18px] h-[18px]" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
                                            {revision.event}
                                        </h2>
                                        <p className="text-[10px] text-slate-400 mt-1">
                                            {revision.id} • {revision.ormawa}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge stage={revision.stage} />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                {[
                                    { label: t('dash.table_room', 'Ruangan'), value: revision.room },
                                    { label: t('common.date', 'Tanggal'), value: revision.date },
                                    { label: t('common.time', 'Waktu'), value: revision.time },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <p className="text-[9px] font-medium text-slate-400">{item.label}</p>
                                        <p className="text-[10.5px] font-bold text-slate-700 mt-0.5 leading-snug">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {revision.notes && (
                                <div className="mt-5">
                                    <h3 className="text-[11px] font-bold text-slate-700">{t('rev.admin_notes', 'Catatan dari Admin Fakultas')}</h3>
                                    <div className="mt-2 p-4 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-2.5">
                                        <Icon name="info" className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                                        <p className="text-[10.5px] text-rose-700 leading-relaxed">{revision.notes}</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex items-center justify-end gap-2.5">
                                <a
                                    href={`/permits/${revision.id}`}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-[10.5px] font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                                >
                                    {t('rev.view_detail', 'Lihat Detail')}
                                    <Icon name="arrowRight" className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </RuangKitaLayout>
    );
}
