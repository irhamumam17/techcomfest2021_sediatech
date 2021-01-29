<?php 

use App\Http\Controllers\School\ContractController;

Route::prefix('contract')->group(function() {
	Route::get('package' , [ContractController::class , 'getPackage']);
	Route::post('package/proof' , [ContractController::class , 'storeProof']);
	Route::get('package/{package}' , [ContractController::class , 'detailPackage']);
	Route::post('package/{package}' , [ContractController::class , 'buyPackage']);
	Route::get('package/{package}/history' , [ContractController::class , 'buyHistory']);

	Route::get('bank' , [ContractController::class , 'getBank']);
});