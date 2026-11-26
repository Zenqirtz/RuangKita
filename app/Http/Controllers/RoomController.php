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

        $roomsData = config('rooms', []);

        $roomsWithStatus = [];
        $occupiedCountToday = 0;

        foreach ($roomsData as $room) {
            $isBookedToday = $todayApprovedPermits->contains('room_id', $room['id']);
            if ($isBookedToday) {
                $occupiedCountToday++;
            }

            $roomsWithStatus[] = array_merge($room, [
                'status' => $isBookedToday ? 'booked' : 'available',
            ]);
        }

        $totalRooms = count($roomsData);
        $availableTodayCount = $totalRooms - $occupiedCountToday;

        return Inertia::render('Rooms', [
            'rooms' => $roomsWithStatus,
            'stats' => [
                'totalRooms' => $totalRooms,
                'availableToday' => $availableTodayCount,
            ],
        ]);
    }
}
