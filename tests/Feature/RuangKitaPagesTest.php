<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class RuangKitaPagesTest extends TestCase
{
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

    public function test_permit_detail_page_receives_permit_identifier(): void
    {
        $this->get('/permits/RK-2026-081')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Show')
                ->where('permitId', 'RK-2026-081')
            );
    }
}
