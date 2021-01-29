<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Theory\TheoryResource;
use App\Http\Resources\Theory\TheoryDetailResource;
use App\Http\Resources\Theory\ListTheoryStudentResource;
use Illuminate\Support\Facades\Storage;
USE Illuminate\Http\File;
use App\Queries\TheoryQuery;
use App\Models\User;
use App\Models\Theory;
use App\Models\TheoryFile;
use App\Models\TheoryStudent;

class TheoryController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/theory/list
      * method: get
      * params: studentId
      * description: 
        * this method will retutn list data theory
      * return : @response
    */
    public function list (Request $request , $studentId) 
    {
    	$studentId = User::find($studentId)->student->id;
    	$dataTheory = TheoryStudent::where('student_id' , $studentId)->get();
      $response = ListTheoryStudentResource::collection($dataTheory);

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/theory/detail/{id}
      * method: get
      * params: studentId , id
      * description: 
        * this method will return detail data theory
      * return : @response
    */
    public function detail (Request $request , $studentId, $id) 
    {
      $studentId = User::find($studentId)->student->id;
      $theory = TheoryQuery::detailTheoryStudent($id);
      TheoryStudent::where('theory_id' , $id)
                  ->where('student_id' , $studentId)
                  ->update([
                    'read_at'=>now(),
                  ]);
      return response($theory , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/theory/download/{file}
      * method: get
      * params: studentId , file
      * description: 
        * this method for download file
      * @return : @download
    */
    public function download (Request $request , $studentId , TheoryFile $file) 
    {
      return response()->download(new File(storage_path("public/theory/documents/".$file->value)) , 'name file');
      /*return Storage::download('public/theory/documents/' . $file->value , 'asddlfj', ['Content-Type' => 'application/pdf']);*/
    }
      
      
    	
}
