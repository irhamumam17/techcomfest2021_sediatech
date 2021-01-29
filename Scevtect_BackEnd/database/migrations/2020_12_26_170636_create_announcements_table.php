<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnouncementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->foreignId('user_id');
            $table->string('title');
            $table->string('description');
            $table->enum('status' , ['public' , 'teacher' , 'student' , 'some_class']);
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
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
        Schema::table('announcements' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'user_id']);
        });
        Schema::dropIfExists('announcements');
    }
}
