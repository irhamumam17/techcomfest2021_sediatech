<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\ClassGrade;
use App\Models\SubClass;
use App\Models\Course;
use App\Models\Student;

class ListClass extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'grade_id' , 'sub_id' , 'course_id'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function grade () 
    {
    	return $this->belongsTo(ClassGrade::class , 'grade_id');
    }		

    public function sub () 
    {
    	return $this->belongsTo(SubClass::class , 'sub_id');
    }

    public function course () 
    {
    	return $this->belongsTo(Course::class , 'course_id');
    }

    public function student () 
    {
        return $this->hasMany(Student::class , 'class_id');
    }
}
