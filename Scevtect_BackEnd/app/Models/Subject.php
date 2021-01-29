<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\ClassSubject;

class Subject extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'subject' , 'acronym'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function class () 
    {
    	return $this->hasMany(ClassSubject::class , 'subject_id');
    }
}
