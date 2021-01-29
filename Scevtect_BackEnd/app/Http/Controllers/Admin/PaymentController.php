<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Contract\ListPackageResource;
use App\Http\Resources\Contract\ListBankResource;
use App\Http\Resources\Contract\AdminContractResource;
use App\Http\Resources\Contract\AdminDetailContractResource;
use App\Models\Package;
use App\Models\ContractPayment;
use App\Models\Bank;


class PaymentController extends Controller
{
    
    
    
    /**
      * route: /api/admin/{adminId}/payment/package
      * method: get
      * params: adminId
      * description: 
        * this method will return list packages
      * @return : @var array
    */
    public function getPackage (Request $request , $adminId) 
    {
    	$packages = Package::latest()->get();
    	$response = ListPackageResource::collection($packages);

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/{adminId}/payment/package
      * method: post
      * params: name , cost, description
      * description: 
        * this method for create new package
        * this method for create new package
      * @return : @var array
    */
    public function storePackage (Request $request , $adminId) 
    {
    	Package::create($request->all());
    	$package = Package::get()->last();
    	$response = new ListPackageResource($package);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: api/admin/{adminId}/payment/package/{package}
      * method: delete
      * params: adminId , package
      * description: 
        * this method for destroy package
      * @return : @var array
    */
    public function destroyPackage (Request $request , $adminId , $package) 
    {
    	Package::destroy($package);
    	return response(true , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/{adminId}/payment/contract
      * method: get
      * params: adminId
      * description: 
        * this method will return list contact
      * @return : @var array
    */
    public function getContract (Request $request , $adminId) 
    {
      $contracts = ContractPayment::latest()->get();
      $response = AdminContractResource::collection($contracts);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/{adminId}/payment/contract/{contract}
      * method: get
      * params: adminId , contract
      * description: 
        * this method will return detail contract
      * @return : @var array
    */
    public function detailContract (Request $request , $adminId , ContractPayment $contract) 
    {
      $response = new AdminDetailContractResource($contract);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
    

    
    
    /**
      * route: /api/admin/{adminId}/payment/contract/{contract}/status
      * method: put
      * params: adminId , contract
      * description: 
        * this method for update status contract
      * @return : @var array
    */
    public function updateStatusContract (Request $request , $adminId , ContractPayment $contract) 
    {
      $contract->update([ 'status' => $request->status ]);
      return response(true , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      







    
    
    /**
      * route: api/admin/{adminId}/payment/bank
      * method: get
      * params: adminId
      * description: 
        * this method will return list bank
      * @return : @var array
    */
    public function getBank (Request $request , $adminId) 
    {
      $banks = Bank::get();
      $response = ListBankResource::collection($banks);

      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: api/admin/{adminId}/payment/bank
      * method: post
      * params: bank , customer, card_number
      * description: 
        * this method for store new bank
      * @return : @var array
    */
    public function storeBank (Request $request , $adminId) 
    {
      Bank::create($request->all());
      $bank = Bank::get()->last();
      $response = new ListBankResource($bank);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: api/admin/{adminId}/payment/bank/{bank}
      * method: delete
      * params: adminId , bank
      * description: 
        * this method for destroy bank
      * @return : @var array
    */
    public function destroyBank (Request $request , $adminId , $bank) 
    {
      Bank::destroy($bank);
      return response(true , 200)
          ->header('Content-Type' , 'application/json');
    }
      
      
      
    	
    	
    	
}
