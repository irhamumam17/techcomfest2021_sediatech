<?php 

use App\Http\Controllers\Teacher\BookController;
use App\Http\Controllers\Teacher\BorrowBookController;

Route::prefix('library')->group(function() {
	Route::get('/book' , [BookController::class , 'index']);
	Route::post('/book/cover' , [BookController::class , 'uploadCover']);
	Route::post('/book/add' , [BookController::class , 'store']);
	Route::delete('/book/{id}' , [BookController::class , 'destroy']);

	Route::get('/borrow/' , [BorrowBookController::class , 'index']);
	Route::post('/borrow/add' , [BorrowBookController::class , 'store']);
	Route::put('/borrow/{id}/return' , [BorrowBookController::class , 'markReturn']);
});