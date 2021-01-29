<?php 

use App\Http\Controllers\Student\ProfileController;

Route::prefix('profile')->group(function() {
	Route::get('/student' , [ProfileController::class , 'student']);
});