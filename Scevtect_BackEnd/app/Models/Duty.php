<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\DutyClass;
use App\Models\DutyFile;
use App\Models\DutyStudent;
use App\Models\DutyResponse;

class Duty extends Model
{
    use HasFactory;

    protected $fillable = ['teacher_id' , 'subject_id' , 'deadline' , 'thumbnail' , 'title' , 'description' , 'status'];


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
        return $this->hasMany(DutyClass::class , 'duty_id');
    }

    public function file () 
    {
        return $this->hasMany(DutyFile::class , 'duty_id');
    }

    public function student () 
    {
        return $this->hasMany(DutyStudent::class , 'duty_id');
    }

    public function response () 
    {
        return $this->hasMany(DutyResponse::class , 'duty_id');
    }

}
