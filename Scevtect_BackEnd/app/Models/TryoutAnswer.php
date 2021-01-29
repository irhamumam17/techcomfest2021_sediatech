<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TryoutQuestion;

class TryoutAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['question_id' , 'answer' , 'correct'];

    public function question () 
    {
    	return $this->belongsTo(TryoutQuestion::class , 'question_id');
    }
}
