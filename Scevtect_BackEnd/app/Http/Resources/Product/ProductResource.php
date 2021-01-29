<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Product;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $sales = Product::find($this->id)->buy->count();
        return [
            'id'          => $this->id,
            'image'       => $this->image,
            'name'        => $this->name,
            'cost'        => number_format($this->cost , 2 ,',','.'),
            'description' => $this->description,
            'sales'       => $sales,
        ];
    }
}
