<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductBuyersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_buyers', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('day');
            $table->tinyInteger('month');
            $table->smallInteger('year');
            $table->foreignId('product_id');
            $table->foreignId('user_id');
            $table->integer('total_products');
            $table->integer('total_payments');
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
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
        Schema::table('product_buyers' , function(Blueprint $table) {
            $table->dropForeign(['product_id' , 'user_id']);
        });
        Schema::dropIfExists('product_buyers');
    }
}
