<?php 

use App\Http\Controllers\Teacher\ClassController;
use App\Http\Controllers\Teacher\StudentController;

Route::get('class' , [ClassController::class , 'index']);

Route::get('student' , [StudentController::class , 'index']);
Route::get('student/class/{id}' , [StudentController::class , 'getByClass']);
Route::post('student/add' , [StudentController::class , 'store']);