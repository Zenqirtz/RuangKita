import React, { useMemo, useState } from 'react';
import Icon from '@/Components/RuangKita/Icon';
import { useLanguage } from '@/Context/LanguageContext';

// Standard 2:1 isometric projection helper
function iso(x, y, z, originX = 360, originY = 470) {
    return {
        x: originX + (x - y) * 0.88,
        y: originY + (x + y) * 0.44 - z,
    };
}

function pts(points) {
    return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

function IsoBox({ x, y, z, w, d, h, topFill, leftFill, rightFill, stroke, strokeWidth = 1, onClick, onMouseEnter, onMouseLeave, className = '', originX, originY, children }) {
    const pTop = [
        iso(x, y, z + h, originX, originY),
        iso(x + w, y, z + h, originX, originY),
        iso(x + w, y + d, z + h, originX, originY),
        iso(x, y + d, z + h, originX, originY),
    ];
    const pLeft = [
        iso(x, y + d, z + h, originX, originY),
        iso(x + w, y + d, z + h, originX, originY),
        iso(x + w, y + d, z, originX, originY),
        iso(x, y + d, z, originX, originY),
    ];
    const pRight = [
        iso(x + w, y, z + h, originX, originY),
        iso(x + w, y + d, z + h, originX, originY),
        iso(x + w, y + d, z, originX, originY),
        iso(x + w, y, z, originX, originY),
    ];

    const center = iso(x + w / 2, y + d / 2, z + h, originX, originY);

    return (
        <g
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={className}
        >
            <polygon points={pts(pLeft)} fill={leftFill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points={pts(pRight)} fill={rightFill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            <polygon points={pts(pTop)} fill={topFill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
            {children ? children(center) : null}
        </g>
    );
}

const VETERAN_FLOORS = [
    {
        floor: 1,
        label: 'Lt. 1',
        title: 'Lantai 1 • Kelas & Seminar',
        z: 0,
        rooms: [
            { id: 1, x: 14, y: 14, w: 72, d: 78 },
            { id: 2, x: 96, y: 14, w: 72, d: 78 },
            { id: 19, x: 178, y: 14, w: 78, d: 78 },
            { id: 4, x: 14, y: 118, w: 138, d: 76 },
            { id: 21, x: 162, y: 118, w: 94, d: 76 },
        ],
    },
    {
        floor: 2,
        label: 'Lt. 2',
        title: 'Lantai 2 • Studio & Meeting',
        z: 118,
        rooms: [
            { id: 8, x: 14, y: 14, w: 74, d: 78 },
            { id: 9, x: 98, y: 14, w: 74, d: 78 },
            { id: 10, x: 182, y: 14, w: 74, d: 78 },
            { id: 15, x: 14, y: 118, w: 74, d: 76 },
            { id: 18, x: 98, y: 118, w: 74, d: 76 },
            { id: 17, x: 182, y: 118, w: 74, d: 76 },
        ],
    },
    {
        floor: 3,
        label: 'Lt. 3',
        title: 'Lantai 3 • Lab Komputer & Riset',
        z: 236,
        rooms: [
            { id: 5, x: 14, y: 14, w: 74, d: 78 },
            { id: 6, x: 98, y: 14, w: 74, d: 78 },
            { id: 7, x: 182, y: 14, w: 74, d: 78 },
            { id: 3, x: 14, y: 118, w: 54, d: 76 },
            { id: 11, x: 76, y: 118, w: 54, d: 76 },
            { id: 12, x: 138, y: 118, w: 54, d: 76 },
            { id: 16, x: 200, y: 118, w: 56, d: 76 },
        ],
    },
];

const DIENG_FLOOR = {
    floor: 1,
    label: 'Dieng',
    title: 'Kampus Vokasi Dieng',
    z: 40,
    rooms: [
        { id: 13, x: 16, y: 20, w: 74, d: 160 },
        { id: 14, x: 100, y: 20, w: 74, d: 160 },
        { id: 20, x: 184, y: 20, w: 72, d: 160 },
    ],
};

function getRoomPalette(isSelected, isHovered, isBooked) {
    if (isSelected) {
        return {
            top: '#2563EB',
            left: '#1D4ED8',
            right: '#1E40AF',
            stroke: '#1E3A8A',
            text: '#FFFFFF',
            subText: '#DBEAFE',
        };
    }
    if (isHovered) {
        return {
            top: '#60A5FA',
            left: '#3B82F6',
            right: '#2563EB',
            stroke: '#1D4ED8',
            text: '#FFFFFF',
            subText: '#EFF6FF',
        };
    }
    if (isBooked) {
        return {
            top: '#FDE68A',
            left: '#F59E0B',
            right: '#D97706',
            stroke: '#B45309',
            text: '#78350F',
            subText: '#92400E',
        };
    }
    return {
        top: '#D1FAE5',
        left: '#34D399',
        right: '#10B981',
        stroke: '#059669',
        text: '#064E3B',
        subText: '#047857',
    };
}

export default function RoomFloorPlan3D({ rooms = [] }) {
    const { t } = useLanguage();
    const [campus, setCampus] = useState('veteran'); // 'veteran' | 'dieng'
    const [focusFloor, setFocusFloor] = useState('all'); // 'all' | 1 | 2 | 3
    const [selectedRoomId, setSelectedRoomId] = useState(1);
    const [hoveredRoomId, setHoveredRoomId] = useState(null);

    const roomMap = useMemo(() => {
        const map = {};
        rooms.forEach((r) => {
            map[Number(r.id)] = r;
        });
        return map;
    }, [rooms]);

    const visibleFloors = useMemo(() => {
        if (campus === 'dieng') {
            return [DIENG_FLOOR];
        }
        if (focusFloor === 'all') {
            return VETERAN_FLOORS;
        }
        return VETERAN_FLOORS.filter((f) => f.floor === focusFloor).map((f) => ({
            ...f,
            z: 60, // center single floor cleanly in viewport
        }));
    }, [campus, focusFloor]);

    const selectedRoom = useMemo(() => {
        return roomMap[Number(selectedRoomId)] ?? rooms[0];
    }, [roomMap, selectedRoomId, rooms]);

    const handleCampusChange = (nextCampus) => {
        setCampus(nextCampus);
        setFocusFloor('all');
        setSelectedRoomId(nextCampus === 'dieng' ? 13 : 1);
    };

    const originX = 365;
    const originY = campus === 'veteran' && focusFloor === 'all' ? 475 : 320;
    const viewBoxHeight = campus === 'veteran' && focusFloor === 'all' ? 620 : 460;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
            {/* 3D Isometric Building Viewport */}
            <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between overflow-hidden">
                {/* Top Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => handleCampusChange('veteran')}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                                campus === 'veteran'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Gedung Kampus Veteran (3 Lt)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCampusChange('dieng')}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                                campus === 'dieng'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            Gedung Kampus Dieng
                        </button>
                    </div>

                    {campus === 'veteran' && (
                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                            {[
                                { id: 'all', label: 'Gedung Utuh' },
                                { id: 1, label: 'Lt. 1' },
                                { id: 2, label: 'Lt. 2' },
                                { id: 3, label: 'Lt. 3' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setFocusFloor(tab.id)}
                                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                                        focusFloor === tab.id
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Isometric Building SVG Canvas */}
                <div className="relative my-3 rounded-2xl bg-gradient-to-b from-sky-50/70 via-blue-50/30 to-slate-100/70 border border-slate-100 overflow-hidden flex items-center justify-center">
                    {/* Subtle Grid */}
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                        }}
                    />

                    <svg
                        viewBox={`0 0 740 ${viewBoxHeight}`}
                        className="w-full h-auto max-h-[540px] relative z-10 select-none"
                    >
                        {/* Ground Shadow & Base */}
                        <IsoBox
                            x={-16}
                            y={-16}
                            z={-12}
                            w={302}
                            d={242}
                            h={12}
                            topFill="#E2E8F0"
                            leftFill="#CBD5E1"
                            rightFill="#94A3B8"
                            stroke="#CBD5E1"
                            originX={originX}
                            originY={originY}
                        />

                        {/* Campus Entrance Canopy Marker */}
                        <IsoBox
                            x={105}
                            y={212}
                            z={0}
                            w={60}
                            d={18}
                            h={8}
                            topFill="#93C5FD"
                            leftFill="#3B82F6"
                            rightFill="#2563EB"
                            stroke="#1D4ED8"
                            originX={originX}
                            originY={originY}
                        >
                            {(c) => (
                                <text
                                    x={c.x}
                                    y={c.y + 3}
                                    textAnchor="middle"
                                    fontSize="8.5"
                                    fontWeight="800"
                                    fill="#1E3A8A"
                                >
                                    PINTU UTAMA
                                </text>
                            )}
                        </IsoBox>

                        {/* Render Stacked Building Floors (bottom to top) */}
                        {visibleFloors.map((floorObj) => {
                            const fz = floorObj.z;
                            const labelPos = iso(-24, 105, fz + 20, originX, originY);

                            return (
                                <g key={floorObj.floor}>
                                    {/* Floor Slab */}
                                    <IsoBox
                                        x={0}
                                        y={0}
                                        z={fz}
                                        w={270}
                                        d={210}
                                        h={12}
                                        topFill="#F8FAFC"
                                        leftFill="#E2E8F0"
                                        rightFill="#CBD5E1"
                                        stroke="#94A3B8"
                                        strokeWidth={1.2}
                                        originX={originX}
                                        originY={originY}
                                    />

                                    {/* Structural Corner Pillars (when stacked 3-story) */}
                                    {campus === 'veteran' && focusFloor === 'all' && floorObj.floor < 3 && (
                                        <>
                                            <IsoBox x={2} y={2} z={fz + 12} w={8} d={8} h={106} topFill="#CBD5E1" leftFill="#94A3B8" rightFill="#64748B" stroke="#64748B" originX={originX} originY={originY} />
                                            <IsoBox x={260} y={2} z={fz + 12} w={8} d={8} h={106} topFill="#CBD5E1" leftFill="#94A3B8" rightFill="#64748B" stroke="#64748B" originX={originX} originY={originY} />
                                            <IsoBox x={2} y={200} z={fz + 12} w={8} d={8} h={106} topFill="#CBD5E1" leftFill="#94A3B8" rightFill="#64748B" stroke="#64748B" originX={originX} originY={originY} />
                                            <IsoBox x={260} y={200} z={fz + 12} w={8} d={8} h={106} topFill="#CBD5E1" leftFill="#94A3B8" rightFill="#64748B" stroke="#64748B" originX={originX} originY={originY} />
                                        </>
                                    )}

                                    {/* Floor Label Tag on Left */}
                                    <g transform={`translate(${labelPos.x - 42}, ${labelPos.y - 10})`}>
                                        <rect
                                            x="0"
                                            y="0"
                                            width="48"
                                            height="20"
                                            rx="6"
                                            fill="#1E293B"
                                        />
                                        <text
                                            x="24"
                                            y="13.5"
                                            textAnchor="middle"
                                            fontSize="9.5"
                                            fontWeight="800"
                                            fill="#FFFFFF"
                                        >
                                            {floorObj.label}
                                        </text>
                                    </g>

                                    {/* 3D Extruded Room Blocks */}
                                    {floorObj.rooms.map((slot) => {
                                        const room = roomMap[slot.id];
                                        if (!room) return null;

                                        const isSelected = Number(selectedRoom?.id) === Number(room.id);
                                        const isHovered = Number(hoveredRoomId) === Number(room.id);
                                        const isBooked = room.status === 'booked';
                                        const palette = getRoomPalette(isSelected, isHovered, isBooked);
                                        const blockHeight = isSelected ? 34 : isHovered ? 30 : 25;

                                        return (
                                            <IsoBox
                                                key={room.id}
                                                x={slot.x}
                                                y={slot.y}
                                                z={fz + 12}
                                                w={slot.w}
                                                d={slot.d}
                                                h={blockHeight}
                                                topFill={palette.top}
                                                leftFill={palette.left}
                                                rightFill={palette.right}
                                                stroke={palette.stroke}
                                                strokeWidth={isSelected ? 1.6 : 1}
                                                originX={originX}
                                                originY={originY}
                                                className="cursor-pointer transition-opacity"
                                                onClick={() => setSelectedRoomId(room.id)}
                                                onMouseEnter={() => setHoveredRoomId(room.id)}
                                                onMouseLeave={() => setHoveredRoomId(null)}
                                            >
                                                {(center) => (
                                                    <text
                                                        x={center.x}
                                                        y={center.y + 3}
                                                        textAnchor="middle"
                                                        fontSize={slot.w < 60 ? '7.5' : '8.5'}
                                                        fontWeight="800"
                                                        fill={palette.text}
                                                        style={{ pointerEvents: 'none' }}
                                                    >
                                                        {room.shortName.length > 14
                                                            ? `${room.shortName.slice(0, 13)}…`
                                                            : room.shortName}
                                                    </text>
                                                )}
                                            </IsoBox>
                                        );
                                    })}
                                </g>
                            );
                        })}
                    </svg>
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
                        {t('rooms.map_hint', 'Klik blok ruangan pada gedung 3D untuk melihat detail & ajukan peminjaman.')}
                    </span>
                </div>
            </div>

            {/* Right Inspector Card */}
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
