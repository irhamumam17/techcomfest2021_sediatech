<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'name' , 'acronym'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }
}
