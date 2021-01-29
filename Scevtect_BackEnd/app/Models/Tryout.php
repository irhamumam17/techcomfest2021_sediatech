<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\TryoutQuestion;

class Tryout extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'teacher_id' , 'subject_id' , 'title' , 'description' , 'deadline' , 'duration'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'schools_id');
    }

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }

    public function subject () 
    {
    	return $this->belongsTo(Subject::class , 'subject_id');
    }

    public function question () 
    {
        return $this->hasMany(TryoutQuestion::class , 'tryout_id');
    }
}
