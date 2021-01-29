<?php 

use App\Http\Controllers\Admin\ScholarshipController;

Route::prefix('scholarship')->group(function() {
	Route::get('/list' , [ScholarshipController::class , 'index']);
	Route::post('/upload' , [ScholarshipController::class , 'upload']);
	Route::post('/store' , [ScholarshipController::class , 'store']);
	Route::get('/detail/{scholaship}' , [ScholarshipController::class , 'show']);
	Route::delete('/destroy/{scholarship}' , [ScholarshipController::class , 'destroy']);
});