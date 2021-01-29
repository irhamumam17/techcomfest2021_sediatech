<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponseFeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('response_feedback', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id');
            $table->foreignId('teacher_id');
            $table->string('title');
            $table->string('description');
            $table->timestamps();

            $table->foreign('response_id')->references('id')->on('duty_responses')->onDelete('cascade');
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
        /*Schema::table('response_feedback' , function(Blueprint $table) {
            $table->dropForeign(['response_id' , 'teacher_id']);
        });*/
        Schema::dropIfExists('response_feedback');
    }
}
