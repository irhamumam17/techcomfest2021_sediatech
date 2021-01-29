<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\Payment\PaymentResource;
use App\Http\Resources\Payment\DetailPaymentResource;
use App\Http\Resources\Payment\ListStudentPaymentResource;
use App\Http\Resources\Payment\ListHistoryStudentPaymentResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SchoolPayment;
use App\Models\ListClass;
use App\Models\StudentPayment;
use App\Models\ListSPayment;

class PaymentController extends Controller
{
    
    
    
    /**
      * route: /api/teacher/{teacherId}/payment/list
      * method: get
      * params: teacherId
      * description: 
        * this method will return list payments
      * return : @response
    */
    public function index (Request $request , $teacherId) 
    {
    	$schoolId = User::find($teacherId)->teacher->school_id;
    	$payments = SchoolPayment::where('school_id' , $schoolId)->get();
    	$response = PaymentResource::collection($payments);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/store
      * method: post
      * params: class_id , name , description , value
      * description: 
        * this method for create new payment
      * return : @response
    */
    public function store (Request $request , $teacherId) 
    {
    	$schoolId = User::find($teacherId)->teacher->school_id;
    	SchoolPayment::create([
			'school_id'   => $schoolId,
			'class_id'    => $request->class_id,
			'name'        => $request->name,
			'description' => $request->description,
			'value'       => $request->value,
    	]);

    	$paymentId = SchoolPayment::get()->last()->id;
    	$class = ListClass::find($request->class_id);
    	foreach ($class->student as $student) {
				StudentPayment::create([
					'payment_id'   => $paymentId,
					'student_id'   => $student->id,
					'insufficient' => $request->value,
					'paid_off'     => 0,
				]);
    	}

    	$response = SchoolPayment::get()->last();
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/{id}
      * method: detail
      * params: teacherid , id
      * description: 
        * this method will show detail payment
      * @return : @var array
    */
    public function detail (Request $request , $teacherId , $id) 
    {
      $payment  = SchoolPayment::find($id);
      $response = new DetailPaymentResource($payment);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/{id}/addstudent
      * method: post
      * params: teacherid , id , payment_id , student_id
      * description: 
        * this method for add student in payment
      * @return : @var array
    */
    public function addStudent (Request $request , $teacherId , SchoolPayment $payment) 
    {
      StudentPayment::create([
        'payment_id'   => $payment->id,
        'student_id'   => $request->student_id,
        'insufficient' => $payment->value,
        'paid_off'     => 0,
      ]);
      $data = StudentPayment::get()->last();
      $response = new ListStudentPaymentResource($data);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/{payment}/student/{spayment}
      * method: get
      * params: teacherId , payment,  spayment
      * description: 
        * this method will return detail data student payment
      * @return : @var array
    */
    public function detailStudent (Request $request , $teacherId , $payment , StudentPayment $spayment) 
    {
      $response = new ListStudentPaymentResource($spayment);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    } 


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/{payment}/student/{spayment}/add
      * method: post
      * params: teacherid , payment , spayment
      * description: 
        * this method for create list student payment
      * @return : @var array
    */
    public function storeStudentPayment (Request $request  , $teacherId , $payment , StudentPayment $spayment) 
    {
      $status = ($request->insufficient  === 0) ? 'paid_off' : 'debt';
      $spayment->update([
        'insufficient' => $request->insufficient,
        'paid_off'     => $request->paid_off,
        'status'       => $status,
      ]);

      ListSPayment::create([
        'payment_id' => $spayment->id,
        'pay'        => $request->pay,
        'changes'    => $request->changes,
        'value'      => $request->value,
      ]);
      $response = new ListStudentPaymentResource($spayment);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/{id}/student/{spayment}/history
      * method: get
      * params: teacherId , id,  spayment
      * description: 
        * this method will return list hisstory student payment
      * @return : @var array
    */
    public function historyPayment (Request $request, $teacherId, $payment , StudentPayment $spayment) 
    {
        $history = $spayment->history;
        $response = ListHistoryStudentPaymentResource::collection($history);

        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }
      
      
      
      
      


    
    
    /**
      * route: /api/teacher/{teacherId}/payment/{id}
      * method: delete
      * params: teacherId , id
      * description: 
        * this method for delete payments
      * return : @response
    */
    public function destroy (Request $request, $teacherId , $id) 
    {
    	SchoolPayment::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
}
