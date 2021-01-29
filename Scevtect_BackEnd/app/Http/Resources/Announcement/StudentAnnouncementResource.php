<?php

namespace App\Http\Resources\Announcement;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentAnnouncementResource extends JsonResource
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
            'author'      => $this->user->name, 
            'title'       => $this->title,
            'description' => $this->description,
            'status'      =>  $this->status,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
