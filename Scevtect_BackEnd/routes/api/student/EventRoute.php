<?php 

use App\Http\Controllers\Student\EventController;

Route::prefix('event')->group(function() {
	Route::get('school' , [EventController::class , 'school']);
	Route::get('public' , [EventController::class , 'listpublic']);
});