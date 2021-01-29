<?php 

use App\Http\Controllers\School\ClassController;

Route::prefix('class')->group(function(){
	Route::get('/level' , [ClassController::class , 'getLevel']);
	Route::post('/level/add' , [ClassController::class , 'storeLevel']);
	Route::delete('/level/{id}' , [ClassController::class , 'destroyLevel']);
		
	Route::get('/sub' , [ClassController::class , 'getSub']);
	Route::post('/sub/add' , [ClassController::class , 'storeSub']);
	Route::delete('/sub/{id}' , [ClassController::class , 'destroySub']);

	Route::get('/list' , [ClassController::class , 'getClasses']);
	Route::post('/add' , [ClassController::class , 'storeClass']);
	Route::delete('/{id}' , [ClassController::class , 'destroyClass']);
	Route::get('/{id}/subject' , [ClassController::class , 'getSubject']);
});