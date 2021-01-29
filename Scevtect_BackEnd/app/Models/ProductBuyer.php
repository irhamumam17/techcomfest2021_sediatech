<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;
use App\Models\ProductReview;

class ProductBuyer extends Model
{
    use HasFactory;
    protected $fillable = ['product_id' , 'user_id'];

    public function product () 
    {
    	return $this->belongsTo(Product::class , 'product_id');
    }

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function review () 
    {
        return $this->hasOne(ProductReview::class , 'payment_id');
    }
}
