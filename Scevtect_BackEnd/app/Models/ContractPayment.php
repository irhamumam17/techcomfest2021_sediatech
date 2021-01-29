<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bank;
use App\Models\School;
use App\Models\Package;

class ContractPayment extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'bank_id' , 'package_id' , 'inv_number' , 'inv_date' , 'tax' , 'total' , 'start_date' , 'finish_date' , 'status'];


    public function bank () 
    {
        return $this->belongsTo(Bank::class , 'bank_id');
    }

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function package () 
    {
    	return $this->belongsTo(Package::class , 'package_id');
    }
}
