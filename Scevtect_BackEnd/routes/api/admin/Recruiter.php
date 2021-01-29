<?php 

use App\Http\Controllers\Admin\RecruiterController;

Route::prefix('recruiter')->group(function() {
	Route::get('/' , [RecruiterController::class , 'index']);
	Route::post('/store' , [RecruiterController::class , 'store']);
	Route::get('/detail/{recruiter}' , [RecruiterController::class , 'show']);
	Route::delete('/delete/{recruiter}' , [RecruiterController::class , 'destroy']);
});