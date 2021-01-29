<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tryout;
use App\Models\ListClass;

class TryoutClass extends Model
{
    use HasFactory;
    protected $fillable = ['tryout_id' , 'class_id'];

    public function tryout () 
    {
    	return $this->belongsTo(Tryout::class , 'tryout_id');
    }	

   	public function class () 
   	{
   		return $this->belongsTo(ListClass::class , 'class_id');
   	}
}
