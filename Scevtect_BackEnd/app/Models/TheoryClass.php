<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Theory;
use App\Models\ListClass;

class TheoryClass extends Model
{
    use HasFactory;
    protected $fillable = ['theory_id' , 'class_id'];

    public function theory () 
    {
    	return $this->belongsTo(Theory::class , 'theory_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }
}
