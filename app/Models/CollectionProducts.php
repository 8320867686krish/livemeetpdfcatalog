<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionProducts extends Model
{
    use HasFactory;
    protected $fillable = [
        'shop_id',
        'settings_id', 
        'product_id',
        'title',
        'image',
        'desc',
        'price',
        'sku',
        'store_url',
        'barcode',
        'compareAtPrice',
        'priority',
        'isProductWithVariant'
    ];
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value ?: null;
    }
}
