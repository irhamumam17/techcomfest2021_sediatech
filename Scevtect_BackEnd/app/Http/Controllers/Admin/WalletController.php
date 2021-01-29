<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Wallet\Admin\ListTopupResource;
use App\Http\Resources\Wallet\Admin\DetailTopupResource;
use App\Models\WalletTopup;

class WalletController extends Controller
{
    
    
    
    /**
      * route: /api/addmin/{adminId}/payment/wallet/topup
      * method: get
      * params: adminId
      * description: 
        * this method will return list wallet topups
      * @return : @var array
    */
    public function getWalletTopup (Request $request , $adminId) 
    {
      $topups = WalletTopup::get();
      $response = ListTopupResource::collection($topups);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/{adminId}/payment/wallet/topup/{topup}
      * method: get
      * params: adminId , topup
      * description: 
        * this mehtod wil return data topup
      * @return : @var array
    */
    public function getDetailTopup (Request $request , $adminId , WalletTopup $topup) 
    {
      $response = new DetailTopupResource($topup);
      return response($response , 200)
          ->header('Content-Type' , 'application/json');
    }
      


    
    
    /**
      * route: api/admin/{adminId}/payment/wallet/topup/{topup}/status
      * method: put
      * params: adminId , topup
      * description: 
        * this method for update status topup
      * @return : @var array
    */
    public function updateStatusTopup (Request $request , $adminId , WalletTopup $topup) 
    {
      $topup->update([ 'status' => $request->status ]);
      if($request->status === 'confirmed') {
        $value = $topup->value;
        $saldo = $topup->wallet->saldo;
        $total = $saldo + $value;
        $topup->wallet->update(['saldo' => $total]);
      }
      return response($topup , 200)
          ->header('Content-Type' , 'application/json');
    }
      
    	
}
