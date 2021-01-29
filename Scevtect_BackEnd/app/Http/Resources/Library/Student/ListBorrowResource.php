<?php

namespace App\Http\Resources\Library\Student;

use Illuminate\Http\Resources\Json\JsonResource;
use \Carbon\Carbon;

class ListBorrowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if($this->finish_time === null) {
            $return = 'Belum Dikembalikan';
        } else {
            $return = Carbon::parse($this->finish_time)->diffForHumans();
        }

        return [
            'id'        => $this->id,
            'book'      => $this->book->title,
            'borrow_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'return_at' => $return,
            'status'    => $this->status,
        ];
    }
}
