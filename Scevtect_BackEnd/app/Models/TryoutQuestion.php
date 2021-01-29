<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tryout;
use App\Models\TryoutAnswer;

class TryoutQuestion extends Model
{
    use HasFactory;
    protected $fillable = ['tryout_id' , 'number' , 'question' , 'score'];

    public function tryout () 
    {
    	return $this->belongsTo(Tryout::class , 'tryout_id');
    }

    public function answer () 
    {
    	return $this->hasMany(TryoutAnswer::class , 'question_id');
    }
}
