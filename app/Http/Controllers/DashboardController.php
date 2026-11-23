<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display real dashboard metrics and recent permits.
     */
    public function index(Request $request): Response
    {
        $recentPermits = Permit::query()
            ->latest('submitted_at')
            ->take(5)
            ->get()
            ->map(fn (Permit $p) => [
                'id' => $p->code,
                'event' => $p->event,
                'ormawa' => $p->ormawa,
                'room' => $p->room_name,
                'roomId' => $p->room_id,
                'date' => $p->date->translatedFormat('d M Y'),
                'isoDate' => $p->date->format('Y-m-d'),
                'time' => "{$p->start} - {$p->end}",
                'stage' => $p->stage,
                'submittedAt' => $p->submitted_at?->diffForHumans() ?? 'baru saja',
            ]);

        $totalPermits = Permit::count();
        $adminReviewCount = Permit::where('stage', 'admin')->count();
        $leadershipCount = Permit::where('stage', 'leadership')->count();
        $approvedCount = Permit::where('stage', 'approved')->count();
        $revisionCount = Permit::where('stage', 'revision')->count();

        // Calculate occupancy percentage based on approved permits
        $occupancyRate = $totalPermits > 0
            ? round(($approvedCount / $totalPermits) * 100)
            : 0;

        return Inertia::render('RuangKitaDashboard', [
            'recentPermits' => $recentPermits,
            'stats' => [
                'total' => $totalPermits,
                'adminReview' => $adminReviewCount,
                'leadership' => $leadershipCount,
                'approved' => $approvedCount,
                'revision' => $revisionCount,
                'occupancyRate' => $occupancyRate,
            ],
        ]);
    }
}
