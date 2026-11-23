import React, { useMemo, useState } from 'react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { calendarEvents, eventStatusStyles, rooms, roomStatusStyles } from '@/Data/ruangkita';

const DAYS = [
    { day: 1, label: 'Sen', date: 23, iso: '23 Nov' },
    { day: 2, label: 'Sel', date: 24, iso: '24 Nov' },
    { day: 3, label: 'Rab', date: 25, iso: '25 Nov' },
    { day: 4, label: 'Kam', date: 26, iso: '26 Nov' },
    { day: 5, label: 'Jum', date: 27, iso: '27 Nov' },
    { day: 6, label: 'Sab', date: 28, iso: '28 Nov' },
    { day: 7, label: 'Min', date: 29, iso: '29 Nov' },
];

const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_HEIGHT = 56;

function toMinutes(time) {
    const [hour, minute] = time.split(':').map(Number);

    return hour * 60 + minute;
}

function layoutDay(events) {
    const sorted = [...events].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    const laneEnds = [];

    const placed = sorted.map((event) => {
        const start = toMinutes(event.start);
        const end = toMinutes(event.end);
        let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start);

        if (lane === -1) {
            lane = laneEnds.length;
            laneEnds.push(end);
        } else {
            laneEnds[lane] = end;
        }

        return { ...event, lane, startMinutes: start, endMinutes: end };
    });

    return { events: placed, lanes: Math.max(laneEnds.length, 1) };
}

