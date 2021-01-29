<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Queries\ListClassQuery;
use App\Queries\StudentQuery;
use App\Models\User;
use App\Models\Student;

class StudentController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/student
      * method: get
      * params: teacherId
      * description: 
        * this method will return list data student
      * return : @repsonse
    */
    public function index (Request $request , $teacherId) 
    {
    	$schoolId = User::find($teacherId)->teacher->school->id;
    	$students = StudentQuery::getSlim($schoolId);
    	return response($students , 200)
    			->header('Content-Type' , 'application/json');
    }




    
    
    /**
      * route: /api/teacher/{teacherId}/student/class/{id}
      * method: get
      * params: teacherId , id
      * description: 
        * this method will return student by class
      * return : @response
    */
    public function getByClass (Request $request , $teacherId , $id) 
    {
      $data = Student::where('class_id' , $id)->get();
      $students = collect([]);
      foreach ($data as $student) {
        $student = $student->user;
        $students->push([
          'id'   => $student->id,
          'name' => $student->name
        ]);
      }

      return response($students , 200)
          ->header('Content-Type' , 'application/json');
    }
      


    
    
    /**
      * route: /api/school/{teacherId}/student/add
      * method: post
      * params: teacherId , name , email , password , class_id , gender , nis , address
      * description: 
        * this method for create new data student
      * return : @response
    */
    public function store (Request $request , $teacherId) 
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

    	$schoolId = User::find($teacherId)->teacher->school->id;
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
    	
    	
}
