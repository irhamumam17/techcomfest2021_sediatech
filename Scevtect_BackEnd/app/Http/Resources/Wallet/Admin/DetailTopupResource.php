<?php

namespace App\Http\Resources\Wallet\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailTopupResource extends JsonResource
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
            'student'        => $this->wallet->user->name,
            'school'         => $this->wallet->user->student->school->user->name,
            'bank'           => $this->bank,
            'value'          => 'Rp'.number_format($this->value , 2 ,',','.'),  
            'status'         => $this->status,
            'proof'          => $this->proof,
            'payment_at' => $this->created_at->diffForHumans(),
        ];
    }
}
