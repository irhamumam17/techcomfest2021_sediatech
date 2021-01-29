<?php

namespace App\Http\Resources\Duty;

use Illuminate\Http\Resources\Json\JsonResource;

class ListResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $student = $this->student;
        $class = $student->class;

        $course = ($class->course) ? $class->course->name : '';
        $class_name = $class->grade->name . ' ' . $course . ' ' . $class->sub->name;

        $skor = ($this->skor === null) ? 'Belum Dinilai' : $this->skor;

        return [
            'id'         => $this->id,
            'student'    => $student->user->name,
            'class_name' => $class_name,
            'nis'        => $student->nis,
            'skor'       => $skor,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
