<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ExamQuestion;

class ExamAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['question_id' , 'answer' , 'correct'];

    public function question () 
    {
    	return $this->belongsTo(ExamQuestion::class , 'question_id');
    }
}
