<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\LibraryQuery;
use App\Models\User;
use App\Models\BorrowBook;

class BorrowBookController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/library/borrow
      * method: get
      * params: teacherId
      * description: 
        * this method will return list data borrow books
      * return : @response
    */
    public function index (Request $request , $teacherId) 
    {
		$library_id = User::find($teacherId)->teacher->school->library->id;
		$data       = BorrowBook::where('library_id' , $library_id)->get();
		$borrows    = LibraryQuery::getBorrows($data);
    	return response($borrows , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    
    
    /**
      * route: /api/teacher/{teacherId}/library/borrow/add
      * method: post
      * params: teacherId , class_id , student_id , book_id
      * description: 
        * this method for insert new borrow data
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
    	$student_id = User::find($request->student_id)->student->id;
    	$library_id = User::find($teacherId)->teacher->school->library->id;
    	BorrowBook::create([
			'student_id' => $student_id,
			'library_id' => $library_id,
			'book_id'    => $request->book_id,
			'start_time' => now(),
    	]);
    	$response = BorrowBook::get()->last();
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/library/borrow/{id}/return
      * method: put
      * params: teacherId , id
      * description: 
        * this method for mark as return data
      * return : @response
    */
    public function markReturn (Request $request , $teacherId , $id) 
    {
    	BorrowBook::where('id' , $id)->update([
          'status' => 'return',
          'finish_time' => now(),
        ]);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
}
