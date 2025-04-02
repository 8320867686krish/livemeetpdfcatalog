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
        Schema::create('get_products_by_collections', function (Blueprint $table) {
            $table->id();
            $table->string('collection_id')->nullable();
            $table->string('end_cursor')->nullable();
            $table->unsignedBigInteger('shop_id'); // Foreign Key
            $table->foreign('shop_id')->references('id')->on('users')->onDelete('cascade'); // Assuming 'shops' is the related table.
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
        Schema::dropIfExists('get_products_by_collections');
    }
};
