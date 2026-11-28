<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    /**
     * Display completed permit history.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $scopeAll = $user->canViewAllPermits();

        $history = Permit::query()
            ->whereIn('stage', ['approved', 'rejected'])
            ->when(! $scopeAll, fn ($query) => $query->where('user_id', $user->id))
            ->latest('updated_at')
            ->get()
            ->map(function (Permit $p) {
                $startParts = explode(':', $p->start);
                $endParts = explode(':', $p->end);
                $startMinutes = ((int) ($startParts[0] ?? 0) * 60) + (int) ($startParts[1] ?? 0);
                $endMinutes = ((int) ($endParts[0] ?? 0) * 60) + (int) ($endParts[1] ?? 0);
                $durationHours = max(1, round(($endMinutes - $startMinutes) / 60));

                return [
                    'id' => $p->code,
                    'event' => $p->event,
                    'ormawa' => $p->ormawa,
                    'room' => $p->room_name,
                    'roomId' => $p->room_id,
                    'date' => $p->date->translatedFormat('d M Y'),
                    'time' => "{$p->start} - {$p->end}",
                    'duration' => "{$durationHours} jam",
                    'status' => $p->stage === 'approved' ? 'Disetujui' : 'Ditolak',
                    'stage' => $p->stage,
                ];
            });

        return Inertia::render('History', [
            'history' => $history,
        ]);
    }
}
