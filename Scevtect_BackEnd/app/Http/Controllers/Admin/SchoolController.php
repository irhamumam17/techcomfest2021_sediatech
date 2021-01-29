<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Queries\SchoolQuery;
use App\Models\User;
use App\Models\School;

class SchoolController extends Controller
{
    /**
      * route: /api/admin/school
      * method: get
      * params: null
      * description: 
        * this method for return list schools
      * return : @response
    */
    public function index () 
    {
    	$schools = SchoolQuery::getSlim();
    	return response($schools , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/school/add
      * method: post
      * params: name , level_id , email , password , address , phone , hp , headmaster,  
      * description: 
        * text
      * return : @var array
    */
    public function store (Request $request) 
    {
    	$request->validate([
			'name'       => 'required|string|min:3|max:50',
			'level_id'   => 'required|numeric',
			'email'      => 'required|email|unique:users',
			'password'   => 'required|string|min:3|max:30',
			'headmaster' => 'required|string|min:3|max:50',
			'address'    => 'required|string',
			'hp'         => 'required|string|min:3|max:30',
			'phone'      => 'required|string|min:3|max:30',
    	]);

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
			'headmaster' => $request->headmaster,
			'phone'      => $request->phone,
			'hp'         => $request->hp,
    	]);

    	return response($request->all() , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/school/{id}
      * method: delete
      * params: id
      * description: 
        * this method for destroy data school
      * return : @response
    */
    public function destroy (Request $request , $id) 
    {
    	User::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
}
