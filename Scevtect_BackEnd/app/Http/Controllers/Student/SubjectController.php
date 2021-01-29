<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Subject\SubjectResource;
use App\Queries\LessonScheduleQuery;
use App\Queries\SubjectQuery;
use App\Models\User;

class SubjectController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/subject/list
      * method: get
      * params: studentId
      * description: 
        * this method will return list data subject
      * return : @response
    */
    public function list (Request $request , $studentId) 
    {
    	$classId = User::find($studentId)->student->class_id;

    	$subjects = SubjectQuery::byClass($classId);
    	$response = SubjectResource::collection($subjects);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/subject/schedules
      * method: get
      * params: studentId
      * description: 
        * this method will return list schedules student
      * return : @response
    */
    public function schedules (Request $request , $studentId) 
    {
      $class_id = User::find($studentId)->student->class_id;
      $data = LessonScheduleQuery::byStudent($class_id);
      $response = collect([]);
      foreach ($data as $d) {
        $response->push($d);
      }
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    	
}
