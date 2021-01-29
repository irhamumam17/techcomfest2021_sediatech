<?php 
namespace App\Queries;

use App\Http\Resources\Product\OrderResource;

class ProductQuery
{
    public static function getOrders($products)
    {
    	$orders = collect([]);
        foreach ($products as $product) {
        	$order = $product->order->where('status' , 'progress');
        	foreach ($order as $data) {
	        	$orders->push($data);
        	}
        }

        $response = OrderResource::collection($orders);

        return $response;
    }
}
