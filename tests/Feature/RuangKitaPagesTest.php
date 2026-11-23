<?php

namespace Tests\Feature;

use App\Models\Permit;
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
            'home' => ['/', 'RuangKitaDashboard'],
            'dashboard' => ['/dashboard', 'RuangKitaDashboard'],
            'calendar' => ['/calendar', 'Calendar'],
            'rooms' => ['/rooms', 'Rooms'],
            'booking create' => ['/bookings/create', 'Bookings/Create'],
            'permits index' => ['/permits', 'Permits/Index'],
            'revisions' => ['/revisions', 'Revisions'],
            'history' => ['/history', 'History'],
            'guidelines' => ['/guidelines', 'Guidelines'],
        ];
    }

    #[DataProvider('pageProvider')]
    public function test_ruangkita_page_renders(string $uri, string $component): void
    {
        $this->get($uri)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component($component));
    }

    public function test_permit_detail_page_renders_with_real_permit(): void
    {
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

        $this->get('/permits/'.$permit->code)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Show')
                ->where('permit.id', $permit->code)
            );
    }

    public function test_permit_detail_page_redirects_to_latest_when_code_not_found(): void
    {
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

        $this->get('/permits/RK-NONEXISTENT')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Permits/Show'));
    }

    public function test_approved_permit_can_view_official_letter(): void
    {
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

        $this->get('/permits/'.$permit->code.'/letter')
            ->assertOk()
            ->assertSee('IZIN PENGGUNAAN RUANGAN')
            ->assertSee('Seminar Nasional Vokasi')
            ->assertSee('Auditorium Vokasi')
            ->assertSee('Fakultas Vokasi');
    }

    public function test_non_approved_permit_cannot_view_official_letter(): void
    {
        $permit = Permit::create([
            'code' => 'RK-2026-PENDING',
            'event' => 'Rapat Internal',
            'ormawa' => 'HMPSTI',
            'pic' => 'Budi',
            'room_id' => 1,
            'room_name' => 'Ruang 201',
            'date' => '2026-12-05',
            'start' => '08:00',
            'end' => '10:00',
            'stage' => 'admin',
            'submitted_at' => now(),
        ]);

        $this->get('/permits/'.$permit->code.'/letter')
            ->assertNotFound();
    }
}
