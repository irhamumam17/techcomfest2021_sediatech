<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\Subject;

class TeacherSubject extends Model
{
    use HasFactory;
    protected $fillable = ['teacher_id' , 'subject_id'];

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }

    public function subject () 
    {
    	return $this->belongsTo(Subject::class , 'subject_id');
    }
}
