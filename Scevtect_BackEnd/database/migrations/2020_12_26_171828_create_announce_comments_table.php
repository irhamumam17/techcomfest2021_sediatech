<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnounceCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announce_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('announce_id');
            $table->text('comment');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('announce_id')->references('id')->on('announcements')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('announce_comments' , function(Blueprint $table) {
            $table->dropForeign(['user_id' , 'announce_id']);
        });*/
        Schema::dropIfExists('announce_comments');
    }
}
