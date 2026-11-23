import React, { useMemo, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import ApprovalStepper from '@/Components/RuangKita/ApprovalStepper';
import { rooms } from '@/Data/ruangkita';

const ormawaOptions = [
    'HMPSTI — Himpunan Mahasiswa Program Studi Teknologi Informasi',
    'HMPD / HMPDG — Himpunan Mahasiswa Program Studi Desain Grafis',
    'HIMA Administrasi Bisnis — Himpunan Mahasiswa Program Studi D-III Administrasi Bisnis',
    'HIMA Keuangan dan Perbankan — Himpunan Mahasiswa Program Studi D-III Keuangan dan Perbankan',
    'HIMA Manajemen Perhotelan — Himpunan Mahasiswa Program Studi D-IV Manajemen Perhotelan',
    'Badan Eksekutif Mahasiswa (BEM) Vokasi UB',
];

function formatDate(isoDate) {
    if (!isoDate) {
        return '-';
    }

    return new Date(`${isoDate}T00:00:00`).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function Field({ label, children, hint, className = '' }) {
    return (
        <div className={className}>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">{label}</label>
            {children}
            {hint && <p className="text-[9.5px] text-slate-400 mt-1">{hint}</p>}
        </div>
    );
}

const inputClass =
    'w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11.5px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400';

function UploadBox({ id, title, description, fileName, onFileChange }) {
    return (
        <div className="relative">
            <input
                id={id}
                type="file"
                className="sr-only"
                accept=".pdf,.doc,.docx"
                onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? '')}
            />
            <label
                htmlFor={id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border border-dashed cursor-pointer transition-colors ${
                    fileName
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : 'border-slate-200 bg-slate-50/60 hover:border-blue-300 hover:bg-blue-50/40'
                }`}
            >
                <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        fileName ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                >
                    <Icon name={fileName ? 'check' : 'upload'} className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-700 truncate">{fileName || title}</p>
                    <p className="text-[9.5px] text-slate-400 truncate">{fileName ? 'Klik untuk mengganti file' : description}</p>
                </div>
            </label>
        </div>
    );
}

export default function BookingCreate({ existingBookings = [], preselectedRoomId = null, minDate = null }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [form, setForm] = useState({
        event: '',
        ormawa: ormawaOptions[0],
        pic: user?.name ?? '',
        phone: '',
        roomId: String(preselectedRoomId || '1'),
        date: '',
        start: '08:00',
        end: '12:00',
        participants: '30',
        notes: '',
    });

    const [proposalFile, setProposalFile] = useState('');
    const [letterFile, setLetterFile] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [submitted] = useState(null);
    const [loading, setLoading] = useState(false);

    const update = (field) => (event) => {
        setForm((current) => ({ ...current, [field]: event.target.value }));
    };

    const selectedRoom = rooms.find((room) => room.id === Number(form.roomId));

    const conflict = useMemo(() => {
        if (!form.date || !form.start || !form.end) {
            return null;
        }

        return existingBookings.find((permit) => {
            if (permit.roomId !== Number(form.roomId) || permit.isoDate !== form.date) {
                return false;
            }

            if (permit.stage === 'revision' || permit.stage === 'rejected') {
                return false;
            }

            return form.start < permit.end && form.end > permit.start;
        });
    }, [form.roomId, form.date, form.start, form.end, existingBookings]);

    const duration = useMemo(() => {
        const [startHour, startMinute] = form.start.split(':').map(Number);
        const [endHour, endMinute] = form.end.split(':').map(Number);

        return ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / 60;
    }, [form.start, form.end]);

    const isValidDuration = duration > 0;
    const canSubmit = Boolean(form.event && form.pic && proposalFile && letterFile && agreed && !conflict && isValidDuration);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!canSubmit || loading) {
            return;
        }

        setLoading(true);

        router.post('/bookings', {
            event: form.event,
            ormawa: form.ormawa,
            pic: form.pic,
            phone: form.phone,
            roomId: form.roomId,
            roomName: selectedRoom?.name ?? 'Auditorium Gedung A',
            date: form.date,
            start: form.start,
            end: form.end,
            participants: form.participants,
            notes: form.notes,
            proposalFile: proposalFile,
            letterFile: letterFile,
        }, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <RuangKitaLayout activeTab="booking">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Pengajuan Ruangan Baru</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Lengkapi formulir, unggah dokumen, dan pantau persetujuan dalam satu alur.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-slate-500 bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-sm">
                    <Icon name="shield" className="w-3.5 h-3.5 text-emerald-500" />
                    Pengecekan bentrok otomatis aktif
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2 space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Icon name="file" className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Informasi Kegiatan</h3>
                                <p className="text-[10px] text-slate-400">Data ini akan tampil pada surat izin.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Nama kegiatan" className="sm:col-span-2">
                                <input
                                    type="text"
                                    value={form.event}
                                    onChange={update('event')}
                                    className={inputClass}
                                    placeholder="Contoh: Workshop Desain UI/UX"
                                    required
                                />
                            </Field>

                            <Field label="Organisasi mahasiswa">
                                <select value={form.ormawa} onChange={update('ormawa')} className={inputClass}>
                                    {ormawaOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Jumlah peserta">
                                <input
                                    type="number"
                                    min="1"
                                    value={form.participants}
                                    onChange={update('participants')}
                                    className={inputClass}
                                />
                            </Field>

                            <Field label="Penanggung jawab">
                                <input type="text" value={form.pic} onChange={update('pic')} className={inputClass} required />
                            </Field>

                            <Field label="Nomor WhatsApp">
                                <input type="tel" value={form.phone} onChange={update('phone')} className={inputClass} />
                            </Field>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                                <Icon name="calendar" className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Jadwal & Ruangan</h3>
                                <p className="text-[10px] text-slate-400">Sistem akan memeriksa bentrok jadwal secara langsung.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Ruangan" className="sm:col-span-2">
                                <select value={form.roomId} onChange={update('roomId')} className={inputClass}>
                                    {rooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.name} • {room.capacity} orang
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Tanggal kegiatan">
                                <input
                                    type="date"
                                    min={minDate || new Date().toISOString().split('T')[0]}
                                    value={form.date}
                                    onChange={update('date')}
                                    className={inputClass}
                                    required
                                />
                            </Field>

                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Mulai">
                                    <input type="time" value={form.start} onChange={update('start')} className={inputClass} required />
                                </Field>
                                <Field label="Selesai">
                                    <input type="time" value={form.end} onChange={update('end')} className={inputClass} required />
                                </Field>
                            </div>

                            <Field label="Catatan kebutuhan ruangan" className="sm:col-span-2">
                                <textarea
                                    rows={3}
                                    value={form.notes}
                                    onChange={update('notes')}
                                    className={`${inputClass} resize-none`}
                                    placeholder="Contoh: butuh 2 proyektor, sound system, dan meja registrasi."
                                />
                            </Field>
                        </div>

                        {conflict && (
                            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                                <Icon name="warning" className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[11px] font-bold text-rose-700">Jadwal bentrok dengan pengajuan lain</p>
                                    <p className="text-[10px] text-rose-600 mt-0.5 leading-relaxed">
                                        {conflict.event} ({conflict.time}) sudah memakai {conflict.room}. Pilih slot atau
                                        ruangan lain.
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Icon name="upload" className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Dokumen Pendukung</h3>
                                <p className="text-[10px] text-slate-400">Format PDF, maksimal 5 MB per dokumen.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <UploadBox
                                id="proposal"
                                title="Proposal kegiatan"
                                description="Wajib • PDF maks. 5 MB"
                                fileName={proposalFile}
                                onFileChange={setProposalFile}
                            />
                            <UploadBox
                                id="letter"
                                title="Surat permohonan ruangan"
                                description="Wajib • sudah ditandatangani"
                                fileName={letterFile}
                                onFileChange={setLetterFile}
                            />
                        </div>

                        <label className="flex items-start gap-2.5 mt-4 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(event) => setAgreed(event.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                            />
                            <span className="text-[10px] text-slate-500 leading-relaxed">
                                Saya menyatakan data dan dokumen yang diunggah benar, serta menyetujui tata tertib
                                penggunaan ruangan fakultas.
                            </span>
                        </label>
                    </section>
                </div>

                <aside className="lg:sticky lg:top-24 space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Ringkasan Pengajuan</h3>

                        <div className="mt-4 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-[10px] font-medium text-slate-400">Ruangan</span>
                                <span className="text-[10.5px] font-bold text-slate-700 text-right">{selectedRoom?.name}</span>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-[10px] font-medium text-slate-400">Tanggal</span>
                                <span className="text-[10.5px] font-bold text-slate-700">{formatDate(form.date)}</span>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-[10px] font-medium text-slate-400">Waktu</span>
                                <span className="text-[10.5px] font-bold text-slate-700">
                                    {form.start} - {form.end} ({duration > 0 ? duration : 0} jam)
                                </span>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-[10px] font-medium text-slate-400">Peserta</span>
                                <span className="text-[10.5px] font-bold text-slate-700">{form.participants} orang</span>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <span className="text-[10px] font-medium text-slate-400">Dokumen</span>
                                <span className="text-[10.5px] font-bold text-slate-700">
                                    {(proposalFile ? 1 : 0) + (letterFile ? 1 : 0)} dari 2
                                </span>
                            </div>
                        </div>

                        <div
                            className={`mt-4 p-3 rounded-xl border flex items-start gap-2 ${
                                conflict
                                    ? 'bg-rose-50 border-rose-200'
                                    : isValidDuration
                                      ? 'bg-emerald-50 border-emerald-200'
                                      : 'bg-amber-50 border-amber-200'
                            }`}
                        >
                            <Icon
                                name={conflict ? 'warning' : isValidDuration ? 'check' : 'info'}
                                className={`w-4 h-4 mt-0.5 shrink-0 ${
                                    conflict ? 'text-rose-500' : isValidDuration ? 'text-emerald-600' : 'text-amber-500'
                                }`}
                            />
                            <div>
                                <p
                                    className={`text-[10.5px] font-bold ${
                                        conflict ? 'text-rose-700' : isValidDuration ? 'text-emerald-800' : 'text-amber-700'
                                    }`}
                                >
                                    {conflict ? 'Slot tidak tersedia' : isValidDuration ? 'Slot tersedia' : 'Periksa jam kegiatan'}
                                </p>
                                <p
                                    className={`text-[9.5px] mt-0.5 leading-snug ${
                                        conflict ? 'text-rose-600' : isValidDuration ? 'text-emerald-700' : 'text-amber-600'
                                    }`}
                                >
                                    {conflict
                                        ? 'Pilih waktu atau ruangan lain sebelum mengirim.'
                                        : isValidDuration
                                          ? 'Tidak ada bentrok dengan jadwal yang sudah disetujui.'
                                          : 'Jam selesai harus lebih besar dari jam mulai.'}
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!canSubmit || loading}
                            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-[11.5px] font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            <Icon name="send" className="w-4 h-4" />
                            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
                        </button>
                        <p className="text-[9px] text-slate-400 text-center mt-2">
                            Dengan mengirim, pengajuan masuk ke tahap verifikasi admin.
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-900">Alur Persetujuan</h3>
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                                4 tahap
                            </span>
                        </div>
                        <ApprovalStepper stage="submitted" compact />
                        <div className="mt-4 space-y-2">
                            {[
                                { icon: 'clipboard', text: 'Admin memverifikasi dokumen & jadwal' },
                                { icon: 'pen', text: 'Pimpinan menandatangani izin' },
                                { icon: 'download', text: 'Surat izin dapat diunduh' },
                            ].map((step) => (
                                <div key={step.text} className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <Icon name={step.icon} className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </form>

            {submitted && (
                <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 text-center relative">
                        <button
                            type="button"
                            onClick={() => setSubmitted(null)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                            aria-label="Tutup"
                        >
                            <Icon name="x" className="w-4 h-4" />
                        </button>

                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                            <Icon name="check" className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mt-4">Pengajuan berhasil dikirim!</h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5">
                            Pengajuan <span className="font-bold text-slate-700">{submitted.id}</span> sudah masuk ke
                            tahap verifikasi admin fakultas.
                        </p>

                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2">
                            <div className="flex justify-between gap-3">
                                <span className="text-[10px] text-slate-400">Kegiatan</span>
                                <span className="text-[10px] font-bold text-slate-700 text-right">{submitted.event}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-[10px] text-slate-400">Ruangan</span>
                                <span className="text-[10px] font-bold text-slate-700 text-right">{submitted.room}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-[10px] text-slate-400">Jadwal</span>
                                <span className="text-[10px] font-bold text-slate-700 text-right">
                                    {submitted.date} • {submitted.time}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-5">
                            <a
                                href="/permits"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors"
                            >
                                Lacak Izin
                                <Icon name="arrowRight" className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="/dashboard"
                                className="flex-1 inline-flex items-center justify-center py-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Ke Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </RuangKitaLayout>
    );
}
