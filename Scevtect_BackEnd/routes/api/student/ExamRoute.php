<?php 

use App\Http\Controllers\Student\ExamController;

Route::prefix('exam')->group(function() {
	Route::get('/list' , [ExamController::class , 'list']);
	Route::get('/do/{id}' , [ExamController::class , 'do']);
	Route::post('/submit/{id}' , [ExamController::class , 'store']);
});