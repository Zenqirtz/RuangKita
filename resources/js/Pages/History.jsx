import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { permits } from '@/Data/ruangkita';

function calculateDuration(time) {
    const [start, end] = time.split(' - ');
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const totalMinutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);

    return `${totalMinutes / 60} jam`;
}

const historyRows = [
    ...permits
        .filter((permit) => permit.stage === 'approved')
        .map((permit) => ({
            id: permit.id,
            event: permit.event,
            room: permit.room,
            date: permit.date,
            time: permit.time,
            duration: calculateDuration(permit.time),
            status: 'Selesai',
        })),
    {
        id: 'RK-2026-076',
        event: 'Pelatihan Public Speaking',
        room: 'Ruang Rapat Ormawa 101',
        date: '14 Nov 2026',
        time: '09:00 - 12:00',
        duration: '3 jam',
        status: 'Selesai',
    },
    {
        id: 'RK-2026-072',
        event: 'Pameran Karya Mahasiswa',
        room: 'Amphitheater Terbuka',
        date: '08 Nov 2026',
        time: '10:00 - 17:00',
        duration: '7 jam',
        status: 'Selesai',
    },
];

export default function History() {
    return (
        <RuangKitaLayout activeTab="history">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Riwayat Peminjaman</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Arsip kegiatan yang telah selesai beserta surat izinnya.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                    <Icon name="download" className="w-4 h-4" />
                    Unduh Rekap
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total peminjaman', value: '24', icon: 'calendar', accent: 'text-blue-600 bg-blue-50' },
                    { label: 'Total jam pemakaian', value: '86', icon: 'clock', accent: 'text-violet-600 bg-violet-50' },
                    { label: 'Ruangan favorit', value: 'Auditorium', icon: 'door', accent: 'text-amber-600 bg-amber-50' },
                    { label: 'Kepatuhan tata tertib', value: '100%', icon: 'shield', accent: 'text-emerald-600 bg-emerald-50' },
                ].map((item) => (
                    <div key={item.label} className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
                            <Icon name={item.icon} className="w-[18px] h-[18px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-base font-extrabold text-slate-900 leading-tight truncate">{item.value}</p>
                            <p className="text-[10px] font-medium text-slate-400 leading-tight mt-0.5">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">Peminjaman Selesai</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Semester Ganjil 2026/2027</p>
                    </div>
                    <div className="relative hidden sm:block w-56">
                        <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari riwayat..."
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[720px]">
                        <thead>
                            <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                                <th className="font-bold px-5 py-3">Kegiatan</th>
                                <th className="font-bold px-3 py-3">Ruangan</th>
                                <th className="font-bold px-3 py-3">Jadwal</th>
                                <th className="font-bold px-3 py-3">Durasi</th>
                                <th className="font-bold px-3 py-3">Status</th>
                                <th className="font-bold px-5 py-3 text-right">Surat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {historyRows.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <p className="text-[11.5px] font-bold text-slate-800 leading-snug">{row.event}</p>
                                        <p className="text-[9px] font-mono text-slate-400 mt-0.5">{row.id}</p>
                                    </td>
                                    <td className="px-3 py-3.5 text-[10.5px] text-slate-600 font-medium">{row.room}</td>
                                    <td className="px-3 py-3.5">
                                        <p className="text-[10.5px] font-semibold text-slate-700">{row.date}</p>
                                        <p className="text-[9px] text-slate-400">{row.time}</p>
                                    </td>
                                    <td className="px-3 py-3.5 text-[10.5px] text-slate-600 font-medium">{row.duration}</td>
                                    <td className="px-3 py-3.5">
                                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                            <Icon name="checkSmall" className="w-2.5 h-2.5" />
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700"
                                        >
                                            <Icon name="download" className="w-3.5 h-3.5" />
                                            SK
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
                    <p className="text-[9.5px] text-slate-400">Menampilkan 5 dari 24 peminjaman</p>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-50"
                        >
                            Sebelumnya
                        </button>
                        <button type="button" className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-blue-600 text-white">
                            1
                        </button>
                        <button
                            type="button"
                            className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-50"
                        >
                            2
                        </button>
                        <button
                            type="button"
                            className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-slate-50"
                        >
                            Berikutnya
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <h3 className="text-sm font-bold text-slate-900">Ruangan Paling Sering Dipinjam</h3>
                    <div className="mt-4 space-y-3">
                        {[
                            { name: 'Auditorium Gedung Utama', value: 9, percent: 38, color: 'bg-blue-600' },
                            { name: 'Ruang Rapat Ormawa 101', value: 6, percent: 25, color: 'bg-violet-500' },
                            { name: 'Student Center Hall', value: 4, percent: 17, color: 'bg-emerald-500' },
                            { name: 'Lab Multimedia', value: 3, percent: 12, color: 'bg-amber-500' },
                        ].map((room) => (
                            <div key={room.name}>
                                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600">
                                    <span>{room.name}</span>
                                    <span className="text-slate-400">{room.value}x</span>
                                </div>
                                <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div className={`h-1.5 rounded-full ${room.color}`} style={{ width: `${room.percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-600/15 flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                            <Icon name="trending" className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold mt-3">Dampak RuangKita</h3>
                        <p className="text-[11px] text-blue-100/90 leading-relaxed mt-1.5">
                            Waktu penyelesaian izin turun dari 4-5 hari menjadi rata-rata 2,4 hari, dan tidak ada lagi
                            laporan double-booking sejak sistem digunakan.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                            <p className="text-lg font-extrabold">-48%</p>
                            <p className="text-[9px] text-blue-100">waktu administrasi</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                            <p className="text-lg font-extrabold">0</p>
                            <p className="text-[9px] text-blue-100">jadwal bentrok</p>
                        </div>
                    </div>
                </div>
            </div>
        </RuangKitaLayout>
    );
}
