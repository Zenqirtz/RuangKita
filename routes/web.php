<?php

use App\Http\Controllers\AdminPermitController;
use App\Http\Controllers\PermitController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('RuangKitaDashboard');
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
Route::post('/bookings', [PermitController::class, 'store'])->name('bookings.store');

Route::get('/permits', [PermitController::class, 'index'])->name('permits.index');
Route::get('/permits/{permit}', [PermitController::class, 'show'])->name('permits.show');

Route::middleware('auth')->group(function () {
    Route::post('/admin/permits/{permit}/review', [AdminPermitController::class, 'updateStatus'])
        ->name('admin.permits.review');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
