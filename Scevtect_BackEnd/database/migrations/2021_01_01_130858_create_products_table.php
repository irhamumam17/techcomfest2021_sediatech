<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id');
            $table->string('image')->default('product.jpg');
            $table->string('name');
            $table->integer('cost');
            $table->text('description');
            $table->float('stars' , 3 , 1);
            $table->timestamps();

            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products' , function(Blueprint $table) {
            $table->dropForeign(['store_id']);
        });
        Schema::dropIfExists('products');
    }
}
