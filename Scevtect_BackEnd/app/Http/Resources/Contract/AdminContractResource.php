<?php

namespace App\Http\Resources\Contract;

use Illuminate\Http\Resources\Json\JsonResource;
use \Carbon\Carbon;

class AdminContractResource extends JsonResource
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
        return [
            'id'         => $this->id,
            'inv_number' => $this->inv_number,
            'school'     => $this->school->user->name,
            'total'      => 'Rp'.number_format($this->total , 2 ,',','.'),
            'inv_date'   => $inv_date,
            'status'     => $this->status,
        ];
    }
}
