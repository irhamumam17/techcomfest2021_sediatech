<?php

namespace App\Http\Resources\Theory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;

class TheoryResource extends JsonResource
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
        return [
            'id'          => $this->id,
            'thumbnail'   => $thumbnail,
            'title'       => $this->title,
            'subject'     => $subject->subject,
            'description' => $this->description,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
