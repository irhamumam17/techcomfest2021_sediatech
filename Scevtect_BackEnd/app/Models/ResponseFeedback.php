<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DutyResponse;
use App\Models\Teacher;

class ResponseFeedback extends Model
{
    use HasFactory;
    protected $fillable = ['response_id' , 'teacher_id' , 'title' , 'description'];

    public function response () 
    {
    	return $this->belongsTo(DutyResponse::class , 'response_id');
    }

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }
}
