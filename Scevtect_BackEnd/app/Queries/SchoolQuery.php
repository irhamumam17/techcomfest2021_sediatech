<?php 
namespace App\Queries;
use App\Models\User;

class SchoolQuery
{
    public static function getSlim()
    {
        return User::where('level_id' , 3)->get();
    }
}
