<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\LevelUser;
use App\Models\Admin;
use App\Models\School;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Recruiter;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'level_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function level () 
    {
        return $this->belongsTo(LevelUser::class , 'level_id');
    }

    public function admin () 
    {
        return $this->hasOne(Admin::class , 'user_id');
    }

    public function school () 
    {
        return $this->hasOne(School::class , 'user_id');
    }

    public function teacher () 
    {
        return $this->hasOne(Teacher::class , 'user_id');
    }

    public function student () 
    {
        return $this->hasOne(Student::class , 'user_id');
    }

    public function recruiter () 
    {
        return $this->hasOne(Recruiter::class , 'user_id');
    }
}
