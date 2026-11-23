<?php

namespace Tests\Feature;

use App\Models\Permit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RevisionAndHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_revisions_page_renders_with_real_revisions(): void
    {
        Permit::create([
            'code' => 'RK-REV-001',
            'event' => 'Revisi Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'revision',
            'admin_notes' => 'Tolong lengkapi proposal',
        ]);

        $this->get('/revisions')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Revisions')
                ->has('revisions', 1)
                ->where('revisions.0.id', 'RK-REV-001')
            );
    }

    public function test_history_page_renders_with_completed_permits(): void
    {
        Permit::create([
            'code' => 'RK-HIST-001',
            'event' => 'Approved Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'Jane',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-20',
            'start' => '08:00',
            'end' => '11:00',
            'stage' => 'approved',
        ]);

        $this->get('/history')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('History')
                ->has('history', 1)
                ->where('history.0.id', 'RK-HIST-001')
                ->where('history.0.status', 'Disetujui')
            );
    }
}
