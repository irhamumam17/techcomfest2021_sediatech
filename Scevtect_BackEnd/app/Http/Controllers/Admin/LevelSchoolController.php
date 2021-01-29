<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LevelSchool;

class LevelSchoolController extends Controller
{
    /**
      * route: /api/admin/school/level
      * method: get
      * params: null
      * description: 
        * this method for retur list level school
      * return : @response
    */
    public function index () 
    {
    	$levels = LevelSchool::get();
    	return response($levels , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/school/level/add
      * method: post
      * params: null
      * description: 
        * this method for add new level school
      * return : @response
    */
    public function store (Request $request) 
    {
    	$request->validate([
    		'level' => 'required|string|max:20',
    	]);

    	$level = LevelSchool::create($request->all());

    	return response($level , 200)
    			->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/admin/school/level/{id}
      * method: delete
      * params: id
      * description: 
        * this method for delete lever school
      * return : @response
    */
    public function destroy (Request $request , $id) 
    {
    	LevelSchool::destroy($id);
    	return response($id , 200)
    			->header('Content-Type' , 'application/json');
    }
    	
    	
    	
}
