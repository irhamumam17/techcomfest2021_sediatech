<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exam;
use App\Models\Student;

class ExamResult extends Model
{
    use HasFactory;
    protected $fillable = ['exam_id' , 'student_id' , 'score'];

    public function exam () 
    {
    	return $this->belongsTo(Exam::class , 'exam_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }
}
