<?php 

use App\Http\Controllers\Teacher\TheoryController;

Route::prefix('theory')->group(function() {
	Route::get('/list' , [TheoryController::class , 'list']);
	Route::post('/add' , [TheoryController::class , 'store']);
	Route::post('/upload/cover' , [TheoryController::class , 'uploadCover']);
	Route::post('/upload/docs' , [TheoryController::class , 'uploadDocs']);
	Route::get('/{id}' , [TheoryController::class , 'detail']);
	Route::get('/{theory}/read' , [TheoryController::class , 'statusRead']);
	Route::delete('/{id}' , [TheoryController::class , 'destroy']);
});