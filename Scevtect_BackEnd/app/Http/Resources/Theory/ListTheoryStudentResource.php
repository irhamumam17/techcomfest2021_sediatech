<?php

namespace App\Http\Resources\Theory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;

class ListTheoryStudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $theory = $this->theory;
        $subject = Subject::find($theory->subject_id)->subject; 
        $thumbnail = 'storage/theory/covers/' . $theory->thumbnail;

        $status = ($this->read_at) ? true : false;

        return [
            'id'          => $theory->id,
            'status'      => $status,
            'thumbnail'   => $thumbnail,
            'title'       => $theory->title,
            'subject'     => $subject,
            'description' => $theory->description,
            'created_at'  => $theory->created_at->diffForHumans(),
        ];
    }
}
