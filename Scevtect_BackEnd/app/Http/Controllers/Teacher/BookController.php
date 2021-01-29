<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Library;
use App\Models\Book;

class BookController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/library/book
      * method: get
      * params: teacherId
      * description: 
        * this method will return list books
      * return : @response
    */
    public function index (Request $request , $teacherId) 
    {
      $schoolId = User::find($teacherId)->teacher->school_id;
      $library  = Library::where('school_id' , $schoolId)->get()->first();
      $books    = $library->book;
      return response($books , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    
    
    /**
      * route: /api/teacher/{teacherId}/library/book/cover
      * method: post
      * params: teacherId
      * description: 
        * this method for upload cover book
      * return : @response
    */
    public function uploadCover (Request $request , $teacherId) 
    {
    	return response('upload cover' , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/library/book/store
      * method: post
      * params: teacherId , title , code , publisher , total , description
      * description: 
        * this method for add new book
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
      $schoolId = User::find($teacherId)->teacher->school_id;
      $libraryId = Library::where('school_id' , $schoolId)->get()->first()->id;
      Book::create([
        'library_id'  => $libraryId,
        'title'       => $request->title,
        'code'        => $request->code,
        'publisher'   => $request->publisher,
        'total'       => $request->total,
        'description' => $request->description,
      ]);
    	return response($request->all() , 200)
    			->header('Content-Type' , 'application/json');
    }



    
    
    /**
      * route: /api/teacher/{teacherId}/library/book/{id}
      * method: delete
      * params: teacherId , id
      * description: 
        * this method for destroy book
      * return : @response
    */
    public function destroy (Request $request , $teacherId , $id) 
    {
      Book::destroy($id);
      return response($id , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    	
    	
}
