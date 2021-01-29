<?php  

use App\Http\Controllers\Admin\DashboardController;

Route::prefix('dashboard')->group(function() {
	Route::get('/count' , [DashboardController::class , 'count']);
	Route::get('/school' , [DashboardController::class , 'school']);
});