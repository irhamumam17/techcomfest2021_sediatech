<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'image' , 'name' , 'location' , 'date' , 'description' , 'status'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }
}
