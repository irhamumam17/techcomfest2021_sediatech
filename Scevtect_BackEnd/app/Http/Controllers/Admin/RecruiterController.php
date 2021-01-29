<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Resources\Recruiter\RecruiterResource;
use App\Http\Resources\Recruiter\DetailRecruiterResource;
use App\Models\User;
use App\Models\Recruiter;

class RecruiterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    	$recruiters = User::where('level_id' , 2)->get();
    	$recruiters = RecruiterResource::collection($recruiters);
       	return response($recruiters , 200)
       			->header('Content-Type' , 'application/json');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    	User::create([
			'name'     => $request->name,
			'email'    => $request->email,
			'password' => Hash::make($request->password),
			'image'    => 'recruiter.jpg',
			'level_id' => 2,
    	]);
    	Recruiter::create([
    		'user_id' => User::get()->last()->id,
			'phone'    => $request->phone,
			'company'  => $request->company,
    	]);

    	$response = new RecruiterResource(User::get()->last());
        return response($response , 200)
        		->header('Content-Type' , 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request , $adminId ,$id)
    {
        $user = User::find($id);
        $response = new DetailRecruiterResource($user);
        return response($response , 200)
        		->header('Content-Type' , 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request , $adminId , $recruiter)
    {
        User::destroy($recruiter);
        return response($recruiter , 200)
        		->header('Content-Type' , 'application/json');
    }
}
