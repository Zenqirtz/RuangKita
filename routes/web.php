<?php

use App\Http\Controllers\AdminPermitController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PermitController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RevisionController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('home');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');

Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');

Route::get('/bookings/create', function () {
    return Inertia::render('Bookings/Create');
})->name('bookings.create');
Route::post('/bookings', [PermitController::class, 'store'])->name('bookings.store');

Route::get('/permits', [PermitController::class, 'index'])->name('permits.index');
Route::get('/permits/{permit}', [PermitController::class, 'show'])->name('permits.show');

Route::get('/revisions', [RevisionController::class, 'index'])->name('revisions.index');
Route::get('/history', [HistoryController::class, 'index'])->name('history.index');

Route::get('/guidelines', function () {
    return Inertia::render('Guidelines');
})->name('guidelines.index');

Route::middleware('auth')->group(function () {
    Route::post('/admin/permits/{permit}/review', [AdminPermitController::class, 'updateStatus'])
        ->name('admin.permits.review');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
