<?php

namespace App\Http\Resources\Theory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;


class TheoryDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $subject = Subject::find($this->subject_id);
        $thumbnail = 'storage/theory/covers/' . $this->thumbnail;

        $classes = collect([]);
        foreach ($this->class as $class) {
            $class = $class->class;
            $course = ($class->course) ? $class->course->name : '';

            $name = $class->grade->name .' ' . $course . ' ' .$class->sub->name;
            $classes->push($name);
        }
        
        return [
            'id'          => $this->id,
            'thumbnail'   => $thumbnail,
            'title'       => $this->title,
            'subject'     => $subject->subject,
            'status'      => $this->status,
            'classes'     => $classes,
            'description' => $this->description,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
