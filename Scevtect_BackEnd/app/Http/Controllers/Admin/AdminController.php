<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;

class AdminController extends Controller
{
    /**
      * route: /api/admin/admin
      * method: get
      * params: null
      * description: 
        * this method for get list admins
      * return : @response
    */
    public function index () 
    {
    	$admins = User::where('level_id' , 1)->get();
    	return response($admins , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/admin/add
      * method: post
      * params: name , email , password
      * description: 
        * this method for create new admin
      * return : @response
    */
    public function store (Request $request) 
    {
    	$request->validate([
			'name'     => 'required|string|min:3|max:25',
			'email'    => 'required|email|unique:users',
			'password' => 'required|string|min:3|max:30',
    	]);

    	User::create([
			'name'     => $request->name,
			'email'    => $request->email,
			'password' => Hash::make($request->password),
			'level_id' => 1,
			'image'    => 'admin.jpg',
    	]);
    	Admin::create(['user_id' => User::get()->last()->id]);
    	return response($request->all() , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/{adminId}/admin/{id}
      * method: delete
      * params: id
      * description: 
        * this method for delete admin
      * return : @response
    */
    public function destroy (Request $request , $adminId , $id) 
    {
    	User::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    			
    	
}
