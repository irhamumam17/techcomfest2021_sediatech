<?php

namespace App\Http\Resources\School;

use Illuminate\Http\Resources\Json\JsonResource;

class ListLevelResource extends JsonResource
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
            'id' => $this->id,
            'level' => $this->level,
        ];
    }
}
