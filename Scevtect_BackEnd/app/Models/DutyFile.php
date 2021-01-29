<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Duty;

class DutyFile extends Model
{
    use HasFactory;

    protected $fillable = ['duty_id' , 'type' , 'value' , 'extension' , 'size'];

    public function duty () 
    {
    	return $this->belongsTo(Duty::class , 'duty_id');
    }
}
