<?php

namespace App\Http\Resources\Theory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Student;
use \Carbon\Carbon;

class TheoryReadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $student = Student::find($this->student_id);
        $class = $student->class;

        $course = ($class->course) ? $class->course->name : '';
        $class_name = $class->grade->name . ' ' . $course . ' ' . $class->sub->name;

        if($this->read_at) {
            $read_at = $this->read_at;
            $read    = Carbon::parse($this->read_at)->diffForHumans();
        } else {
            $read_at = 'Belum dibaca';
            $read    = 'Belum dibaca';
        }

        return [
            'id'         => $this->id,
            'student'    => $student->user->name,
            'nis'        => $student->nis,
            'class_name' =>  $class_name,
            'read_at'    => $read_at,
            'read'       => $read, 
        ];
    }
}