export default function Calendar() {
    const [roomFilter, setRoomFilter] = useState('all');

    const filteredEvents = useMemo(() => {
        if (roomFilter === 'all') {
            return calendarEvents;
        }

        return calendarEvents.filter((event) => event.roomId === Number(roomFilter));
    }, [roomFilter]);

    const eventsByDay = useMemo(() => {
        const map = {};

        for (let day = 1; day <= 7; day += 1) {
            map[day] = layoutDay(filteredEvents.filter((event) => event.day === day));
        }

        return map;
    }, [filteredEvents]);

    return (
        <RuangKitaLayout activeTab="calendar">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Kalender Ketersediaan</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Cek slot kosong 5 ruangan fakultas sebelum mengajukan izin.
                    </p>
                </div>
                <a
                    href="/bookings/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    Ajukan Ruangan
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Slot tersedia minggu ini', value: '68%', icon: 'calendar', accent: 'text-blue-600 bg-blue-50' },
                    { label: 'Kegiatan terjadwal', value: '13', icon: 'clipboardList', accent: 'text-violet-600 bg-violet-50' },
                    { label: 'Menunggu persetujuan', value: '2', icon: 'clock', accent: 'text-amber-600 bg-amber-50' },
                    { label: 'Ruangan aktif', value: '5', icon: 'door', accent: 'text-emerald-600 bg-emerald-50' },
                ].map((item) => (
                    <div key={item.label} className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
                            <Icon name={item.icon} className="w-[18px] h-[18px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-lg font-extrabold text-slate-900 leading-tight">{item.value}</p>
                            <p className="text-[10px] font-medium text-slate-400 leading-tight mt-0.5">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-5 py-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="relative">
                            <select
                                value={roomFilter}
                                onChange={(event) => setRoomFilter(event.target.value)}
                                className="appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer"
                            >
                                <option value="all">Semua ruangan</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.shortName}
                                    </option>
                                ))}
                            </select>
                            <Icon
                                name="door"
                                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <Icon
                                name="chevronDown"
                                className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                            <button
                                type="button"
                                className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                                aria-label="Minggu sebelumnya"
                            >
                                <Icon name="chevronLeft" className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-[11px] font-bold text-slate-700 whitespace-nowrap">
                                23 - 29 Nov 2026
                            </span>
                            <button
                                type="button"
                                className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                                aria-label="Minggu berikutnya"
                            >
                                <Icon name="chevronRight" className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <button
                            type="button"
                            className="px-3 py-2 rounded-xl text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                            Hari Ini
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-medium text-slate-500">
                        {Object.entries(eventStatusStyles).map(([key, style]) => (
                            <span key={key} className="inline-flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                                {style.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[900px] px-4 pb-5">
                        <div className="flex pt-4">
                            <div className="w-14 shrink-0" />
                            {DAYS.map((day) => {
                                const isToday = day.date === 23;

                                return (
                                    <div key={day.date} className="flex-1 text-center px-1">
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase">{day.label}</p>
                                        <p
                                            className={`text-sm font-extrabold mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-lg ${
                                                isToday ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' : 'text-slate-700'
                                            }`}
                                        >
                                            {day.date}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex mt-2">
                            <div
                                className="w-14 shrink-0 relative"
                                style={{ height: (END_HOUR - START_HOUR) * HOUR_HEIGHT }}
                            >
                                {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className="absolute right-2 -translate-y-1/2 text-[9px] font-medium text-slate-400"
                                        style={{ top: index * HOUR_HEIGHT }}
                                    >
                                        {String(START_HOUR + index).padStart(2, '0')}:00
                                    </span>
                                ))}
                            </div>

                            {DAYS.map((day) => {
                                const { events, lanes } = eventsByDay[day.day];
                                const isToday = day.date === 23;

                                return (
                                    <div
                                        key={day.date}
                                        className={`flex-1 relative border-l border-slate-100 ${
                                            isToday ? 'bg-blue-50/25' : ''
                                        }`}
                                        style={{ height: (END_HOUR - START_HOUR) * HOUR_HEIGHT }}
                                    >
                                        {Array.from({ length: END_HOUR - START_HOUR }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="absolute left-0 right-0 border-t border-slate-100"
                                                style={{ top: index * HOUR_HEIGHT }}
                                            />
                                        ))}

                                        {isToday && (
                                            <div
                                                className="absolute left-0 right-0 z-20 flex items-center"
                                                style={{ top: (9.7 - START_HOUR) * HOUR_HEIGHT }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 -ml-0.5" />
                                                <span className="flex-1 h-px bg-rose-400" />
                                            </div>
                                        )}

                                        {events.map((event) => {
                                            const style = eventStatusStyles[event.status];
                                            const room = rooms.find((item) => item.id === event.roomId);
                                            const top = ((event.startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
                                            const height = ((event.endMinutes - event.startMinutes) / 60) * HOUR_HEIGHT;
                                            const width = 100 / lanes;

                                            return (
                                                <a
                                                    key={event.id}
                                                    href="/permits"
                                                    className={`absolute z-10 rounded-lg border px-1.5 py-1 overflow-hidden hover:brightness-95 hover:z-20 transition-all ${style.block}`}
                                                    style={{
                                                        top: top + 1,
                                                        height: Math.max(height - 3, 26),
                                                        left: `calc(${event.lane * width}% + 2px)`,
                                                        width: `calc(${width}% - 4px)`,
                                                    }}
                                                    title={`${event.title} • ${room?.shortName} • ${event.start} - ${event.end}`}
                                                >
                                                    <p className="text-[9px] font-bold leading-tight truncate">
                                                        {event.title}
                                                    </p>
                                                    <p className="text-[8px] opacity-80 leading-tight truncate mt-0.5">
                                                        {event.start} - {event.end}
                                                    </p>
                                                    {height > 44 && (
                                                        <p className="text-[8px] opacity-75 leading-tight truncate">
                                                            {room?.shortName}
                                                        </p>
                                                    )}
                                                </a>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div className="md:col-span-2 xl:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <h3 className="text-sm font-bold text-slate-900">Status Ruangan Hari Ini</h3>
                    <div className="mt-4 space-y-3">
                        {rooms.map((room) => {
                            const status = roomStatusStyles[room.status];

                            return (
                                <div key={room.id} className="flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-slate-700 truncate">{room.shortName}</p>
                                        <p className="text-[9px] text-slate-400">{room.capacity} orang</p>
                                    </div>
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${status.badge}`}>
                                        {status.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <h3 className="text-sm font-bold text-slate-900">Slot Kosong Terdekat</h3>
                    <div className="mt-4 space-y-2.5">
                        {[
                            { room: 'Auditorium', time: 'Hari ini, 16.00 - 21.00', tone: 'emerald' },
                            { room: 'Ruang Rapat 101', time: 'Hari ini, 13.00 - 21.00', tone: 'emerald' },
                            { room: 'Lab Multimedia', time: 'Besok, 08.00 - 12.00', tone: 'blue' },
                        ].map((slot) => (
                            <div
                                key={slot.room}
                                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                            >
                                <div>
                                    <p className="text-[11px] font-bold text-slate-700">{slot.room}</p>
                                    <p className="text-[9.5px] text-slate-400 mt-0.5">{slot.time}</p>
                                </div>
                                <a
                                    href="/bookings/create"
                                    className="text-[9.5px] font-bold text-blue-600 bg-white border border-blue-100 px-2.5 py-1.5 rounded-lg hover:bg-blue-50"
                                >
                                    Pilih
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-600/15 flex flex-col justify-between">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                            <Icon name="shield" className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-sm font-bold">Anti Double-Booking</h3>
                        <p className="text-[11px] text-blue-100/90 leading-relaxed mt-2">
                            Setiap pengajuan dicek otomatis terhadap jadwal yang sudah disetujui. Slot bentrok tidak
                            dapat dipilih.
                        </p>
                    </div>
                    <a
                        href="/guidelines"
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-white hover:gap-2.5 transition-all"
                    >
                        Baca tata tertib
                        <Icon name="arrowRight" className="w-3.5 h-3.5" />
                    </a>
                </div>
            </section>
        </RuangKitaLayout>
    );
}
