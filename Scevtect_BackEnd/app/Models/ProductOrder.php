<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;

class ProductOrder extends Model
{
    use HasFactory;
    protected $fillable = ['user_id' , 'product_id' , 'status'];

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function product () 
    {
    	return $this->belongsTo(Product::class , 'product_id');
    }
}
