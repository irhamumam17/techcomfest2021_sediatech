<?php 

use App\Http\Controllers\Student\SubjectController as StudentSubjectController;

Route::prefix('subject')->group(function() {
	Route::get('/list' , [StudentSubjectController::class , 'list']);
	Route::get('/schedules' , [StudentSubjectController::class , 'schedules']);
});