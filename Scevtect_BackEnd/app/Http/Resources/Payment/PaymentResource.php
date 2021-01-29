<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\ListClass;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $class = ListClass::find($this->class_id);
        $course = ($class->course) ? $class->course->name : '';
        $className = $class->grade->name . ' ' . $course .' ' . $class->sub->name;

        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'class_name' => $className,
        ];
    }
}
