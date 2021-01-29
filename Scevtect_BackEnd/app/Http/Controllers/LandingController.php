<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Job\LandingJobResource;
use App\Models\Job;

class LandingController extends Controller
{
    public function jobs () 
    {
    	$jobs = Job::where('status' , 'confirmed')->latest()->limit(4)->get();
    	$response = LandingJobResource::collection($jobs);
    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }
}
