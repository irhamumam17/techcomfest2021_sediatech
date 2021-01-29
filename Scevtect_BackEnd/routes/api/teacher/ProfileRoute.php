<?php 

use App\Http\Controllers\Teacher\ProfileController;

Route::get('role' , [ProfileController::class , 'getRole']);
Route::get('profile' , [ProfileController::class , 'profile']);
Route::get('teacher/subject' , [ProfileController::class , 'getSubject']);
Route::get('teacher/class' , [ProfileController::class , 'getClass']);