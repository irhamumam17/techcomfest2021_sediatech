<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\School\ListLevelResource;
use App\Models\LevelSchool;
use App\Models\User;
use App\Models\School;

class AuthController extends Controller
{
    
    
    
    /**
      * route: /register/level
      * method: get
      * params: null
      * description: 
        * this method will return list level
      * @return : @var array
    */
    public function getLevel () 
    {
        $levels = LevelSchool::get();
        $response = ListLevelResource::collection($levels);
        return response($response , 200)
                   ->header('Content-Type' , 'application/json');   
    }
        
    
    
    /**
      * route: .login
      * method: post
      * params: email , password
      * description: 
        * this method for login route
      * return : @response
    */
    public function login (Request $request) 
    {
    	// cek email
    	$email = User::where('email' , $request->email)->count();
    	if(!$email) {
    		$err = [
    			'email' => 'Email yang anda masukkan tidak terdaftar!',
    		];
    		return response($err , 200);
    	}

    	$user = User::where('email' , $request->email)->first();
    	// cek passowrd
    	$password = Hash::check($request->password , $user->password);
    	if(!$password) {
    		return response(['password' => 'Password yang kamu masukkan salah.'] , 200);
    	}

        // generate token
        $token = $user->createToken('token-name')->plainTextToken;

    	$response = [
			'id'   => $user->id,
			'name' => $user->name,
			'role' => $user->level->level,
			'response' => 'success',
            'token' => $token,
    	];

    	return response($response , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: register/school
      * method: post
      * params: name, email, password, address, hp
      * description: 
        * this method for create new school
      * @return : @var array
    */
    public function registerSchool (Request $request) 
    {
        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'level_id' => 3,
            'image'    => 'school.jpg',
        ]);

        School::create([
            'user_id'    => User::get()->last()->id,
            'level_id'   => $request->level_id,
            'address'    => $request->address,
            'hp'         => $request->hp,
        ]);

        return response($request->all() , 200)
                ->header('Content-Type' , 'application/json');
    }
        
    	
}
