<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTheoryStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('theory_students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('theory_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->foreign('theory_id')->references('id')->on('theories')->onDelete('cascade');
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
        Schema::table('theory_students' , function(Blueprint $table) {
            $table->dropForeign(['theory_id' , 'student_id']);
        });
        Schema::dropIfExists('theory_students');
    }
}
