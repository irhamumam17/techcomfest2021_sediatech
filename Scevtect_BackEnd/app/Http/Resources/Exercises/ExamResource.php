<?php

namespace App\Http\Resources\Exercises;

use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
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
            'id'         => $this->id,
            'title'      => $this->title,
            'start_time' => $this->start_time,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
