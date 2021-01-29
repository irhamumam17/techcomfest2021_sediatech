<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Payment\StudentDetailPaymentResource;
use App\Queries\PaymentQuery;
use App\Models\User;
use App\Models\SchoolPayment;

class PaymentController extends Controller
{
    
    
    
    /**
      * route: /api/student/{studentId}/payment/list
      * method: get
      * params: studentId
      * description: 
        * this method will return list payment
      * @return : @var array
    */
    public function index (Request $request , $studentId) 
    {
    	$studentId = User::find($studentId)->student->id;
    	$response = PaymentQuery::listByStudent($studentId);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/payment/detail/{payment}
      * method: get
      * params: studentId , payment
      * description: 
        * this method will return list histories payment
      * @return : @var array
    */
    public function detail (Request $request , $studentId , SchoolPayment $payment) 
    {
      $studentId = User::find($studentId)->student->id;
      $spayment = $payment->student_payment->where('student_id' , $studentId)->first();
      $response = new StudentDetailPaymentResource($spayment);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    	
}
