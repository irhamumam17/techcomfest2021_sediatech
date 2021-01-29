<?php 

use App\Http\Controllers\Student\WalletController;

Route::prefix('wallet')->group(function() {
	Route::get('/bank' , [WalletController::class , 'getBank']);
	Route::get('/' , [WalletController::class , 'index']);
	Route::get('/topup/{wallet}' , [WalletController::class , 'historyTopup']);
	Route::post('/topup' , [WalletController::class , 'topup']);
});