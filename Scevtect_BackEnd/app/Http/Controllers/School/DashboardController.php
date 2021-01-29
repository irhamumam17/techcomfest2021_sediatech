<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Teacher\TeacherResource;
use App\Http\Resources\Student\StudentResource;
use App\Models\User;

class DashboardController extends Controller
{
    
    
    
    /**
      * route: /api/school/{schoolid}/dashboard/count
      * method: get
      * params: schoolId
      * description: 
        * this method will return list data coutn
      * @return : @response
    */
    public function count (Request $request , $schoolId) 
    {
    	$school = User::find($schoolId)->school;
    	$response = [
			'teacher' => $school->teacher->count(),
			'student' => $school->student->count(),
			'class'   => $school->class->count(),
			'course'  => $school->course->count(),
    	];
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/dashboard/teacher
      * method: get
      * params: schoolId
      * description: 
        * this method for get list techer
      * @return : @var array
    */
    public function teacher (Request $request , $schoolId) 
    {
    	$teachers = User::find($schoolId)->school->teacher;
    	$teachers = collect($teachers)->take(5);
    	$response = TeacherResource::collection($teachers);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/dahboard/student
      * method: get
      * params: schoolId
      * description: 
        * this method for get list student
      * @return : @var array
    */
    public function student (Request $request , $schoolId) 
    {
    	$students = User::find($schoolId)->school->student;
    	$students= collect($students)->take(5);
    	$response = StudentResource::collection($students);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
}
