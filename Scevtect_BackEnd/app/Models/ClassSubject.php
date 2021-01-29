<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Subject;
use App\Models\ListClass;

class ClassSubject extends Model
{
    use HasFactory;
    protected $fillable = ['subject_id' , 'class_id'];

    public function subject () 
    {
    	return $this->belongsTo(Subject::class , 'subject_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }
}
