<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RoleTeacher;
use App\Models\User;
use App\Models\School;
use App\Models\TeacherAbsent;
use App\Models\Theory;
use App\Models\Duty;
use App\Models\Tryout;
use App\Models\Exam;

class Teacher extends Model
{
    use HasFactory;
    protected $fillable = ['role_id' , 'user_id' , 'school_id' , 'phone' , 'address' , 'nip' , 'status'];

    public function role () 
    {
    	return $this->belongsTo(RoleTeacher::class , 'role_id');
    }

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function absent () 
    {
        return $this->hasMany(TeacherAbsent::class , 'teacher_id');
    }

    public function theory () 
    {
        return $this->hasMany(Theory::class , 'teacher_id');
    }

    public function duty () 
    {
        return $this->hasMany(Duty::class , 'teacher_id');
    }

    public function tryout () 
    {
        return $this->hasMany(Tryout::class , 'teacher_id');
    }

    public function exam () 
    {
        return $this->hasMany(Exam::class , 'teacher_id');
    }
}
