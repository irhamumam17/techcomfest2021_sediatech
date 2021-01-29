<?php 

use App\Http\Controllers\Admin\JobController;

Route::prefix('job')->group(function() {
	Route::get('/' , [JobController::class , 'index']);
	Route::get('/{job}' , [JobController::class , 'show']);
	Route::put('/{job}/status' , [JobController::class , 'updateStatus']);
	Route::delete('/{job}' , [JobController::class , 'destroy']);
});