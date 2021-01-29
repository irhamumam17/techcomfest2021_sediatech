<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\SchoolStatistic;

class SchoolStatisticData extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'statistic_id'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function statistic () 
    {
    	return $this->belongsTo(Statistic::class , 'statistic_id');
    }
}
