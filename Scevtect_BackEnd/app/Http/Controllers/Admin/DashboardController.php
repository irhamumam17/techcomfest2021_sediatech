<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\School\SchoolResource;
use App\Models\Admin;
use App\Models\School;
use App\Models\Teacher;
use App\Models\Student;

class DashboardController extends Controller
{
	/**
	  * route: /api/admin/{adminId}/dashboard/count
	  * method: get
	  * params: adminid
	  * description: 
	    * this method will return data counts
	  * @return : @var array
	*/
    public function count (Request $request , $adminId) 
    {
    	$response = [
			'admin'   => Admin::count(),
			'school'  => School::count(),
			'teacher' => Teacher::count(),
			'student' => Student::count(),
    	];
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admmin/{adminId}/dashboard/school
      * method: get
      * params: adminid
      * description: 
        * this method will return list school
      * @return : @var array
    */
    public function school (Request $request , $adminId) 
    {
    	$schools = School::limit(5)->get();
    	$response = SchoolResource::collection($schools);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
}
