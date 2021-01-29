<?php 

use App\Http\Controllers\Student\PaymentController;

Route::prefix('payment')->group(function() {
	Route::get('/list' , [PaymentController::class , 'index']);
	Route::get('/detail/{payment}' , [PaymentController::class , 'detail']);
});