<?php

namespace Tests\Feature;

use App\Models\Permit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPermitTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_review_permits(): void
    {
        $permit = Permit::create([
            'code' => 'RK-TEST-001',
            'event' => 'Test Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-25',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
        ]);

        $response = $this->post(route('admin.permits.review', $permit->code), [
            'action' => 'approve',
        ]);

        $response->assertRedirect(route('login'));
    }

    public function test_regular_user_cannot_review_permits(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        $permit = Permit::create([
            'code' => 'RK-TEST-002',
            'event' => 'Test Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-25',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
        ]);

        $response = $this->actingAs($user)->post(route('admin.permits.review', $permit->code), [
            'action' => 'approve',
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_approve_permit_and_record_history(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $permit = Permit::create([
            'code' => 'RK-TEST-003',
            'event' => 'Test Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-25',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
        ]);

        $response = $this->actingAs($admin)->post(route('admin.permits.review', $permit->code), [
            'action' => 'approve',
            'notes' => 'Proposal disetujui untuk lanjut ke pimpinan.',
        ]);

        $response->assertSessionHas('status');

        $permit->refresh();
        $this->assertEquals('leadership', $permit->stage);
        $this->assertDatabaseHas('permit_histories', [
            'permit_id' => $permit->id,
            'action' => 'approved',
            'to_stage' => 'leadership',
        ]);
    }

    public function test_admin_can_request_revision(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $permit = Permit::create([
            'code' => 'RK-TEST-004',
            'event' => 'Test Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-25',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
        ]);

        $response = $this->actingAs($admin)->post(route('admin.permits.review', $permit->code), [
            'action' => 'revision',
            'notes' => 'Perbaiki lampiran daftar peserta.',
        ]);

        $permit->refresh();
        $this->assertEquals('revision', $permit->stage);
        $this->assertEquals('Perbaiki lampiran daftar peserta.', $permit->admin_notes);
    }

    public function test_admin_can_approve_leadership_stage_to_approved(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $permit = Permit::create([
            'code' => 'RK-TEST-005',
            'event' => 'Test Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-25',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'leadership',
        ]);

        $response = $this->actingAs($admin)->post(route('admin.permits.review', $permit->code), [
            'action' => 'approve',
        ]);

        $response->assertSessionHas('status');

        $permit->refresh();
        $this->assertEquals('approved', $permit->stage);
    }

    public function test_approving_an_approved_permit_does_not_revert_to_leadership(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $permit = Permit::create([
            'code' => 'RK-TEST-006',
            'event' => 'Already Approved Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-11-25',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'approved',
        ]);

        $response = $this->actingAs($admin)->post(route('admin.permits.review', $permit->code), [
            'action' => 'approve',
        ]);

        $response->assertSessionHas('status');

        $permit->refresh();
        $this->assertEquals('approved', $permit->stage);
    }
}
