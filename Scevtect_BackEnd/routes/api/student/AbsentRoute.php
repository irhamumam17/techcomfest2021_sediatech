<?php 

use App\Http\Controllers\Student\AbsentController;

Route::prefix('absent')->group(function() {
	Route::post('/' , [AbsentController::class , 'absent']);
	Route::get('/status' , [AbsentController::class , 'status']);
	Route::get('/list' , [AbsentController::class , 'index']);
});