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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id'); // Foreign Key
            $table->boolean('enabled');
            $table->string('fontFamily');
            $table->string('fontColor',10);
            $table->string('backgroundColor',10);
            $table->string('logo')->nullable();
            $table->string('frontImage')->nullable();
            $table->string('backImage')->nullable();
            $table->string('headerText')->nullable();
            $table->longText('headerAlignment');
            $table->string('footerText')->nullable();
            $table->string('footerAlignment',10);
            $table->string('footerPageNoEnabled',1);
            $table->string('footerDateEnabled',1);
            $table->string('footerDateFormat',20);
            $table->string('pdfLayout',20);
            $table->string('paperLayout',20);
            $table->string('productAttributes');
            $table->string('productButtonEnabled',1);

            $table->string('productAttributeAlignment',25);
            $table->string('productDescriptionCharLimit',5);
            $table->string('productAttributeLabelColor',10);
            $table->string('productAttributeValueColor',10);
            $table->string('productBackgroundColor',10);
            $table->string('priceAdjustment',20)->nullable();
            $table->decimal('productChangeInPercentage')->nullable();
            $table->decimal('productTaxPercentage')->nullable();
            $table->string('productPageLayoutId',100);
            $table->string('collectionId')->nullable();
            $table->boolean('isPdf')->default(0);
            $table->string('pdfUrl')->nullable();
            $table->string('collectionName');
            $table->string('flipId',20)->nullable();
            $table->longText('flipHtml')->nullable();
            $table->tinyInteger('isLarge')->default(0);
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
        Schema::dropIfExists('settings');
    }
};
