<?php

namespace App\Http\Resources\Library\Student;

use Illuminate\Http\Resources\Json\JsonResource;
use \Carbon\Carbon;

class DetailBorrowResource extends JsonResource
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
        $book = $this->book;
        return [
            'id' => $this->id,
            'book' => [
                'id'          => $book->id,
                'title'       => $book->title,
                'code'        => $book->code,
                'publisher'   => $book->publisher,
                'image'       => $book->image,
                'description' => $book->description,
            ],
            'borrow' => [
                'borrow_at' => Carbon::parse($this->created_at)->diffForHumans(),
                'return_at' => $return,
                'status'    => $this->status,
            ],
        ];
    }
}
