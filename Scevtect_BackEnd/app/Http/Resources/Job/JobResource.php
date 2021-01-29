<?php

namespace App\Http\Resources\Job;

use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function getTime($type) 
    {
        $values = [
                'full_time' => 'Full Time',
                'part_time' => 'Part Time', 
            ];
        return $values[$type];
    }

    public function getDistance($type)
    {
        $values = [
            'onsite' => 'Onsite',
            'remote' => 'Remote',
        ];
        return $values[$type];
    }


    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'       => $this->id,
            'position' => $this->position,
            'ket'      => [
                'time'     => $this->getTime($this->type_time),
                'distance' => $this->getDistance($this->type_distance),
            ],
            'status'   => $this->status,
        ];
    }
}
