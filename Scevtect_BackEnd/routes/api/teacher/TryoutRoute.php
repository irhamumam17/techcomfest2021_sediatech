<?php 

use App\Http\Controllers\Teacher\TryoutController;

Route::prefix('tryout')->group(function(){
	Route::get('/' , [TryoutController::class , 'list']);
	Route::post('/create' , [TryoutController::class , 'store']);
	Route::delete('/{id}' , [TryoutController::class , 'destroy']);
});