<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nim' => ['required', 'string', 'max:30', 'regex:/^[0-9]+$/', 'unique:'.User::class],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'ends_with:@student.ub.ac.id',
                'unique:'.User::class,
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'nim.required' => 'NIM wajib diisi.',
            'nim.regex' => 'NIM hanya boleh berisi angka.',
            'nim.unique' => 'NIM sudah terdaftar.',
            'email.ends_with' => 'Pendaftaran hanya dapat menggunakan email resmi @student.ub.ac.id (domain lain seperti @gmail.com tidak diizinkan).',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'nim' => $validated['nim'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
