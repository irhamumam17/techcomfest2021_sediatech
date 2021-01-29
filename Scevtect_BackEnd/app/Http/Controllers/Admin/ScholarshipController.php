<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use App\Http\Resources\Scholarship\ScholarshipResource;
use App\Models\User;
use App\Models\Scholarship;

class ScholarshipController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scholarship = Scholarship::get();
        $response = ScholarshipResource::collection($scholarship);

        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Store a newly upload cover in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload (Request $request , $adminId) 
    {
        $name = 'Cover_' . date('Y-m-d_H-i-s') . Str::random(30) .'.'.$request->cover->getClientOriginalExtension();
        Storage::putFileAs('public\scholarship\covers' , new File($request->cover) , $name);
        return response($name , 200)
                ->header('Content-Type' , 'application/json');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request , $adminId)
    {
        $adminId = User::find($adminId)->admin->id;

        Scholarship::create([
            'admin_id'    => $adminId,
            'cover'       => $request->cover,
            'title'       => $request->title,
            'deadline'    => $request->deadline,
            'limit'       => $request->limit,
            'institution' => $request->institution,
            'description' => $request->description,
        ]);
        $response = Scholarship::get()->last();

        return response($request , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function destroy(Request $request , $adminId , Scholarship $scholarship)
    {
        Storage::delete('public/scholarship/covers/' . $scholarship->cover);
        Scholarship::destroy($scholarship->id);
        
        return response($scholarship , 200)
                ->header('Content-Type' , 'application/json');
    }
}
