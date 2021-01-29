<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDutiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id');
            $table->foreignId('subject_id');
            $table->string('thumbnail')->default('duty.jpg');
            $table->timestamp('deadline');
            $table->string('title');
            $table->string('description');
            $table->enum('status' , ['draft' , 'waiting' , 'complete' , 'archive']);
            $table->timestamps();

            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('duties' , function(Blueprint $table) {
            $table->dropForeign(['teacher_id' , 'subject_id']);
        });*/
        Schema::dropIfExists('duties');
    }
}
