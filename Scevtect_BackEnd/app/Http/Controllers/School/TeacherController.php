<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Helpers\ScheduleHelper;
use App\Queries\ScheduleQuery;
use App\Queries\TeacherQuery;
use App\Models\RoleTeacher;
use App\Models\Teacher;
use App\Models\User;
use App\Models\Subject;
use App\Models\ListClass;
use App\Models\TeacherSubject;
use App\Models\TeacherClass;

class TeacherController extends Controller
{
    
    
    
    /**
      * route: /api/school/{schoolId}/teacher/
      * method: get
      * params: null
      * description: 
        * this method for displa list teacher
      * return : @response
    */
    public function index (Request $request , $schoolId) 
    {
    	$schoolId = User::find($schoolId)->school->id;
    	$teachers = TeacherQuery::getSlim($schoolId);
    	return response($teachers , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/teacher/role
      * method: get
      * params: schoolId
      * description: 
        * this method for display list role teacher
      * return : @response
    */
    public function getRole (Request $request , $scoolId) 
    {
    	$roles = RoleTeacher::get();
    	return response($roles , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/teacher/add
      * method: post
      * params: name , email , password , role_id , nip , phone , address
      * description: 
        * this method for crete new teacher
      * return : @response
    */
    public function store (Request $request , $schoolId) 
    {
    	$request->validate([
			'name'     => 'required|string|min:3|max:50',
			'email'    => 'required|email|unique:users',
			'password' => 'required|string|min:3|max:50',
			'role_id'  => 'required|numeric',
			'nip'      => 'required|string|min:5|max:50',
			'phone'    => 'required|string|min:4|max:25',
			'address'  => 'required|string|min:5|max:50',
    	]);

    	User::create([
			'name'     => $request->name,
			'email'    => $request->email,
			'password' => Hash::make($request->password),
			'image'    => 'teacher.jpg',
			'level_id' => 4,
    	]);

    	Teacher::create([
			'role_id'   => $request->role_id,
			'user_id'   => User::get()->last()->id,
			'school_id' => User::find($schoolId)->school->id,
			'status'    => 'confirmed',
			'phone'     => $request->phone,
			'address'   => $request->address,
			'nip'       => $request->nip
    	]);

    	$teacher = Teacher::get()->last();

    	$response = [
			'id'   => $teacher->id,
			'name' => $request->name,
			'role' => $teacher->role->name,
			'nip'  => $request->nip,
    	];
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }





    /**
      * route: /api/school/{schoolId}/teacher/schedule    
      * method: get
      * params: school_id
      * description: 
        * this method will return list schedule
      * return : @var response
    */
    public function getSchedule (Request $request , $schoolId) 
    {
      $schoolId = User::find($schoolId)->school->id;
      $schedules = ScheduleQuery::teacherSlim($schoolId);
      return response($schedules , 200)
          ->header('Content-Type' , 'application/json');
    } 






    /**
      * route: /api/school/{schoolId}/teacher/schedule/add
      * method: post
      * params: schoolId , from_date , to_date
      * description: 
        * this method fr create new schedule
      * return : @response
    */
    public function storeSchedule (Request $request , $schoolId) 
    {
      $schoolId = User::find($schoolId)->school->id;
      $dates = ScheduleHelper::teacherCreate($request->from_date , $request->to_date , $schoolId);
      $response = collect([]);
      foreach ($dates as $date) {
        $date = collect($date);
        $date->put('already' , 0);
        $date->put('notyet' , Teacher::where('school_id' , $schoolId)->get()->count());
        $response->push($date);
      }
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }

    
    
    /**
      * route: /api/school/{schoolId}/teacher/{id}
      * method: get
      * params: schoolId, id
      * description: 
        * this method will return detail data teacher
      * return : @response
    */
    public function detail (Request $request , $schoolId , $id) 
    {
      $teacher = Teacher::find($id);
      return response($teacher->user , 200)
          ->header('Content-Type' , 'application/json');
    }

    
    
    /**
      * route: /api/school/{schoolId}/teacher/{id}/subject/list
      * method: get
      * params: id
      * description: 
        * this method will return list teacher subject
      * return : @response
    */
    public function listSubject (Request $request , $schoolId , $id) 
    {
      $subjects = TeacherSubject::where('teacher_id' , $id)->get();
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
      * route: /api/school/{schoolId}/teacher/{id}/subject/add
      * method: post
      * params: schoolId , id , subject_id
      * description: 
        * this method for create new teacher subject
      * return : @response
    */
    public function storeSubject (Request $request , $schoolId , $id) 
    {
      $request->validate([
        'subject_id' => 'required|numeric',
      ]);

      TeacherSubject::create([
        'teacher_id' => $id,
        'subject_id' => $request->subject_id,
      ]);

      $subject = Subject::find($request->subject_id);
      $response = [
        'id'      => TeacherSubject::get()->last()->id,
        'subject' => $subject->subject,
      ];

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/teacher/{id}/subject/{subject}
      * method: delete
      * params: scholId , id , subject
      * description: 
        * this method for destroy teacher subject
      * return : @response
    */
    public function destroySubject (Request $request , $schoolId , $id , $subject) 
    {
      TeacherSubject::destroy($subject);
      return response($subject , 200)
          ->header('Content-Type' , 'application/json');
    }

    
    
    /**
      * route: /api/school/{schoolId}/teacher/{id}/class/list
      * method: get
      * params: schoolId, id
      * description: 
        * this method will return list teacher classes
      * return : @response
    */
    public function listClass (Request $request , $schoolId , $id) 
    {
      $classes = TeacherClass::where('teacher_id' , $id)->get();
      $collections = collect([]);
      foreach ($classes as $class) {
        $c = $class->class;
        $course = ($c->course) ? $c->course->name : '';
        $name = $c->grade->name . ' ' . $course . ' ' . $c->sub->name;
        $arr = [
          'id'      => $class->id,
          'class_name' => $name,
        ];
        $collections->push($arr);
      }

      return response($collections , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      


    
    
    /**
      * route: /api/school/{schoolId}/teacher/{id}/class/add
      * method: post
      * params: schoolId , id , class_id
      * description: 
        * this method for create new teacher class
      * return : @response
    */
    public function storeClass (Request $request , $schoolId , $id) 
    {
      $request->validate([
        'class_id' => 'required|numeric',
      ]);

      TeacherClass::create([
        'teacher_id' => $id,
        'class_id' => $request->class_id,
      ]);

      $class = ListClass::find($request->class_id);
      $course = ($class->course) ? $class->course->name : '';
      $name = $class->grade->name . ' ' . $course . ' ' . $class->sub->name;
      $response = [
        'id'      => TeacherClass::get()->last()->id,
        'class_name' => $name,
      ];

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/schoo/{schoolId}/teacher/{id}/class/{class_id}
      * method: delete
      * params: schoolId , id , class_id
      * description: 
        * this method for destroy class teacher
      * return : @response
    */
    public function destroyClass (Request $request , $schoolId , $id , $class_id) 
    {
      TeacherClass::destroy($class_id);
      return response($class_id , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
      
      


    
    
    /**
      * route: /api/school/{schoolId}/teacher/{id}
      * method: delete
      * params: schoolId , id
      * description: 
        * this method for delete data teacher
      * return : @response
    */
    public function destroy (Request $request , $schoolId , $id) 
    {
      $teacher = Teacher::find($id);
      User::where('id' , $teacher->user->id)->delete();
    	Teacher::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
    	
}
