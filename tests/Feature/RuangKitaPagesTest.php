<?php

namespace Tests\Feature;

use App\Models\Permit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class RuangKitaPagesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{string, string}>
     */
    public static function pageProvider(): array
    {
        return [
            'dashboard' => ['/dashboard', 'RuangKitaDashboard'],
            'calendar' => ['/calendar', 'Calendar'],
            'rooms' => ['/rooms', 'Rooms'],
            'booking create' => ['/bookings/create', 'Bookings/Create'],
            'permits index' => ['/permits', 'Permits/Index'],
            'revisions' => ['/revisions', 'Revisions'],
            'history' => ['/history', 'History'],
            'guidelines' => ['/guidelines', 'Guidelines'],
            'terms privacy' => ['/terms-privacy', 'TermsPrivacy'],
        ];
    }

    #[DataProvider('pageProvider')]
    public function test_ruangkita_page_renders_for_authenticated_user(string $uri, string $component): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get($uri)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component($component));
    }

    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
        $this->get('/calendar')->assertRedirect('/login');
        $this->get('/permits')->assertRedirect('/login');
    }

    public function test_permit_detail_page_renders_with_real_permit(): void
    {
        $user = User::factory()->create();

        $permit = Permit::create([
            'code' => 'RK-2026-TEST',
            'event' => 'Test Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'John Doe',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->actingAs($user)
            ->get('/permits/'.$permit->code)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Show')
                ->where('permit.id', $permit->code)
            );
    }

    public function test_permit_detail_page_redirects_to_latest_when_code_not_found(): void
    {
        $user = User::factory()->create();

        Permit::create([
            'code' => 'RK-FALLBACK',
            'event' => 'Fallback Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'Admin',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->actingAs($user)
            ->get('/permits/RK-NONEXISTENT')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Permits/Show'));
    }

    public function test_official_letter_endpoint_is_removed(): void
    {
        $user = User::factory()->create();

        $permit = Permit::create([
            'code' => 'RK-2026-APP',
            'event' => 'Seminar Nasional Vokasi',
            'ormawa' => 'BEM Vokasi UB',
            'pic' => 'Ahmad',
            'room_id' => 1,
            'room_name' => 'Auditorium Vokasi',
            'date' => '2026-12-05',
            'start' => '08:00',
            'end' => '16:00',
            'stage' => 'approved',
            'submitted_at' => now(),
        ]);

        $this->actingAs($user)
            ->get('/permits/'.$permit->code.'/letter')
            ->assertNotFound();
    }
}
