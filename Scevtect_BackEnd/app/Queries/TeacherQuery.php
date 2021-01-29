<?php 
namespace App\Queries;
use App\Models\Teacher;

class TeacherQuery
{
    public static function getSlim($id)
    {
        $teachers = Teacher::where('school_id' , $id)->get();
        $collections = collect([]);
        foreach ($teachers as $teacher) {
        	$data = [
        		'id' => $teacher->id,
        		'name' => $teacher->user->name,
        		'role' => $teacher->role->name,
        		'nip' => $teacher->nip,
        	];
        	$collections->push($data);
        }
        return $collections;
    }
}
