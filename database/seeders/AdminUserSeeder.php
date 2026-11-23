<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Ensure the dedicated administrator account exists without resetting credentials.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'argad5033@gmail.com'],
            [
                'name' => 'Admin RuangKita',
                'role' => 'admin',
                'password' => str()->random(64),
                'email_verified_at' => now(),
            ]
        );
    }
}
