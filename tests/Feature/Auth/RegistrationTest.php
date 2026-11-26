<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'nim' => '245150200111001',
            'email' => 'test.user@student.ub.ac.id',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'test.user@student.ub.ac.id',
            'nim' => '245150200111001',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_cannot_register_with_gmail_or_other_domains(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'nim' => '245150200111002',
            'email' => 'test.user@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors(['email']);
    }
}
