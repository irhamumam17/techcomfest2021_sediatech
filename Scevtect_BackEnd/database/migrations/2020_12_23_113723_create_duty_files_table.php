<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDutyFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duty_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('duty_id');
            $table->enum('type' , ['document' , 'thumbnail']);
            $table->string('value');
            $table->string('extension');
            $table->integer('size');
            $table->timestamps();

            $table->foreign('duty_id')->references('id')->on('duties')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('duty_files' , function(Blueprint $table) {
            $table->dropForeign(['duty_id']);
        });
        Schema::dropIfExists('duty_files');
    }
}
