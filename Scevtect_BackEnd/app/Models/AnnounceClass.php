<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Annoucement;
use App\Models\ListClass;

class AnnounceClass extends Model
{
    use HasFactory;
    protected $fillable = ['announce_id' , 'class_id'];

    public function annouce () 
    {
    	return $this->belongsTo(Annoucement::class , 'annouce_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }
}
