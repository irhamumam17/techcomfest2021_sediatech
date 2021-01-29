<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SchoolPayment;
use App\Models\Student;
use App\Models\ListSPayment;

class StudentPayment extends Model
{
    use HasFactory;
    protected $fillable = ['payment_id' , 'student_id' , 'insufficient' , 'paid_off' , 'status'];

    public function payment () 
    {
    	return $this->belongsTo(SchoolPayment::class , 'payment_id');
    }

    public function student () 
    {
    	return $this->belongsTo(Student::class , 'student_id');
    }

    public function history () 
    {
        return $this->hasMany(ListSPayment::class , 'payment_id');
    }
}
