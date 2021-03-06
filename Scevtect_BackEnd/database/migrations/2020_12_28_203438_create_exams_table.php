<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->foreignId('teacher_id');
            $table->foreignId('subject_id');
            $table->string('title');
            $table->string('description');
            $table->timestamp('start_time')->nullable();
            $table->timestamp('finish_time')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
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
        Schema::table('exams' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'teacher_id' , 'subject_id']);
        });
        Schema::dropIfExists('exams');
    }
}
