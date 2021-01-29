<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\ExamQuery;
use App\Models\User;
use App\Models\ListClass;
use App\Models\TeacherClass;
use App\Models\Exam;
use App\Models\ExamClass;
use App\Models\ExamStudent;
use App\Models\ExamQuestion;
use App\Models\ExamAnswer;
use App\Models\TeacherSubject;


class ExamController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/exam
      * method: get
      * params: teacherId
      * description: 
        * this mehtod willl return list exames
      * return : @response
    */
    public function list (Request $request , $teacherId) 
    {
    	$teacherId = User::find($teacherId)->teacher->id;
    	$exams = ExamQuery::getSlim($teacherId);
    	return response($exams , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/exam/create
      * method: post
      * params: teacherId , newExam
      * description: 
        * this method for create new exam
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
    	$teacher = User::find($teacherId)->teacher;
    	$subject_id = TeacherSubject::find($request->subject_id)->subject_id;
    	// create table exam
    	Exam::create([
			'school_id'   => $teacher->school_id,
			'teacher_id'  => $teacher->id,
			'subject_id'  => 1,
			'title'       => $request->title,
			'description' => $request->description,
			'start_time'  => $request->start_time,
			'finish_time' => $request->finish_time,
    	]);
    	$examId = Exam::get()->last()->id;

    	// insert table classes
    	foreach ($request->classesId as $id) {
            $class_id = TeacherClass::find($id)->class_id;
    		ExamClass::create([
    			'exam_id' => $examId,
    			'class_id' => $class_id, 
    		]);

    		$students = ListClass::find($class_id)->student;
    		foreach ($students as $student) {
    			ExamStudent::create([
    				'exam_id' => $examId,
    				'student_id' => $student->id,
    			]);
    		}
    	}

    	// insert questions and answers
    	foreach ($request->questions as $key => $question) {
    		$number = $key + 1;
    		ExamQuestion::create([
				'exam_id' => $examId,
				'number'    => $number,
				'question'  => $question['question'],
				'score'     => $question['score'],
    		]);

    		$questionId = ExamQuestion::get()->last()->id;
    		foreach ($question['answers'] as $answer) {
    			$correct = ($answer) ? 'true' : 'false';
    			ExamAnswer::create([
					'question_id' => $questionId,
					'answer'      => $answer['answer'],
					'correct'     => $correct,
    			]);
    		}
    	}

    	$response = Exam::get()->last();
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    
    /**
      * route: /api/teacher/{teacherid}/exam/{id}
      * method: delete
      * params: teacherid , id
      * description: 
        * this method to destroy exam
      * return : @response
    */
    public function destroy (Request $request , $teacherId , $id) 
    {
    	Exam::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
}
