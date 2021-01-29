<?php

namespace App\Http\Resources\Duty;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;

class DutyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $subject = Subject::find($this->subject_id)->subject;
        $thumbnail = 'storage/duty/covers/' . $this->thumbnail;
        return [
            'id'          => $this->id,
            'thumbnail'   => $thumbnail,
            'title'       => $this->title,
            'deadline'    => $this->deadline,
            'subject'     => $subject,
            'description' => $this->description,
            'status'      => $this->status,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
