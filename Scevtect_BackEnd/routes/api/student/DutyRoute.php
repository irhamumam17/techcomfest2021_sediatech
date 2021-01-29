<?php 

use App\Http\Controllers\Student\DutyController;

Route::prefix('duty')->group(function() {
	Route::get('/list' , [DutyController::class , 'list']);
	Route::get('/detail/{id}' , [DutyController::class , 'detail']);
	Route::get('/detail/{duty}/response' , [DutyController::class , 'response']);
	Route::post('/response/{duty}/upload' , [DutyController::class , 'upload']);
	Route::post('/response/{duty}/submit' , [DutyController::class , 'submit']);
});