<?php

namespace App\Http\Resources\Job;

use Illuminate\Http\Resources\Json\JsonResource;
use \Carbon\Carbon;

class LandingJobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $time = ($this->type_time === 'full_time') ? 'Full Time' : 'Part Time';
        $target= ($this->target === 'experience') ? 'Berpengalaman' : 'Fresh Graduate';  

        return [
            'id'        => $this->id,
            'position'  => $this->position,
            'company'   => $this->recruiter->company,
            'target'    => $target,
            'type_time' => $time,
            'deadline'  => Carbon::parse($this->deadline)->diffForHumans(),
        ];
    }
}
