import React, { useMemo, useState } from 'react';
import Icon from '@/Components/RuangKita/Icon';
import { useLanguage } from '@/Context/LanguageContext';

const floorConfigs = [
    {
        id: 'vet-1',
        label: 'Veteran • Lt. 1',
        title: 'Kampus Veteran — Lantai 1',
        corridorLabel: 'Koridor Utama & Area Seminar',
        roomIds: [1, 2, 4, 19, 21],
        layout: [
            { id: 1, col: 'col-span-4', row: 'row-span-1' },
            { id: 2, col: 'col-span-4', row: 'row-span-1' },
            { id: 19, col: 'col-span-4', row: 'row-span-1' },
            { id: 4, col: 'col-span-7', row: 'row-span-1' },
            { id: 21, col: 'col-span-5', row: 'row-span-1' },
        ],
    },
    {
        id: 'vet-2',
        label: 'Veteran • Lt. 2',
        title: 'Kampus Veteran — Lantai 2',
        corridorLabel: 'Koridor Studio Kreatif & Meeting',
        roomIds: [8, 9, 10, 15, 17, 18],
        layout: [
            { id: 8, col: 'col-span-4', row: 'row-span-1' },
            { id: 9, col: 'col-span-4', row: 'row-span-1' },
            { id: 10, col: 'col-span-4', row: 'row-span-1' },
            { id: 15, col: 'col-span-4', row: 'row-span-1' },
            { id: 18, col: 'col-span-4', row: 'row-span-1' },
            { id: 17, col: 'col-span-4', row: 'row-span-1' },
        ],
    },
    {
        id: 'vet-3',
        label: 'Veteran • Lt. 3',
        title: 'Kampus Veteran — Lantai 3',
        corridorLabel: 'Koridor Lab Komputer & Ruang 306–310',
        roomIds: [3, 5, 6, 7, 11, 12, 16],
        layout: [
            { id: 5, col: 'col-span-4', row: 'row-span-1' },
            { id: 6, col: 'col-span-4', row: 'row-span-1' },
            { id: 7, col: 'col-span-4', row: 'row-span-1' },
            { id: 3, col: 'col-span-3', row: 'row-span-1' },
            { id: 11, col: 'col-span-3', row: 'row-span-1' },
            { id: 12, col: 'col-span-3', row: 'row-span-1' },
            { id: 16, col: 'col-span-3', row: 'row-span-1' },
        ],
    },
    {
        id: 'dieng',
        label: 'Kampus Dieng',
        title: 'Kampus Vokasi Dieng',
        corridorLabel: 'Koridor Hospitality & Workspace',
        roomIds: [13, 14, 20],
        layout: [
            { id: 13, col: 'col-span-4', row: 'row-span-1' },
            { id: 14, col: 'col-span-4', row: 'row-span-1' },
            { id: 20, col: 'col-span-4', row: 'row-span-1' },
        ],
    },
];

