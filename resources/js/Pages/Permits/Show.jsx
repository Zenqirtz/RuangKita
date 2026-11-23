import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import ApprovalStepper from '@/Components/RuangKita/ApprovalStepper';
import { approvalStages, permits } from '@/Data/ruangkita';

const documentStatus = {
    verified: { label: 'Terverifikasi', className: 'text-emerald-600 bg-emerald-50' },
    revision: { label: 'Perlu revisi', className: 'text-rose-600 bg-rose-50' },
    signed: { label: 'Ditandatangani', className: 'text-blue-600 bg-blue-50' },
};

export default function PermitShow({ permitId }) {
    const permit = permits.find((item) => item.id === permitId) ?? permits[0];
    const stageInfo = approvalStages.find((stage) => stage.key === permit.stage);
    const isApproved = permit.stage === 'approved';
    const isRevision = permit.stage === 'revision';

    return (
        <RuangKitaLayout activeTab="permits" title="Detail Pengajuan">
            <a
                href="/permits"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
                <Icon name="arrowLeft" className="w-3.5 h-3.5" />
                Kembali ke Tracking Izin
            </a>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                isRevision
                                    ? 'bg-rose-50 text-rose-600'
                                    : isApproved
                                      ? 'bg-emerald-50 text-emerald-600'
                                      : 'bg-blue-50 text-blue-600'
                            }`}
                        >
                            <Icon name={isRevision ? 'alert' : 'file'} className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
                                    {permit.event}
                                </h1>
                                <StatusBadge stage={permit.stage} />
                            </div>
                            <p className="text-[10.5px] text-slate-400 font-medium mt-1">
                                {permit.id} • {permit.ormawa} • Diajukan {permit.submittedAt}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {isRevision ? (
                            <a
                                href="/revisions"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-500 text-white text-[10.5px] font-bold hover:bg-rose-600 transition-colors"
                            >
                                <Icon name="upload" className="w-3.5 h-3.5" />
                                Perbaiki Dokumen
                            </a>
                        ) : (
                            <button
                                type="button"
                                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[10.5px] font-bold transition-colors ${
                                    isApproved
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                                disabled={!isApproved}
                            >
                                <Icon name="download" className="w-3.5 h-3.5" />
                                Unduh Surat Izin
                            </button>
                        )}
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-[10.5px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <Icon name="help" className="w-3.5 h-3.5" />
                            Bantuan
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2 space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <div className="flex items-center justify-between gap-3 mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Progres Persetujuan</h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Status diperbarui otomatis setiap ada tindakan dari petugas.
                                </p>
                            </div>
                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap">
                                Tahap {permit.stage === 'revision' ? 2 : Math.max(approvalStages.findIndex((s) => s.key === permit.stage), 0) + 1} / 4
                            </span>
                        </div>

                        <ApprovalStepper stage={permit.stage} />

                        <div
                            className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${
                                isRevision
                                    ? 'bg-rose-50 border-rose-200'
                                    : isApproved
                                      ? 'bg-emerald-50 border-emerald-200'
                                      : 'bg-blue-50/60 border-blue-100'
                            }`}
                        >
                            <Icon
                                name={isRevision ? 'warning' : isApproved ? 'check' : 'info'}
                                className={`w-4 h-4 mt-0.5 shrink-0 ${
                                    isRevision ? 'text-rose-500' : isApproved ? 'text-emerald-600' : 'text-blue-600'
                                }`}
                            />
                            <div>
                                <p
                                    className={`text-[11px] font-bold ${
                                        isRevision ? 'text-rose-700' : isApproved ? 'text-emerald-800' : 'text-blue-800'
                                    }`}
                                >
                                    {isRevision ? 'Pengajuan memerlukan revisi' : isApproved ? 'Izin telah disetujui' : stageInfo?.title ?? 'Sedang diproses'}
                                </p>
                                <p
                                    className={`text-[10px] leading-relaxed mt-0.5 ${
                                        isRevision ? 'text-rose-600' : isApproved ? 'text-emerald-700' : 'text-blue-700'
                                    }`}
                                >
                                    {isRevision
                                        ? permit.note
                                        : isApproved
                                          ? 'Surat izin resmi sudah tersedia. Ruangan terkunci untuk jadwal kegiatan ini.'
                                          : permit.note}
                                </p>
                            </div>
                        </div>

                        {isRevision && permit.revisionItems && (
                            <div className="mt-3 space-y-2">
                                {permit.revisionItems.map((item) => (
                                    <div key={item} className="flex items-start gap-2 text-[10.5px] text-slate-600">
                                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <Icon name="x" className="w-2.5 h-2.5" />
                                        </span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <h3 className="text-sm font-bold text-slate-900">Riwayat Proses</h3>
                        <div className="mt-5">
                            {permit.timeline.map((item, index) => {
                                const isLast = index === permit.timeline.length - 1;

                                return (
                                    <div key={item.title} className="relative flex gap-3 pb-5 last:pb-0">
                                        {!isLast && (
                                            <span className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-200" />
                                        )}
                                        <div
                                            className={`relative z-10 w-[23px] h-[23px] rounded-full flex items-center justify-center shrink-0 ${
                                                item.state === 'done'
                                                    ? 'bg-blue-600 text-white'
                                                    : item.state === 'current'
                                                      ? 'bg-amber-400 text-white ring-4 ring-amber-100'
                                                      : 'bg-white border-2 border-slate-200 text-slate-300'
                                            }`}
                                        >
                                            <Icon
                                                name={item.state === 'done' ? 'checkSmall' : item.state === 'current' ? 'clock' : 'checkSmall'}
                                                className="w-3 h-3"
                                                strokeWidth={2.5}
                                            />
                                        </div>
                                        <div className="min-w-0 pt-0.5">
                                            <p className={`text-[11px] font-bold ${item.state === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>
                                                {item.title}
                                            </p>
                                            <p className="text-[9.5px] text-slate-400 mt-0.5">
                                                {item.actor} • {item.time}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900">Dokumen Pendukung</h3>
                            <span className="text-[9px] font-bold text-slate-400">{permit.documents.length} file</span>
                        </div>

                        <div className="mt-4 space-y-2.5">
                            {permit.documents.map((document) => {
                                const status = documentStatus[document.status];

                                return (
                                    <div
                                        key={document.name}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-rose-500 flex items-center justify-center shrink-0">
                                            <Icon name="file" className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10.5px] font-bold text-slate-700 truncate">{document.name}</p>
                                            <p className="text-[9px] text-slate-400 mt-0.5">{document.size} • PDF</p>
                                        </div>
                                        <span className={`text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${status.className}`}>
                                            {status.label}
                                        </span>
                                        <button
                                            type="button"
                                            className="p-1.5 rounded-lg text-slate-400 hover:bg-white hover:text-blue-600 transition-colors"
                                            aria-label={`Unduh ${document.name}`}
                                        >
                                            <Icon name="download" className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <aside className="space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Detail Kegiatan</h3>

                        <div className="mt-4 space-y-3.5">
                            {[
                                { icon: 'door', label: 'Ruangan', value: permit.room },
                                { icon: 'calendar', label: 'Tanggal', value: `${permit.day}, ${permit.date}` },
                                { icon: 'clock', label: 'Waktu', value: `${permit.time} WIB` },
                                { icon: 'users', label: 'Peserta', value: `${permit.participants} orang` },
                                { icon: 'building', label: 'Ormawa', value: permit.ormawa },
                                { icon: 'users', label: 'Penanggung jawab', value: permit.pic },
                                { icon: 'phone', label: 'Kontak', value: permit.phone },
                            ].map((detail) => (
                                <div key={detail.label} className="flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                                        <Icon name={detail.icon} className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-medium text-slate-400">{detail.label}</p>
                                        <p className="text-[10.5px] font-bold text-slate-700 leading-snug mt-0.5">
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Catatan Petugas</h3>
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                            <p className="text-[10.5px] text-slate-600 leading-relaxed">{permit.note}</p>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-2.5">
                            Terakhir diperbarui {permit.timeline[permit.timeline.length - 1].time}
                        </p>
                    </section>

                    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-600/15">
                        <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                            <Icon name="help" className="w-[18px] h-[18px]" />
                        </div>
                        <h3 className="text-xs font-bold mt-3">Ada pertanyaan?</h3>
                        <p className="text-[10px] text-blue-100 leading-relaxed mt-1.5">
                            Hubungi admin fakultas pada jam kerja 08.00 - 16.00 WIB untuk mempercepat proses.
                        </p>
                        <a
                            href="/guidelines"
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold mt-3 hover:gap-2.5 transition-all"
                        >
                            Lihat kontak admin
                            <Icon name="arrowRight" className="w-3.5 h-3.5" />
                        </a>
                    </section>
                </aside>
            </div>
        </RuangKitaLayout>
    );
}
