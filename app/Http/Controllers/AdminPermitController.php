<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use App\Models\PermitHistory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AdminPermitController extends Controller
{
    /**
     * Process admin review action: approve, request revision, or reject.
     */
    public function updateStatus(Request $request, string $permit): RedirectResponse
    {
        if (! $request->user()?->isAdmin()) {
            abort(403, 'Akses terbatas hanya untuk Administrator Kemahasiswaan.');
        }

        $permitModel = Permit::where('code', $permit)->orWhere('id', $permit)->firstOrFail();

        $validated = $request->validate([
            'action' => ['required', 'string', 'in:approve,revision,reject'],
            'target' => ['nullable', 'string', 'in:leadership,approved'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $prevStage = $permitModel->stage;
        $notes = $validated['notes'] ?? null;

        if ($validated['action'] === 'approve') {
            $target = $validated['target'] ?? null;
            if ($target === 'approved' || $prevStage === 'leadership' || $prevStage === 'approved') {
                $nextStage = 'approved';
                $defaultNotes = 'Izin peminjaman ruangan telah disetujui lengkap oleh pihak fakultas dan surat izin siap diunduh.';
            } else {
                $nextStage = 'leadership';
                $defaultNotes = 'Verifikasi berkas lolos oleh Admin Kemahasiswaan. Berkas diteruskan ke Pimpinan/WD III.';
            }
            $actionLabel = 'approved';
        } elseif ($validated['action'] === 'revision') {
            $nextStage = 'revision';
            $defaultNotes = 'Catatan revisi: Dokumen perlu perbaikan sesuai rincian.';
            $actionLabel = 'revision_requested';
        } else {
            $nextStage = 'rejected';
            $defaultNotes = 'Pengajuan ditolak oleh Administrator karena tidak memenuhi persyaratan kegiatan.';
            $actionLabel = 'rejected';
        }

        $finalNotes = $notes ?: $defaultNotes;

        $permitModel->update([
            'stage' => $nextStage,
            'admin_notes' => $finalNotes,
        ]);

        PermitHistory::create([
            'permit_id' => $permitModel->id,
            'user_id' => $request->user()->id,
            'actor_name' => $request->user()->name,
            'from_stage' => $prevStage,
            'to_stage' => $nextStage,
            'action' => $actionLabel,
            'notes' => $finalNotes,
        ]);

        return back()->with('status', "Status pengajuan {$permitModel->code} berhasil diperbarui.");
    }
}
