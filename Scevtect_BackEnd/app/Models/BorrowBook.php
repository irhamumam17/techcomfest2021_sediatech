<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\Library;
use App\Models\Book;

class BorrowBook extends Model
{
    use HasFactory;
    protected $fillable = ['student_id' , 'library_id' , 'book_id' , 'start_time' , 'finish_time' , 'status'];

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }

    public function library () 
    {
    	return $this->belongsTo(Library::class , 'library_id');
    }

    public function book () 
    {
    	return $this->belongsTo(Book::class , 'book_id');
    }
}
