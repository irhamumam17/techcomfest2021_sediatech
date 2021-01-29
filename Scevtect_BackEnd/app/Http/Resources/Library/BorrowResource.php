<?php

namespace App\Http\Resources\Library;

use Illuminate\Http\Resources\Json\JsonResource;

class BorrowResource extends JsonResource
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
            'student' => $this->student->user->name,
            'title'   => $this->book->title,
            'date'    => $this->start_time,
            'status'  => $this->status,
        ];
    }
}
