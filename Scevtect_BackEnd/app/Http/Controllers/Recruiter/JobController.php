<?php

namespace App\Http\Controllers\Recruiter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Job\JobResource;
use App\Models\User;
use App\Models\Job;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request , $recruiterId)
    {
        $recruiterId = User::find($recruiterId)->recruiter->id;
        $job = Job::where('recruiter_id' , $recruiterId)->get();
        $response = JobResource::collection($job);
        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request , $recruiterId)
    {
        $recruiterId = User::find($recruiterId)->recruiter->id;
        
        Job::create([
            'recruiter_id'   => $recruiterId,
            'position'       => $request->position,
            'type_time'      => $request->type_time,
            'type_distance'  => $request->type_distance,
            'deadline'       => $request->deadline . ' ' . '23:00:00',
            'target'         => $request->target,
            'description'    => $request->description,
            'min_experience' => $request->min_experience,
        ]);

        $job = Job::get()->last();
        $response = new JobResource($job);

        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request , $recruiterId , Job $job)
    {
        $job = new JobResource($job);
        return response($job , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request , $recruiterId ,  Job $job)
    {
        $job->delete();
        return response($job , 200)
                ->header('Content-Type' , 'application/json');
    }
}
