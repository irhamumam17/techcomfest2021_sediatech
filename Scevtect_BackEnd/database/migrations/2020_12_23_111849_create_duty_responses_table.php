<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDutyResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duty_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('duty_id');
            $table->foreignId('student_id');
            $table->string('title');
            $table->string('description');
            $table->timestamp('read_at')->nullable();
            $table->timestamp('response_at')->nullable();
            $table->tinyInteger('skor')->nullable();
            $table->enum('status' , ['tuntas' , 'remidi'])->nullable();
            $table->timestamps();

            $table->foreign('duty_id')->references('id')->on('duties')->onDelete('cascade');
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
        /*Schema::table('duty_responses' , function(Blueprint $table) {
            $table->dropForeign(['duty_id' , 'student_id']);
        });*/
        Schema::dropIfExists('duty_responses');
    }
}
