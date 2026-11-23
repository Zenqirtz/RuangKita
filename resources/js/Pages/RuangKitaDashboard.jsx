import React, { useState } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import { 
    CalendarDays, 
    CheckCircle2, 
    Clock, 
    FileCheck2, 
    AlertTriangle, 
    DoorOpen, 
    FileUp, 
    Search, 
    ChevronRight, 
    Sparkles, 
    MapPin, 
    Users, 
    Building, 
    ArrowUpRight,
    DownloadCloud,
    HelpCircle,
    CalendarCheck,
    BarChart3
} from 'lucide-react';

export default function RuangKitaDashboard() {
    // 5 Ruangan Utama sesuai Abstrak
    const rooms = [
        { id: 1, name: 'Auditorium Gedung Utama', capacity: '250 Orang', status: 'Tersedia', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { id: 2, name: 'Student Center Hall', capacity: '120 Orang', status: 'Terisi', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
        { id: 3, name: 'Ruang Rapat Ormawa 101', capacity: '40 Orang', status: 'Tersedia', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { id: 4, name: 'Lab Multimedia & Komputer', capacity: '60 Orang', status: 'Menunggu Verifikasi', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
        { id: 5, name: 'Amphitheater Terbuka', capacity: '180 Orang', status: 'Tersedia', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    ];

    // Permohonan Terkini (User Flow: 4 tahapan - Submitted, Admin Verification, Leadership Approval, Approved)
    const recentPermits = [
        {
            id: 'UB-2026-081',
            event: 'Grand Workshop UI/UX & Web AI',
            room: 'Auditorium Gedung Utama',
            date: '28 Nov 2026',
            time: '08:30 - 15:30',
            stage: 'Admin Verification',
            stageColor: 'bg-purple-50 text-purple-700 border-purple-200',
            progress: 50
        },
        {
            id: 'UB-2026-082',
            event: 'Latihan Rutin Teater Brawijaya',
            room: 'Student Center Hall',
            date: '30 Nov 2026',
            time: '15:00 - 18:00',
            stage: 'Leadership Approval',
            stageColor: 'bg-amber-50 text-amber-700 border-amber-200',
            progress: 75
        },
        {
            id: 'UB-2026-083',
            event: 'Internal Gathering Tim Yakusa',
            room: 'Ruang Rapat Ormawa 101',
            date: '02 Des 2026',
            time: '13:00 - 16:00',
            stage: 'Disetujui',
            stageColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            progress: 100
        },
        {
            id: 'UB-2026-084',
            event: 'Lomba Desain Poster Nasional',
            room: 'Lab Multimedia & Komputer',
            date: '05 Des 2026',
            time: '09:00 - 14:00',
            stage: 'Revisi Dokumen',
            stageColor: 'bg-rose-50 text-rose-700 border-rose-200',
            progress: 25
        }
    ];

    // Notice board
    const notices = [
        {
            type: 'alert',
            title: 'Catatan Revisi: Proposal Poster Nasional',
            desc: 'Mohon cantumkan rincian fasilitas proyektor dan tanda tangan Dosen Pembimbing.',
            time: '2 jam yang lalu',
            accent: 'border-l-rose-500 bg-rose-50/50'
        },
        {
            type: 'info',
            title: 'Jadwal Pemeliharaan AC Ruang Seminar',
            desc: 'Gedung utama sayap barat akan dibersihkan tanggal 27 Nov pukul 17:00 WIB.',
            time: 'Kemarin, 14:20',
            accent: 'border-l-blue-500 bg-blue-50/50'
        },
        {
            type: 'success',
            title: 'Izin Disetujui: SK No. 342/UN10/FT/2026',
            desc: 'Surat rekomendasi peminjaman ruangan Internal Gathering telah ditandatangani.',
            time: '2 hari lalu',
            accent: 'border-l-emerald-500 bg-emerald-50/50'
        }
    ];

    return (
        <RuangKitaLayout activeTab="dashboard">
            {/* 1. Hero Greeting Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-blue-600/15">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient opacity-20 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold border border-white/20">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Portal Terintegrasi Peminjaman Ruang & Tracking Izin</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            Selamat Datang, Daffa Ahmad! 👋
                        </h2>
                        <p className="text-blue-100/90 text-sm leading-relaxed">
                            Cek ketersediaan 5 ruangan utama, ajukan jadwal tanpa bentrok, dan pantau progres tanda tangan izin secara real-time.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a 
                            href="#booking"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-600 font-bold text-sm shadow-md hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
                        >
                            <FileUp className="w-4 h-4" />
                            <span>+ Ajukan Izin Ruangan</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. Top 5 Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Metric 1 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <DoorOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Ruang</span>
                            <span className="text-2xl font-black text-slate-800">5</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 font-medium">1 Gedung Fakultas</p>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Verifikasi</span>
                            <span className="text-2xl font-black text-slate-800">3</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-purple-600 mt-2 font-medium">Di Admin Fakultas</p>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                            <FileCheck2 className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Ttd Pimpinan</span>
                            <span className="text-2xl font-black text-slate-800">2</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-amber-600 mt-2 font-medium">Wakil Dekan III</p>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Disetujui</span>
                            <span className="text-2xl font-black text-slate-800">8</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-emerald-600 mt-2 font-medium">Ruangan Terkunci</p>
                </div>

                {/* Metric 5 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Perlu Revisi</span>
                            <span className="text-2xl font-black text-rose-600">1</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-rose-500 mt-2 font-medium">Tindakan Diperlukan</p>
                </div>
            </div>

            {/* 3. Main Grid (Tabel Pengajuan Terkini & Papan Pengumuman/Revisi) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left (2 cols): Permohonan & Tracking Pipeline */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-base font-bold text-slate-800">Pengajuan Izin & Status Ruangan</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Pemantauan 4 tahap verifikasi izin secara real-time</p>
                        </div>
                        <a href="#all" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                    <th className="pb-3 pl-1">Kegiatan & ID</th>
                                    <th className="pb-3">Ruangan</th>
                                    <th className="pb-3">Jadwal</th>
                                    <th className="pb-3 text-right pr-2">Tahap Approval</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-xs">
                                {recentPermits.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="py-3.5 pl-1">
                                            <p className="font-bold text-slate-800 leading-snug">{item.event}</p>
                                            <span className="text-[10px] text-slate-400 font-mono">{item.id}</span>
                                        </td>
                                        <td className="py-3.5 text-slate-600 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{item.room}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 text-slate-600">
                                            <p className="font-semibold">{item.date}</p>
                                            <p className="text-[10px] text-slate-400">{item.time} WIB</p>
                                        </td>
                                        <td className="py-3.5 text-right pr-2">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.stageColor}`}>
                                                {item.stage}
                                            </span>
                                            <div className="w-20 bg-slate-100 rounded-full h-1.5 ml-auto mt-1.5 overflow-hidden">
                                                <div 
                                                    className="bg-blue-600 h-1.5 rounded-full" 
                                                    style={{ width: `${item.progress}%` }} 
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right (1 col): Notice Board & Catatan Revisi */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-800">Pemberitahuan & Revisi</h3>
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">1 Baru</span>
                        </div>

                        <div className="space-y-3">
                            {notices.map((n, idx) => (
                                <div key={idx} className={`p-3.5 rounded-2xl border-l-4 ${n.accent} space-y-1`}>
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                                    </div>
                                    <p className="text-[11px] text-slate-600 leading-relaxed">{n.desc}</p>
                                    <span className="text-[10px] text-slate-400 font-medium block pt-1">{n.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <a 
                        href="#revisions" 
                        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200/60"
                    >
                        <span>Lihat Semua Catatan Petugas</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>

            {/* 4. Bottom 3 Columns Row (Live Mini Schedule, Quick Access, Room Status) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1: Daftar 5 Ruangan Utama */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-800">5 Ruangan Fakultas</h4>
                        <span className="text-[11px] text-slate-400 font-semibold">Gedung Utama</span>
                    </div>

                    <div className="space-y-2.5">
                        {rooms.map((room) => (
                            <div key={room.id} className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-800">{room.name}</p>
                                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                        <Users className="w-3 h-3" /> {room.capacity}
                                    </p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${room.badge}`}>
                                    {room.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Quick Access Shortcuts */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Akses Cepat (Quick Access)</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <a href="#booking" className="p-3.5 rounded-2xl bg-blue-50/60 hover:bg-blue-100/60 border border-blue-100/60 flex flex-col items-center justify-center text-center transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                <FileUp className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700 mt-2">Ajukan Ruang</span>
                            <span className="text-[10px] text-slate-400">Upload proposal</span>
                        </a>

                        <a href="#calendar" className="p-3.5 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-100/60 flex flex-col items-center justify-center text-center transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                <CalendarDays className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700 mt-2">Kalender Live</span>
                            <span className="text-[10px] text-slate-400">Cek slot kosong</span>
                        </a>

                        <a href="#tracker" className="p-3.5 rounded-2xl bg-purple-50/60 hover:bg-purple-100/60 border border-purple-100/60 flex flex-col items-center justify-center text-center transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700 mt-2">Lacak Izin</span>
                            <span className="text-[10px] text-slate-400">4 Milestone</span>
                        </a>

                        <a href="#downloads" className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/60 border border-amber-100/60 flex flex-col items-center justify-center text-center transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                                <DownloadCloud className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700 mt-2">Download SK</span>
                            <span className="text-[10px] text-slate-400">Format surat resmi</span>
                        </a>
                    </div>
                </div>

                {/* Column 3: Indikator Peminjaman & Konflik */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-slate-800">Tingkat Okupansi Ruang</h4>
                            <span className="text-xs font-bold text-emerald-600">Aman ✓</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">Otomatisasi pengecekan jadwal bentrok</p>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-around mb-4">
                            <div className="relative flex items-center justify-center">
                                <svg className="w-24 h-24 transform -rotate-90">
                                    <circle cx="48" cy="48" r="38" stroke="#E2E8F0" strokeWidth="8" fill="transparent" />
                                    <circle 
                                        cx="48" 
                                        cy="48" 
                                        r="38" 
                                        stroke="#2563EB" 
                                        strokeWidth="8" 
                                        fill="transparent" 
                                        strokeDasharray="238.76" 
                                        strokeDashoffset="60" 
                                        strokeLinecap="round" 
                                    />
                                </svg>
                                <div className="absolute text-center">
                                    <span className="text-lg font-black text-slate-800">75%</span>
                                    <span className="text-[9px] text-slate-400 block font-semibold">Terpakai</span>
                                </div>
                            </div>
                            <div className="space-y-1.5 text-[11px] font-medium text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                                    <span>Auditorium: 85%</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span>Lab Multi: 60%</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <span>Hall Ormawa: 70%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sistem otomatis mencegah double-booking pada jam yang sama.</span>
                    </div>
                </div>
            </div>
        </RuangKitaLayout>
    );
}
