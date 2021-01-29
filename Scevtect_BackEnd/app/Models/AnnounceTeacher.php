<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Announcement;
use App\Models\Teacher;

class AnnounceTeacher extends Model
{
    use HasFactory;
    protected $fillable = ['announce_id' , 'teacher_id'];

    public function announce () 
    {
    	return $this->belongsTo(Announcement::class , 'announce_id');
    }

    public function teacher () 
    {
    	return $this->belongsTo(Teacher::class , 'teacher_id');
    }
}
