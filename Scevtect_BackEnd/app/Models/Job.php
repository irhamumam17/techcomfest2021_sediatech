<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Recruiter;	

class Job extends Model
{
    use HasFactory;
    protected $fillable =['recruiter_id' ,'position' ,'deadline' , 'type_time' , 'type_distance' , 'target' , 'min_experience' , 'status' , 'description'];

    public function recruiter () 
    {
    	return $this->belongsTo(Recruiter::class , 'recruiter_id');
    }
}
