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
        Schema::table('plans', function (Blueprint $table) {
            $table->string('catelog_limit',10); 
            $table->string('catelog_page_limit',10);
            $table->string('catelog_product_limit',10);
            $table->string('layout_limit',10);
            $table->string('font_limit',10);
            $table->string('barcode',10);
            $table->string('isAddFrontBack',10); 
            $table->boolean('isFree'); 

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plans', function (Blueprint $table) {
            //
        });
    }
};
