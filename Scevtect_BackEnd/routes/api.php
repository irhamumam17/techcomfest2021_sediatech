<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Teacher;

use App\Http\Controllers\LandingController;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\Recruiter\JobController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* ------------------------------------------------- Dashboard -------------------------------------------------- */ 
Route::name('login')->post('login' , [AuthController::class , 'login']);
Route::post('register/school' , [AuthController::class , 'registerSchool']);
Route::get('register/level' , [AuthController::class , 'getLevel']);

Route::name('api')->group(function() {
		/*
			* Routing Landing
		*/
		Route::name('landing')->prefix('landing')->group(function() {
			Route::get('jobs' , [LandingController::class , 'jobs']);
		});


		Route::middleware('auth:sanctum')->group(function() {
			/*
				* Routing for Admin
			*/
			include
			__DIR__.'/api/Admin.php';



			/*
				* Routing for School
			*/
			include
			__DIR__.'/api/School.php';



			/*
				* Routing for Teacher
			*/
			include
			__DIR__.'/api/Teacher.php';

	

			/*
				* Routing for Student
			*/
			include
			__DIR__.'/api/Student.php';

		});


		/*
			* Routing for Recruiter
		*/
		Route::name('recruiter')->prefix('recruiter/{recruiterId}')->group(function(){
			Route::get('job' , [JobController::class , 'index']);
			Route::post('job/store' , [JobController::class , 'store']);
			Route::get('job/detail/{job}' , [JobController::class , 'show']);
			Route::delete('job/delete/{job}' , [JobController::class , 'destroy']);
			Route::put('job/edit/{job}' , [JobController::class , 'update']);
		});


		
			
});

