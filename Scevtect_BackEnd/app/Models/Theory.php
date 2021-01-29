<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\TheoryClass;
use App\Models\TheoryFile;
use App\Models\TheoryStudent;

class Theory extends Model
{
    use HasFactory;
    protected $fillable = ['teacher_id' , 'subject_id' , 'thumbnail' , 'title' , 'description' , 'status'];

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }

    public function subject () 
    {
    	return $this->belongsTo(Subject::class , 'subject_id');
    }

    public function class () 
    {
        return $this->hasMany(TheoryClass::class , 'theory_id');
    }

    public function file () 
    {
        return $this->hasMany(TheoryFile::class , 'theory_id');
    }

    public function student () 
    {
        return $this->hasMany(TheoryStudent::class , 'theory_id');
    }
}
