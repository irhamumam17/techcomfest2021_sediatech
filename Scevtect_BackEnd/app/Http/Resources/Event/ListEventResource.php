<?php

namespace App\Http\Resources\Event;

use Illuminate\Http\Resources\Json\JsonResource;

class ListEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $status = ($this->status === 'publc') ? 'umum' : 'sekolah';
        return [
            'id'       => $this->id,
            'image'    => $this->image,
            'name'     => $this->name,
            'location' => $this->location,
            'date'     => $this->date,
            'status'   => $this->status,
        ];
    }
}
