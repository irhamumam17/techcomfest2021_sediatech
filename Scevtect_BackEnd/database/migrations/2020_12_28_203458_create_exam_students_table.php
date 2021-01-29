<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id');
            $table->foreignId('student_id');
            $table->timestamp('start_time')->nullable();
            $table->timestamp('finish_time')->nullable();
            $table->integer('duration')->nullable();
            $table->timestamps();

            $table->foreign('exam_id')->references('id')->on('exams')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('exam_students' , function(Blueprint $table) {
            $table->dropForeign(['exam_id' , 'student_id']);
        });
        Schema::dropIfExists('exam_students');
    }
}
