<?php

use App\Http\Controllers\StationController;
use Illuminate\Support\Facades\Route;

// Computer Cafe Station API
Route::get('/stations', [StationController::class, 'index']);
Route::get('/stations/{station}', [StationController::class, 'show']);
Route::post('/stations', [StationController::class, 'store']);