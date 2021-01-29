<?php

use App\Http\Controllers\Teacher\ExamController;

Route::prefix('exam')->group(function() {
	Route::get('/' , [ExamController::class , 'list']);
	Route::post('/create' , [ExamController::class , 'store']);
	Route::delete('/{id}' , [ExamController::class , 'destroy']);
});