<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use App\Http\Resources\Duty\DutyResource;
use App\Http\Resources\Duty\DutyDetailResource;
use App\Http\Resources\Duty\ListResponseResource;
use App\Http\Resources\Duty\DetailResponseResource;
use App\Http\Resources\Duty\ResponseFeedbackResource;
use App\Models\User;
use App\Models\Duty;
use App\Models\DutyFile;
use App\Models\DutyClass;
use App\Models\DutyStudent;
use App\Models\ListClass;
use App\Models\TeacherClass;
use App\Models\TeacherSubject;
use App\Models\DutyResponse;
use App\Models\ResponseFeedback;

class DutyController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/duty/list
      * method: get
      * params: teacherId
      * description: 
        * this method will return list duties
      * return : @response
    */
    public function list (Request $request, $teacherId) 
    {
      $teacherId = User::find($teacherId)->teacher->id;
      $duties = Duty::where('teacher_id' , $teacherId)->get();
      $response = DutyResource::collection($duties);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: api/teacher/{teacherId}/duty/add
      * method: post
      * params: teacherId
      * description: 
        * this method will store data new duty
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
      // insert table duties
      $teacherId = User::find($teacherId)->teacher->id;
      $subject_id = TeacherSubject::find($request->subject_id)->subject_id;

      Duty::create([
        'teacher_id'  => $teacherId,
        'deadline'    => $request->deadline,
        'subject_id'  => $subject_id,
        'thumbnail'   => $request->list_files['cover']['name'],
        'title'       => $request->title,
        'description' => $request->description,
        'status'      => $request->status,
      ]);

      $dutyId = Duty::get()->last()->id;

      // insert table duty file
      function insertFile($data , $type) {
        $dutyId = Duty::get()->last()->id;
        DutyFile::create([
          'duty_id'   => $dutyId,
          'type'      => $type,
          'value'     => $data['name'],
          'extension' => $data['extension'],
          'size'      => $data['size'],
        ]);
      }

      $files = collect([]);
      foreach ($request->list_files as $file) {
        if(!collect($file)->has('name')) {
          foreach ($file as $f) {
            $files->push($f['name']);
            insertFile($f , 'document');
          }
        } else {
          $files->push($file['name']);
          insertFile($file , 'thumbnail');
        }
      }

      // insert table duty classes
      foreach($request->classes_id as $id) {
        $class_id = TeacherClass::find($id)->class_id;
        DutyClass::create([
          'duty_id'  => $dutyId,
          'class_id' => $class_id,
        ]);

        $class = ListClass::find($class_id);
        foreach($class->student as $student) {
          DutyStudent::create([
            'duty_id'  => $dutyId,
            'student_id' => $student->id,
          ]);
        }
      }

      $duty = Duty::get()->last();
      $response = new DutyResource($duty);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      



    /**
      * route: /api/teacher/{teacherId}/duty/upload/cover
      * method: post
      * params: teacherId
      * description: 
        * this method for upload file
      * return : @response
    */
    public function uploadCover (Request $request , $teacherId) 
    {
      $name = 'Cover_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->cover->getClientOriginalExtension();
      Storage::putFileAs('public\duty\covers', new File($request->cover) , $name);

      $response = collect([
        'name'      => $name,
        'extension' => $request->cover->getClientOriginalExtension(),
        'size'      => $request->cover->getSize(),
      ]);

      return response($response , 200)
          ->header('Content-Type' , 'application/json')
          ->header('Access-Control-Allow-Origin' , '*');
    }




    /**
      * route: /api/teacher/{teacherId}/duty/upload/docs
      * method: post
      * params: document
      * description: 
        * this method for upload documents
      * return : @var array
    */
    public function uploadDocs (Request $request , $teacherId) 
    {
      $name = 'Document_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->document->getClientOriginalExtension();
      Storage::putFileAs('public\duty\documents' , new file($request->document) , $name);
      $response = collect([
        'name'      => $name,
        'extension' => $request->document->getClientOriginalExtension(),
        'size'      => $request->document->getSize(),
      ]);

      return response($response , 200);
    }





    /**
      * route: /api/teacher/{teacherId}/duty/{id}
      * method: get
      * params: id
      * description: 
        * this method will return detail data duty
      * return : @response
    */
    public function detail (Request $request , $teacherId , $id) 
    {
      $duty = Duty::find($id);
      $duty = new DutyDetailResource($duty);
      return response($duty , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/kduty/{duty}/response
      * method: get
      * params: teacherId , theory
      * description: 
        * this method will return list status read duty
      * @return : @var array
    */
    public function response (Request $request , $teacherId , Duty $duty) 
    {
      $response = ListResponseResource::collection($duty->response);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/duty/{duty}/response/{response}
      * method: get
      * params: teacherId , duty , response
      * description: 
        * this method will return data response
      * @return : @var array
    */
    public function showResponse (Request $request , $teacherId , $duty , $response) 
    {
      DutyResponse::where('id' , $response)->update(['read_at' => now()]);
      $dutyResponse = DutyResponse::find($response);
      $response = new DetailResponseResource($dutyResponse);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
    
         
         
     /**
       * route: /api/teacher/{teacherId}/duty/{duty}/response/{response}/feeedback
       * method: ppost
       * params: teacherId , duty , response
       * description: 
         * this method for store submit feedback from teacher
       * @return : @var array
     */
     public function submitFeedback (Request $request , $teacherId , $duty , $response) 
     {
        $teacherId = User::find($teacherId)->teacher->id;
        // update responsee
        DutyResponse::where('id' , $response)->update([
          'response_at' => now(),
          'skor'        => $request->score,
          'status'      => $request->status,
        ]);
        ResponseFeedback::create([
          'response_id' => $response,
          'teacher_id'  => $teacherId,
          'title'       => $request->title,
          'description' => $request->description,
        ]);

        $feedback = ResponseFeedback::get()->last();
        $feedback = new ResponseFeedbackResource($feedback);
        $response = [
          'feedback' => $feedback,
          'score' => $request->score,
          'status' => $request->status,
        ];

       return response($response , 200)
           ->header('Content-Type' , 'application/json');
     }
                
      





    /**
      * route: /api/teacher/{teacherId}/duty/{id}
      * method: delete
      * params: dutyId , id
      * description: 
        * this method for destroy trhoey by id
      * return : @response
    */
    public function destroy (Request $request , $teacherId , $id) 
    {
      Duty::destroy($id);
      return response($id , 200)
          ->header('Content-Type' , 'application/json');
    }
    	
}
