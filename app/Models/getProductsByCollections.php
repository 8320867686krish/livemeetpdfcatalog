<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class getProductsByCollections extends Model
{
    use HasFactory;
    protected $fillable = [
        'shop_id',
        'collection_id',
        'end_cursor'
    ];
}
