<?php 

use App\Http\Controllers\School\EventController;

Route::prefix('event')->group(function() {
	Route::post('upload' , [EventController::class , 'uploadImage']);
	Route::post('/add' , [EventController::class , 'store']);

	Route::get('school/list' , [EventController::class , 'listSchool']);

	Route::get('public/list' , [EventController::class , 'listPublic']);
});