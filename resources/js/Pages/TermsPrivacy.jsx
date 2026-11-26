import React from 'react';
import { Link } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { useLanguage } from '@/Context/LanguageContext';

const contentByLang = {
    id: {
        terms: [
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
        ],
        privacy: [
            {
                title: 'Data yang Kami Kumpulkan',
                desc: 'RuangKita mengumpulkan data identitas dasar berupa Nama Lengkap, NIM, alamat email kampus (@student.ub.ac.id), serta informasi kegiatan dan dokumen proposal yang Anda unggah untuk keperluan administrasi peminjaman ruangan.',
            },
            {
                title: 'Penggunaan & Keamanan Data',
                desc: 'Seluruh data digunakan secara eksklusif untuk proses verifikasi izin, pencatatan jadwal kampus, dan penerbitan surat izin resmi. Kata sandi disimpan dalam bentuk terenkripsi (hash) dan data Anda tidak pernah dibagikan kepada pihak ketiga di luar lingkungan kampus.',
            },
            {
                title: 'Hak Pengguna & Penghapusan Akun',
                desc: 'Anda dapat memperbarui informasi profil, mengubah kata sandi, maupun menghapus akun secara permanen kapan saja melalui halaman Profil Saya.',
            },
        ],
    },
    en: {
        terms: [
            {
                number: '01',
                title: 'Student Account & Access Terms',
                points: [
                    'Users must register using an official Universitas Brawijaya email (@student.ub.ac.id) along with a valid Full Name and Student ID (NIM).',
                    'Each account is fully responsible for all room booking applications submitted through that account.',
                    'Sharing or lending account access to unauthorized individuals outside official student organization officers or event PICs is prohibited.',
                ],
            },
            {
                number: '02',
                title: 'Room Application & Usage Rules',
                points: [
                    'Every application must attach the required supporting documents (event proposal and room request letter).',
                    'The system enforces automatic schedule conflict checks; requests overlapping with existing bookings cannot be processed.',
                    'Borrowers must maintain cleanliness, order, and the condition of room facilities during and after the event.',
                ],
            },
            {
                number: '03',
                title: 'Verification, Revision & Cancellation',
                points: [
                    'All applications go through Admin verification and final approval from Vice Dean III.',
                    'If documents are returned with Revision Needed status, the borrower must promptly update them to keep the slot.',
                    'Event cancellations must be reported before the scheduled date so the room can be used by other student organizations.',
                ],
            },
        ],
        privacy: [
            {
                title: 'Data We Collect',
                desc: 'RuangKita collects basic identity information including Full Name, NIM, campus email (@student.ub.ac.id), as well as event details and proposal documents you upload for room booking administration.',
            },
            {
                title: 'Data Usage & Security',
                desc: 'All data is used exclusively for permit verification, campus schedule tracking, and issuing official permit letters. Passwords are stored encrypted (hashed) and your data is never shared with third parties outside the university.',
            },
            {
                title: 'User Rights & Account Deletion',
                desc: 'You can update your profile information, change your password, or permanently delete your account anytime from your User Profile page.',
            },
        ],
    },
};

export default function TermsPrivacy() {
    const { lang, t } = useLanguage();
    const content = contentByLang[lang] ?? contentByLang.id;

    return (
        <RuangKitaLayout activeTab="terms" title={t('nav.terms', 'Ketentuan & Privasi')}>
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-lg font-extrabold text-slate-900">{t('terms.title', 'Syarat & Ketentuan serta Kebijakan Privasi')}</h1>
                        <p className="mt-0.5 text-xs text-slate-500">
                            {t('terms.subtitle', 'Pedoman penggunaan layanan dan pengelolaan data pengguna di platform RuangKita.')}
                        </p>
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-blue-600"
                    >
                        <Icon name="arrowLeft" className="h-3.5 w-3.5" />
                        <span>{t('terms.back_profile', 'Kembali ke Profil')}</span>
                    </Link>
                </div>

                <div className="space-y-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                    <div>
                        <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Icon name="file" className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">{t('terms.tos_title', 'Syarat & Ketentuan (Terms of Service)')}</h2>
                                <p className="text-[11px] text-slate-500">{t('terms.tos_sub', 'Ketentuan resmi bagi seluruh pengguna RuangKita Universitas Brawijaya.')}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {content.terms.map((section) => (
                                <div key={section.number}>
                                    <h3 className="text-xs font-bold text-slate-900">
                                        {section.number}. {section.title}
                                    </h3>
                                    <ul className="mt-2.5 space-y-2 pl-4">
                                        {section.points.map((point, idx) => (
                                            <li key={idx} className="list-disc text-xs leading-relaxed text-slate-600">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-7">
                        <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <Icon name="shield" className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-slate-900">{t('terms.privacy_title', 'Kebijakan Privasi (Privacy Policy)')}</h2>
                                <p className="text-[11px] text-slate-500">{t('terms.privacy_sub', 'Bagaimana kami menjaga dan memproses data pribadi akun Anda.')}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {content.privacy.map((item, index) => (
                                <div key={item.title}>
                                    <h3 className="text-xs font-bold text-slate-900">
                                        0{index + 1}. {item.title}
                                    </h3>
                                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-6 border-t border-slate-100 pt-4 text-[11px] text-slate-400">
                            {t('terms.updated_at', 'Terakhir diperbarui:')} <span className="font-semibold text-slate-600">{t('terms.updated_date', 'November 2026')}</span>
                        </p>
                    </div>
                </div>
            </div>
        </RuangKitaLayout>
    );
}
