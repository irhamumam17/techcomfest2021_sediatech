<?php

namespace App\Http\Resources\Duty;

use Illuminate\Http\Resources\Json\JsonResource;

class ResponseFeedbackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'teacher'     => $this->teacher->user->name,
            'title'       => $this->title,
            'description' => $this->description,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
