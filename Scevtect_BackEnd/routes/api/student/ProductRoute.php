<?php 

use App\Http\Controllers\Student\ProductController;

Route::prefix('product')->group(function() {
	Route::get('/list' , [ProductController::class , 'index']);
	Route::get('/myproduct' , [ProductController::class , 'myProduct']);
	Route::post('/image' , [ProductController::class , 'uploadImage']);
	Route::post('/add' , [ProductController::class , 'store']);
	Route::get('/detail/{product}' , [ProductController::class , 'show']);
	Route::put('/update/{product}' , [ProductController::class , 'update']);
	Route::put('/update/{product}/image' , [ProductController::class , 'updateImage']);
	Route::delete('/delete/{product}' , [ProductController::class , 'destroy']);

	Route::post('buy/{product}' , [ProductController::class , 'buyProduct']);
	Route::get('order' , [ProductController::class , 'getAllOrder']);
	Route::put('order/confirm/{order}' , [ProductController::class , 'confirmOrder']);
	Route::get('order/{product}' , [ProductController::class , 'getOrder']);
});