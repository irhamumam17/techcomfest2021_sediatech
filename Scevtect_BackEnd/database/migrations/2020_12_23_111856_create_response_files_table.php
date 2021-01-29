<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponseFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('response_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id');
            $table->string('name');
            $table->integer('size');
            $table->string('extension');
            $table->timestamps();

            $table->foreign('response_id')->references('id')->on('duty_responses')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('response_files' , function(Blueprint $table) {
            $table->dropForeign(['response_id']);
        });
        Schema::dropIfExists('response_files');
    }
}
