<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use App\Models\PermitHistory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class PermitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $permits = Permit::query()
            ->latest('submitted_at')
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
                'start' => $p->start,
                'end' => $p->end,
                'stage' => $p->stage,
                'submittedAt' => $p->submitted_at?->diffForHumans() ?? 'baru saja',
            ]);

        $activeCount = Permit::whereNotIn('stage', ['approved', 'rejected'])->count();
        $approvedCount = Permit::where('stage', 'approved')->count();
        $revisionCount = Permit::where('stage', 'revision')->count();
        $totalCount = Permit::count();

        return Inertia::render('Permits/Index', [
            'permits' => $permits,
            'stats' => [
                'total' => $totalCount,
                'active' => $activeCount,
                'approved' => $approvedCount,
                'revision' => $revisionCount,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $permitCode): Response
    {
        $permit = Permit::with('histories')
            ->where('code', $permitCode)
            ->first();

        if (! $permit) {
            $permit = Permit::with('histories')->latest()->firstOrFail();
        }

        return Inertia::render('Permits/Show', [
            'permit' => [
                'id' => $permit->code,
                'numericId' => $permit->id,
                'event' => $permit->event,
                'ormawa' => $permit->ormawa,
                'pic' => $permit->pic,
                'phone' => $permit->phone,
                'room' => $permit->room_name,
                'roomId' => $permit->room_id,
                'date' => $permit->date->translatedFormat('d M Y'),
                'isoDate' => $permit->date->format('Y-m-d'),
                'time' => "{$permit->start} - {$permit->end}",
                'start' => $permit->start,
                'end' => $permit->end,
                'participants' => $permit->participants,
                'notes' => $permit->notes,
                'proposalName' => $permit->proposal_name ?? 'Proposal_Kegiatan.pdf',
                'letterName' => $permit->letter_name ?? 'Surat_Permohonan.pdf',
                'stage' => $permit->stage,
                'adminNotes' => $permit->admin_notes,
                'submittedAt' => $permit->submitted_at?->diffForHumans() ?? 'baru saja',
                'histories' => $permit->histories->map(fn (PermitHistory $h) => [
                    'id' => $h->id,
                    'actor' => $h->actor_name,
                    'fromStage' => $h->from_stage,
                    'toStage' => $h->to_stage,
                    'action' => $h->action,
                    'notes' => $h->notes,
                    'time' => $h->created_at->diffForHumans(),
                ]),
            ],
        ]);
    }

    /**
     * Download the approval letter for an approved permit.
     */
    public function downloadLetter(string $permitCode): View|HttpResponse
    {
        $permit = Permit::query()
            ->where('code', $permitCode)
            ->firstOrFail();

        abort_unless($permit->stage === 'approved', 404);

        return response()->view('permits.letter', ['permit' => $permit]);
    }

    /**
     * Show the form for creating a new booking.
     */
    public function create(Request $request): Response
    {
        $existingBookings = Permit::query()
            ->whereIn('stage', ['submitted', 'admin', 'leadership', 'approved'])
            ->whereDate('date', '>=', now()->toDateString())
            ->get(['id', 'code', 'room_id', 'date', 'start', 'end', 'event', 'stage'])
            ->map(fn (Permit $p) => [
                'id' => $p->code,
                'roomId' => (int) $p->room_id,
                'isoDate' => $p->date->format('Y-m-d'),
                'start' => substr($p->start, 0, 5),
                'end' => substr($p->end, 0, 5),
                'event' => $p->event,
                'stage' => $p->stage,
            ]);

        return Inertia::render('Bookings/Create', [
            'existingBookings' => $existingBookings,
            'preselectedRoomId' => $request->query('room_id'),
            'minDate' => now()->toDateString(),
        ]);
    }

    /**
     * Store a newly created permit from booking form.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'event' => ['required', 'string', 'max:255'],
            'ormawa' => ['required', 'string', 'max:255'],
            'pic' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'roomId' => ['required', 'integer'],
            'roomName' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'start' => ['required', 'string', 'max:10'],
            'end' => ['required', 'string', 'max:10'],
            'participants' => ['nullable', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
            'proposalFile' => ['nullable', 'string'],
            'letterFile' => ['nullable', 'string'],
        ]);

        $count = Permit::count() + 1;
        $code = sprintf('RK-%s-%03d', date('Y'), $count);

        $permit = Permit::create([
            'code' => $code,
            'user_id' => $request->user()?->id,
            'event' => $validated['event'],
            'ormawa' => $validated['ormawa'],
            'pic' => $validated['pic'],
            'phone' => $validated['phone'] ?? null,
            'room_id' => $validated['roomId'],
            'room_name' => $validated['roomName'],
            'date' => $validated['date'],
            'start' => $validated['start'],
            'end' => $validated['end'],
            'participants' => $validated['participants'] ?? 1,
            'notes' => $validated['notes'] ?? null,
            'proposal_name' => $validated['proposalFile'] ?: 'Proposal_Kegiatan.pdf',
            'letter_name' => $validated['letterFile'] ?: 'Surat_Permohonan.pdf',
            'stage' => 'admin',
            'admin_notes' => 'Menunggu verifikasi kelengkapan berkas oleh Admin Bagian Kemahasiswaan.',
            'submitted_at' => now(),
        ]);

        PermitHistory::create([
            'permit_id' => $permit->id,
            'user_id' => $request->user()?->id,
            'actor_name' => $request->user()?->name ?? $validated['pic'],
            'from_stage' => 'submitted',
            'to_stage' => 'admin',
            'action' => 'submitted',
            'notes' => 'Pengajuan berkas izin peminjaman ruangan berhasil dikirim.',
        ]);

        return redirect()->route('permits.show', $permit->code)
            ->with('success', "Pengajuan {$permit->code} berhasil dikirim ke Admin!");
    }
}
