<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductBuyer;
use App\Models\User;

class ProductReview extends Model
{
    use HasFactory;
    protected $fillable = ['payment_id' , 'user_id' , 'description' , 'stars'];

    public function payment () 
    {
    	return $this->belongsTo(ProductBuyer::class , 'payment_id');
    }

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }
}
