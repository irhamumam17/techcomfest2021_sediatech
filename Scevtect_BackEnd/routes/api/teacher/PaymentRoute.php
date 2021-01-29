<?php 

use App\Http\Controllers\Teacher\PaymentController;

Route::prefix('payment')->group(function(){
	Route::get('/list' , [PaymentController::class , 'index']);
	Route::post('/add' , [PaymentController::class , 'store']);
	Route::get('/{id}' , [PaymentController::class , 'detail']);
	Route::post('/{payment}/addstudent' , [PaymentController::class , 'addStudent']);
	Route::get('/{id}/student/{spayment}' , [PaymentController::class , 'detailStudent']);
	Route::post('/{payment}/student/{spayment}/add' , [PaymentController::class , 'storeStudentPayment']);
	Route::get('/{payment}/student/{spayment}/history' , [PaymentController::class , 'historyPayment']);
	Route::delete('/{id}' , [PaymentController::class , 'destroy']);
});
