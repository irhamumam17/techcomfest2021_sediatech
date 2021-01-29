<?php 

use App\Http\Controllers\Student\LibraryController;

Route::prefix('library')->group(function() {
	Route::get('/borrow/' , [LibraryController::class , 'borrow']);
	Route::get('/borrow/{id}' , [LibraryController::class , 'detail']);
});