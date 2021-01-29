<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TryoutResult;
use App\Models\TryoutQuestion;
use App\Models\TryoutAnswer;

class TryoutSAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['result_id' , 'question_id' , 'answer_id' , 'correct'];

    public function result () 
    {
    	return $this->belongsTo(TryoutResult::class , 'result_id');
    }

    public function question () 
    {
    	return $this->belongsTo(TryoutQuestion::class , 'question_id');
    }

    public function answer () 
    {
    	return $this->belongsTo(TryoutAnswer::class , 'answer_id');
    }
}
