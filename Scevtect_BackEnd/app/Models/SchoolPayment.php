<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\ListClass;
use App\Models\StudentPayment;

class SchoolPayment extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'class_id' , 'name' , 'description' , 'value'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }

    public function student_payment () 
    {
        return $this->hasMany(StudentPayment::class , 'payment_id');
    }
}
