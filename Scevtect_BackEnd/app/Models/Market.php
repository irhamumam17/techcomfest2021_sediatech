<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\Store;

class Market extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'name' , 'image'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function store () 
    {
    	return $this->hasMany(Store::class , 'market_id');
    }
}
