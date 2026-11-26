import React from 'react';
import { Link } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';

const termsSections = [
    {
        number: '01',
        title: 'Ketentuan Akun & Akses Mahasiswa',
        points: [
            'Pengguna wajib mendaftar menggunakan email resmi Universitas Brawijaya (@student.ub.ac.id) serta mencantumkan Nama Lengkap dan NIM yang valid.',
            'Setiap akun bertanggung jawab penuh atas seluruh pengajuan peminjaman ruangan yang dibuat melalui akun tersebut.',
            'Dilarang meminjamkan atau membagikan akses akun kepada pihak lain di luar kepengurusan atau penanggung jawab kegiatan resmi.',
        ],
    },
    {
        number: '02',
        title: 'Aturan Pengajuan & Peminjaman Ruangan',
        points: [
            'Setiap pengajuan wajib melampirkan berkas pendukung yang dipersyaratkan (proposal kegiatan dan surat permohonan ruangan).',
            'Sistem menerapkan validasi bentrok jadwal otomatis; pengajuan pada waktu dan ruangan yang sudah terisi tidak dapat diproses.',
            'Peminjam wajib menjaga kebersihan, ketertiban, serta keutuhan fasilitas ruangan selama dan setelah kegiatan berlangsung.',
        ],
    },
    {
        number: '03',
        title: 'Proses Verifikasi, Revisi & Pembatalan',
        points: [
            'Seluruh pengajuan akan melewati tahapan verifikasi oleh Admin dan persetujuan akhir dari Wakil Dekan III.',
            'Jika berkas dikembalikan dengan status Perlu Revisi, peminjam wajib segera memperbaiki dokumen agar jadwal tidak dibatalkan.',
            'Pembatalan kegiatan wajib dilaporkan sebelum tanggal pelaksanaan agar ruangan dapat digunakan oleh organisasi mahasiswa lainnya.',
        ],
    },
];

const privacySections = [
    {
        icon: 'user',
        title: 'Data yang Kami Kumpulkan',
        desc: 'RuangKita mengumpulkan data identitas dasar berupa Nama Lengkap, NIM, alamat email kampus (@student.ub.ac.id), serta informasi kegiatan dan dokumen proposal yang Anda unggah untuk keperluan administrasi peminjaman ruangan.',
    },
    {
        icon: 'shield',
        title: 'Penggunaan & Keamanan Data',
        desc: 'Seluruh data digunakan secara eksklusif untuk proses verifikasi izin, pencatatan jadwal kampus, dan penerbitan surat izin resmi. Kata sandi disimpan dalam bentuk terenkripsi (hash) dan data Anda tidak pernah dibagikan kepada pihak ketiga di luar lingkungan kampus.',
    },
    {
        icon: 'fileCheck',
        title: 'Hak Pengguna & Penghapusan Akun',
        desc: 'Anda dapat memperbarui informasi profil, mengubah kata sandi, maupun menghapus akun secara permanen kapan saja melalui halaman Profil Saya.',
    },
];

export default function TermsPrivacy() {
    return (
        <RuangKitaLayout activeTab="terms" title="Ketentuan & Privasi">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg font-extrabold text-slate-900">Syarat &amp; Ketentuan serta Kebijakan Privasi</h1>
                    <p className="mt-0.5 text-xs text-slate-500">
                        Pedoman penggunaan layanan dan pengelolaan data pengguna di platform RuangKita.
                    </p>
                </div>

                <Link
                    href={route('profile.edit')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                    <Icon name="arrowLeft" className="h-3.5 w-3.5" />
                    <span>Kembali ke Profil</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                {/* Terms of Service */}
                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6 lg:col-span-7">
                    <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Icon name="file" className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-extrabold text-slate-900">Syarat &amp; Ketentuan (Terms of Service)</h2>
                            <p className="mt-1 text-[11px] text-slate-500">
                                Ketentuan resmi yang berlaku bagi seluruh pengguna RuangKita Universitas Brawijaya.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {termsSections.map((section) => (
                            <div key={section.number} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <div className="flex items-center gap-2.5">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-[10px] font-extrabold text-white">
                                        {section.number}
                                    </span>
                                    <h3 className="text-xs font-bold text-slate-900">{section.title}</h3>
                                </div>
                                <ul className="mt-3 space-y-2 pl-1">
                                    {section.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Privacy Policy */}
                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6 lg:col-span-5">
                    <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Icon name="shield" className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-extrabold text-slate-900">Kebijakan Privasi (Privacy Policy)</h2>
                            <p className="mt-1 text-[11px] text-slate-500">
                                Bagaimana kami menjaga dan memproses data pribadi akun Anda.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {privacySections.map((item) => (
                            <div key={item.title} className="rounded-xl border border-slate-100 p-4 transition-colors hover:border-slate-200">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                        <Icon name={item.icon} className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                                </div>
                                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-[11px] text-slate-500">
                        Terakhir diperbarui: <span className="font-semibold text-slate-700">November 2026</span>
                    </div>
                </section>
            </div>
        </RuangKitaLayout>
    );
}
