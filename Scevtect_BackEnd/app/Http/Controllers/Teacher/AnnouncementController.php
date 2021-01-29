<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\Announcement\AnnouncementResources;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Teacher;
use App\Models\Announcement;
use App\Models\AnnounceTeacher;
use App\Models\AnnounceClass;

class AnnouncementController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/announce/list
      * method: get
      * params: teacherId
      * description: 
        * this method will return list announcement
      * return : @response
    */
    public function index (Request $request , $teacherId) 
    {
    	$data = Announcement::get();
    	return response(AnnouncementResources::collection($data) , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/annouce/add
      * method: post
      * params: teacherid , title , description , status , class_id
      * description: 
        * this method for create new announcement
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
    	$schoolId = User::find($teacherId)->teacher->school_id;

    	// insert into table announcement
    	Announcement::create([
			'school_id'   => $schoolId,
			'user_id'     => $teacherId,
			'title'       => $request->title,
			'description' => $request->description,
			'status'      => $request->status,
    	]);
    	$announceId = Announcement::get()->last()->id;

    	// if status announcement is teacher or publik
    	if($request->status === 'teacher') {
    		$teachers = Teacher::where('school_id' , $schoolId)->get();
    		foreach ($teachers as $teacher) {
    			$teacherId = $teacher->id;
    			AnnounceTeacher::create([
					'announce_id' => $announceId,
					'teacher_id'  => $teacherId,
    			]);
    		}
    	}


    	// insert table announce class
    	foreach ($request->classesId as $id) {
    		AnnounceClass::create([
				'announce_id' => $announceId,
				'class_id'    => $id,
    		]);
    	}

    	/*
    	  * Return */
    	$response = Announcement::get()->last();
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }



    
    
    /**
      * route: /api/teacher/{teacherId}/announce/{id}
      * method: delete
      * params: teacherId , id
      * description: 
        * this method for destroy row in table announcements
      * return : @response
    */
    public function destroy (Request $request , $teacherId , $id) 
    {
    	Announcement::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
}