export default function RoomFloorPlan3D({ rooms = [] }) {
    const { t } = useLanguage();
    const [activeFloorId, setActiveFloorId] = useState('vet-1');
    const [is3D, setIs3D] = useState(true);
    const [rotateZ, setRotateZ] = useState(-28);
    const [zoom, setZoom] = useState(1);
    const [selectedRoomId, setSelectedRoomId] = useState(1);

    const activeFloor = useMemo(
        () => floorConfigs.find((f) => f.id === activeFloorId) ?? floorConfigs[0],
        [activeFloorId]
    );

    const floorRooms = useMemo(() => {
        return activeFloor.layout
            .map((slot) => {
                const room = rooms.find((r) => Number(r.id) === slot.id);
                return room ? { ...room, col: slot.col } : null;
            })
            .filter(Boolean);
    }, [activeFloor, rooms]);

    const selectedRoom = useMemo(() => {
        return rooms.find((r) => Number(r.id) === Number(selectedRoomId)) ?? floorRooms[0] ?? rooms[0];
    }, [rooms, selectedRoomId, floorRooms]);

    const handleFloorChange = (floorId) => {
        setActiveFloorId(floorId);
        const target = floorConfigs.find((f) => f.id === floorId);
        if (target && target.roomIds.length > 0) {
            setSelectedRoomId(target.roomIds[0]);
        }
    };

    const resetView = () => {
        setIs3D(true);
        setRotateZ(-28);
        setZoom(1);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
            {/* 3D Interactive Stage */}
            <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between overflow-hidden">
                {/* Top Controls: Floor Tabs + 3D Camera Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5">
                        {floorConfigs.map((floor) => {
                            const active = floor.id === activeFloorId;
                            return (
                                <button
                                    key={floor.id}
                                    type="button"
                                    onClick={() => handleFloorChange(floor.id)}
                                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                                        active
                                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {floor.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setIs3D((v) => !v)}
                            className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold border transition-colors ${
                                is3D
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                        >
                            {is3D ? '3D Isometrik' : '2D Top-Down'}
                        </button>
                        {is3D && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setRotateZ((r) => r - 15)}
                                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                                    title={t('rooms.rotate_left', 'Putar kiri')}
                                >
                                    <Icon name="chevronLeft" className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRotateZ((r) => r + 15)}
                                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                                    title={t('rooms.rotate_right', 'Putar kanan')}
                                >
                                    <Icon name="chevronRight" className="w-3.5 h-3.5" />
                                </button>
                            </>
                        )}
                        <button
                            type="button"
                            onClick={() => setZoom((z) => Math.max(0.8, Number((z - 0.1).toFixed(1))))}
                            className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                            title="Zoom Out"
                        >
                            -
                        </button>
                        <button
                            type="button"
                            onClick={() => setZoom((z) => Math.min(1.2, Number((z + 0.1).toFixed(1))))}
                            className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                            title="Zoom In"
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={resetView}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10.5px] font-bold text-slate-600 hover:bg-slate-100"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* 3D Isometric Viewport */}
                <div
                    className="relative flex-1 min-h-[430px] flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100/80 border border-slate-100 my-4 overflow-hidden select-none"
                    style={{ perspective: '1200px' }}
                >
                    {/* Subtle Architectural Grid Background */}
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                            backgroundImage:
                                'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {/* 3D Floor Slab */}
                    <div
                        className="relative w-[92%] max-w-[660px] bg-white/95 rounded-2xl border-2 border-slate-200 p-5 transition-transform duration-500 ease-out"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: is3D
                                ? `scale(${zoom}) rotateX(52deg) rotateZ(${rotateZ}deg)`
                                : `scale(${zoom}) rotateX(0deg) rotateZ(0deg)`,
                            boxShadow: is3D
                                ? '18px 24px 0px #cbd5e1, 24px 34px 40px rgba(15, 23, 42, 0.14)'
                                : '0 10px 30px rgba(15, 23, 42, 0.08)',
                        }}
                    >
                        {/* Floor Header Banner */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-slate-200">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                {activeFloor.title}
                            </span>
                            <span className="text-[9.5px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                {activeFloor.corridorLabel}
                            </span>
                        </div>

                        {/* 3D Rooms Grid */}
                        <div className="grid grid-cols-12 gap-3" style={{ transformStyle: 'preserve-3d' }}>
                            {floorRooms.map((room) => {
                                const isSelected = Number(selectedRoom?.id) === Number(room.id);
                                const isBooked = room.status === 'booked';

                                return (
                                    <button
                                        key={room.id}
                                        type="button"
                                        onClick={() => setSelectedRoomId(room.id)}
                                        className={`${room.col} group relative text-left rounded-xl p-3 border-2 transition-all duration-300 cursor-pointer ${
                                            isSelected
                                                ? 'bg-blue-600 border-blue-700 text-white'
                                                : isBooked
                                                  ? 'bg-amber-50/90 border-amber-300 text-slate-800 hover:bg-amber-100/80'
                                                  : 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:bg-emerald-100/70'
                                        }`}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transform: is3D
                                                ? isSelected
                                                    ? 'translateZ(26px)'
                                                    : 'translateZ(10px)'
                                                : 'translateZ(0px)',
                                            boxShadow: is3D
                                                ? isSelected
                                                    ? '6px 10px 0px #1e40af, 10px 16px 20px rgba(37, 99, 235, 0.3)'
                                                    : isBooked
                                                      ? '4px 6px 0px #f59e0b'
                                                      : '4px 6px 0px #6ee7b7'
                                                : undefined,
                                        }}
                                    >
                                        <div className="flex items-center justify-between gap-1">
                                            <span
                                                className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                                    isSelected
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-white/80 text-slate-600'
                                                }`}
                                            >
                                                {room.code}
                                            </span>
                                            <span
                                                className={`w-2 h-2 rounded-full shrink-0 ${
                                                    isSelected
                                                        ? 'bg-white'
                                                        : isBooked
                                                          ? 'bg-amber-500'
                                                          : 'bg-emerald-500'
                                                }`}
                                            />
                                        </div>
                                        <p
                                            className={`mt-2 text-[11px] font-extrabold leading-snug line-clamp-2 ${
                                                isSelected ? 'text-white' : 'text-slate-900'
                                            }`}
                                        >
                                            {room.shortName}
                                        </p>
                                        <p
                                            className={`mt-1 text-[9px] font-semibold ${
                                                isSelected ? 'text-blue-100' : 'text-slate-500'
                                            }`}
                                        >
                                            {room.capacity} {t('rooms.people', 'orang')}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Entrance Indicator */}
                        <div className="mt-4 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[9px] font-bold text-slate-400">
                            <span>▲ {t('rooms.map_entrance', 'Akses Tangga & Koridor')}</span>
                            <span>{t('rooms.map_hint', 'Klik blok ruangan untuk detail')}</span>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10.5px] text-slate-500">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            {t('rooms.status_available', 'Tersedia')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            {t('rooms.status_booked', 'Terjadwal')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                            {t('rooms.map_selected', 'Dipilih')}
                        </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                        {t('rooms.map_desktop_tip', 'Gunakan tombol putar & zoom untuk meninjau posisi ruangan.')}
                    </span>
                </div>
            </div>

            {/* Right Inspector Card for Selected Room */}
            <aside className="xl:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between">
                {selectedRoom ? (
                    <div>
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                            <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-700">
                                {selectedRoom.code}
                            </span>
                            <span
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                    selectedRoom.status === 'booked'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}
                            >
                                {selectedRoom.status === 'booked'
                                    ? t('rooms.status_booked', 'Terjadwal')
                                    : t('rooms.status_available', 'Tersedia')}
                            </span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 mt-4 leading-snug">
                            {selectedRoom.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-blue-600 mt-1">
                            {selectedRoom.floor} • {selectedRoom.category}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-3">
                            {selectedRoom.description}
                        </p>

                        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                                <Icon name="users" className="w-3.5 h-3.5 text-slate-400" />
                                {t('rooms.capacity', 'Kapasitas:')}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800">
                                {selectedRoom.capacity} {t('rooms.people', 'orang')}
                            </span>
                        </div>

                        <div className="mt-4">
                            <p className="text-[10.5px] font-bold text-slate-700 mb-2">
                                {t('rooms.facilities_label', 'Fasilitas Ruangan')}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedRoom.facilities?.map((facility) => (
                                    <span
                                        key={facility}
                                        className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg"
                                    >
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <a
                        href="/bookings/create"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                    >
                        <Icon name="plus" className="w-4 h-4" />
                        {t('rooms.apply_room', 'Ajukan Ruangan')}
                    </a>
                    <a
                        href="/calendar"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <Icon name="calendar" className="w-4 h-4" />
                        {t('rooms.view_schedule', 'Lihat Jadwal')}
                    </a>
                </div>
            </aside>
        </div>
    );
}
