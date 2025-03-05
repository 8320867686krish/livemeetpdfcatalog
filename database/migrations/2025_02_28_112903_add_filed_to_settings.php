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
        Schema::table('settings', function (Blueprint $table) {
            //
            $table->string('utm_source')->nullable();
            $table->string('catalog_name')->nullable();
            $table->string('sort_by',20)->nullable();
            $table->tinyInteger('exclude_out_of_stock')->default(0);
            $table->tinyInteger('exclude_not_avaliable')->default(0);
            $table->string('redirect_button',2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('settings', function (Blueprint $table) {
            //
        });
    }
};
