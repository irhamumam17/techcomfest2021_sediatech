<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\LevelSchool;
use App\Models\Library;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\ListClass;
use App\Models\Course;

class School extends Model
{
    use HasFactory;
    protected $fillable = ['user_id' , 'level_id' , 'address' , 'headmaster' , 'phone' , 'hp'];

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function level () 
    {
    	return $this->belongsTo(LevelSchool::class , 'level_id');
    }

    public function library () 
    {
        return $this->hasOne(Library::class , 'school_id');
    }

    public function teacher () 
    {
        return $this->hasMany(Teacher::class , 'school_id');
    }

    public function student () 
    {
        return $this->hasMany(Student::class , 'school_id');
    }

    public function class () 
    {
        return $this->hasMany(ListClass::class , 'school_id');
    }

    public function course () 
    {
        return $this->hasMany(Course::class , 'school_id');
    }
}
