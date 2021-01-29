<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Market;
use App\Models\Student;
use App\Models\Product;

class Store extends Model
{
    use HasFactory;
    protected $fillable = ['market_id' , 'student_id' , 'name' , 'image'];

    public function market () 
    {
    	return $this->belongsTo(Market::class , 'market_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }

    public function product () 
    {
        return $this->hasMany(Product::class , 'store_id');
    }
}
