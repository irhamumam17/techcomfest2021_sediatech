<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Teacher;
use App\Queries\ListClassQuery;


class ClassController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/class
      * method: get
      * params: teacherId
      * description: 
        * this method will return list classes
      * return : @response
    */
    public function index (Request $request , $teacherId) 
    {
    	$teacher_id = User::find($teacherId)->teacher->id;
    	$schoolId = Teacher::find($teacher_id)->school->id;
	    $classes = ListClassQuery::list($schoolId);
	    return response($classes , 200)
	          ->header('Content-Type' , 'application/json');
    }
    	
}
