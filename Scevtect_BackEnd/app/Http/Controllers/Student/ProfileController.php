<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/profile/student
      * method: get
      * params: studentid
      * description: 
        * this method will return data student
      * @return : @var array
    */
    public function student (Request $request , $studentId) 
    {
    	$user = User::find($studentId);
    	$response = [
			'id'      => $studentId,
			'name'    => $user->name,
			'email'   => $user->email,
			'nis' => $user->student->nis,
			'phone'   => $user->student->phone,
			'address' => $user->student->address,
    	];
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
}
