<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Queries\LessonScheduleQuery;
use App\Models\User;
use App\Models\LessonSchedule;
use App\Models\DaySubject;

class LessonScheduleController extends Controller
{
    
    
    
    /**
      * route: api/school/{schoolId}/schedule/list
      * method: get
      * params: schoolId
      * description: 
        * this method will return list schedules
      * return : @response
    */
    public function list (Request $request , $schoolId) 
    {
      $school_id = User::find($schoolId)->school->id;
      $data = LessonScheduleQuery::byClass($school_id);
      $response = collect([]);
      foreach ($data->groupBy('class_name') as $d) {
        $response->push([
          'value' => $d,
        ]);
      }
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    
    
    /**
      * route: api/school/{schoolId}/schedule/add/
      * method: post
      * params: schoolId , id , class_id , day , subjectsId
      * description: 
        * this method for create new lesson schedule
      * return : @response
    */
    public function store (Request $request , $schoolId) 
    {
      $schoolId = User::find($schoolId)->school->id;
      LessonSchedule::create([
        'school_id' => $schoolId,
        'class_id'  => $request->class_id,
        'day'       => $request->day,
      ]);

      $scheduleId = LessonSchedule::get()->last()->id;
      foreach ($request->subjectsId as $id) {
        DaySubject::create([
          'schedule_id' => $scheduleId,
          'subject_id'  => $id,
        ]);
      }

    	return response($request->all() , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
}
