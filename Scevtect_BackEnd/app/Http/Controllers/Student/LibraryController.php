<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Library\Student\ListBorrowResource;
use App\Http\Resources\Library\Student\DetailBorrowResource;
use App\Models\User;
use App\Models\BorrowBook;

class LibraryController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/library/borrow
      * method: get
      * params: studentId
      * description: 
        * this method will return list borrow book
      * @return : @var array
    */
    public function borrow (Request $request , $studentId) 
    {
		$studentId = User::find($studentId)->student->id; 
		$borrows   = BorrowBook::where('student_id' , $studentId)->get();
		$response  = ListBorrowResource::collection($borrows);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/library/borrow/{id}
      * method: get
      * params: studentId , id
      * description: 
        * this method will return detail data borrow
      * @return : @var array
    */
    public function detail (Request $request , $studentId, $id) 
    {
      $borrow = BorrowBook::find($id);
      $response = new DetailBorrowResource($borrow);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    	
}
