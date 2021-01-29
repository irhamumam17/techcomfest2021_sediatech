<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\StudentAbsent;

class StudentSchedule extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'day' , 'month' , 'year'];
    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function absent () 
    {
    	return $this->hasMany(StudentAbsent::class , 'schedule_id');
    }
}
