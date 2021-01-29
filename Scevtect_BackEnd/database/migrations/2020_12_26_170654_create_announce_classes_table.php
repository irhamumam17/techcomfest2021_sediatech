<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnounceClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announce_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('announce_id');
            $table->foreignId('class_id');
            $table->timestamps();

            $table->foreign('announce_id')->references('id')->on('announcements')->onDelete('cascade');
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
        /*Schema::table('announce_classes' , function(Blueprint $table) {
            $table->dropForeign(['announce_id' , 'class_id']);
        });*/
        Schema::dropIfExists('announce_classes');
    }
}
