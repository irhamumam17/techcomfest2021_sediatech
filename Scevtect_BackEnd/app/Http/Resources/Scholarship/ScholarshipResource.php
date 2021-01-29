<?php

namespace App\Http\Resources\Scholarship;

use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipResource extends JsonResource
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
            'title'       => $this->title,
            'institution' => $this->institution,
        ];
    }
}
