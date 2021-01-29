<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Wallet\Student\ListTopupResource;
use App\Http\Resources\Contract\ListBankResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Str;
use App\Models\Bank;
use App\Models\User;
use App\Models\EWallet;
use App\Models\WalletTopup;

class WalletController extends Controller
{


  
  
  /**
    * route: api/student/{studentId}/bank
    * method: get
    * params: studentId
    * description: 
      * this method wil return list bank
    * @return : @var array
  */
  public function getBank (Request $request , $studentId) 
  {
    $banks = Bank::get();
    $response = ListBankResource::collection($banks);
    return response($response , 200)
        ->header('Content-Type' , 'application/json');
  }
    
    
    
    
    /**
      * route: api/student/{studentId}/wallet
      * method: get
      * params: studentId
      * description: 
        * this method will return data wallet
      * @return : @var array
    */
    public function index (Request $request , $studentId) 
    {
      $check = EWallet::where('user_id' , $studentId)->get()->count();
      if(!$check) {
        $phone = User::find($studentId)->student->phone;
        EWallet::create([
          'user_id' => $studentId,
          'phone'   => $phone,
          'saldo'   => 0,
        ]);
      }

    	$wallet = EWallet::select('id' , 'saldo' ,'phone')->where('user_id' , $studentId)->first();
    	$response = [
  			'id'    => $wallet->id,
  			'phone' => $wallet->phone,
  			'saldo' => 'Rp'.number_format($wallet->saldo,2,',','.'),
    	];
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/wallet/topup
      * method: get
      * params: studentId
      * description: 
        * this method will return list history topup
      * @return : @var array
    */
    public function historyTopup (Request $request , $studentId , EWallet $wallet) 
    {
      $response = ListTopupResource::collection($wallet->topup);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	


    
    
    /**
      * route: /api/student/{studentId}/wallet/topup
      * method: post
      * params: studnetId
      * description: 
        * this method for topup wallet
      * @return : @var array
    */
    public function topup (Request $request , $studentId) 
    {
    	$nameProof ='Proof_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->proof->getClientOriginalExtension();
    	Storage::putFileAs('public\wallet\proof' , new File($request->proof) , $nameProof);

    	WalletTopup::create([
          'wallet_id'      => $request->wallet_id,
          'invoice_number' => date("yds") . $request->wallet_id,
          'card_number'    => $request->card_number,
          'name'           => $request->name,
          'bank'           => $request->bank,
          'value'          => $request->value,
          'proof'          => $nameProof,
    	]);

    	$topup = WalletTopup::get()->last();
    	$response = new ListTopupResource($topup);

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
}
