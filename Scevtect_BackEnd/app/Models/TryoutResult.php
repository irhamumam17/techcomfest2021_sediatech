<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tryout;
use App\Models\Student;

class TryoutResult extends Model
{
    use HasFactory;
    protected $fillable = ['tryout_id' , 'student_id' , 'score'];

    public function tryout () 
    {
    	return $this->belongsTo(Tryout::class , 'tryout_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }
}
