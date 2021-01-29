<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaySubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('day_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_id');
            $table->foreignId('subject_id');
            $table->timestamps();

            $table->foreign('schedule_id')->references('id')->on('lesson_schedules')->onDelete('cascade');
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
        Schema::table('day_subjects' , function(Blueprint $table) {
            $table->dropForeign(['schedule_id', 'subject_id']);
        });
        Schema::dropIfExists('day_subjects');
    }
}
