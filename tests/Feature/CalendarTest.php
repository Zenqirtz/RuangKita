<?php

namespace Tests\Feature;

use App\Models\Permit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CalendarTest extends TestCase
{
    use RefreshDatabase;

    public function test_calendar_page_renders_with_real_events(): void
    {
        $user = User::factory()->create();
        $monday = Carbon::today()->startOfWeek(Carbon::MONDAY);

        Permit::create([
            'code' => 'RK-CAL-001',
            'event' => 'Real DB Workshop',
            'ormawa' => 'HMPSTI',
            'pic' => 'Budi Santoso',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => $monday->format('Y-m-d'),
            'start' => '09:00',
            'end' => '12:00',
            'participants' => 80,
            'stage' => 'approved',
            'submitted_at' => now(),
        ]);

        $this->actingAs($user)
            ->get('/calendar')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Calendar')
                ->has('events', 1)
                ->where('events.0.title', 'Real DB Workshop')
                ->where('events.0.code', 'RK-CAL-001')
                ->where('events.0.status', 'approved')
                ->has('days', 7)
                ->has('stats')
                ->where('stats.scheduledCount', 1)
            );
    }

    public function test_calendar_navigates_weeks_with_start_query(): void
    {
        $user = User::factory()->create();
        $nextMonday = Carbon::today()->startOfWeek(Carbon::MONDAY)->addWeek();

        $this->actingAs($user)
            ->get('/calendar?start='.$nextMonday->format('Y-m-d'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Calendar')
                ->where('startOfWeek', $nextMonday->format('Y-m-d'))
                ->has('days', 7)
            );
    }
}
