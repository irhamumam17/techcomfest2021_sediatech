<?php

namespace App\Http\Resources\Announcement;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;

class AnnouncementResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $author = User::find($this->user_id)->name;
        return [
            'id'          => $this->id,
            'author'      => $author,
            'title'       => $this->title,
            'description' => $this->description,
            'status'      => $this->status,
            'created_at'  => $this->created_at->diffForHumans(),
        ];
    }
}
