<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id');
            $table->foreignId('user_id');
            $table->text('description');
            $table->tinyInteger('stars');
            $table->timestamps();

            $table->foreign('payment_id')->references('id')->on('product_buyers')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('product_reviews' , function(Blueprint $table) {
            $table->dropForeign(['payment_id' , 'user_id']);
        });
        Schema::dropIfExists('product_reviews');
    }
}
