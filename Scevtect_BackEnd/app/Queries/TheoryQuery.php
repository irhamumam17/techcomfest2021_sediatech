<?php 
namespace App\Queries;

use App\Models\Theory;
use App\Http\Resources\Theory\TheoryStudentResource;

class TheoryQuery
{
    public static function dashboardTeacher($teacher)
    {
    	$theories = collect([]);

        foreach ($teacher->theory as $theory) {
        	$theories->push([
				'id'    => $theory->id,
				'title' => $theory->title,
        	]);
        }

        return $theories;
    }

    public static function dashboardStudent ($student) 
    {
        $theories = collect([]);

        foreach ($student->theory as $theory) {
            $theory = $theory->theory;
            $theories->push([
                'id'    => $theory->id,
                'title' => $theory->title,
            ]);
        }

        return $theories;
    }

    public static function detailTheoryStudent($id)
    {
        $theory = Theory::find($id);
        $data = new TheoryStudentResource($theory);

        return $data;
    }
}
