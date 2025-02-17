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
        Schema::create('chunk_pdfs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id'); // Foreign Key
            $table->unsignedBigInteger('settings_id'); // Foreign Key
            $table->string('collection_name'); // Foreign Key
            $table->string('collection_id'); // Foreign Key
            $table->string('current_page',5);
            $table->string('total_page',5);
            $table->string('page',20)->default(0);
            $table->text('uploadRequest')->nullable();
            $table->longText('pdfRequest')->nullable();
            $table->foreign('shop_id')->references('id')->on('users')->onDelete('cascade'); // Assuming 'shops' is the related table.
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
        Schema::dropIfExists('chunk_pdfs');
    }
};
