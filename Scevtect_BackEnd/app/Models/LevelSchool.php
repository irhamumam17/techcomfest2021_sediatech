<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;

class LevelSchool extends Model
{
    use HasFactory;
    protected $fillable = ['level'];

    public function school () 
    {
    	return $this->hasMany(School::class , 'level_id');
    }
}
