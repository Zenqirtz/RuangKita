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
        $user = $request->user();
        $scopeAll = $user->canViewAllPermits();

        $permitQuery = Permit::query()->when(! $scopeAll, fn ($query) => $query->where('user_id', $user->id));

        $recentPermits = (clone $permitQuery)
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

        $totalPermits = (clone $permitQuery)->count();
        $adminReviewCount = (clone $permitQuery)->where('stage', 'admin')->count();
        $leadershipCount = (clone $permitQuery)->where('stage', 'leadership')->count();
        $approvedCount = (clone $permitQuery)->where('stage', 'approved')->count();
        $revisionCount = (clone $permitQuery)->where('stage', 'revision')->count();

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
