<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Library;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['library_id' , 'title' , 'code' , 'publisher' , 'total' , 'image' , 'description'];

    public function library () 
    {
    	return $this->belongsTo(Library::class , 'library_id');
    }
}
