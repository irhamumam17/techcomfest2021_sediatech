<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAbsentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_absents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('schedule_id');
            $table->unsignedBigInteger('student_id');
            $table->enum('status' , ['already' , 'not yet'])->default('not yet');
            $table->timestamps();

            $table->foreign('schedule_id')->references('id')->on('student_schedules')->onDelete('cascade');
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
        Schema::table('student_absents' , function(Blueprint $table) {
            $table->dropForeign(['schedule_id' , 'student_id']);
        });
        Schema::dropIfExists('student_absents');
    }
}
