<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\ExamQuery;
use App\Models\User;
use App\Models\ExamResult;

class ExamController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/exam/list
      * method: get
      * params: studentId
      * description: 
        * this method will return list exam
      * return : @response
    */
    public function list (Request $request , $studentId) 
    {
    	$student_id = User::find($studentId)->student->id;
    	$exams = ExamQuery::byStudent($student_id);

    	return response($exams , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/exam/do/{id}
      * method: get
      * params: studentId , id
      * description: 
        * this method will return data exam
      * return : @return response
    */
    public function do (Request $request , $studentId , $id) 
    {
      $response = ExamQuery::do($id);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/exam/submit/{id}
      * method: post
      * params: exam
      * description: 
        * this method for submit result exam student
      * @return : @var response
    */
    public function store (Request $request , $studentId, $id) 
    {
      ExamResult::create([
        'exam_id'    => $id,
        'student_id' => User::find($studentId)->student->id,
        'score'      => 0,
      ]);
      $resultId = ExamResult::get()->last()->id;
      ExamQuery::storeAnswer($resultId , $request->all());
      return response($request->all() , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
    	
}
