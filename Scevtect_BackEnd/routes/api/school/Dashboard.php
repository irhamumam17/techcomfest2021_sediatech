<?php 

use App\Http\Controllers\School\DashboardController;

Route::get('dashboard/count' , [DashboardController::class , 'count']);
Route::get('dashboard/teacher' , [DashboardController::class , 'teacher']);
Route::get('dashboard/student' , [DashboardController::class , 'student']);