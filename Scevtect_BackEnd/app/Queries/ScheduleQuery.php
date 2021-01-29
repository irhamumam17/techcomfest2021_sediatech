<?php 
namespace App\Queries;

use App\Helpers\DateManager;
use App\Models\StudentSchedule;
use App\Models\StudentAbsent;
use App\Models\TeacherSchedule;
use App\Models\TeacherAbsent;

class ScheduleQuery
{
    public static function studentSlim($schoolId)
    {
    	$collection = collect([]);
    	$schedules = StudentSchedule::where('school_Id' , $schoolId)->get();
    	foreach ($schedules as $schedule) {
    		$data = [
				'id'      => $schedule->id,
				'day'     => $schedule->day,
				'month'   => DateManager::getMonth($schedule->month),
				'year'    => $schedule->year,
				'already' => $schedule->absent->where('status' , 'already')->count(),
				'notyet'  => $schedule->absent->where('status' , 'not yet')->count(),
    		];
    		$collection->push($data);
    	}

    	return $collection;
    }


    public static function studentAbsent($studentId)
    {
        $absents = StudentAbsent::where('student_id' , $studentId)->get();
        $collections = collect([]);
        foreach ($absents as $absent) {
            $schedule = $absent->schedule;
            $data = [
                'id'     => $absent->id,
                'day'    => $schedule->day,
                'month'  => DateManager::getMonth($schedule->month),
                'year'   => $schedule->year,
                'status' => $absent->status,
            ];

            $collections->push($data);
        }
        return $collections;
    }


    public static function teacherSlim($schoolId)
    {
        $collection = collect([]);
        $schedules = TeacherSchedule::where('school_Id' , $schoolId)->get();
        foreach ($schedules as $schedule) {
            $data = [
                'id'      => $schedule->id,
                'day'     => $schedule->day,
                'month'   => $schedule->month,
                'year'    => $schedule->year,
                'already' => $schedule->absent->where('status' , 'already')->count(),
                'notyet'  => $schedule->absent->where('status' , 'not yet')->count(),
            ];
            $collection->push($data);
        }

        return $collection;
    }


    public static function teacherAbsent($teacherId)
    {
        $absents = TeacherAbsent::where('teacher_id' , $teacherId)->get();
        $collections = collect([]);
        foreach ($absents as $absent) {
            $schedule = $absent->schedule;
            $data = [
                'id'     => $absent->id,
                'day'    => $schedule->day,
                'month'  => DateManager::getMonth($schedule->month),
                'year'   => $schedule->year,
                'status' => $absent->status,
            ];

            $collections->push($data);
        }
        return $collections;
    }
}
