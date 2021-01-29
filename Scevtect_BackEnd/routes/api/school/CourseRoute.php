<?php 

use App\Http\Controllers\School\CourseController;

Route::prefix('course')->group(function() {
	Route::get('/' , [CourseController::class , 'index']);
	Route::post('/add' , [CourseController::class , 'store']);
	Route::delete('/{id}' , [CourseController::class , 'destroy']);
});