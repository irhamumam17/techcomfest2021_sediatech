<?php 

use App\Http\Controllers\Teacher\DashboardController;

Route::prefix('dashboard')->group(function() {
	Route::get('/count' , [DashboardController::class , 'count']);
	Route::get('/absent' , [DashboardController::class , 'absent']);
	Route::get('/theory' , [DashboardController::class , 'theory']);
	Route::get('/duty' , [DashboardController::class , 'duty']);
});