<?php 

use App\Http\Controllers\Student\DashboardController;

Route::prefix('dashboard')->group(function() {
	Route::get('/count' , [DashboardController::class , 'count']);
	Route::get('/theory' , [DashboardController::class , 'theory']);
	Route::get('/duty' , [DashboardController::class , 'duty']);
	Route::get('/absent' , [DashboardController::class , 'absent']);
});