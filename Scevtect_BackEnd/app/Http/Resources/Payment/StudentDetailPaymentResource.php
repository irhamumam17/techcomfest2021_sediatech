<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Payment\ListStudentPaymentResource;
use App\Http\Resources\Payment\ListHistoryStudentPaymentResource;

class StudentDetailPaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $payment = $this->payment;
        return [
            'payment' => [
                'name'        => $payment->name,
                'description' => $payment->description,
                'value'       => 'Rp'.number_format($payment->value,2,',','.'),
            ],
            'spayment' => new ListStudentPaymentResource($this),
            'histories' => ListHistoryStudentPaymentResource::collection($this->history),
        ];
    }
}
