<?php

namespace App\Http\Resources\Duty;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailResponseResource extends JsonResource
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

        if($this->status === null && $this->skor === null) {
            $status = [
                'skor' => 'Belum Dinilai',
                'status' => '-',
            ];
        } else {
            $status = [
                'skor' => $this->skor,
                'status' => $this->status,
            ];
        }

        // get filess
        $files = collect([]);
        foreach ($this->file as $file) {
            $files->push([
                'id'        => $file->id,
                'name'      => $file->name,
                'size'      => $file->size / 1024,
                'extension' => $file->extension,
            ]);
        }

        return [
            'id' => $this->id,
            'student' => [
                'id'         => $student->id,
                'name'       => $student->user->name,
                'nis'        => $student->nis,
                'class_name' => $class_name,
            ],
            'title'       => $this->title,
            'description' => $this->description,
            'files'       => $files,
            'skor'        => $status['skor'],
            'status'      => $status['status'],
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
