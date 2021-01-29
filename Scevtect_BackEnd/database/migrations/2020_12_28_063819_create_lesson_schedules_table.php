<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lesson_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->foreignId('class_id');
            $table->enum('day' , ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' ,'Thursday' , 'Friday' , 'Saturday']);
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
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
        Schema::table('lesson_schedules' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'class_id']);
        });
        Schema::dropIfExists('lesson_schedules');
    }
}
