<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_id');
            $table->string('title');
            $table->string('code');
            $table->string('publisher');
            $table->integer('total');
            $table->string('image')->default('book.jpg');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('library_id')->references('id')->on('libraries')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('books' , function(Blueprint $table) {
            $table->dropForeign(['library_id']);
        });
        Schema::dropIfExists('books');
    }
}
