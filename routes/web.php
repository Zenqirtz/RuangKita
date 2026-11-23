<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('RuangKitaDashboard');
})->name('dashboard');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->name('calendar');

Route::get('/rooms', function () {
    return Inertia::render('Rooms');
})->name('rooms.index');

Route::get('/bookings/create', function () {
    return Inertia::render('Bookings/Create');
})->name('bookings.create');

Route::get('/permits', function () {
    return Inertia::render('Permits/Index');
})->name('permits.index');

Route::get('/permits/{permit}', function (string $permit) {
    return Inertia::render('Permits/Show', [
        'permitId' => $permit,
    ]);
})->name('permits.show');

Route::get('/revisions', function () {
    return Inertia::render('Revisions');
})->name('revisions.index');

Route::get('/history', function () {
    return Inertia::render('History');
})->name('history.index');

Route::get('/guidelines', function () {
    return Inertia::render('Guidelines');
})->name('guidelines.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
