<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('school_id');
            $table->unsignedBigInteger('class_id');
            $table->enum('gender' ,['male' ,'female']);
            $table->integer('nis');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->enum('status' , ['waiting' , 'confirmed'])->default('waiting');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('list_classes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students' , function(Blueprint $table) {
            $table->dropForeign(['user_id' , 'school_id' , 'class_id']);
        });
        Schema::dropIfExists('students');
    }
}
