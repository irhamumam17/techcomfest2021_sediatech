<?php 

use App\Http\Controllers\School\TeacherController;

Route::prefix('teacher')->group(function() {
	Route::get('/' , [TeacherController::class , 'index']);
	Route::get('/role' , [TeacherController::class , 'getRole']);
	Route::post('/add' , [TeacherController::class , 'store']);
	Route::get('/schedule' , [TeacherController::class , 'getSchedule']);
	Route::post('/schedule/add' , [TeacherController::class , 'storeSchedule']);
	
	Route::get('/{id}' , [TeacherController::class , 'detail']);
	Route::get('/{id}/subject/list' , [TeacherController::class , 'listSubject']);
	Route::post('/{id}/subject/add' , [TeacherController::class , 'storeSubject']);
	Route::delete('/{id}/subject/{subject}' , [TeacherController::class , 'destroySubject']);
	Route::get('/{id}/class/list' , [TeacherController::class , 'listClass']);
	Route::post('/{id}/class/add' , [TeacherController::class , 'storeClass']);
	Route::delete('/{id}/class/{class_id}' , [TeacherController::class , 'destroyClass']);
	Route::delete('/{id}' , [TeacherController::class , 'destroy']);
});
