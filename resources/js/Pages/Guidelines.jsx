import React, { useState } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { faqs } from '@/Data/ruangkita';

const steps = [
    { title: 'Cek ketersediaan', description: 'Buka kalender live dan pilih slot yang tidak bentrok dengan jadwal lain.' },
    { title: 'Isi formulir digital', description: 'Lengkapi data kegiatan, ruangan, jadwal, dan jumlah peserta.' },
    { title: 'Unggah dokumen', description: 'Lampirkan proposal serta surat permohonan yang sudah ditandatangani.' },
    { title: 'Pantau persetujuan', description: 'Ikuti progres verifikasi admin hingga surat izin diterbitkan.' },
];

const rules = [
    'Pengajuan dilakukan paling lambat 3 hari kerja sebelum kegiatan.',
    'Ruangan hanya digunakan sesuai jadwal yang disetujui.',
    'Penanggung jawab wajib hadir dan menjaga ketertiban selama kegiatan.',
    'Fasilitas yang rusak akibat kelalaian menjadi tanggung jawab ormawa.',
    'Kebersihan ruangan wajib dikembalikan seperti semula setelah kegiatan.',
    'Pembatalan diajukan paling lambat 2 hari kerja sebelum jadwal.',
];

export default function Guidelines() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <RuangKitaLayout activeTab="guidelines">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tata Tertib & Panduan</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Pahami alur, dokumen, dan aturan penggunaan ruangan fakultas.
                </p>
            </div>

            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-7 text-white shadow-lg shadow-blue-600/15">
                <div className="absolute -right-8 -top-10 w-44 h-44 rounded-full bg-white/10" />
                <div className="absolute right-24 -bottom-14 w-32 h-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="max-w-xl">
                        <h2 className="text-xl md:text-2xl font-extrabold mt-2.5 leading-tight">
                            Empat langkah, izin ruangan tanpa antre.
                        </h2>
                        <p className="text-[11.5px] text-blue-100/90 leading-relaxed mt-1.5">
                            Semua proses dilakukan online. Tidak perlu lagi mengunjungi beberapa kantor hanya untuk
                            memeriksa status tanda tangan.
                        </p>
                    </div>
                    <a
                        href="/bookings/create"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors shrink-0"
                    >
                        <Icon name="plus" className="w-4 h-4" />
                        Mulai Pengajuan
                    </a>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {steps.map((step, index) => (
                    <div key={step.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative">
                        <span className="absolute top-4 right-4 text-2xl font-extrabold text-slate-100">
                            0{index + 1}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Icon name={['calendar', 'file', 'upload', 'clock'][index]} className="w-[18px] h-[18px]" />
                        </div>
                        <h3 className="text-[11.5px] font-bold text-slate-800 mt-3">{step.title}</h3>
                        <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{step.description}</p>
                    </div>
                ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2 space-y-5">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <h3 className="text-sm font-bold text-slate-900">Dokumen Wajib</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Pastikan seluruh dokumen berformat PDF dan terbaca jelas.</p>

                        <div className="mt-4 space-y-2.5">
                            {[
                                { title: 'Proposal kegiatan', desc: 'Memuat latar belakang, tujuan, rundown, dan kebutuhan fasilitas.', required: true },
                                { title: 'Surat permohonan ruangan', desc: 'Ditandatangani ketua ormawa dan dosen pembimbing.', required: true },
                                { title: 'Rundown kegiatan', desc: 'Rincian waktu dan penanggung jawab setiap sesi.', required: false },
                                { title: 'Surat izin keramaian', desc: 'Diperlukan untuk kegiatan dengan peserta di atas 100 orang.', required: false },
                            ].map((document) => (
                                <div key={document.title} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/40">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-rose-500 flex items-center justify-center shrink-0">
                                        <Icon name="file" className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold text-slate-700">{document.title}</p>
                                        <p className="text-[9.5px] text-slate-400 leading-relaxed mt-0.5">{document.desc}</p>
                                    </div>
                                    <span
                                        className={`text-[8.5px] font-bold px-2 py-1 rounded-md shrink-0 ${
                                            document.required
                                                ? 'bg-rose-50 text-rose-600'
                                                : 'bg-slate-100 text-slate-500'
                                        }`}
                                    >
                                        {document.required ? 'Wajib' : 'Kondisional'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <h3 className="text-sm font-bold text-slate-900">Tata Tertib Ruangan</h3>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {rules.map((rule) => (
                                <div key={rule} className="flex items-start gap-2 p-2.5">
                                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon name="checkSmall" className="w-2.5 h-2.5" strokeWidth={3} />
                                    </span>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                        <h3 className="text-sm font-bold text-slate-900">Pertanyaan Umum</h3>
                        <div className="mt-3 divide-y divide-slate-100">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div key={faq.question}>
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                            className="w-full flex items-center justify-between gap-3 py-3 text-left"
                                        >
                                            <span className={`text-[11px] font-bold ${isOpen ? 'text-blue-600' : 'text-slate-700'}`}>
                                                {faq.question}
                                            </span>
                                            <Icon
                                                name="chevronDown"
                                                className={`w-3.5 h-3.5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <p className="text-[10px] text-slate-500 leading-relaxed pb-3 pr-8">{faq.answer}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <aside className="space-y-5 lg:sticky lg:top-24">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Kontak Admin Fakultas</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Senin - Jumat, 08.00 - 16.00 WIB</p>

                        <div className="mt-4 space-y-2.5">
                            {[
                                { icon: 'building', label: 'Lokasi', value: 'Gedung A, Lantai 1, Ruang Administrasi' },
                                { icon: 'phone', label: 'Telepon', value: '(0341) 555-0123' },
                                { icon: 'mail', label: 'Email', value: 'ruangkita@ub.ac.id' },
                            ].map((contact) => (
                                <div key={contact.label} className="flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <Icon name={contact.icon} className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-medium text-slate-400">{contact.label}</p>
                                        <p className="text-[10.5px] font-bold text-slate-700 leading-snug mt-0.5">
                                            {contact.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 text-[10.5px] font-bold hover:bg-blue-100 transition-colors"
                        >
                            <Icon name="mail" className="w-3.5 h-3.5" />
                            Hubungi Admin
                        </button>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-slate-900">Jam Operasional Ruangan</h3>
                        <div className="mt-3 space-y-2">
                            {[
                                { day: 'Senin - Jumat', time: '07.00 - 21.00' },
                                { day: 'Sabtu', time: '08.00 - 20.00' },
                                { day: 'Minggu', time: '09.00 - 17.00' },
                            ].map((schedule) => (
                                <div key={schedule.day} className="flex items-center justify-between text-[10px]">
                                    <span className="text-slate-500">{schedule.day}</span>
                                    <span className="font-bold text-slate-700">{schedule.time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2">
                            <Icon name="info" className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-[9px] text-amber-700 leading-relaxed">
                                Penggunaan di luar jam operasional memerlukan izin khusus dari pimpinan fakultas.
                            </p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white">
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                            <Icon name="graduation" className="w-[18px] h-[18px]" />
                        </div>
                        <h3 className="text-xs font-bold mt-3">RuangKita v1.0</h3>
                        <p className="text-[10px] text-slate-300 leading-relaxed mt-1.5">
                            Dikembangkan oleh Tim Yakusa untuk Case 1: Smarter Campus and Learning.
                        </p>
                        <p className="text-[9px] text-slate-400 mt-2">Universitas Brawijaya • 2026</p>
                    </section>
                </aside>
            </div>
        </RuangKitaLayout>
    );
}
