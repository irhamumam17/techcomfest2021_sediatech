<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\TheoryQuery;
use App\Queries\DutyQuery;
use App\Models\User;

class DashboardController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/dashboard/count
      * method: get
      * params: teacherId
      * description: 
        * this method for return list data count
      * @return : @var array
    */
    public function count (Request $request , $teacherId) 
    {
    	$teacher = User::find($teacherId)->teacher;
    	$response = [
			'theory' => $teacher->theory->count(),
			'duty'   => $teacher->duty->count(),
			'tryout' => $teacher->tryout->count(),
			'exam'   => $teacher->exam->count(),
    	];

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/dashboard/absent
      * method: get
      * params: teacherId
      * description: 
        * this method for return status absent teacher
      * @return : @var array
    */
    public function absent (Request $request , $teacherId) 
    {
    	$teacher = User::find($teacherId)->teacher;

    	$total   = $teacher->absent->count();
    	$already = $teacher->absent->where('status' , 'already')->count();
    	$notyet  = $teacher->absent->where('status' , 'not yet')->count();

    	$alreadyPercent = round($already / $total * 100 , 2);
    	$notyetPercent  = round($notyet / $total * 100 , 2);
    	$response = [$alreadyPercent , $notyetPercent];

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/dashboard/theory
      * method: get
      * params: teacherId
      * description: 
        * this method for return list theory
      * @return : @var array
    */
    public function theory (Request $request , $teacherId) 
    {
    	$teacher = User::find($teacherId)->teacher;
    	$theories = TheoryQuery::dashboardTeacher($teacher);

    	return response($theories , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/dashboard/duty
      * method: get
      * params: teacherId
      * description: 
        * this method for return list duty
      * @return : @var array
    */
    public function duty (Request $request , $teacherId) 
    {
    	$teacher = User::find($teacherId)->teacher;
    	$duties = DutyQuery::dashboardTeacher($teacher);

    	return response($duties , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    			
    	
}
