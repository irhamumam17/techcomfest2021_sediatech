<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ContractPayment;

class ContractProof extends Model
{
    use HasFactory;
    protected $fillable = ['contract_id' , 'proof' , 'status'];

    public function contract () 
    {
    	return $this->belongsTo(ContractPayment::class , 'contract_id');
    }
}
