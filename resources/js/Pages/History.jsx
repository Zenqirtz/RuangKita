import React from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';

export default function History({ history = [] }) {
    const approvedCount = history.filter((item) => item.status === 'Disetujui').length;
    const rejectedCount = history.filter((item) => item.status === 'Ditolak').length;

    return (
        <RuangKitaLayout activeTab="history">
            <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Riwayat Peminjaman</h1>
                <p className="text-xs text-slate-400 mt-1">
                    Arsip peminjaman ruangan yang telah selesai diverifikasi atau diproses.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {[
                    { label: 'Total Arsip', value: history.length, unit: 'kegiatan' },
                    { label: 'Disetujui', value: approvedCount, unit: 'izin' },
                    { label: 'Ditolak', value: rejectedCount, unit: 'berkas' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                        <p className="text-[10px] font-semibold text-slate-400">{stat.label}</p>
                        <p className="text-2xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                        <p className="text-[9.5px] text-slate-400 mt-0.5">{stat.unit}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h2 className="text-sm font-extrabold text-slate-900">Daftar Peminjaman Selesai</h2>
                </div>

                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mb-3">
                            <Icon name="clock" className="w-7 h-7" />
                        </div>
                        <p className="text-sm font-bold text-slate-600">Belum ada riwayat</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                            Pengajuan yang sudah disetujui atau ditolak akan otomatis diarsipkan di sini.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[640px]">
                            <thead>
                                <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                    <th className="pb-3 px-2">ID & Kegiatan</th>
                                    <th className="pb-3 px-2">Ruangan</th>
                                    <th className="pb-3 px-2">Tanggal & Waktu</th>
                                    <th className="pb-3 px-2">Durasi</th>
                                    <th className="pb-3 px-2">Status</th>
                                    <th className="pb-3 px-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {history.map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-3 px-2">
                                            <a
                                                href={`/permits/${row.id}`}
                                                className="text-[12px] font-bold text-slate-800 hover:text-blue-600 transition-colors"
                                            >
                                                {row.event}
                                            </a>
                                            <p className="text-[10px] text-slate-400 mt-0.5">
                                                {row.id} • {row.ormawa}
                                            </p>
                                        </td>
                                        <td className="py-3 px-2 text-[11px] font-medium text-slate-600">
                                            {row.room}
                                        </td>
                                        <td className="py-3 px-2">
                                            <p className="text-[11px] font-semibold text-slate-700">{row.date}</p>
                                            <p className="text-[9.5px] text-slate-400">{row.time} WIB</p>
                                        </td>
                                        <td className="py-3 px-2 text-[11px] font-medium text-slate-600">
                                            {row.duration}
                                        </td>
                                        <td className="py-3 px-2">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                    row.status === 'Disetujui'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        row.status === 'Disetujui' ? 'bg-emerald-500' : 'bg-rose-500'
                                                    }`}
                                                />
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 text-right">
                                            <a
                                                href={`/permits/${row.id}`}
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700"
                                            >
                                                Detail
                                                <Icon name="arrowRight" className="w-3 h-3" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </RuangKitaLayout>
    );
}
