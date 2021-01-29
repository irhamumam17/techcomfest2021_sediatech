<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Exam;
use App\Models\ListClass;

class ExamClass extends Model
{
    use HasFactory;
    protected $fillable = ['exam_id' , 'class_id'];

    public function exam () 
    {
    	return $this->belongsTo(Exam::class , 'exam_id');
    }

    public function class () 
    {
    	return $this->belongsTo(ListClass::class , 'class_id');
    }
}
