import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import ApprovalStepper from '@/Components/RuangKita/ApprovalStepper';
import { approvalStages } from '@/Data/ruangkita';

export default function PermitShow({ permit: serverPermit = {} }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === 'admin';

    const permit = serverPermit;
    const stageInfo = approvalStages.find((stage) => stage.key === permit.stage);
    const isApproved = permit.stage === 'approved';
    const isRevision = permit.stage === 'revision';
    const isRejected = permit.stage === 'rejected';

    const { data, setData, post, processing, reset } = useForm({
        action: 'approve',
        notes: '',
    });

    const [activeModal, setActiveModal] = useState(null);

    const handleActionClick = (actionType) => {
        setData('action', actionType);
        setActiveModal(actionType);
    };

    const submitReview = (e) => {
        e.preventDefault();
        post(route('admin.permits.review', permit.id), {
            onSuccess: () => {
                setActiveModal(null);
                reset('notes');
            },
        });
    };

    const timelineItems = permit.histories?.length > 0
        ? permit.histories.map((h) => ({
            title: h.action === 'approved'
                ? 'Pengajuan Disetujui'
                : h.action === 'revision_requested'
                    ? 'Catatan Revisi Diterbitkan'
                    : h.action === 'rejected'
                        ? 'Pengajuan Ditolak'
                        : 'Verifikasi Lolos',
            actor: h.actor,
            time: h.time,
            state: 'done',
            notes: h.notes,
        }))
        : (permit.timeline ?? [
            { title: 'Pengajuan Dikirim', actor: permit.pic ?? 'Ormawa', time: permit.submittedAt ?? '1 hari lalu', state: 'done' },
        ]);

    return (
        <RuangKitaLayout activeTab="permits" title="Detail Pengajuan">
            <div className="flex items-center justify-between gap-3">
                <a
                    href="/permits"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <Icon name="arrowLeft" className="w-3.5 h-3.5" />
                    Kembali ke Tracking Izin
                </a>

                {isAdmin && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-bold border border-blue-100">
                        <Icon name="shield" className="w-3.5 h-3.5 text-blue-600" />
                        Mode Verifikator Admin Kemahasiswaan
                    </span>
                )}
            </div>

            {/* Header section */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                isRevision || isRejected
                                    ? 'bg-rose-50 text-rose-600'
                                    : isApproved
                                      ? 'bg-emerald-50 text-emerald-600'
                                      : 'bg-blue-50 text-blue-600'
                            }`}
                        >
                            <Icon name={isRevision || isRejected ? 'alert' : 'file'} className="w-6 h-6" />
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
                        {isApproved && (
                            <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 text-white text-[10.5px] font-bold hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <Icon name="download" className="w-3.5 h-3.5" />
                                Unduh Surat Izin
                            </button>
                        )}
                        <a
                            href="/guidelines"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-[10.5px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <Icon name="help" className="w-3.5 h-3.5" />
                            Bantuan
                        </a>
                    </div>
                </div>

                {/* Admin Action Panel */}
                {isAdmin && (
                    <div className="mt-5 pt-5 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 md:-mx-6 md:-mb-6 p-5 md:p-6 rounded-b-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                            <div>
                                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                    <Icon name="fileCheck" className="w-4 h-4 text-blue-600" />
                                    Tindakan Verifikasi Berkas (Admin Kemahasiswaan)
                                </h4>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Putuskan kelayakan peminjaman ruangan dan kelengkapan dokumen ormawa.
                                </p>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">
                                Status saat ini: <span className="uppercase text-blue-600 font-black">{permit.stage}</span>
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => handleActionClick('approve')}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 active:scale-[0.98] transition-all"
                            >
                                <Icon name="check" className="w-4 h-4" />
                                {permit.stage === 'leadership' ? 'Setujui Final' : 'Loloskan Verifikasi Admin'}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleActionClick('revision')}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm shadow-amber-500/20 active:scale-[0.98] transition-all"
                            >
                                <Icon name="alert" className="w-4 h-4" />
                                Minta Revisi Berkas
                            </button>

                            <button
                                type="button"
                                onClick={() => handleActionClick('reject')}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-sm shadow-rose-500/20 active:scale-[0.98] transition-all"
                            >
                                <Icon name="x" className="w-4 h-4" />
                                Tolak Pengajuan
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2 space-y-5">
                    {/* Stepper progress */}
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
                                isRevision || isRejected
                                    ? 'bg-rose-50 border-rose-200'
                                    : isApproved
                                      ? 'bg-emerald-50 border-emerald-200'
                                      : 'bg-blue-50/60 border-blue-100'
                            }`}
                        >
                            <Icon
                                name={isRevision || isRejected ? 'warning' : isApproved ? 'check' : 'info'}
                                className={`w-4 h-4 mt-0.5 shrink-0 ${
                                    isRevision || isRejected ? 'text-rose-500' : isApproved ? 'text-emerald-600' : 'text-blue-600'
                                }`}
                            />
                            <div>
                                <p
                                    className={`text-[11px] font-bold ${
                                        isRevision || isRejected ? 'text-rose-700' : isApproved ? 'text-emerald-800' : 'text-blue-800'
                                    }`}
                                >
                                    {isRevision ? 'Pengajuan memerlukan revisi' : isRejected ? 'Pengajuan ditolak' : isApproved ? 'Izin telah disetujui' : stageInfo?.title ?? 'Sedang diproses'}
                                </p>
                                <p
                                    className={`text-[10px] leading-relaxed mt-0.5 ${
                                        isRevision || isRejected ? 'text-rose-600' : isApproved ? 'text-emerald-700' : 'text-blue-700'
                                    }`}
                                >
                                    {permit.adminNotes || (isApproved ? 'Surat izin resmi sudah dapat diunduh.' : 'Berkas sedang dalam antrean verifikasi.')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Timeline history */}
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <h3 className="text-sm font-bold text-slate-900">Riwayat Proses & Catatan Verifikator</h3>
                        <div className="mt-5 space-y-4">
                            {timelineItems.map((item, index) => (
                                <div key={index} className="flex gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <Icon name="checkSmall" className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-[11.5px] font-bold text-slate-800">{item.title}</p>
                                            <span className="text-[9.5px] text-slate-400">{item.time}</span>
                                        </div>
                                        <p className="text-[10px] text-blue-600 font-semibold">{item.actor}</p>
                                        {item.notes && (
                                            <p className="text-[10.5px] text-slate-500 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                                {item.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Supporting documents */}
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-900">Dokumen Pendukung</h3>
                            <span className="text-[9px] font-bold text-slate-400">2 berkas wajib</span>
                        </div>

                        <div className="space-y-2.5">
                            {[
                                { name: permit.proposalName || 'Proposal_Kegiatan.pdf', desc: 'Proposal Kegiatan • Format PDF' },
                                { name: permit.letterName || 'Surat_Permohonan.pdf', desc: 'Surat Permohonan Ruangan • Ditandatangani' },
                            ].map((doc) => (
                                <div
                                    key={doc.name}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-rose-500 flex items-center justify-center shrink-0">
                                        <Icon name="file" className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold text-slate-700 truncate">{doc.name}</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">{doc.desc}</p>
                                    </div>
                                    <span className="text-[9.5px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                        Tersedia
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right side info */}
                <aside className="space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Detail Kegiatan</h3>

                        <div className="mt-4 space-y-3.5">
                            {[
                                { icon: 'door', label: 'Ruangan', value: permit.room },
                                { icon: 'calendar', label: 'Tanggal', value: permit.date },
                                { icon: 'clock', label: 'Waktu', value: `${permit.time} WIB` },
                                { icon: 'users', label: 'Peserta', value: `${permit.participants || 40} orang` },
                                { icon: 'building', label: 'Ormawa', value: permit.ormawa },
                                { icon: 'user', label: 'Penanggung Jawab', value: permit.pic },
                                { icon: 'phone', label: 'Kontak', value: permit.phone || '-' },
                            ].map((detail) => (
                                <div key={detail.label} className="flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
                                        <Icon name={detail.icon} className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-medium text-slate-400">{detail.label}</p>
                                        <p className="text-[11px] font-bold text-slate-700 leading-snug mt-0.5">
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {permit.notes && (
                        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <h3 className="text-sm font-bold text-slate-900">Catatan Kebutuhan Ruangan</h3>
                            <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-[10.5px] text-slate-600 leading-relaxed">{permit.notes}</p>
                            </div>
                        </section>
                    )}
                </aside>
            </div>

            {/* Admin Action Confirmation Modal */}
            {activeModal && (
                <div className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-left relative">
                        <button
                            type="button"
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                            <Icon name="x" className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    activeModal === 'approve'
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : activeModal === 'revision'
                                            ? 'bg-amber-50 text-amber-600'
                                            : 'bg-rose-50 text-rose-600'
                                }`}
                            >
                                <Icon
                                    name={activeModal === 'approve' ? 'check' : activeModal === 'revision' ? 'alert' : 'x'}
                                    className="w-5 h-5"
                                />
                            </div>
                            <div>
                                <h3 className="text-base font-extrabold text-slate-900">
                                    {activeModal === 'approve'
                                        ? 'Setujui Pengajuan'
                                        : activeModal === 'revision'
                                            ? 'Minta Revisi Dokumen'
                                            : 'Tolak Pengajuan'}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{permit.id}</p>
                            </div>
                        </div>

                        <form onSubmit={submitReview} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Catatan Verifikator untuk Ormawa
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder={
                                        activeModal === 'approve'
                                            ? 'Berkas lengkap dan sesuai ketentuan.'
                                            : activeModal === 'revision'
                                                ? 'Tuliskan poin yang wajib diperbaiki ormawa...'
                                                : 'Alasan penolakan pengajuan...'
                                    }
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveModal(null)}
                                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md disabled:opacity-50 ${
                                        activeModal === 'approve'
                                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                                            : activeModal === 'revision'
                                                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                                                : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20'
                                    }`}
                                >
                                    Konfirmasi Tindakan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </RuangKitaLayout>
    );
}
