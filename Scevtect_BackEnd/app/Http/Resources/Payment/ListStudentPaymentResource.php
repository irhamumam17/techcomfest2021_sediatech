<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Resources\Json\JsonResource;

class ListStudentPaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $status = ($this->status === 'debt') ? 'Hutang' : 'Lunas'; 

        return [
            'id'           => $this->id,
            'student'      => $this->student->user->name,
            'insufficient' => 'Rp'. number_format($this->insufficient , 0 , ',','.'),
            'paid_off'     => 'Rp'. number_format($this->paid_off , 0 , ',','.'),
            'in_integer' => [
                'insufficient' => $this->insufficient,
                'paid_off'     => $this->paid_off,
            ],
            'status'       => $status,
        ];
    }
}
