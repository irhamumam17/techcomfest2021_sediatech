<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Subject\SubjectResource;
use App\Queries\ListClassQuery;
use App\Queries\SubjectQuery;
use App\Models\User;
use App\Models\ClassGrade;
use App\Models\SubClass;
use App\Models\ListClass;

class ClassController extends Controller
{
    
    
    
    /**
      * route: /scholl/class/{schoolId}/level
      * method: get
      * params: null
      * description: 
        * this method for show list level class school
      * return : @response
    */
    public function getLevel (Request $request , $schoolId) 
    {
    	$school = User::find($schoolId)->school;
    	$grades = ClassGrade::where('school_id' , $school->id)->get();
    	return response($grades , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /school/class/{schoolId}/level/add
      * method: post
      * params: schoolId , name
      * description: 
        * this method for create new Level
      * return : @response
    */
    public function storeLevel (Request $request , $schoolId) 
    {
    	$request->validate([
    		'name' => 'required|numeric|max:100',
    	]);
    	$schoolId = User::find($schoolId)->school->id;
    	ClassGrade::create([
			'school_id' => $schoolId,
			'name'      => $request->name,
    	]);
    	$response = ClassGrade::get()->last();
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/class/{schoolId}/level/{id}
      * method: delete
      * params: schoolId , id
      * description: 
        * this method for destroy level data
      * return : @response
    */
    public function destroyLevel (Request $request , $schoolId , $id) 
    {
    	ClassGrade::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	


    
    
    /**
      * route: /school/class/{schoolId}/sub
      * method: get
      * params: schoolId
      * description: 
        * this mehtod for show list sub classes school
      * return : @response
    */
    public function getSub (Request $request , $schoolId) 
    {
    	$school = User::find($schoolId)->school;
    	$subs = SubClass::where('school_id' , $school->id)->get();
    	return response($subs , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/class/{schoolId}/sub/add
      * method: post
      * params: schoolId , name
      * description: 
        * this method for create new Sub Class in schools
      * return : @response
    */
    public function storeSub (Request $request , $schoolId) 
    {
    	$request->validate([
    		'name' => 'required|string|max:3|min:1',
    	]);
    	$schoolId = User::find($schoolId)->school->id;
    	SubClass::create([
    		'school_id' => $schoolId,
    		'name' => $request->name,
    	]);
    	$sub = SubClass::get()->last();
    	return response($sub , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/class/{schoolId}/sub/{id}
      * method: delete
      * params: schoolId , id
      * description: 
        * this method for destroy row Sub Classes
      * return : @response
    */
    public function destroySub (Request $request , $schoolId , $id) 
    {
    	SubClass::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }




    
    
    /**
      * route: /api/school/{schoolId}/class/list
      * method: get
      * params: schoolId
      * description: 
        * this method for show list classes in school
      * return : @response
    */
    public function getClasses (Request $request , $schoolId) 
    {
      $schoolId = User::find($schoolId)->school->id;
      $classes = ListClassQuery::list($schoolId);
      return response($classes , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/class/add
      * method: post
      * params: schoolId , level_id , sub_id , course_id
      * description: 
        * this method for create new class in school
      * return : @response
    */
    public function storeClass (Request $request , $schoolId) 
    {
      $request->validate([
        'level_id' => 'required|numeric|min:1',
        'sub_id' => 'required|numeric|min:1',
        'course_id' => 'required|numeric|min:1',
      ]);

      $schoolId = User::find($schoolId)->school->id;

      ListClass::create([
        'school_id' => $schoolId,
        'grade_id'  => $request->level_id,
        'sub_id'    => $request->sub_id,
        'course_id' => $request->course_id,
      ]);

      $class = ListClass::get()->last();
      $course = ($class->course) ? $class->course->name : '';
      $arr = [
        'id'     => $class->id,
        'class_name'  => $class->grade->name . ' ' . $course . ' ' . $class->sub->name,
      ];

      return response($arr , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/class/{id}
      * method: delete
      * params: schoolId , id
      * description: 
        * this method for delete data classes
      * return : @response
    */
    public function destroyClass (Request $request , $schoolId , $id) 
    {
      ListClass::destroy($id);
      return response($id , 200)
          ->header('Content-Type' , 'application/json');
    }
    


    
    
    /**
      * route: /api/school/{schoolId}/class/{id}/subject
      * method: get
      * params: schoolId , id
      * description: 
        * this method for get class subject
      * return : @response
    */
    public function getSubject (Request $request , $schoolId , $id) 
    {
      $subjects = SubjectQuery::byClass($id);
      $response = SubjectResource::collection($subjects);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
      
    	
    	
    	
    	
}
