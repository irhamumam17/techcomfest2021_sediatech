<?php

namespace App\Http\Resources\Contract;

use Illuminate\Http\Resources\Json\JsonResource;

class ListContractResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $bank = $this->bank;

        return [
            'id'         => $this->id,
            'bank'       => [
                'bank'        => $bank->bank,
                'card_number' => $bank->card_number,
                'customer'    => $bank->customer,
            ],
            'inv_number' => $this->inv_number,
            'inv_date'   => $this->inv_date,
            'tax'        => 'Rp'.number_format($this->tax , 2 ,',','.'),
            'total'      => 'Rp'.number_format($this->total,2,',','.'),
            'status'     => $this->status,
        ];
    }
}
