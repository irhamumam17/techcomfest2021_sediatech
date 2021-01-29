<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Subject;
use App\Models\ClassSubject;

class SubjectController extends Controller
{
 
    
    
    /**
      * route: api/school/{schoolId}/subject
      * method: get
      * params: shoolId
      * description: 
        * this method will return list subject
      * return : @response
    */
    public function index (Request $request , $schoolId) 
    {
    	$schoolId = User::find($schoolId)->school->id;
    	$subjects = Subject::where('school_id' , $schoolId)->get();
    	$response = collect([]);
    	foreach ($subjects as $subject) {
    		$response->push([
    			'id' => $subject->id,
    			'subject' => $subject->subject,
    			'acronym' => $subject->acronym,
    			'classes' => $subject->class->count(),
    		]);
    	}
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	   
    
    
    /**
      * route: /api/school/{schoolId}/subject/add
      * method: post
      * params: subject, acronym, classes_id, schoolId
      * description: 
        * this method for creating new subject
      * return : @response
    */
    public function store (Request $request , $schoolId) 
    {
    	$request->validate([
    		'subject' => 'required|min:3|max:25',
    		'acronym' => 'required|min:1|max:10',
    	]);

    	$schoolId = User::find($schoolId)->school->id;

    	Subject::create([
			'school_id' => $schoolId,
			'subject'   => $request->subject,
			'acronym'   => $request->acronym,
    	]);

    	foreach ($request->classes_id as $id) {
    		ClassSubject::create([
				'subject_id' => Subject::get()->last()->id,
				'class_id'   => $id,
    		]);
    	}

    	$response = [
            'id'      => Subject::get()->last()->id,
            'subject' => $request->subject,
            'acronym' => $request->acronym,
            'classes' => $request->classes_id,
    	];

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/subject/{id}
      * method: delete
      * params: id
      * description: 
        * this method for destroy row in table subjects
      * return : @reponse
    */
    public function destroy (Request $request , $schoolId , $id) 
    {
        $subject = Subject::destroy($id);
        return response($subject , 200)
                ->header('Content-Type' , 'application/json');
    }
        
    	
}
