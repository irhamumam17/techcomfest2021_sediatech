<?php

namespace App\Http\Resources\Wallet\Student;

use Illuminate\Http\Resources\Json\JsonResource;

class ListTopupResource extends JsonResource
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
            'id'             => $this->id,
            'invoice_number' => $this->invoice_number,
            'card_number'    => $this->card_number,
            'name'           => $this->name,
            'bank'           => $this->bank,
            'value'          => 'Rp'.number_format($this->value , 2 ,',' ,'.'),
            'status'         => $this->status,
        ];
    }
}
