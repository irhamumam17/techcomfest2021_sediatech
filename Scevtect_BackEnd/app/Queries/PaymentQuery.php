<?php 
namespace App\Queries;

use App\Models\Student;
use App\Models\SchoolPayment;
use App\Http\Resources\Payment\StudentListResource;

class PaymentQuery
{
    public static function listByStudent($studentId)
    {
        $classId = Student::find($studentId)->class_id;

        $payments = SchoolPayment::where('class_id' , $classId)->latest()->get();
        $collection = StudentListResource::collection($payments);

        return $collection;
    }
}
