<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EWallet;

class WalletExpense extends Model
{
    use HasFactory;
    protected $fillable = ['wallet_id' , 'value' , 'status'];

    public function wallet () 
    {
    	return $this->belongsTo(EWallet::class , 'wallet_id');
    }
}
