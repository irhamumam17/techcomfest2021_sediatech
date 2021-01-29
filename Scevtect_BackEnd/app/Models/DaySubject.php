<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\LessonSchedule;
use App\Models\Subject;

class DaySubject extends Model
{
    use HasFactory;
    protected $fillable = ['schedule_id' , 'subject_id'];

    public function schedule () 
    {
    	return $this->belongsTo(LessonSchedule::class , 'schedule_id');
    }

    public function subject () 
    {
    	return $this->belongsTo(Subject::class , 'subject_id');
    }
}
