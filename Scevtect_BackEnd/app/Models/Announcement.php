<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\School;

class Announcement extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'user_id' , 'title' , 'description' , 'status'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }
}
