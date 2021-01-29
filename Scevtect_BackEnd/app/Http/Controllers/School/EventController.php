<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use App\Http\Resources\Event\ListEventResource;
use App\Models\Event;
use App\Models\User;

class EventController extends Controller
{
    
    
    
    /**
      * route: /api/school/{schoolId}/event/upload
      * method: post
      * params: image
      * description: 
        * this method for updload image
      * @return : @var array
    */
    public function uploadImage (Request $request , $schoolId) 
    {
    	$image = 'Image_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->image->getClientOriginalExtension();
    	Storage::putFileAs('public\event\images' , new File($request->image) , $image);

    	return response($image , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    
    
    /**
      * route: /api/school/{schoolId}/event/add
      * method: post
      * params: name , status , locaation, date , description
      * description: 
        * this method for creat new event
      * @return : @var array
    */
    public function store (Request $request , $schoolId) 
    {
    	$schoolId = User::find($schoolId)->school->id;
    	Event::create([
			'school_id'   => $schoolId,
			'image'       => $request->image,
			'name'        => $request->name,
			'location'    => $request->location,
			'date'        => $request->date,
			'description' => $request->description,
			'status'      => $request->status,
    	]);
		$event    = Event::get()->last();
		$response = new ListEventResource($event);

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/event/school/list
      * method: get
      * params: schoolId
      * description: 
        * this method will return list data event school
      * @return : @var array
    */
    public function listSchool (Request $request , $schoolId) 
    {
    	$schoolId = User::find($schoolId)->school->id;
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
    public function listPublic (Request $request , $schoolId) 
    {
    	$events = Event::where('status' , 'public')->get();
    	$response = ListEventResource::collection($events);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    				
    	
}
