<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tryout;
use App\Models\Student;

class TryoutStudent extends Model
{
    use HasFactory;
    protected $fillable = ['tryout_id' , 'student_id' , 'start_time' , 'finish_time' , 'duration'];

    public function tryout () 
    {
    	return $this->belongsTo(Tryout::class , 'tryout_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }
}
