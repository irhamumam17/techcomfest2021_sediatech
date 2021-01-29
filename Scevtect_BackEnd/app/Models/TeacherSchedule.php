<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\TeacherAbsent;

class TeacherSchedule extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'day' , 'month' , 'year'];
    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function absent () 
    {
    	return $this->hasMany(TeacherAbsent::class , 'schedule_id');
    }
}
