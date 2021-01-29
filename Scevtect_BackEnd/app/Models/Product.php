<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Store;
use App\Models\ProductBuyer;
use App\Models\ProductOrder;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['store_id' ,'image' , 'name' , 'cost' , 'description' , 'stars'];

    public function store () 
    {
    	return $this->belongsTo(Store::class , 'store_id');
    }

    public function buy () 
    {
    	return $this->hasMany(ProductBuyer::class , 'product_id');
    }

    public function order () 
    {
        return $this->hasMany(ProductOrder::class , 'product_id');
    }
}
