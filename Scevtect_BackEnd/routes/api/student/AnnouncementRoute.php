<?php 

use App\Http\Controllers\Student\AnnouncementController;

Route::prefix('announcement')->group(function() {
	Route::get('/' , [AnnouncementController::class , 'index']);
});