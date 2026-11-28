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

    public function test_admin_dashboard_includes_all_users_permits(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $firstUser = User::factory()->create();
        $secondUser = User::factory()->create();

        Permit::create([
            'user_id' => $firstUser->id,
            'code' => 'RK-DASH-A',
            'event' => 'Event A',
            'ormawa' => 'Ormawa A',
            'pic' => 'A',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        Permit::create([
            'user_id' => $secondUser->id,
            'code' => 'RK-DASH-B',
            'event' => 'Event B',
            'ormawa' => 'Ormawa B',
            'pic' => 'B',
            'room_id' => 2,
            'room_name' => 'Room 2',
            'date' => '2026-12-02',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'approved',
            'submitted_at' => now(),
        ]);

        $this->actingAs($admin)
            ->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('RuangKitaDashboard')
                ->has('recentPermits', 2)
                ->where('stats.total', 2)
            );
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
            'user_id' => $user->id,
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

    public function test_permit_detail_page_returns_not_found_for_missing_code(): void
    {
        $user = User::factory()->create();

        Permit::create([
            'user_id' => $user->id,
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
            ->assertNotFound();
    }

    public function test_permit_detail_page_forbids_access_to_another_users_permit(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();

        $permit = Permit::create([
            'user_id' => $owner->id,
            'code' => 'RK-OWNED',
            'event' => 'Owned Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'Owner',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->actingAs($intruder)
            ->get('/permits/'.$permit->code)
            ->assertNotFound();
    }

    public function test_admin_can_view_another_users_permit(): void
    {
        $owner = User::factory()->create();
        $admin = User::factory()->create(['role' => 'admin']);

        $permit = Permit::create([
            'user_id' => $owner->id,
            'code' => 'RK-ADMIN-VIEW',
            'event' => 'Owned Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'Owner',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->actingAs($admin)
            ->get('/permits/'.$permit->code)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Show')
                ->where('permit.id', $permit->code)
            );
    }

    public function test_permit_list_only_shows_own_permits_for_regular_user(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();

        Permit::create([
            'user_id' => $user->id,
            'code' => 'RK-MINE',
            'event' => 'My Event',
            'ormawa' => 'Ormawa Test',
            'pic' => 'Me',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        Permit::create([
            'user_id' => $other->id,
            'code' => 'RK-THEIRS',
            'event' => 'Their Event',
            'ormawa' => 'Ormawa Lain',
            'pic' => 'Them',
            'room_id' => 2,
            'room_name' => 'Student Center',
            'date' => '2026-12-02',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->actingAs($user)
            ->get('/permits')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Index')
                ->has('permits', 1)
                ->where('permits.0.id', 'RK-MINE')
            );
    }

    public function test_admin_permit_list_shows_all_permits(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $first = User::factory()->create();
        $second = User::factory()->create();

        Permit::create([
            'user_id' => $first->id,
            'code' => 'RK-A',
            'event' => 'Event A',
            'ormawa' => 'Ormawa A',
            'pic' => 'A',
            'room_id' => 1,
            'room_name' => 'Auditorium',
            'date' => '2026-12-01',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        Permit::create([
            'user_id' => $second->id,
            'code' => 'RK-B',
            'event' => 'Event B',
            'ormawa' => 'Ormawa B',
            'pic' => 'B',
            'room_id' => 2,
            'room_name' => 'Student Center',
            'date' => '2026-12-02',
            'start' => '09:00',
            'end' => '12:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->actingAs($admin)
            ->get('/permits')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Index')
                ->has('permits', 2)
            );
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
