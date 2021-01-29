<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Event\ListEventResource;
use App\Models\User;
use App\Models\Event;

class EventController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/event/school
      * method: get
      * params: studentId
      * description: 
        * this method wil return list event schhoo
      * @return : @var array
    */
    public function school (Request $request , $studentId) 
    {
    	$schoolId = User::find($studentId)->student->school_id;
    	$events = Event::where('school_id' , $schoolId)->where('status' , 'school')->get();
    	$response = ListEventResource::collection($events);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: api/school/{schoolId}/event/public/list
      * method: get
      * params: sccholId
      * description: 
        * this method will return list data evnent publicc
      * @return : @var array
    */
    public function listpublic (Request $request , $schoolId) 
    {
    	$events = Event::where('status' , 'public')->get();
    	$response = ListEventResource::collection($events);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }

}
