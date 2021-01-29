<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\TeacherSubject;
use App\Models\TeacherClass;
use App\Models\User;

class ProfileController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/role
      * method: get
      * params: teacherId
      * description: 
        * this method for get teacher role
      * return : $response
    */
    public function getRole (Request $request , $teacherId) 
    {
    	$teacherId = User::find($teacherId)->teacher->id;
    	return response(Teacher::find($teacherId)->role_id , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/profile
      * method: get
      * params: teacherId
      * description: 
        * thsi method will return profile data
      * return : @response
    */
    public function profile (Request $request , $teacherId) 
    {
      $user = User::find($teacherId);
      $teacher = Teacher::where('user_id' , $user->id)->first();
      $response = [
        'name'    => $user->name,
        'email'   => $user->email,
        'hp'      => $teacher->phone,
        'address' => $teacher->address,
        'role'    => $teacher->role->name,
      ];

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/teacher/subject
      * method: get
      * params:teacherId
      * description: 
        * this method will return list subject
      * return : @response
    */
    public function getSubject (Request $request , $teacherId) 
    {
      $teacherId = User::find($teacherId)->teacher->id;
      $subjects = TeacherSubject::where('teacher_id' , $teacherId)->get();
      $collections = collect([]);
      foreach ($subjects as $subject) {
        $arr = [
          'id'      => $subject->id,
          'subject' => $subject->subject->subject,
        ];
        $collections->push($arr);
      }

      return response($collections , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: api/teacher/{teacherId}/teacher/class
      * method: get
      * params: teacherId
      * description: 
        * this method will return list class
      * return : @response
    */
    public function getClass (Request $request , $teacherId) 
    {
      $teacherId = User::find($teacherId)->teacher->id;
      $classes = TeacherClass::where('teacher_id' , $teacherId)->get();
      $collections = collect([]);
      foreach ($classes as $class) {
        $c = $class->class;
        $course = ($c->course) ? $c->course->name : '';
        $name = $c->grade->name . ' ' . $course . ' ' . $c->sub->name;
        $arr = [
          'id'         => $class->id,
          'class_name' => $name,
        ];
        $collections->push($arr);
      }

      return response($collections , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
      
    	
}
