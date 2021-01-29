<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\TryoutQuery;
use App\Models\User;
use App\Models\ListClass;
use App\Models\TeacherClass;
use App\Models\Tryout;
use App\Models\TryoutClass;
use App\Models\TryoutStudent;
use App\Models\TryoutQuestion;
use App\Models\TryoutAnswer;
use App\Models\TeacherSubject;

class TryoutController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/tryout
      * method: get
      * params: teacherId
      * description: 
        * this method will return list tryout
      * return : @response
    */
    public function list (Request $request , $teacherId) 
    {
    	$teacherId = User::find($teacherId)->teacher->id;
    	$tryouts = TryoutQuery::getSlim($teacherId);
    	return response($tryouts , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    
    
    /**
      * route: /api/teacher/{teacherId}/tryout/create
      * method: post
      * params: many
      * description: 
        * this method for create new tryout
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
    	$teacher = User::find($teacherId)->teacher;
    	$subject_id = TeacherSubject::find($request->subject_id)->subject_id;
    	// create table tryout
    	Tryout::create([
			'school_id'   => $teacher->school_id,
			'teacher_id'  => $teacher->id,
			'subject_id'  => 1,
			'title'       => $request->title,
			'description' => $request->description,
			'deadline'    => $request->deadline,
			'duration'    => $request->duration,
    	]);
    	$tryoutId = Tryout::get()->last()->id;

    	// insert table classes
    	foreach ($request->classesId as $id) {
            $class_id = TeacherClass::find($id)->class_id;
    		TryoutClass::create([
                'tryout_id' => $tryoutId,
                'class_id'  => $class_id, 
    		]);

    		$students = ListClass::find($class_id)->student;
    		foreach ($students as $student) {
    			TryoutStudent::create([
                    'tryout_id'  => $tryoutId,
                    'student_id' => $student->id,
    			]);
    		}
    	}

    	// insert questions and answers
    	foreach ($request->questions as $key => $question) {
    		$number = $key + 1;
    		TryoutQuestion::create([
				'tryout_id' => $tryoutId,
				'number'    => $number,
				'question'  => $question['question'],
				'score'     => $question['score'],
    		]);

    		$questionId = TryoutQuestion::get()->last()->id;
    		foreach ($question['answers'] as $answer) {
    			$correct = ($answer['correct']) ? 'true' : 'false';
    			TryoutAnswer::create([
					'question_id' => $questionId,
					'answer'      => $answer['answer'],
					'correct'     => $correct,
    			]);
    		}
    	}


    	$response = Tryout::get()->last();
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/tryout/{id}
      * method: delete
      * params: teacherId , id
      * description: 
        * this method for destroy tryout
      * return : @response
    */
    public function destroy (Request $request , $teacherId , $id) 
    {
    	Tryout::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
}
