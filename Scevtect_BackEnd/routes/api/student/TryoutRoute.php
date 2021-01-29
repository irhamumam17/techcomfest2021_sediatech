<?php 

use App\Http\Controllers\Student\TryoutController;

Route::prefix('tryout')->group(function() {
	Route::get('/list' , [TryoutController::class , 'list']);
	Route::get('/do/{id}' , [TryoutController::class , 'do']);	
	Route::post('/submit/{id}' , [TryoutController::class , 'store']);
});