<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Theory;

class TheoryFile extends Model
{
    use HasFactory;
    protected $fillable = ['theory_id' , 'type' , 'value' , 'extension' , 'size'];

    public function theory () 
    {
    	return $this->belongsTo(Theory::class , 'theory_id');
    }
}
