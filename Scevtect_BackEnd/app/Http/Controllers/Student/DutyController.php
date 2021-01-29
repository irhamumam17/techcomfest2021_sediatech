<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Resources\Duty\DutyResource;
use App\Http\Resources\Duty\DutyDetailResource;
use App\Http\Resources\Duty\DutyResponseResource;
use App\Queries\DutyQuery;
use App\Models\User;
use App\Models\Duty;
use App\Models\DutyStudent;
use App\Models\DutyResponse;
use App\Models\ResponseFile;

class DutyController extends Controller
{
    /**
      * route: /api/student/{studentId}/duty/list
      * method: get
      * params: studentId
      * description: 
        * this method will retutn list data duty
      * return : @response
    */
    public function list (Request $request , $studentId) 
    {
    	$studentId = User::find($studentId)->student->id;
      $response = DutyQuery::listDutyStudent($studentId);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }



    /**
      * route: /api/student/{studentId}/duty/{id}
      * method: get
      * params: id
      * description: 
        * this method will return detail data duty
      * return : @response
    */
    public function detail (Request $request , $studentId , $id) 
    {
      $studentId = User::find($studentId)->student->id;
      $duty = DutyQuery::detailDutyStudent($id , $studentId);
      DutyStudent::where('duty_id' , $id)
                ->where('student_id' , $studentId)
                ->update([
                   'read_at' => now(),
                ]);
      return response($duty , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/studeent/{studentId}/duty/detail/{duty}/response
      * method: get
      * params: studentId , duty
      * description: 
        * this method will return list response duty
      * @return : @var array
    */
    public function response (Request $request , $studentId , Duty $duty) 
    {
      $studentId = User::find($studentId)->student->id;
      $data = DutyResponse::where('student_id' , $studentId)
                            ->where('duty_id' , $duty->id)
                            ->get();
      $response = DutyResponseResource::collection($data);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      


    
    
    /**
      * route: /api/student/{studentId}/duty/response/{duty}/upload
      * method: post
      * params: studentId , duty
      * description: 
        * this method for upload file respones
      * @return : @var array
    */
    public function upload (Request $request, $studentId , Duty $duty) 
    {
      $name = 'File_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->file->getClientOriginalExtension();
      Storage::putFileAs('public\duty\response\documents', new File($request->file) , $name);

      $response = [
        'name'      => $name,
        'extension' => $request->file->getClientOriginalExtension(),
        'size'      => $request->file->getSize(),
      ];

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/duty/responsee/{duty}/submit
      * method: post
      * params: studentid, duty
      * description: 
        * this method for submit duty
      * @return : @var array
    */
    public function submit (Request $request , $studentId , Duty $duty) 
    {
      $studentId = User::find($studentId)->student->id;

      // insert into table duty and duty files
      DutyResponse::create([
        'duty_id'     => $duty->id,
        'student_id'  => $studentId,
        'title'       => $request->title,
        'description' => $request->description,
      ]);

      if($request->file) {
        ResponseFile::create([
          'response_id' => DutyResponse::get()->last()->id,
          'name' => $request->file['name'],
          'size' => $request->file['size'],
          'extension' => $request->file['extension'],
        ]);
      }

      // update status response duty student
      DutyStudent::where('student_id' , $studentId)
                  ->where('duty_id' , $duty->id)
                  ->update([ 'response_at' => now() ]);

      $response = DutyResponse::get()->last();
      $response = new DutyResponseResource($response);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
}
