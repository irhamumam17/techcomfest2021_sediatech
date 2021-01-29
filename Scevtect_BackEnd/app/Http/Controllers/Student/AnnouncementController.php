<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\AnnouncementQuery;
use App\Models\User;

class AnnouncementController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/announcement
      * method: get
      * params: studentId
      * description: 
        * this method will return list announcement
      * @return : @var array
    */
    public function index (Request $request , $studentId) 
    {
    	$student = User::find($studentId)->student;
    	$response = AnnouncementQuery::byStudent($student);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
}
