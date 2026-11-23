import React from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/Components/RuangKita/Icon';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F5F7FB] flex flex-col justify-center font-sans antialiased text-slate-800 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
                {/* Left Brand Panel - SSO Universitas Brawijaya */}
                <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-16 w-60 h-60 rounded-full bg-blue-500/25 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <Link href="/dashboard" className="inline-flex flex-col items-start gap-1 group">
                            <img src="/images/logo-white.svg" alt="RuangKita" className="h-10 w-auto object-contain" />
                            <p className="text-[10px] font-semibold text-blue-200 uppercase tracking-widest mt-1">
                                Universitas Brawijaya
                            </p>
                        </Link>

                        <div className="mt-8">
                            <h2 className="text-xl lg:text-2xl font-extrabold text-white leading-tight">
                                Akses Terpusat Ormawa Universitas Brawijaya
                            </h2>
                            <p className="text-xs text-blue-100/90 mt-2.5 leading-relaxed">
                                Satu akun kampus untuk cek ketersediaan ruang live, upload proposal, dan pantau tanda tangan izin secara real-time.
                            </p>
                        </div>

                        <div className="mt-8 space-y-3 pt-6 border-t border-white/15">
                            {[
                                { title: 'Akun Kampus Terverifikasi', desc: 'Login instan via @student.ub.ac.id' },
                                { title: 'Anti Double-Booking', desc: 'Validasi bentrok jadwal otomatis 5 ruang' },
                                { title: 'Transparansi 4 Tahap', desc: 'Pantau posisi berkas hingga disetujui WD III' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-blue-100">
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon name="checkSmall" className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-[11.5px] leading-tight">{item.title}</p>
                                        <p className="text-[10px] text-blue-200 leading-tight mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t border-white/15 text-[10.5px] text-blue-200 flex items-center justify-between">
                        <span>Tim Yakusa • Case 1</span>
                        <span className="font-bold text-white">Smarter Campus</span>
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
