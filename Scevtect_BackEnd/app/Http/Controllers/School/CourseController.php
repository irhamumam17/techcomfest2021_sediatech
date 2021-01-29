<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;

class CourseController extends Controller
{
    
    
    
    /**
      * route: /api/school/{schoolId}/course
      * method: get
      * params: null
      * description: 
        * this method for get data courses
      * return : @response
    */
    public function index (Request $request  ,$schoolId) 
    {
    	$schoolId = User::find($schoolId)->school->id;
    	$courses = Course::where('school_id' , $schoolId)->get();
    	return response($courses , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/course/add
      * method: post
      * params: course , acronym , 
      * description: 
        * this metho for create new course
      * return : @response
    */
    public function store (Request $request , $schoolId) 
    {
    	$request->validate([
    		'name' => 'required|string|min:3|max:30',
    		'acronym' => 'required|string|min:1|max:10',
    	]);

    	$schoolId = User::find($schoolId)->school->id;
    	Course::create([
    		'school_id' => $schoolId,
    		'name' => $request->name,
    		'acronym' => $request->acronym,
    	]);

    	return response($request->all() , 200)
    			->header('Content-Type' , 'application/json');
    }



    
    
    /**
      * route: /api/school/{schoolId}/course;
      * method: get
      * params: schoolId , id
      * description: 
        * this method for destroy ourse
      * return : $response
    */
    public function destroy (Request $request , $schoolId , $id) 
    {
    	COurse::where('id' , $id)->delete();
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
}
