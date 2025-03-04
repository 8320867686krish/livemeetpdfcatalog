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
        'isLarge',
        'utm_source',
        'exclude_out_of_stock',
        'exclude_not_avaliable',
        'redirect_button',
        'catalog_name',
        'sort_by'
    ];
    protected $attributes = [
        'enabled' =>1,
        "fontFamily" => "Roboto Condensed",
        "fontColor" => "#000000",
        "backgroundColor" => "#FFFFFF",
        "headerAlignment" => "center",
        "footerAlignment" => "left",
        "footerPageNoEnabled" => "0",
        "footerDateEnabled" => "0",
        "footerDateFormat" => "dd/MM/yy",
        "pdfLayout" => "portrait",
        "paperLayout" => "a4",
        "productAttributes" => "name,price",
        "productButtonEnabled" => "0",
        "productAttributeAlignment" => "center",
        "productDescriptionCharLimit" => "50",
        "productAttributeLabelColor" => "#000000",
        "productAttributeValueColor" => "#000000",
        "productBackgroundColor" => "#FFFFFF",
        'productPageLayoutId' =>'sixItemGrid'
    ];
    
    public function products()
    {
        return $this->hasMany(CollectionProducts::class);
    }
           
}
