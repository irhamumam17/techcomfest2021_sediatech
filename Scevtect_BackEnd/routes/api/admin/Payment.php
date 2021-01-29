<?php 


use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\WalletController;

Route::prefix('payment')->group(function() {
	Route::get('package' , [PaymentController::class , 'getPackage']);
	Route::post('package' , [PaymentController::class , 'storePackage']);
	Route::delete('package/{package}' , [PaymentController::class , 'destroyPackage']);

	Route::get('contract' , [PaymentController::class , 'getContract']);
	Route::get('contract/{contract}' , [PaymentController::class , 'detailContract']);
	Route::put('contract/{contract}/status' , [PaymentController::class , 'updateStatusContract']);

	Route::get('bank' , [PaymentController::class , 'getBank']);
	Route::post('bank' , [PaymentController::class , 'storeBank']);
	Route::delete('bank/{bank}' , [PaymentController::class , 'destroyBank']);

	Route::get('wallet/topup' , [WalletController::class , 'getWalletTopup']);
	Route::get('wallet/topup/{topup}' , [WalletController::class , 'getDetailTopup']);
	Route::put('wallet/topup/{topup}/status' , [WalletController::class , 'updateStatusTopup']);
});