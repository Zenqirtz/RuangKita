import React from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/Components/RuangKita/Icon';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F5F7FB] flex flex-col justify-center font-sans antialiased text-slate-800 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
                {/* Left Brand Panel - SSO Universitas Brawijaya */}
                <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-8 lg:p-11 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-16 w-60 h-60 rounded-full bg-blue-500/25 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex flex-col items-start gap-1.5 group">
                            <img src="/images/logo-white.svg" alt="RuangKita" className="h-11 w-auto object-contain" />
                            <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mt-1">
                                Universitas Brawijaya
                            </p>
                        </Link>

                        <div className="mt-9">
                            <h2 className="text-2xl lg:text-[28px] font-extrabold text-white leading-tight tracking-tight">
                                Akses Terpusat Ormawa Universitas Brawijaya
                            </h2>
                            <p className="text-sm text-blue-100/90 mt-3.5 leading-relaxed">
                                Satu akun kampus untuk cek ketersediaan ruang live, upload proposal, dan pantau tanda tangan izin secara real-time.
                            </p>
                        </div>

                        <div className="mt-9 space-y-5 pt-7 border-t border-white/15">
                            {[
                                { title: 'Akun Kampus Terverifikasi', desc: 'Login instan via @student.ub.ac.id' },
                                { title: 'Anti Double-Booking', desc: 'Validasi bentrok jadwal otomatis 5 ruang' },
                                { title: 'Transparansi 4 Tahap', desc: 'Pantau posisi berkas hingga disetujui WD III' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3.5 text-sm text-blue-100">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon name="checkSmall" className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm leading-snug">{item.title}</p>
                                        <p className="text-xs text-blue-200 leading-relaxed mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
                    <div className="max-w-md w-full mx-auto">
                        {children}
                    </div>
                </div>
            </div>

            <div className="text-center text-[11px] text-slate-400 mt-5">
                © 2026 RuangKita • Universitas Brawijaya. All rights reserved.
            </div>
        </div>
    );
}
