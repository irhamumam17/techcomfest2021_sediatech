<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\Book;

class Library extends Model
{
    use HasFactory;
    protected $fillable = ['school_id' , 'name'];

    public function school () 
    {
    	return $this->belongsTo(School::class , 'school_id');
    }

    public function book () 
    {
    	return $this->hasMany(Book::class , 'library_id');
    }
}
