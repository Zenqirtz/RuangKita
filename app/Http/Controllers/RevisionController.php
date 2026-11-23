<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RevisionController extends Controller
{
    /**
     * Display list of permits requiring revision.
     */
    public function index(Request $request): Response
    {
        $revisions = Permit::query()
            ->where('stage', 'revision')
            ->latest('updated_at')
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
                'notes' => $p->admin_notes,
                'submittedAt' => $p->submitted_at?->diffForHumans() ?? '-',
            ]);

        return Inertia::render('Revisions', [
            'revisions' => $revisions,
        ]);
    }
}
