<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnounceTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announce_teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('announce_id');
            $table->foreignId('teacher_id');
            $table->timestamps();

            $table->foreign('announce_id')->references('id')->on('announcements')->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('annouce_teachers' , function(Blueprint $table) {
            $table->dropForeign(['announce_id' , 'teacher_id']);
        });*/
        Schema::dropIfExists('announce_teachers');
    }
}
