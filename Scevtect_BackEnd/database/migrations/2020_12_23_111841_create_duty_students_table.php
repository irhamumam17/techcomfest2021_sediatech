<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDutyStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duty_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('duty_id');
            $table->foreignId('student_id');
            $table->timestamp('read_at')->nullable();
            $table->timestamp('response_at')->nullable();
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
        /*Schema::table('duty_students' , function(Blueprint $table) {
            $table->dropForeign(['duty_id' , 'student_id']);
        });*/
        Schema::dropIfExists('duty_students');
    }
}
