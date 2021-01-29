<?php

namespace App\Http\Resources\Wallet\Admin;

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
        $wallet = $this->wallet;

        return [
            'id'      => $this->id,
            'student' => $wallet->user->name,
            'total'   => 'Rp'.number_format($this->value , 2 ,',' ,'.'),
            'status'  => $this->status,
        ];
    }
}
