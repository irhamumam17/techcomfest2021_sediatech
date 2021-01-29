<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;

class SubClass extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'name'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }
}
