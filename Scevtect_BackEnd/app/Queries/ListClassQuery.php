<?php 
namespace App\Queries;

use App\Models\ListClass;
use App\Models\User;

class ListClassQuery
{
    public static function list($id)
    {
        $classes = ListClass::where('school_id' , $id)->get();
        $collection = collect([]);

        foreach ($classes as $class) {
        	$course = ($class->course) ? $class->course->name : '';
        	$arr = [
				'id'     => $class->id,
				'class_name'  => $class->grade->name . ' ' . $course . ' ' . $class->sub->name ,
        	];
        	$collection->push($arr);
        }
        return $collection;
    }

    public static function findName($id)
    {
        $class = ListClass::find($id);
        $course = ($class->course) ? $class->course->name : '';
        $className = $class->grade->name . ' ' . $course . ' ' . $class->sub->name;
        
        return $className;    
    }
}
