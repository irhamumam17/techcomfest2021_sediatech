<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('school_id');
            $table->enum('status' , ['waiting' , 'confirmed'])->default('waiting');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('nip')->nullable();
            $table->timestamps();

            $table->foreign('role_id')->references('id')->on('role_teachers')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('teachers' , function(Blueprint $table) {
            $table->dropForeign(['role_id' , 'user_id' , 'school_id']);
        });*/
        Schema::dropIfExists('teachers');
    }
}
