import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import RuangKitaLayout from '@/Layouts/RuangKitaLayout';
import Icon from '@/Components/RuangKita/Icon';
import { eventStatusStyles, rooms } from '@/Data/ruangkita';

const DEFAULT_DAYS = [
    { day: 1, label: 'Sen', date: 23, iso: '23 Nov', isToday: true },
    { day: 2, label: 'Sel', date: 24, iso: '24 Nov', isToday: false },
    { day: 3, label: 'Rab', date: 25, iso: '25 Nov', isToday: false },
    { day: 4, label: 'Kam', date: 26, iso: '26 Nov', isToday: false },
    { day: 5, label: 'Jum', date: 27, iso: '27 Nov', isToday: false },
    { day: 6, label: 'Sab', date: 28, iso: '28 Nov', isToday: false },
    { day: 7, label: 'Min', date: 29, iso: '29 Nov', isToday: false },
];

const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_HEIGHT = 56;

function toMinutes(time) {
    if (!time) {
        return 0;
    }
    const [hour, minute] = time.split(':').map(Number);

    return (hour || 0) * 60 + (minute || 0);
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

export default function Calendar({
    events = [],
    days = [],
    weekLabel = '23 - 29 Nov 2026',
    prevWeek = null,
    nextWeek = null,
    stats = {},
}) {
    const [roomFilter, setRoomFilter] = useState('all');

    const activeDays = days.length > 0 ? days : DEFAULT_DAYS;

    const filteredEvents = useMemo(() => {
        if (roomFilter === 'all') {
            return events;
        }

        return events.filter((event) => Number(event.roomId) === Number(roomFilter));
    }, [events, roomFilter]);

    const eventsByDay = useMemo(() => {
        const map = {};

        for (let day = 1; day <= 7; day += 1) {
            map[day] = layoutDay(filteredEvents.filter((event) => Number(event.day) === day));
        }

        return map;
    }, [filteredEvents]);

    const statCards = [
        {
            label: 'Slot tersedia minggu ini',
            value: `${stats.availableSlotPct ?? 100}%`,
            icon: 'calendar',
            accent: 'text-blue-600 bg-blue-50',
        },
        {
            label: 'Kegiatan terjadwal',
            value: String(stats.scheduledCount ?? 0),
            icon: 'clipboardList',
            accent: 'text-violet-600 bg-violet-50',
        },
        {
            label: 'Menunggu persetujuan',
            value: String(stats.pendingCount ?? 0),
            icon: 'clock',
            accent: 'text-amber-600 bg-amber-50',
        },
        {
            label: 'Ruangan aktif',
            value: String(stats.activeRoomsCount ?? 5),
            icon: 'door',
            accent: 'text-emerald-600 bg-emerald-50',
        },
    ];

    return (
        <RuangKitaLayout activeTab="calendar">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Kalender Ketersediaan</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Cek slot jadwal 5 ruangan fakultas secara real-time dari database sebelum mengajukan izin.
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
                {statCards.map((item) => (
                    <div
                        key={item.label}
                        className="min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3"
                    >
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
                            {prevWeek ? (
                                <Link
                                    href={`/calendar?start=${prevWeek}`}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                                    aria-label="Minggu sebelumnya"
                                >
                                    <Icon name="chevronLeft" className="w-3.5 h-3.5" />
                                </Link>
                            ) : (
                                <span className="p-1.5 opacity-30 text-slate-400">
                                    <Icon name="chevronLeft" className="w-3.5 h-3.5" />
                                </span>
                            )}
                            <span className="px-2 text-[11px] font-bold text-slate-700 whitespace-nowrap">
                                {weekLabel}
                            </span>
                            {nextWeek ? (
                                <Link
                                    href={`/calendar?start=${nextWeek}`}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                                    aria-label="Minggu berikutnya"
                                >
                                    <Icon name="chevronRight" className="w-3.5 h-3.5" />
                                </Link>
                            ) : (
                                <span className="p-1.5 opacity-30 text-slate-400">
                                    <Icon name="chevronRight" className="w-3.5 h-3.5" />
                                </span>
                            )}
                        </div>

                        <Link
                            href="/calendar"
                            className="px-3 py-2 rounded-xl text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                            Hari Ini
                        </Link>
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
                            {activeDays.map((day) => {
                                const isToday = Boolean(day.isToday);

                                return (
                                    <div key={day.date} className="flex-1 text-center px-1">
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase">{day.label}</p>
                                        <p
                                            className={`text-sm font-extrabold mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-lg ${
                                                isToday
                                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                                                    : 'text-slate-700'
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

                            {activeDays.map((day) => {
                                const dayData = eventsByDay[day.day] ?? { events: [], lanes: 1 };
                                const { events: dayEvents, lanes } = dayData;
                                const isToday = Boolean(day.isToday);

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

                                        {dayEvents.map((event) => {
                                            const style = eventStatusStyles[event.status] ?? eventStatusStyles.pending;
                                            const room = rooms.find((item) => item.id === Number(event.roomId));
                                            const top = ((event.startMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT;
                                            const height = ((event.endMinutes - event.startMinutes) / 60) * HOUR_HEIGHT;
                                            const width = 100 / lanes;

                                            return (
                                                <a
                                                    key={event.id}
                                                    href={event.code ? `/permits/${event.code}` : '/permits'}
                                                    className={`absolute z-10 rounded-lg border px-1.5 py-1 overflow-hidden hover:brightness-95 hover:z-20 transition-all ${style.block}`}
                                                    style={{
                                                        top: Math.max(0, top + 1),
                                                        height: Math.max(height - 3, 26),
                                                        left: `calc(${event.lane * width}% + 2px)`,
                                                        width: `calc(${width}% - 4px)`,
                                                    }}
                                                    title={`${event.title} • ${room?.shortName ?? event.roomName} • ${event.start} - ${event.end}`}
                                                >
                                                    <p className="text-[9px] font-bold leading-tight truncate">
                                                        {event.title}
                                                    </p>
                                                    <p className="text-[8px] opacity-80 leading-tight truncate mt-0.5">
                                                        {event.start} - {event.end}
                                                    </p>
                                                    {height > 44 && (
                                                        <p className="text-[8px] opacity-75 leading-tight truncate">
                                                            {room?.shortName ?? event.roomName}
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
        </RuangKitaLayout>
    );
}
