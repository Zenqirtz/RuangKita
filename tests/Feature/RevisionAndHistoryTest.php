<?php

namespace Tests\Feature;

use App\Models\Permit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RevisionAndHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_revisions_page_renders_with_real_revisions(): void
    {
        $user = User::factory()->create();

        Permit::create([
            'user_id' => $user->id,
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

        $this->actingAs($user)
            ->get('/revisions')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Revisions')
                ->has('revisions', 1)
                ->where('revisions.0.id', 'RK-REV-001')
            );
    }

    public function test_revisions_page_only_shows_revisions_owned_by_authenticated_user(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Permit::create([
            'user_id' => $user->id,
            'code' => 'RK-REV-MINE',
            'event' => 'My Revision',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'revision',
        ]);

        Permit::create([
            'user_id' => $otherUser->id,
            'code' => 'RK-REV-THEIRS',
            'event' => 'Other Revision',
            'ormawa' => 'Other Ormawa',
            'pic' => 'Jane',
            'room_id' => 2,
            'room_name' => 'Room 2',
            'date' => '2026-12-02',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'revision',
        ]);

        $this->actingAs($user)
            ->get('/revisions')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Revisions')
                ->has('revisions', 1)
                ->where('revisions.0.id', 'RK-REV-MINE')
            );
    }

    public function test_admin_can_view_revisions_from_all_users(): void
    {
        $user = User::factory()->create();
        $admin = User::factory()->create(['role' => 'admin']);

        Permit::create([
            'user_id' => $user->id,
            'code' => 'RK-REV-ADMIN',
            'event' => 'User Revision',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'revision',
        ]);

        $this->actingAs($admin)
            ->get('/revisions')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Revisions')
                ->has('revisions', 1)
            );
    }

    public function test_history_page_only_shows_history_owned_by_authenticated_user(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Permit::create([
            'user_id' => $user->id,
            'code' => 'RK-HIST-MINE',
            'event' => 'My Approved Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-20',
            'start' => '08:00',
            'end' => '11:00',
            'stage' => 'approved',
        ]);

        Permit::create([
            'user_id' => $otherUser->id,
            'code' => 'RK-HIST-THEIRS',
            'event' => 'Other Approved Event',
            'ormawa' => 'Other Ormawa',
            'pic' => 'Jane',
            'room_id' => 2,
            'room_name' => 'Room 2',
            'date' => '2026-11-20',
            'start' => '08:00',
            'end' => '11:00',
            'stage' => 'approved',
        ]);

        $this->actingAs($user)
            ->get('/history')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('History')
                ->has('history', 1)
                ->where('history.0.id', 'RK-HIST-MINE')
            );
    }

    public function test_admin_can_view_history_from_all_users(): void
    {
        $user = User::factory()->create();
        $admin = User::factory()->create(['role' => 'admin']);

        Permit::create([
            'user_id' => $user->id,
            'code' => 'RK-HIST-ADMIN',
            'event' => 'User Approved Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-20',
            'start' => '08:00',
            'end' => '11:00',
            'stage' => 'approved',
        ]);

        $this->actingAs($admin)
            ->get('/history')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('History')
                ->has('history', 1)
            );
    }

    public function test_history_page_renders_with_completed_permits(): void
    {
        $user = User::factory()->create();

        Permit::create([
            'user_id' => $user->id,
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

        $this->actingAs($user)
            ->get('/history')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('History')
                ->has('history', 1)
                ->where('history.0.id', 'RK-HIST-001')
                ->where('history.0.status', 'Disetujui')
            );
    }
}
