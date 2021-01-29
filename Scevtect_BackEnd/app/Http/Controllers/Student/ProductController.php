<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Http\Resources\Product\ProductResource;
use App\Http\Resources\Product\OrderResource;
use App\Queries\ProductQuery;
use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use App\Models\Market;
use App\Models\EWallet;
use App\Models\ProductOrder;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::get();
        $response = ProductResource::collection($products);
        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }

     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function myProduct (Request $request , $studentId) 
     {
        $student_id = User::find($studentId)->student->id;

        $check = Store::where('student_id' , $student_id)->get()->count();
        if(!$check) {
            $student = User::find($studentId)->student;
            $marketId = Market::where('school_id' , $student->school_id)->get()->first()->id;

            Store::create([
                'market_id' => $marketId,
                'student_id' => $student->id,
                'name' => 'Toko ' . $student->user->name,
            ]);
        }

        $store = Store::where('student_id' , $student_id)->get()->first();
        $products = $store->product;
        $response = ProductResource::collection($products);
        return response($response , 200)
                ->header('Content-Type' , 'application/json');
     }

    /**
     * Store a newly image products resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadImage (Request $request) 
    {
        $name = 'Cover_' . date('Y-m-d_H-i-s') . Str::random(50) .'.'.$request->image->getClientOriginalExtension();

        Storage::putFileAs('public\store\products' , new File($request->image) , $name);

        return response($name , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request , $studentId)
    {
        $student_id = User::find($studentId)->student->id;

        $store_id = Store::where('student_id' , $student_id)->get()->first()->id;
        Product::create([
            'store_id'    => $store_id,
            'image'       => $request->image,
            'name'        => $request->name,
            'cost'        => (int)$request->cost,
            'description' => $request->description,
            'stars'       => (float)0.0,
        ]);

        $response = Product::get()->last();
        $response = new ProductResource($response);
        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $studentId , Product $product)
    {
        $product = new ProductResource($product);
        return response($product , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $studentId , Product $product)
    {
        $product->update([
            'name'        => $request->name,
            'cost'        => $request->cost,
            'description' => $request->description,
        ]);
        $product = new ProductResource($product);
        return response($product , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function updateImage (Request $request , $studentId , Product $product) 
    {
        /*$name = 'Cover_' . date('Y-m-d_H-i-s') . Str::random(50) .'.'.$request->image->getClientOriginalExtension();

        Storage::putFileAs('public\store\products' , new File($request->image) , $name);*/
        /*Storage::delete('public/store/products/' . $product->image);

        $product->update([
            'image' => $name,
        ]);*/

        return response($request->image , 200)
                ->header('Content-Type' , 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request , $studentId , Product $product)
    {
        if($product->image !== 'product.jpg') {
            Storage::delete('public/store/products/' . $product->image);
        }
        Product::destroy($product->id);
        return response('true' , 200)
                ->header('Content-Type' , 'application/json');
    }



    
    
    /**
      * route: api/student/{studentId}/product/buy
      * method: post
      * params: studentId
      * description: 
        * this method for buy product
      * @return : @var array
    */
    public function buyProduct (Request $request , $studentId , $product) 
    {
        ProductOrder::create([
            'user_id'    => $studentId,
            'product_id' => $product,
            'status'     => 'progress',
        ]);

        $response= new OrderResource(ProductOrder::get()->last());

        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/product/order
      * method: get
      * params: studentid
      * description: 
        * this method order
      * @return : @var array
    */
    public function getAllOrder (Request $request , $studentId) 
    {
        $studentId = User::find($studentId)->student->id;
        $products = Store::where('student_id' , $studentId)->get()->first()->product;
        $response = ProductQuery::getOrders($products);

        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }


    
    
    /**
      * route: /api/student/{studentId}/product/order/confirm/{order}
      * method: put
      * params: studentId , order
      * description: 
        * this method for confir order
      * @return : @var array
    */
    public function confirmOrder (Request $request , $studentId, ProductOrder $order) 
    {
        $wallet = EWallet::where('user_id' , $studentId)->get()->first();
        $saldo  = $wallet->saldo - $order->product->cost;
        EWallet::where('user_id' , $studentId)->update(['saldo' => $saldo]);

        $order->update(['status' => 'confirmed']);

        return response($saldo , 200)
                ->header('Content-Type' , 'application/json');
    }
        
        


    
    
    /**
      * route: /api/student/{studentId}/product/order/{product}
      * method: get
      * params: studentId , product
      * description: 
        * this method for list order product
      * @return : @var array
    */
    public function getOrder (Request $request , $studentId , Product $product) 
    {
        $orders = ProductOrder::where('user_id' , $studentId)
                                ->where('product_id' , $product->id)
                                ->get();
        $response = OrderResource::collection($orders);

        return response($response , 200)
                ->header('Content-Type' , 'application/json');
    }
            
        
}
