<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\School;
use App\Models\ListClass;
use App\Models\TheoryStudent;
use App\Models\DutyStudent;
use App\Models\TryoutStudent;
use App\Models\ExamStudent;
use App\Models\StudentAbsent;
use App\Models\Store;

class Student extends Model
{
    use HasFactory;
    protected $fillable = ['user_id' , 'school_id' , 'class_id' , 'gender' , 'nis' , 'phone' , 'address' , 'status'];

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }

    public function theory () 
    {
        return $this->hasMany(TheoryStudent::class , 'student_id');
    }

    public function duty () 
    {
        return $this->hasMany(DutyStudent::class , 'student_id');
    }

    public function tryout () 
    {
        return $this->hasMany(TryoutStudent::class , 'student_id');
    }

    public function exam () 
    {
        return $this->hasMany(ExamStudent::class , 'student_id');
    }

    public function absent () 
    {
        return $this->hasMany(StudentAbsent::class , 'student_id');
    }

    public function store () 
    {
        return $this->hasOne(Store::class , 'student_id');
    }
}
