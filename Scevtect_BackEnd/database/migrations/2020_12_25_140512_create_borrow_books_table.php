<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBorrowBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('borrow_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id');
            $table->foreignId('library_id');
            $table->foreignId('book_id');
            $table->timestamp('start_time');
            $table->timestamp('finish_time')->nullable();
            $table->enum('status' , ['borrow' , 'return' , 'lost'])->default('borrow');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreign('library_id')->references('id')->on('libraries')->onDelete('cascade');
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('borrow_books' , function(Blueprint $table) {
            $table->dropForeign(['student_id' , 'library_id' , 'book_id']);
        });*/
        Schema::dropIfExists('borrow_books');
    }
}
