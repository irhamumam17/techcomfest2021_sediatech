<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use App\Http\Resources\Contract\ListPackageResource;
use App\Http\Resources\Contract\ListBankResource;
use App\Http\Resources\Contract\ListContractResource;
use App\Models\User;
use App\Models\Package;
use App\Models\Bank;
use App\Models\ContractPayment;
use App\Models\ContractProof;

class ContractController extends Controller
{
    
    
    
    /**
      * route: api/school/{schoolId}/contract/package
      * method: get
      * params: schoolId
      * description: 
        * this method for get list package
      * @return : @var array
    */
    public function getPackage (Request $request , $schoolId) 
    {
    	$packages = Package::get();
    	$response = ListPackageResource::collection($packages);

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/contract/package/{package}
      * method: get
      * params: schoolId , package
      * description: 
        * this mehtod will return detail data package
      * @return : @var array
    */
    public function detailPackage (Request $request , $schoolId , Package $package) 
    {
    	$response = new ListPackageResource($package);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/contract/package/{package}
      * method: get
      * params: schoolId , package
      * description: 
        * this method for buy package
      * @return : @var array
    */
    public function buyPackage (Request $request, $schoolId , Package $package) 
    {
      $schoolId = User::find($schoolId)->school->id;

      // create inv number
      $inv_number = '#INV'.date('dis');
      $inv_date = date('Y-m-') . ((int)date('d') + 1) . ' 23:59:00';
      $tax = 10/100 * $package->cost;
      $total = $package->cost + $tax;

      ContractPayment::create([
        'school_id'  => $schoolId,
        'bank_id'    => $request->bank_id,
        'package_id' => $package->id,
        'inv_number' => $inv_number,
        'inv_date'   => $inv_date,
        'tax'        => $tax,
        'total'      => $total,
        'start_date' => $request->start_date . ' 00:00:00',
        'status'     => 'unpaid',
      ]);

      $response = new ListContractResource(ContractPayment::get()->last());
      return response($package , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/contract/package/{package}/historyi
      * method: get
      * params: schoolId , package
      * description: 
        * this method for return  list history package
      * @return : @var array
    */
    public function buyHistory (Request $request, $schoolId , Package $package) 
    {
      $school_id = User::find($schoolId)->school->id;
      $contracts = ContractPayment::where('school_id' , $school_id)
                                    ->where('package_id' , $package->id)
                                    ->latest()->get();
      $response = ListContractResource::collection($contracts);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/school/{schoolId}/contract/package/proof
      * method: post
      * params: contract_id , proof
      * description: 
        * this method for store proof payment
      * @return : @var array
    */
    public function storeProof (Request $request , $schoolId) 
    {
      $proof = 'Proof_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->proof->getClientOriginalExtension();
      Storage::putFileAs('public\contract\proof' , new File($request->proof) , $proof);

      ContractProof::create([
        'contract_id' => $request->contract_id,
        'proof'       => $proof,
        'status'      => 'waiting',
      ]);

      ContractPayment::where('id' , $request->contract_id)->update(['status' => 'waiting']);

      $response = ContractProof::get()->last();

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
          
      


    
    
    /**
      * route: /api/school/{schoolId}/contract/bank
      * method: get
      * params: schoolId
      * description: 
        * this method will return list bank
      * @return : @var array
    */
    public function getBank (Request $request , $schoolId) 
    {
      $banks = Bank::get();
      $response = ListBankResource::collection($banks);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    	
    	
}
