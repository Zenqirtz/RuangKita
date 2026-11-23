import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Icon from '@/Components/RuangKita/Icon';

const features = [
    {
        icon: 'calendar',
        title: 'Kalender Real-Time',
        description: 'Pantau ketersediaan semua ruangan secara langsung tanpa konflik jadwal.',
        accent: 'bg-blue-50 text-blue-600',
    },
    {
        icon: 'clock',
        title: 'Tracking Izin 4 Tahap',
        description: 'Pantau status pengajuan dari submitted hingga approved secara transparan.',
        accent: 'bg-violet-50 text-violet-600',
    },
    {
        icon: 'shield',
        title: 'Anti Double-Booking',
        description: 'Sistem cek bentrok otomatis saat pengajuan dikirim untuk mencegah konflik.',
        accent: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: 'fileUp',
        title: 'Upload Dokumen Digital',
        description: 'Unggah proposal, surat permohonan, dan rundown dalam satu form digital.',
        accent: 'bg-amber-50 text-amber-600',
    },
];

const steps = [
    { step: '01', title: 'Masuk & Cek Kalender', desc: 'Login dengan email kampus dan lihat slot ruangan yang tersedia.' },
    { step: '02', title: 'Pilih & Ajukan', desc: 'Pilih waktu, unggah dokumen, dan kirim pengajuan dalam satu form.' },
    { step: '03', title: 'Review Bertahap', desc: 'Admin & pimpinan memverifikasi melalui pipeline 4 tahap.' },
    { step: '04', title: 'Izin Disetujui', desc: 'Unduh surat izin resmi dan ruangan terkunci otomatis untukmu.' },
];

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="RuangKita – Platform Peminjaman Ruang Kampus" />
            <div className="min-h-screen bg-[#F5F7FB] font-sans antialiased text-slate-800">
                {/* Nav */}
                <nav className="bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
                        <a href="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                                <Icon name="graduation" className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-extrabold text-slate-900 tracking-tight">RuangKita</span>
                        </a>
                        <div className="flex items-center gap-2">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />

                    <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
                            <Icon name="sparkles" className="w-3.5 h-3.5 text-blue-200" />
                            <span className="text-[11px] font-semibold text-blue-100">
                                Tim Yakusa – Universitas Brawijaya
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
                            Pesan Ruang & Lacak Izin<br />
                            <span className="text-blue-200">Tanpa Ribet</span>
                        </h1>
                        <p className="text-blue-100 text-base mt-5 leading-relaxed max-w-xl mx-auto">
                            RuangKita menyatukan peminjaman ruang dan tracking izin ormawa dalam satu platform digital — transparan, cepat, dan bebas bentrok.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            <Link
                                href={auth?.user ? '/dashboard' : route('register')}
                                className="px-6 py-3 rounded-xl bg-white text-blue-700 text-sm font-bold shadow-lg hover:bg-blue-50 transition-all"
                            >
                                Mulai Sekarang
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-6 py-3 rounded-xl bg-white/15 border border-white/25 text-white text-sm font-bold hover:bg-white/20 transition-all"
                            >
                                Sudah punya akun? Masuk
                            </Link>
                        </div>

                        {/* Stats strip */}
                        <div className="flex flex-wrap justify-center gap-6 mt-12 text-center">
                            {[
                                { value: '5', label: 'Ruangan Aktif' },
                                { value: '4', label: 'Tahap Verifikasi' },
                                { value: '1 Gedung', label: 'Tahap Pertama' },
                                { value: '0 Bentrok', label: 'Auto-Checked' },
                            ].map((s) => (
                                <div key={s.label} className="px-5">
                                    <p className="text-2xl font-extrabold text-white">{s.value}</p>
                                    <p className="text-[11px] text-blue-200 font-medium mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="max-w-6xl mx-auto px-5 py-16">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kenapa RuangKita?</h2>
                        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                            Dirancang khusus untuk ormawa dan admin fakultas Universitas Brawijaya.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.accent} mb-3`}>
                                    <Icon name={f.icon} className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section className="bg-white border-y border-slate-100 py-16">
                    <div className="max-w-6xl mx-auto px-5">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cara Kerja</h2>
                            <p className="text-sm text-slate-500 mt-2">Empat langkah simpel dari pengajuan hingga izin diterima.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {steps.map((s, i) => (
                                <div key={s.step} className="relative">
                                    {i < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-blue-100 z-0" style={{ width: 'calc(100% - 20px)', left: 'calc(50% + 20px)' }} />
                                    )}
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-blue-600/25">
                                            {s.step}
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 mt-3">{s.title}</h3>
                                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="max-w-6xl mx-auto px-5 py-16 text-center">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl px-8 py-12 text-white relative overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            Siap Ajukan Ruangan?
                        </h2>
                        <p className="text-blue-100 text-sm mt-3 max-w-sm mx-auto">
                            Bergabung dan nikmati kemudahan booking ruang + tracking izin dalam satu platform.
                        </p>
                        <Link
                            href={auth?.user ? '/dashboard' : route('register')}
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-white text-blue-700 text-sm font-bold shadow-lg hover:bg-blue-50 transition-all"
                        >
                            <Icon name="graduation" className="w-4 h-4" />
                            Daftar Sekarang — Gratis
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-100 bg-white py-6 text-center text-[11px] text-slate-400">
                    <p>© 2026 RuangKita • Tim Yakusa, Universitas Brawijaya</p>
                    <p className="mt-1">
                        Built for{' '}
                        <span className="font-semibold text-slate-500">Smarter Campus &amp; Learning</span>
                    </p>
                </footer>
            </div>
        </>
    );
}
