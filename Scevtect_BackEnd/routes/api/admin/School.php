<?php 

use App\Http\Controllers\Admin\LevelSchoolController;
use App\Http\Controllers\Admin\SchoolController;

Route::prefix('school')->group(function() {
	Route::get('/level' , [LevelSchoolController::class , 'index']);
	Route::post('/level/add' , [LevelSchoolController::class , 'store']);
	Route::delete('/level/{id}' , [LevelSchoolController::class , 'destroy']);
		
	Route::get('/' , [SchoolController::class , 'index']);
	Route::post('/add' , [SchoolController::class , 'store']);
	Route::delete('/{id}' , [SchoolController::class , 'destroy']);
});