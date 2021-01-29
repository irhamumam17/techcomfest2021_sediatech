<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exam;
use App\Models\ExamAnswer;

class ExamQuestion extends Model
{
    use HasFactory;
    protected $fillable = ['exam_id' , 'number' , 'question' , 'score'];

    public function exam () 
    {
    	return $this->belongsTo(Exam::class , 'exam_id');
    }

    public function answer () 
    {
    	return $this->hasMany(ExamAnswer::class , 'question_id');
    }
}
