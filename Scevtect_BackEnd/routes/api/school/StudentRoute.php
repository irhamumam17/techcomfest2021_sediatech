<?php 

use App\Http\Controllers\School\StudentController;

Route::prefix('student')->group(function() {
	Route::get('/' , [StudentController::class , 'index']);
	Route::post('/add' , [StudentController::class , 'store']);
	Route::get('/schedule' , [StudentController::class , 'getSchedule']);
	Route::post('/schedule/add' , [StudentController::class , 'storeSchedule']);
	Route::delete('/{id}' , [StudentController::class , 'destroy']);
});