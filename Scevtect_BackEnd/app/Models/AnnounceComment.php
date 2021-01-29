<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Announcement;

class AnnounceComment extends Model
{
    use HasFactory;
    protected $fillable = ['user_id' , 'announce_id' , 'comment'];

    public function user () 
    {
    	return $this->belongsTo(User::class , 'user_id');
    }

    public function announce () 
    {
    	return $this->belongsTo(Announcement::class , 'announce_id');
    }
}
