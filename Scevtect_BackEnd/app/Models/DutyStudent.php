<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Duty;
use App\Models\Student;

class DutyStudent extends Model
{
    use HasFactory;
    protected $fillable = ['duty_id' , 'student_id' , 'read_at' , 'response_at'];

    public function duty () 
    {
    	return $this->belongsTo(Duty::class , 'duty_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }
}
