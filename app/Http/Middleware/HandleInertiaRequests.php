<?php

namespace App\Http\Middleware;

use App\Models\Permit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $badgeCounts = [
            'tracking' => 0,
            'revisions' => 0,
        ];
        $notifications = [];

        if (Schema::hasTable('permits')) {
            $user = $request->user();
            $scopeAll = $user?->canViewAllPermits() ?? false;

            $badgeCounts['tracking'] = Permit::query()
                ->whereIn('stage', ['submitted', 'admin', 'leadership'])
                ->when($user && ! $scopeAll, fn ($query) => $query->where('user_id', $user->id))
                ->count();

            $badgeCounts['revisions'] = Permit::query()
                ->where('stage', 'revision')
                ->when($user && ! $scopeAll, fn ($query) => $query->where('user_id', $user->id))
                ->count();

            $notifications = Permit::query()
                ->when($user && ! $scopeAll, fn ($query) => $query->where('user_id', $user->id))
                ->latest('updated_at')
                ->take(5)
                ->get()
                ->map(function (Permit $p) {
                    $type = match ($p->stage) {
                        'revision' => 'revision',
                        'approved' => 'success',
                        default => 'info',
                    };

                    $title = match ($p->stage) {
                        'revision' => "Perlu Revisi: {$p->event}",
                        'approved' => "Izin Disetujui: {$p->event}",
                        'rejected' => "Pengajuan Ditolak: {$p->event}",
                        'leadership' => "Tahap Pimpinan: {$p->event}",
                        default => "Verifikasi Berkas: {$p->event}",
                    };

                    return [
                        'id' => $p->code,
                        'type' => $type,
                        'title' => $title,
                        'description' => $p->admin_notes ?: "Ruangan: {$p->room_name} ({$p->date?->format('d M Y')})",
                        'time' => $p->updated_at?->diffForHumans() ?? 'Baru saja',
                        'href' => "/permits/{$p->code}",
                    ];
                })
                ->values()
                ->all();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'badgeCounts' => $badgeCounts,
            'notifications' => $notifications,
        ];
    }
}
