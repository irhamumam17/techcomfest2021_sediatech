<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Duty;
use App\Models\Student;
use App\Models\ResponseFile;

class DutyResponse extends Model
{
    use HasFactory;
    protected $fillable = ['duty_id' , 'student_id' , 'title' , 'description' , 'read_at' , 'response_at' , 'skor', 'status'];

    public function duty () 
    {
    	return $this->belongsTo(Duty::class , 'duty_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }

    public function file () 
    {
        return $this->hasMany(ResponseFile::class , 'response_id');
    }

}
