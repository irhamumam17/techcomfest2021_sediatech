<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\TheoryQuery;
use App\Queries\DutyQuery;
use App\Models\User;

class DashboardController extends Controller
{
    

    
    
    /**
      * route: /api/student/{studentId}/dashboard/count
      * method: get
      * params: studentId
      * description: 
        * this method will return list data count
      * @return : @var array
    */
    public function count (Request $request , $studentId) 
    {
    	$student = User::find($studentId)->student;
    	$response = [
        'theory' => $student->theory->count(),
        'duty'   => $student->duty->count(),
        'tryout' => $student->tryout->count(),
        'exam'   => $student->exam->count(),
    	];
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/dashboard/theory
      * method: get
      * params: studentId
      * description: 
        * this method will return list theory
      * @return : @var array
    */
    public function theory (Request $request , $studentId) 
    {
      $student = User::find($studentId)->student;
      $response = TheoryQuery::dashboardStudent($student);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/dasboard/duty
      * method: get
      * params: studentId
      * description: 
        * this method will return list duty
      * @return : @var array
    */
    public function duty (Request $request , $studentId) 
    {
      $student = User::find($studentId)->student;
      $response = DutyQuery::dashboardStudent($student);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      


    
    
    /**
      * route: /api/student/{studentId}/dashbord/absent
      * method: get
      * params: studentId
      * description: 
        * this method for return status absent student
      * @return : @var array
    */
    public function absent (Request $request , $studentId) 
    {
    	$student = User::find($studentId)->student;

    	$total = $student->absent->count();
    	$already = $student->absent->where('status' , 'already')->count();
    	$notyet = $student->absent->where('status' , 'not yet')->count();

    	$alreadyPercent = round($already / $total * 100 , 2);
    	$notyetPercent = round($notyet / $total * 100 , 2);
    	$response = [$alreadyPercent , $notyetPercent];

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
}
