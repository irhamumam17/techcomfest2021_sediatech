<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EWallet;

class WalletTopup extends Model
{
    use HasFactory;
    protected $fillable = ['wallet_id' , 'invoice_number' , 'card_number' , 'name' , 'bank' , 'value' , 'status' , 'proof'];

    public function wallet () 
    {
    	return $this->belongsTo(EWallet::class , 'wallet_id');
    }
}
