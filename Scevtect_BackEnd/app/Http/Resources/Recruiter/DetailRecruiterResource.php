<?php

namespace App\Http\Resources\Recruiter;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailRecruiterResource extends JsonResource
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
            'name'       => $this->name,
            'email'      => $this->email,
            'image'      => $this->image,
            'phone'      => $this->recruiter->phone,
            'company'    => $this->recruiter->company,
            'join_at'    => $this->created_at->diffForHumans(),
            'created_at' => $this->created_at,
        ];
    }
}
