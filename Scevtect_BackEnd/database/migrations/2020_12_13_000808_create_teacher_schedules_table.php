<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeacherSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teacher_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('school_id');
            $table->integer('day');
            $table->integer('month');
            $table->integer('year');
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('teacher_schedules' , function(Blueprint $table) {
            $table->dropForeign(['school_id']);
        });*/
        Schema::dropIfExists('teacher_schedules');
    }
}
