<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StudentSchedule;
use App\Models\Student;

class StudentAbsent extends Model
{
    use HasFactory;
    protected $fillable = ['schedule_id' , 'student_id' , 'status'];

    public function schedule () 
    {
    	return $this->belongsTo(StudentSchedule::class , 'schedule_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }
}
