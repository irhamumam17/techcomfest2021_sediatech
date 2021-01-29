<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeacherAbsentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teacher_absents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('schedule_id');
            $table->unsignedBigInteger('teacher_id');
            $table->enum('status' , ['already' , 'not yet'])->default('not yet');
            $table->timestamps();

            $table->foreign('schedule_id')->references('id')->on('teacher_schedules')->onDelete('cascade');
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
        Schema::table('teacher_absents' , function(Blueprint $table) {
            $table->dropForeign(['schedule_id' , 'teacher_id']);
        });
        Schema::dropIfExists('teacher_absents');
    }
}
