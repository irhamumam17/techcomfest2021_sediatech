<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\Theory\TheoryResource;
use App\Http\Resources\Theory\TheoryDetailResource;
use App\Http\Resources\Theory\TheoryReadresource; 
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use App\Models\User;
use App\Models\TeacherSubject;
use App\Models\TeacherClass;
use App\Models\ListClass;
use App\Models\Theory;
use App\Models\TheoryClass;
use App\Models\TheoryFile;
use App\Models\TheoryStudent;


class TheoryController extends Controller
{

   
   
   /**
     * route: /api/teacher/{teacherId}/theory/list
     * method: get
     * params: teacherid
     * description: 
       * this method will return list theory
     * return : @response
   */
   public function list (Request $request , $teacherId) 
   {
      $teacherId = User::find($teacherId)->teacher->id;
      $theories = Theory::where('teacher_id' , $teacherId)->get();
      $response = TheoryResource::collection($theories);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
   }
        
    
    
    /**
      * route: /api/teacher/{teacherId}/theory/add
      * method: post
      * params: teacher_id , subject_id , title , description , files , classes_id
      * description: 
        * this method for create new theory
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
      // insert table theories
      $teacherId = User::find($teacherId)->teacher->id;
      $subject_id = TeacherSubject::find($request->subject_id)->subject_id;
      Theory::create([
        'teacher_id'  => $teacherId,
        'subject_id'  => $subject_id,
        'thumbnail'   => $request->list_files['cover']['name'],
        'title'       => $request->title,
        'description' => $request->description,
        'status'      => $request->status,
      ]);

      $theoryId = Theory::get()->last()->id;

      // insert theory file
      function insertFile($data , $type) {
        $theoryId = Theory::get()->last()->id;
        TheoryFile::create([
          'theory_id' => $theoryId,
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


      // insert table theory classes
      foreach($request->classes_id as $id) {
        $class_id = TeacherClass::find($id)->class_id;
        TheoryClass::create([
          'theory_id' => $theoryId,
          'class_id'  => $class_id,
        ]);

        $class = ListClass::find($class_id);
        foreach($class->student as $student) {
          TheoryStudent::create([
            'theory_id'  => $theoryId,
            'student_id' => $student->id,
          ]);
        }
      } 

      $theory = Theory::get()->last();
      $response = new TheoryResource($theory);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    
    
    /**
      * route: /api/teacher/{teacherId}/theory/upload/cover
      * method: post
      * params: teacherId
      * description: 
        * this method for upload file
      * return : @response
    */
    public function uploadCover (Request $request , $teacherId) 
    {
      $name = 'Cover_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->cover->getClientOriginalExtension();
        Storage::putFileAs('public\theory\covers', new File($request->cover) , $name);

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
      * route: /api/teacher/{teacherId}/theory/upload/docs
      * method: post
      * params: document
      * description: 
        * this method for upload documents
      * return : @var array
    */
    public function uploadDocs (Request $request , $teacherId) 
    {
      $name = 'Document_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->document->getClientOriginalExtension();
      Storage::putFileAs('public\theory\documents' , new file($request->document) , $name);
      $response = collect([
        'name'      => $name,
        'extension' => $request->document->getClientOriginalExtension(),
        'size'      => $request->document->getSize(),
      ]);

      return response($response , 200);
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/theory/{id}
      * method: get
      * params: id
      * description: 
        * this method will return detail data theory
      * return : @response
    */
    public function detail (Request $request , $teacherId , $id) 
    {
      $theory = Theory::find($id);
      $dataTheory = new TheoryDetailResource($theory);

      // get persentase read
      $total = $theory->student->count();
      $notyet= $theory->student->where('read_at' , null)->count();
      $already = $total - $notyet;

      $readStatus = [
        'total'   => $total,
        'already' => $already,
        'notyet'  => $notyet,
        'percent' => $already / $total * 100,
      ];

      $response = [
        'theory'     => $dataTheory,
        'readStatus' => $readStatus,
      ];

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/theory/{theory}/read
      * method: get
      * params: teacherid , theory
      * description: 
        * this method will return list status read theory
      * @return : @var array
    */
    public function statusRead (Request $request  , $teacherId , Theory $theory) 
    {
      $response = TheoryReadresource::collection($theory->student);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      


    
    
    /**
      * route: /api/teacher/{teacherId}/theory/{id}
      * method: delete
      * params: theoryId , id
      * description: 
        * this method for destroy trhoey by id
      * return : @response
    */
    public function destroy (Request $request , $teacherId , $id) 
    {
      Theory::destroy($id);
      return response($id , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
      
    	
}
