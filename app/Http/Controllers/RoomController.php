<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /**
     * Display rooms list with dynamic occupancy and availability calculated from DB.
     */
    public function index(Request $request): Response
    {
        $today = Carbon::today();

        // Get approved permits for today
        $todayApprovedPermits = Permit::query()
            ->whereDate('date', $today)
            ->where('stage', 'approved')
            ->get();

        // Get all approved permits this month to calculate occupancy per room
        $startOfMonth = $today->copy()->startOfMonth();
        $endOfMonth = $today->copy()->endOfMonth();
        $monthApprovedPermits = Permit::query()
            ->whereBetween('date', [$startOfMonth->format('Y-m-d'), $endOfMonth->format('Y-m-d')])
            ->where('stage', 'approved')
            ->get();

        $roomsData = [
            [
                'id' => 1,
                'name' => 'Auditorium Gedung Utama',
                'shortName' => 'Auditorium',
                'code' => 'AUD-01',
                'capacity' => 250,
                'floor' => 'Lantai 1, Gedung A',
                'accent' => 'blue',
                'facilities' => ['Proyektor & LED Screen', 'Sound System', 'AC', 'Panggung', 'Wi-Fi'],
                'description' => 'Ruang serbaguna terbesar untuk seminar, wisuda fakultas, dan acara ormawa berskala besar.',
            ],
            [
                'id' => 2,
                'name' => 'Student Center Hall',
                'shortName' => 'Student Center',
                'code' => 'SCH-02',
                'capacity' => 120,
                'floor' => 'Lantai 2, Gedung B',
                'accent' => 'emerald',
                'facilities' => ['AC', 'Peredam Suara', 'Sound Mini', 'Matras Portabel', 'Wi-Fi'],
                'description' => 'Pusat kegiatan ormawa untuk latihan tari, teater, rapat pleno, dan pameran karya.',
            ],
            [
                'id' => 3,
                'name' => 'Ruang Rapat Ormawa 101',
                'shortName' => 'Ruang Rapat 101',
                'code' => 'RR-101',
                'capacity' => 40,
                'floor' => 'Lantai 1, Gedung C',
                'accent' => 'violet',
                'facilities' => ['Smart TV 65"', 'Meja Konferensi', 'Whiteboard', 'AC', 'Webcam Group'],
                'description' => 'Ruang rapat formal dengan perangkat video conference untuk rapat kerja dan audiensi.',
            ],
            [
                'id' => 4,
                'name' => 'Lab Multimedia & Komputer',
                'shortName' => 'Lab Multimedia',
                'code' => 'LAB-MM',
                'capacity' => 40,
                'floor' => 'Lantai 3, Gedung A',
                'accent' => 'amber',
                'facilities' => ['35 PC Core i7', 'Software Adobe & Blender', 'LAN Gigabit', 'AC', 'UPS'],
                'description' => 'Laboratorium berdaya komputasi tinggi untuk pelatihan desain, editing video, dan sertifikasi.',
            ],
            [
                'id' => 5,
                'name' => 'Amphitheater Terbuka',
                'shortName' => 'Amphitheater',
                'code' => 'AMP-05',
                'capacity' => 200,
                'floor' => 'Area Plaza Tengah',
                'accent' => 'rose',
                'facilities' => ['Tribun Bertingkat', 'Panggung Terbuka', 'Pencahayaan Sorot', 'Stopkontak', 'Wi-Fi Outdoor'],
                'description' => 'Panggung terbuka semi-outdoor untuk pentas musik akustik, nobar, dan orasi kepengurusan.',
            ],
        ];

        // 30 days * 14 hours per month = 420 slot hours per room
        $maxHoursPerMonth = 30 * 14;

        $totalCapacity = 0;
        $roomsWithStatus = [];
        $occupiedCountToday = 0;

        foreach ($roomsData as $room) {
            $totalCapacity += $room['capacity'];

            $isBookedToday = $todayApprovedPermits->contains('room_id', $room['id']);
            if ($isBookedToday) {
                $occupiedCountToday++;
            }

            // Calculate room occupancy based on booked hours this month
            $roomBookedHours = $monthApprovedPermits
                ->where('room_id', $room['id'])
                ->reduce(function ($carry, $p) {
                    $start = (int) substr($p->start, 0, 2);
                    $end = (int) substr($p->end, 0, 2);

                    return $carry + max(1, $end - $start);
                }, 0);

            $occupancyRate = round(($roomBookedHours / $maxHoursPerMonth) * 100);

            $roomsWithStatus[] = array_merge($room, [
                'status' => $isBookedToday ? 'booked' : 'available',
                'occupancy' => min(100, max(0, $occupancyRate)),
            ]);
        }

        $totalRooms = count($roomsData);
        $availableTodayCount = $totalRooms - $occupiedCountToday;

        $avgOccupancy = round(collect($roomsWithStatus)->avg('occupancy') ?? 0);

        return Inertia::render('Rooms', [
            'rooms' => $roomsWithStatus,
            'stats' => [
                'totalRooms' => $totalRooms,
                'availableToday' => $availableTodayCount,
                'totalCapacity' => $totalCapacity,
                'avgOccupancy' => $avgOccupancy,
            ],
        ]);
    }
}
