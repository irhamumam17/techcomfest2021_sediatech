<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\DateManager;

class ListHistoryStudentPaymentResource extends JsonResource
{
    public function format($nominal) {
        return 'Rp'.number_format($nominal , 2 ,',','.');
    }

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
            'pay'     => $this->format($this->pay),
            'changes' => $this->format($this->changes),
            'value'   => $this->format($this->value),
            'pay_at'  => DateManager::idFormat($this->created_at->format('l-d-m-Y')),
        ];
    }
}
