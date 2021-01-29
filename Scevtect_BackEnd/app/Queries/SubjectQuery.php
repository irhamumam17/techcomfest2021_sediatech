<?php 
namespace App\Queries;

use App\Models\Subject;
use App\Models\ClassSubject;

class SubjectQuery
{
    public static function byClass($classId)
    {
        $query = ClassSubject::where('class_id' , $classId)->get();
        $subjects = collect([]);

        foreach ($query as $subject) {
        	$subjects->push($subject->subject);
        }

        return $subjects;
    }
}
