<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TeacherSchedule;
use App\Models\Teacher;

class TeacherAbsent extends Model
{
    use HasFactory;
    protected $fillable = ['schedule_id' , 'teacher_id' , 'status'];

    public function schedule () 
    {
    	return $this->belongsTo(TeacherSchedule::class , 'schedule_id');
    }

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }
}
