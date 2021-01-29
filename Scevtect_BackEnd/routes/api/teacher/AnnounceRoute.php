<?php 

use App\Http\Controllers\Teacher\AnnouncementController;

Route::prefix('announce')->group(function() {
	Route::get('/list' , [AnnouncementController::class , 'index']);
	Route::post('/add' , [AnnouncementController::class , 'store']);
	Route::delete('/{id}' , [AnnouncementController::class , 'destroy']);
});