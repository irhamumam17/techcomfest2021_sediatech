<?php 
namespace App\Helpers;

class GetId
{
    public static function index($collection)
    {
    	$collections = collect([]);
        foreach ($collection as $data) {
        	$collections->push($data->id);
        }
        return $collections;
    }
}
