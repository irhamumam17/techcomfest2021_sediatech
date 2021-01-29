<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('market_id');
            $table->foreignId('student_id');
            $table->string('name');
            $table->string('image')->default('store.jpg');
            $table->timestamps();

            $table->foreign('market_id')->references('id')->on('markets')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stores' , function(Blueprint $table) {
            $table->dropForeign(['market_id' , 'student_id']);
        });
        Schema::dropIfExists('stores');
    }
}
