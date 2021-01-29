<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Admin;

class Scholarship extends Model
{
    use HasFactory;
    protected $fillable = ['admin_id' , 'cover' , 'title' , 'deadline' , 'limit' , 'institution' , 'description'];

    public function admin () 
    {
    	return $this->belongsTo(Admin::class , 'admin_id');
    }
}
