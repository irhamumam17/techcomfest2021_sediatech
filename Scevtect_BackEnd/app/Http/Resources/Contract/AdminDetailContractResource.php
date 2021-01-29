<?php

namespace App\Http\Resources\Contract;

use Illuminate\Http\Resources\Json\JsonResource;
use \Carbon\Carbon;

class AdminDetailContractResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $inv_date = Carbon::parse($this->inv_date)->format('d F Y');
        $bank = $this->bank;
        return [
            'id'         => $this->id,
            'bank'       => [
                'bank'        => $bank->bank,
                'card_number' => $bank->card_number,
                'customer'    => $bank->customer,
            ],
            'inv_number' => $this->inv_number,
            'school'     => $this->school->user->name,
            'tax'        => 'Rp'.number_format($this->tax , 2 ,',','.'),
            'total'      => 'Rp'.number_format($this->total , 2 ,',','.'),
            'inv_date'   => $inv_date,
            'status'     => $this->status,
        ];
    }
}
