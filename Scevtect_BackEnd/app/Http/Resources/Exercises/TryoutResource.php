<?php

namespace App\Http\Resources\Exercises;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\DateManager;
use \Carbon\Carbon;

class TryoutResource extends JsonResource
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
            'id'       => $this->id,
            'title'    => $this->title,
            'deadline' => DateManager::idFormat(Carbon::parse($this->deadline)->format('l-d-m-Y')),
            'duration' => $this->duration,
        ];
    }
}
