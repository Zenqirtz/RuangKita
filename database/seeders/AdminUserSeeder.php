<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'argad5033@gmail.com'],
            [
                'name' => 'Admin RuangKita',
                'role' => 'admin',
                'password' => Str::random(64),
                'email_verified_at' => now(),
            ]
        );

        $token = Password::broker()->createToken($user);

        $this->command->info('Admin account ready.');
        $this->command->info('Email : argad5033@gmail.com');
        $this->command->info('Reset password URL: '.route('password.reset', [
            'token' => $token,
            'email' => $user->email,
        ]));
    }
}
