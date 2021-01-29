<?php

namespace App\Http\Controllers\teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\ScheduleQuery;
use App\Models\User;
use App\Models\TeacherSchedule;

class AbsentController extends Controller
{
   	
   	
   	
   	/**
   	  * route: /api/teacher/{teacherId}/absent/
   	  * method: post
   	  * params: teacherId
   	  * description: 
   	    * this method for absent teacher
   	  * return : @response
   	*/
   	public function absent (Request $request , $teacherId) 
   	{
   		$teacher_id = User::find($teacherId)->teacher->id;
   		$absent = TeacherSchedule::where('day' , date('d'))
   	 								->where('month' , date('m'))
   	 								->where('year' , date('Y'))
   	 								->get()
   	 								->first()
   									->absent->where('teacher_id' , $teacher_id)
   	 								->first();
   	 	$absent->update([ 'status' => 'already' ]);
   		return response($absent->id , 200)
   				->header('Content-Type' , 'application/json');
   	}
   		
   	 
   	 
   	 /**
   	   * route: /api/teacher/{teacherId}/absent/status
   	   * method: get
   	   * params: teacherId
   	   * description: 
   	     * this method will return status absent now
   	   * return : @response
   	 */
   	 public function status (Request $request , $teacherId) 
   	 {
   	 	$teacherId = User::find($teacherId)->teacher->id;
   	 	$status = TeacherSchedule::where('day' , date('d'))
   	 								->where('month' , date('m'))
   	 								->where('year' , date('Y'))
   	 								->get()
   	 								->first()
   	 								->absent
   	 								->where('teacher_id' , $teacherId)
   	 								->first()
   	 								->status;
   	 	($status === 'already') ? $response = 'true' : $response = 'false';
   	 	return response($response , 200)
   	 			->header('Content-Type' , 'application/json');
   	 }
   	 		 
    
    
    /**
      * route: /api/teacher/{teacherId}/absent/list
      * method: get
      * params: teacherId
      * description: 
        * this method will return list absent
      * return : @response
    */
    public function index (Request $request , $teacherId) 
    {
    	$teacherId = User::find($teacherId)->teacher->id;
    	$absents = ScheduleQuery::teacherAbsent($teacherId);
    	return response($absents , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
}
