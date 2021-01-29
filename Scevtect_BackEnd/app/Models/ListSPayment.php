<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StudentPayment;

class ListSPayment extends Model
{
    use HasFactory;
    protected $fillable = ['payment_id' , 'pay' , 'changes' , 'value'];

    public function payment () 
    {
    	return $this->belongsTo(StudentPayment::class , 'payment_id');
    }
}

