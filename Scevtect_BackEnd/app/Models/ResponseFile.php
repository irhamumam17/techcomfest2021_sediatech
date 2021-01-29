<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DutyResponse;

class ResponseFile extends Model
{
    use HasFactory;
    protected $fillable = ['response_id' , 'name' , 'size' , 'extension'];

    public function response () 
    {
    	return $this->belongsTo(DutyResponse::class , 'response_id');
    }
}
