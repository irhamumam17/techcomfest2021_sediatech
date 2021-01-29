<?php 
namespace App\Helpers;

use App\Helpers\DateManager;
use App\Helpers\GetId;
use App\Models\StudentSchedule;
use App\Models\StudentAbsent;
use App\Models\Student;
use App\Models\TeacherSchedule;
use App\Models\TeacherAbsent;
use App\Models\Teacher;

class ScheduleHelper
{
    public static function studentCreate($from_date , $to_date , $schoolId)
    {
      $dates = DateManager::getDate($from_date , $to_date);
      foreach ($dates as $date) {
      	$checkSchedule = StudentSchedule::where([
				'school_id' => $schoolId,
				'day'       => $date['day'], 
				'month'     => $date['month'], 
				'year'      => $date['year'],
			])->get()->count();
      	if($checkSchedule === 0) {
	      	StudentSchedule::create([
					'school_id' => $schoolId,
					'day'       => $date['day'], 
					'month'     => $date['month'], 
					'year'      => $date['year'], 
	      	]);
	    }
      	$students = Student::where('school_id' , $schoolId)->get();
      	$studentsId = GetId::index($students);
      	$scheduleId = StudentSchedule::get()->last()->id;
      	foreach ($studentsId as $id) {
      		$checkAbsent = StudentAbsent::where([
      			'schedule_id' => $scheduleId,
      			'student_id'  => $id,
      			'status'      => 'not yet',
      		])->get()->count();
      		if($checkAbsent === 0) {
	      		StudentAbsent::create([
						'schedule_id' => $scheduleId,
						'student_id'  => $id,
						'status'      => 'not yet',
	      		]);
      		}
      	}

      }
	  return $dates;
    }

    public static function teacherCreate($from_date , $to_date , $schoolId)
    {
      $dates = DateManager::getDate($from_date , $to_date);
      foreach ($dates as $date) {
        $checkSchedule = TeacherSchedule::where([
        'school_id' => $schoolId,
        'day'       => $date['day'], 
        'month'     => $date['month'], 
        'year'      => $date['year'],
      ])->get()->count();
        if($checkSchedule === 0) {
          TeacherSchedule::create([
          'school_id' => $schoolId,
          'day'       => $date['day'], 
          'month'     => $date['month'], 
          'year'      => $date['year'], 
          ]);
      }
        $teachers = Teacher::where('school_id' , $schoolId)->get();
        $teachersId = GetId::index($teachers);
        $scheduleId = TeacherSchedule::get()->last()->id;
        foreach ($teachersId as $id) {
          $checkAbsent = TeacherAbsent::where([
            'schedule_id' => $scheduleId,
            'teacher_id'  => $id,
            'status'      => 'not yet',
          ])->get()->count();
          if($checkAbsent === 0) {
            TeacherAbsent::create([
            'schedule_id' => $scheduleId,
            'teacher_id'  => $id,
            'status'      => 'not yet',
            ]);
          }
        }

      }
    return $dates;
    }
}
