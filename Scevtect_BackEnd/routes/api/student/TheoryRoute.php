<?php 

use App\Http\Controllers\Student\TheoryController;

Route::prefix('theory')->group(function(){
	Route::get('/list' , [TheoryController::class , 'list']);
	Route::get('/detail/{id}' , [TheoryController::class , 'detail']);
	Route::get('/download/{file}' , [TheoryController::class , 'download']);
});