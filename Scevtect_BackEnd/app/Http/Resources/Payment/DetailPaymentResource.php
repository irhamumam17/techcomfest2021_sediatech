<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Student\StudentResource;
use App\Http\Resources\Payment\ListStudentPaymentResource;


class DetailPaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $class = $this->class;
        $course = ($class->course) ? $class->course->name : '';
        $className = $class->grade->name . ' ' . $course .' ' . $class->sub->name;

        
        return [
            'payment' => [
                'id'          => $this->id,
                'name'        => $this->name,
                'description' => $this->description,
                'total'       => 'Rp'.number_format($this->value, 2 ,',','.'),
                'class_id'    => $this->class_id,
                'class_name'  => $className,
                'created_at'  => $this->created_at->diffForHumans(),
            ],
            'students'    => StudentResource::collection($this->class->student),
            'student_payments' => ListStudentPaymentResource::collection($this->student_payment),
        ];
    }
}
