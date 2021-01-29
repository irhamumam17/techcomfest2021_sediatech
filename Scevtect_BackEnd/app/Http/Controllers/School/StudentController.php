<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Helpers\ScheduleHelper;
use App\Queries\ListClassQuery;
use App\Queries\StudentQuery;
use App\Queries\ScheduleQuery;
use App\Models\Student;
use App\Models\User;

class StudentController extends Controller
{
    
    
    
    /**
      * route: /api/school/{schoolId}/student
      * method: get
      * params: schoolId
      * description: 
        * this method will return list students
      * return : @response
    */
    public function index (Request $request , $schoolId) 
    {
    	$schoolId = User::find($schoolId)->school->id;
    	$students = StudentQuery::getSlim($schoolId);
    	return response($students , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    
    
    /**
      * route: /api/school/{schoolId}/student/add
      * method: post
      * params: schoolId , name , email , password , class_id , gender , nis , address
      * description: 
        * this method for create new data student
      * return : @response
    */
    public function store (Request $request , $schoolId) 
    {
    	$request->validate([
			'name'     => 'required|string|min:3|max:50',
			'email'    => 'required|email|unique:users',
			'password' => 'required|string|min:3|max:50',
			'class_id' => 'required|numeric',
			'nis'      => 'required|string|max:50',
			'gender'   => 'required|string',
			'phone'    => 'nullable|string|min:4|max:25',
			'address'  => 'nullable|string|min:5|max:50',
    	]);

    	User::create([
			'name'     => $request->name,
			'email'    => $request->email,
			'password' => Hash::make($request->password),
			'level_id' => 5,
			'image'    => 'student.jpg',
    	]);

    	$schoolId = User::find($schoolId)->school->id;
    	Student::create([
			'user_id'   => User::get()->last()->id,
			'school_id' => $schoolId,
			'class_id'  => $request->class_id,
			'gender'    => $request->gender,
			'nis'       => $request->nis,
			'phone'     => $request->phone,
			'address'   => $request->address,
    	]);

    	$student = Student::get()->last();
    	$response = [
			'id'    => $student->id,
			'name'  => $student->user->name,
			'nis'   => $student->nis,
			'class' => ListClassQuery::findName($student->class_id),
    	];

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }



    
    
    /**
      * route: /api/school/{schoolId}/student/schedule    
      * method: get
      * params: school_id
      * description: 
        * this method will return list schedule
      * return : @var response
    */
    public function getSchedule (Request $request , $schoolId) 
    {
      $schoolId = User::find($schoolId)->school->id;
      $schedules = ScheduleQuery::studentSlim($schoolId);
      return response($schedules , 200)
          ->header('Content-Type' , 'application/json');
    } 
      


    
    
    /**
      * route: /api/school/{schoolId}/student/schedule/add
      * method: post
      * params: schoolId , from_date , to_date
      * description: 
        * this method fr create new schedule
      * return : @response
    */
    public function storeSchedule (Request $request , $schoolId) 
    {
      $schoolId = User::find($schoolId)->school->id;
      $dates = ScheduleHelper::studentCreate($request->from_date , $request->to_date , $schoolId);
      $response = collect([]);
      foreach ($dates as $date) {
        $date = collect($date);
        $date->put('already' , 0);
        $date->put('notyet' , Student::where('school_id' , $schoolId)->get()->count());
        $response->push($date);
      }
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
    


    
    
    /**
      * route: /api/school/{schoolId}/student/{id}
      * method: delete 
      * params: schoolId , id
      * description: 
        * this method will delete student where id 
      * return : @response
    */
    public function destroy (Request $request , $schoolId, $id) 
    {
      $student = Student::find($id);
      User::where('id' , $student->user->id)->delete();
    	Student::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
}
