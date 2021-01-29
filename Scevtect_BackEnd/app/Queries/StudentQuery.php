<?php 
namespace App\Queries;
use App\Models\Student;
use App\Queries\ListClassQuery;

class StudentQuery
{
    public static function getSlim($id)
    {
    	$students = Student::where('school_id' , $id)->get();
    	$collections = collect([]);
    	foreach ($students as $student) {
    		$arr = [
    			'id' => $student->id,
    			'name' => $student->user->name,
    			'nis' => $student->nis,
    			'class' => ListClassQuery::findName($student->class_id),
    		];
    		$collections->push($arr);
    	}
        return $collections;
    }
}
