import React, { useState } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import StatusBadge from '@/Components/RuangKita/StatusBadge';
import { permits } from '@/Data/ruangkita';

export default function Revisions() {
    const revisionPermit = permits.find((permit) => permit.stage === 'revision') ?? permits[0];
    const [file, setFile] = useState('');
    const [note, setNote] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            return;
        }

        setSubmitted(true);
    };

    return (
        <RuangKitaLayout activeTab="revisions">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Catatan Revisi</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Tindak lanjuti catatan petugas agar pengajuan dapat diproses kembali.
                </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <Icon name="alert" className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                        <p className="text-[11.5px] font-bold text-rose-700">1 pengajuan memerlukan revisi</p>
                        <p className="text-[10px] text-rose-600 mt-0.5">
                            Batas pengajuan ulang: <span className="font-bold">26 Nov 2026</span>. Setelah itu slot
                            ruangan akan dilepas.
                        </p>
                    </div>
                </div>
                <a
                    href={`/permits/${revisionPermit.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-[10.5px] font-bold text-rose-600 hover:bg-rose-100/50 transition-colors shrink-0"
                >
                    Lihat Pengajuan
                    <Icon name="arrowRight" className="w-3.5 h-3.5" />
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2 space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                    <Icon name="file" className="w-[18px] h-[18px]" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
                                        {revisionPermit.event}
                                    </h2>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        {revisionPermit.id} • {revisionPermit.ormawa}
                                    </p>
                                </div>
                            </div>
                            <StatusBadge stage={revisionPermit.stage} />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            {[
                                { label: 'Ruangan', value: revisionPermit.room },
                                { label: 'Tanggal', value: revisionPermit.date },
                                { label: 'Waktu', value: revisionPermit.time },
                                { label: 'Peserta', value: `${revisionPermit.participants} orang` },
                            ].map((item) => (
                                <div key={item.label}>
                                    <p className="text-[9px] font-medium text-slate-400">{item.label}</p>
                                    <p className="text-[10.5px] font-bold text-slate-700 mt-0.5 leading-snug">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <h3 className="text-[11px] font-bold text-slate-700">Catatan dari Admin Fakultas</h3>
                            <div className="mt-2 p-4 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-2.5">
                                <Icon name="info" className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                                <p className="text-[10.5px] text-rose-700 leading-relaxed">{revisionPermit.note}</p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h3 className="text-[11px] font-bold text-slate-700">Yang harus diperbaiki</h3>
                            <div className="mt-2 space-y-2.5">
                                {(revisionPermit.revisionItems ?? []).map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 bg-white"
                                    >
                                        <span className="w-4 h-4 rounded-full border-2 border-rose-300 flex items-center justify-center shrink-0 mt-0.5" />
                                        <p className="text-[10.5px] text-slate-600 leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100">
                            <h3 className="text-[11px] font-bold text-slate-700 mb-2.5">Status dokumen</h3>
                            <div className="space-y-2">
                                {revisionPermit.documents.map((document) => (
                                    <div key={document.name} className="flex items-center justify-between gap-3">
                                        <span className="flex items-center gap-2 text-[10px] font-medium text-slate-600 min-w-0">
                                            <Icon name="file" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span className="truncate">{document.name}</span>
                                        </span>
                                        <span
                                            className={`text-[9px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                                document.status === 'revision'
                                                    ? 'bg-rose-50 text-rose-600'
                                                    : 'bg-emerald-50 text-emerald-600'
                                            }`}
                                        >
                                            {document.status === 'revision' ? 'Perlu revisi' : 'OK'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Riwayat Revisi Lainnya</h3>
                        <div className="mt-3 divide-y divide-slate-50">
                            {[
                                { event: 'Seminar Nasional Teknologi Pendidikan', date: '12 Nov 2026', status: 'Selesai' },
                                { event: 'Rapat Kerja Divisi Kreatif', date: '15 Nov 2026', status: 'Selesai' },
                            ].map((item) => (
                                <div key={item.event} className="flex items-center justify-between gap-3 py-3">
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-700">{item.event}</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">{item.date}</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="lg:sticky lg:top-24">
                    {submitted ? (
                        <section className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                                <Icon name="check" className="w-7 h-7" />
                            </div>
                            <h3 className="text-sm font-extrabold text-slate-900 mt-3">Revisi terkirim!</h3>
                            <p className="text-[10.5px] text-slate-500 leading-relaxed mt-1.5">
                                Dokumen perbaikan sudah dikirim ke admin fakultas. Status akan diperbarui setelah
                                verifikasi ulang.
                            </p>
                            <a
                                href={`/permits/${revisionPermit.id}`}
                                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors"
                            >
                                Pantau Status
                                <Icon name="arrowRight" className="w-3.5 h-3.5" />
                            </a>
                        </section>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <h3 className="text-sm font-bold text-slate-900">Kirim Perbaikan</h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                                Unggah dokumen yang sudah diperbaiki.
                            </p>

                            <div className="mt-4">
                                <label className="block text-[10.5px] font-semibold text-slate-600 mb-1.5">
                                    Surat permohonan (revisi)
                                </label>
                                <input
                                    id="revision-file"
                                    type="file"
                                    className="sr-only"
                                    accept=".pdf"
                                    onChange={(event) => setFile(event.target.files?.[0]?.name ?? '')}
                                />
                                <label
                                    htmlFor="revision-file"
                                    className={`flex items-center gap-2.5 p-3 rounded-xl border border-dashed cursor-pointer transition-colors ${
                                        file
                                            ? 'border-emerald-300 bg-emerald-50/50'
                                            : 'border-slate-200 bg-slate-50/60 hover:border-blue-300 hover:bg-blue-50/40'
                                    }`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                            file ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 border border-slate-200'
                                        }`}
                                    >
                                        <Icon name={file ? 'check' : 'upload'} className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10.5px] font-bold text-slate-700 truncate">
                                            {file || 'Pilih file PDF'}
                                        </p>
                                        <p className="text-[9px] text-slate-400">
                                            {file ? 'Klik untuk mengganti' : 'Maksimal 5 MB'}
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <div className="mt-3">
                                <label className="block text-[10.5px] font-semibold text-slate-600 mb-1.5">
                                    Catatan untuk admin (opsional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                    placeholder="Jelaskan perubahan yang sudah dilakukan..."
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10.5px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none placeholder:text-slate-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!file}
                                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <Icon name="send" className="w-3.5 h-3.5" />
                                Kirim Revisi
                            </button>
                            <p className="text-[9px] text-slate-400 text-center mt-2">
                                Pengajuan kembali ke tahap verifikasi admin.
                            </p>
                        </form>
                    )}

                    <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
                        <Icon name="clock" className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-[9.5px] text-amber-700 leading-relaxed">
                            Revisi yang dikirim setelah pukul 15.00 WIB akan diverifikasi pada hari kerja berikutnya.
                        </p>
                    </div>
                </aside>
            </div>
        </RuangKitaLayout>
    );
}
