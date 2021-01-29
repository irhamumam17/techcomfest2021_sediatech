<?php 

use App\Http\Controllers\School\SubjectController;

Route::prefix('subject')->group(function() {
	Route::get('/' , [SubjectController::class , 'index']);
	Route::post('/add' , [SubjectController::class , 'store']);
	Route::delete('/{id}' , [SubjectController::class , 'destroy']);
});