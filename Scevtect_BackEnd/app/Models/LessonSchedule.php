<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\ListClass;
use App\Models\DaySubject;


class LessonSchedule extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'class_id' , 'day'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }

    public function subject () 
    {
        return $this->hasMany(DaySubject::class , 'schedule_id');
    }
}
