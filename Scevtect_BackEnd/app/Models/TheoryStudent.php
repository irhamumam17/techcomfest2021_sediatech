<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Theory;
use App\Models\Student;

class TheoryStudent extends Model
{
    use HasFactory;
    protected $fillable = ['theory_id' , 'student_id' , 'read_at'];

    public function theory () 
    {
    	return $this->belongsTo(Theory::class , 'theory_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }
}
