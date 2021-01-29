<?php 
namespace App\Queries;

use App\Models\User;
use App\Models\LessonSchedule;

class LessonScheduleQuery
{
    public static function byClass($schoolId)
    {
    	function getDay($day) {
    		$days = [
    			'Monday' => 'Senin',
    			'Tuesday' => 'Selasa',
    			'Wednesday' => 'Rabu',
    			'Thursday' => 'Kamis',
    			'Friday' => 'Jum`at',
    			'Saturday' => 'Sabtu',
    			'Sunday' => 'Minggu',
     		];
     		return $days[$day];
    	}

        $schedules = LessonSchedule::where('school_id' , $schoolId)->get();
        $collections = collect([]);
        foreach ($schedules as $schedule) {
        	// get class name
			$class     = $schedule->class;
			$course    = ($class->course) ? $class->course->name : '';
			$className = $class->grade->name . ' ' . $course . ' ' . $class->sub->name;

			// get subject collections
			$subjects = collect([]);
			foreach ($schedule->subject as $subject) {
				$subjects->push([
					'id'      => $subject->subject_id,
					'subject' => $subject->subject->subject,
				]);
			}

			// set array days
        	$data = [
				'id'         => $schedule->id,
				'class_name' => $className,
				'day'        => getDay($schedule->day),
				'subjects'   => $subjects,
        	];
        	$collections->push($data);
        }
        return $collections;
    }

    public static function byStudent($classId)
    {
        function getDay($day) {
            $days = [
                'Monday' => 'Senin',
                'Tuesday' => 'Selasa',
                'Wednesday' => 'Rabu',
                'Thursday' => 'Kamis',
                'Friday' => 'Jum`at',
                'Saturday' => 'Sabtu',
                'Sunday' => 'Minggu',
            ];
            return $days[$day];
        }

        $schedules = LessonSchedule::where('class_id' , $classId)->get();

        $collections = collect([]);
        foreach ($schedules as $schedule) {
            // get class name
            $class     = $schedule->class;
            $course    = ($class->course) ? $class->course->name : '';
            $className = $class->grade->name . ' ' . $course . ' ' . $class->sub->name;

            // get subject collections
            $subjects = collect([]);
            foreach ($schedule->subject as $subject) {
                $subjects->push([
                    'id'      => $subject->subject_id,
                    'subject' => $subject->subject->subject,
                ]);
            }

            // set array days
            $data = [
                'id'         => $schedule->id,
                'class_name' => $className,
                'day'        => getDay($schedule->day),
                'subjects'   => $subjects,
            ];
            $collections->push($data);
        }
        return $collections;
    }
}
