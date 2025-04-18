<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChunkPdf extends Model
{
    use HasFactory;
    protected $fillable = [
        'shop_id',
        'settings_id', 
        'collection_name',
        'collection_id',
        'uploadRequest',
        'current_page',
        'total_page',
        'page',
        'pdfRequest',
        'chunkNumber'
    ];
}
