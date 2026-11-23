<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    /**
     * Display live availability calendar powered by real database records.
     */
    public function index(Request $request): Response
    {
        $today = Carbon::today();

        // Determine current viewing week (defaults to current week's Monday)
        $startParam = $request->query('start');
        $startOfWeek = $startParam
            ? Carbon::parse($startParam)->startOfWeek(Carbon::MONDAY)
            : $today->copy()->startOfWeek(Carbon::MONDAY);

        $endOfWeek = $startOfWeek->copy()->endOfWeek(Carbon::SUNDAY);

        // Fetch permits within the target week
        $permits = Permit::query()
            ->whereBetween('date', [
                $startOfWeek->format('Y-m-d'),
                $endOfWeek->format('Y-m-d'),
            ])
            ->whereIn('stage', ['submitted', 'admin', 'leadership', 'approved', 'revision'])
            ->get();

        $events = $permits->map(function (Permit $p) {
            $dayOfWeek = $p->date->dayOfWeekIso; // 1 (Mon) - 7 (Sun)
            $status = match ($p->stage) {
                'approved' => 'approved',
                'revision' => 'revision',
                default => 'pending',
            };

            return [
                'id' => $p->id,
                'code' => $p->code,
                'title' => $p->event,
                'roomId' => (int) $p->room_id,
                'roomName' => $p->room_name,
                'day' => $dayOfWeek,
                'date' => $p->date->format('Y-m-d'),
                'start' => substr($p->start, 0, 5),
                'end' => substr($p->end, 0, 5),
                'status' => $status,
                'ormawa' => $p->ormawa,
            ];
        })->values()->all();

        // Build 7 days array
        $dayLabels = [
            1 => 'Sen',
            2 => 'Sel',
            3 => 'Rab',
            4 => 'Kam',
            5 => 'Jum',
            6 => 'Sab',
            7 => 'Min',
        ];

        $days = [];
        for ($i = 0; $i < 7; $i++) {
            $currentDay = $startOfWeek->copy()->addDays($i);
            $days[] = [
                'day' => $i + 1,
                'label' => $dayLabels[$i + 1],
                'date' => (int) $currentDay->format('j'),
                'iso' => $currentDay->translatedFormat('d M'),
                'fullDate' => $currentDay->format('Y-m-d'),
                'isToday' => $currentDay->isSameDay($today),
            ];
        }

        // Week Label, e.g. "23 - 29 Nov 2026"
        $weekLabel = sprintf(
            '%s - %s %s',
            $startOfWeek->format('j'),
            $endOfWeek->format('j'),
            $endOfWeek->translatedFormat('M Y')
        );

        // Compute live stats
        $scheduledCount = $permits->where('stage', 'approved')->count();
        $pendingCount = Permit::whereIn('stage', ['submitted', 'admin', 'leadership'])->count();
        $activeRoomsCount = 5;

        // Estimated available slots % (5 rooms * 7 days * 14 hours = 490 available hour slots)
        $totalSlotHours = $activeRoomsCount * 7 * 14;
        $bookedHours = $permits->where('stage', 'approved')->reduce(function ($carry, $p) {
            $startHour = (int) substr($p->start, 0, 2);
            $endHour = (int) substr($p->end, 0, 2);

            return $carry + max(1, $endHour - $startHour);
        }, 0);

        $availableSlotPct = max(0, min(100, round((($totalSlotHours - $bookedHours) / $totalSlotHours) * 100)));

        // Real Room Statuses Today
        $todayPermits = Permit::query()
            ->whereDate('date', $today)
            ->where('stage', 'approved')
            ->get();

        $roomsData = [
            ['id' => 1, 'name' => 'Auditorium Gedung Utama', 'shortName' => 'Auditorium', 'capacity' => 250],
            ['id' => 2, 'name' => 'Student Center Hall', 'shortName' => 'Student Center', 'capacity' => 120],
            ['id' => 3, 'name' => 'Ruang Rapat Ormawa 101', 'shortName' => 'Ruang Rapat 101', 'capacity' => 40],
            ['id' => 4, 'name' => 'Lab Multimedia & Komputer', 'shortName' => 'Lab Multimedia', 'capacity' => 40],
            ['id' => 5, 'name' => 'Amphitheater Terbuka', 'shortName' => 'Amphitheater', 'capacity' => 200],
        ];

        $todayRoomStatuses = array_map(function ($room) use ($todayPermits) {
            $booked = $todayPermits->firstWhere('room_id', $room['id']);

            return [
                'id' => $room['id'],
                'name' => $room['name'],
                'shortName' => $room['shortName'],
                'capacity' => $room['capacity'],
                'hasSchedule' => (bool) $booked,
                'statusLabel' => $booked ? 'Ada jadwal' : 'Tidak ada jadwal',
                'eventToday' => $booked?->event,
                'hoursToday' => $booked ? "{$booked->start} - {$booked->end}" : null,
            ];
        }, $roomsData);

        // Compute empty slots available
        $availableSlots = [];
        foreach ($roomsData as $room) {
            $isBookedToday = $todayPermits->contains('room_id', $room['id']);
            if (! $isBookedToday) {
                $availableSlots[] = [
                    'roomId' => $room['id'],
                    'room' => $room['shortName'],
                    'time' => 'Hari ini, 08.00 - 21.00',
                    'tone' => 'emerald',
                ];
            } else {
                $availableSlots[] = [
                    'roomId' => $room['id'],
                    'room' => $room['shortName'],
                    'time' => 'Besok, 08.00 - 17.00',
                    'tone' => 'blue',
                ];
            }
        }
        $availableSlots = array_slice($availableSlots, 0, 3);

        return Inertia::render('Calendar', [
            'events' => $events,
            'days' => $days,
            'weekLabel' => $weekLabel,
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'prevWeek' => $startOfWeek->copy()->subWeek()->format('Y-m-d'),
            'nextWeek' => $startOfWeek->copy()->addWeek()->format('Y-m-d'),
            'todayIso' => $today->format('Y-m-d'),
            'stats' => [
                'availableSlotPct' => $availableSlotPct,
                'scheduledCount' => $scheduledCount,
                'pendingCount' => $pendingCount,
                'activeRoomsCount' => $activeRoomsCount,
            ],
            'todayRoomStatuses' => $todayRoomStatuses,
            'availableSlots' => $availableSlots,
        ]);
    }
}
