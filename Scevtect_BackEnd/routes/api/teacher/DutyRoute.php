<?php 

use App\Http\Controllers\Teacher\DutyController;

Route::prefix('duty')->group(function() {
	Route::get('/list' , [DutyController::class , 'list']);
	Route::post('/add' , [DutyController::class , 'store']);
	Route::post('/upload/cover' , [DutyController::class , 'uploadCover']);
	Route::post('/upload/docs' , [DutyController::class , 'uploadDocs']);
	Route::get('/{id}' , [DutyController::class , 'detail']);
	Route::get('/{duty}/response' , [DutyController::class , 'response']);
	Route::get('/{duty}/response/{response}' , [DutyController::class , 'showResponse']);
	Route::post('/{duty}/response/{response}/feedback' , [DutyController::class , 'submitFeedback']);
	Route::delete('/{id}' , [DutyController::class , 'destroy']);
});