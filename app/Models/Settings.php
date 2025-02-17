<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;
    protected $fillable = [
        'shop_id',
        'fontFamily', 
        'fontColor',
        'backgroundColor',
        'logo',
        'frontImage',
        'backImage',
        'headerText',
        'headerAlignment',
        'footerText',
        'footerAlignment',
        'footerPageNoEnabled',
        'footerDateEnabled',
        'footerDateFormat',
        'pdfLayout',
        'paperLayout',
        'productAttributes',
        'productButtonEnabled',
        'productAttributeAlignment',
        'productDescriptionCharLimit',
        'productAttributeLabelColor',
        'productAttributeValueColor',
        'productBackgroundColor',
        'priceAdjustment',
        'productChangeInPercentage',
        'productTaxPercentage',
        'collectionId',
        'enabled',
        'isPdf',
        'pdfUrl',
        'collectionName',
        'productPageLayoutId',
        'flipHtml',
        'flipId',
        'isLarge'
    ];

    
    public function products()
    {
        return $this->hasMany(CollectionProducts::class);
    }
           
}
