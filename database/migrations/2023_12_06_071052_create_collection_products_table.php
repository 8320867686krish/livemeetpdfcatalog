<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id'); // Foreign Key
            $table->unsignedBigInteger('settings_id'); // Foreign Key
            $table->string('product_id'); 
            $table->string('title'); 
            $table->string('image')->nullable(); 
            $table->text('desc')->nullable(); 
            $table->string('sku')->nullable();
            $table->string('price',100)->nullable();
            $table->text('store_url')->nullable();
            $table->string('barcode')->nullable();
            $table->foreign('shop_id')->references('id')->on('users'); // Assuming 'shops' is the related table.
            $table->foreign('settings_id')->references('id')->on('settings')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collection_products');
    }
};
