<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Teacher;
use App\Models\ListClass;

class TeacherClass extends Model
{
    use HasFactory;
    protected $fillable = ['teacher_id' , 'class_id'];

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }
}
