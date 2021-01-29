<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\WalletTopup;

class EWallet extends Model
{
    use HasFactory;
    protected $fillable = ['user_id' , 'phone' , 'saldo'];

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function topup () 
    {
    	return $this->hasMany(WalletTopup::class , 'wallet_id');
    }
}
