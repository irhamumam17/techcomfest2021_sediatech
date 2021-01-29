<?php 

use App\Http\Controllers\School\LessonScheduleController;

Route::prefix('schedule')->group(function() {
	Route::get('/list' , [LessonScheduleController::class , 'list']);
	Route::post('/add' , [LessonScheduleController::class , 'store']);
});
