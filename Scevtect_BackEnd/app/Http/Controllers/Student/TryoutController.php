<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\TryoutQuery;
use App\Models\User;
use App\Models\TryoutResult;

class TryoutController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/tryout/list
      * method: get
      * params: studentId
      * description: 
        * this method will retun list tryouts
      * return : @response
    */
    public function list (Request $request , $studentId) 
    {
		$student_id = User::find($studentId)->student->id;
		$tryouts = TryoutQuery::byStudent($student_id);

		return response($tryouts , 200)
		    			->header('Content-Type' , 'application/json');    	
    }
    	


    
    
    /**
      * route: /api/student/{studentId}/tryout/do/{id}
      * method: get
      * params: studentId , id
      * description: 
        * this method will erturn data tryout
      * @return : @var array
    */
    public function do (Request $request , $studentId , $id) 
    {
      $response = TryoutQuery::do($id);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/tryout/submit/{id}
      * method: post
      * params: studentId , id , result
      * description: 
        * this method for submit result tryout student
      * @return : @var response
    */
    public function store (Request $request , $studentId , $id) 
    {
      TryoutResult::create([
        'tryout_id'  => $id,
        'student_id' => User::find($studentId)->student->id,
        'score'      => 0,
      ]);
      $resultId = TryoutResult::get()->last()->id;
      $score = TryoutQuery::storeAnswer($resultId , $request->all());
      return response($score , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
}
