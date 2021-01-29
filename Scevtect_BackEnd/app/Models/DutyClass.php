<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Duty;
use App\Models\ListClass;

class DutyClass extends Model
{
    use HasFactory;

    protected $fillable = ['duty_id' , 'class_id'];

    public function duty () 
    {
    	return $this->belongsTo(Duty::class , 'duty_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }
}
