<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ExamResult;
use App\Models\ExamQuestion;
use App\Models\ExamAnswer;

class ExamSAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['result_id' , 'question_id' , 'answer_id' , 'correct'];

    public function result () 
    {
    	return $this->belongsTo(ExamResult::class , 'result_id');
    }

    public function question () 
    {
    	return $this->belongsTo(ExamQuestion::class , 'question_id');
    }

    public function answer () 
    {
    	return $this->belongsTo(ExamAnswer::class , 'answer_id');
    }
}
