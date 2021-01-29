<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\ScheduleQuery;
use App\Models\User;
use App\Models\StudentSchedule;

class AbsentController extends Controller
{

    
    
    /**
      * route: /api/student/{studentId}/absent/
      * method: post
      * params: studentId
      * description: 
        * this method for absent student
      * return : @response
    */
    public function absent (Request $request , $studentId) 
    {
      $student_id = User::find($studentId)->student->id;
      $absent = StudentSchedule::where('day' , date('d'))
                    ->where('month' , date('m'))
                    ->where('year' , date('Y'))
                    ->get()
                    ->first()
                    ->absent->where('student_id' , $student_id)
                    ->first();
      $absent->update([ 'status' => 'already' ]);
      return response($absent->id , 200)
          ->header('Content-Type' , 'application/json');
    }




    /**
       * route: /api/student/{studentId}/absent/status
       * method: get
       * params: studentId
       * description: 
         * this method will return status absent now
       * return : @response
     */
     public function status (Request $request , $studentId) 
     {
      $studentId = User::find($studentId)->student->id;
      $status = StudentSchedule::where('day' , date('d'))
                    ->where('month' , date('m'))
                    ->where('year' , date('Y'))
                    ->get()
                    ->first();
      if($status) {
        $status = $status->absent
                    ->where('student_id' , $studentId)
                    ->first()
                    ->status;
        $response = ($status === 'already') ? 'true' : 'false';
      } else {
        $response = 'libur';
      }
                    
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
     }



    /**
      * route: /api/student/{studentId}/absent/list
      * method: get
      * params: studentId
      * description: 
        * this method will return list absent
      * return : @response
    */
    public function index (Request $request , $studentId) 
    {
		$studentId = User::find($studentId)->student->id;
		$absents   = ScheduleQuery::studentAbsent($studentId);
    	return response($absents , 200)
    			->header('Content-Type' , 'application/json');
    }
}
