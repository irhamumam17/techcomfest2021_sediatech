<?php 
namespace App\Queries;

use App\Models\Duty;
use App\Http\Resources\Duty\DutyStudentResource;
use App\Models\DutyStudent;

class DutyQuery
{
    public static function dashboardTeacher($teacher)
    {
        $duties = collect([]);

        foreach ($teacher->duty as $duty) {
        	$duties->push([
        		'id' => $duty->id,
        		'title' => $duty->title,
        	]);
        }

        return $duties;
    }

    public static function dashboardStudent($student) 
    {
        $duties = collect([]);

        foreach ($student->duty as $duty) {
            $duty = $duty->duty;
            $duties->push([
                'id'    => $duty->id,
                'title' => $duty->title,
            ]);
        }

        return $duties;
    }

    public static function listDutyStudent($studentId)
    {
        $dataDuty = DutyStudent::where('student_id' , $studentId)->get();
        $duties = collect([]);

        foreach ($dataDuty as $dutyStudent) {
            $duty = collect($dutyStudent->duty)->except('updated_at','status');
            if($dutyStudent->response_at) {
                $duty = $duty->put('do' , true);
                /*$duty = [
                    'id'          => $duty->id,
                    'title'       => $duty->title,
                    'description' => $duty->description,
                    'thumbnail'   => 'storage/duty/covers/' . $duty->thumbnail,
                    'created_at'  => $duty->created_at->diffForHumans(),
                    'do'          => $duty->do,
                ];*/
                $duties->push($duty);
            } else {
                $duty = $duty->put('do' , false);
                /*$duty = [
                    'id'          => $duty->id,
                    'title'       => $duty->title,
                    'description' => $duty->description,
                    'thumbnail'   => 'storage/duty/covers/' . $duty->thumbnail,
                    'created_at'  => $duty->created_at->diffForHumans(),
                    'do'          => $duty->do,
                ];*/
                $duties->push($duty);
            }
        }

        return $duties;
    }

    public static function detailDutyStudent($id , $studentId)
    {
        $duty = Duty::find($id);
        $data = new DutyStudentResource($duty);
        $response = DutyStudent::where('duty_id' , $id)
                            ->where('student_id' , $studentId)
                            ->first()
                            ->response_at;
        $response = ($response) ? true : false;
        $data = collect($data)->put('do' , $response);
        return $data;
    }
}
