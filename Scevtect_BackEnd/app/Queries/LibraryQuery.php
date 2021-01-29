<?php 
namespace App\Queries;

use App\Http\Resources\Library\BorrowResource;

class LibraryQuery
{
    public static function getBorrows($data)
    {
        return BorrowResource::collection($data);
    }
}
