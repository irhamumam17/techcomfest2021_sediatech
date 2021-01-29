<?php

namespace App\Http\Resources\School;

use Illuminate\Http\Resources\Json\JsonResource;

class SchoolResource extends JsonResource
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
            'id'      => $this->id,
            'name'    => $this->user->name,
            'join_at' => $this->created_at->diffForHumans(),
        ];
    }
}
