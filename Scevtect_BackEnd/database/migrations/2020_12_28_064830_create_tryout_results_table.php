<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTryoutResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tryout_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tryout_id');
            $table->foreignId('student_id');
            $table->integer('score');
            $table->timestamps();

            $table->foreign('tryout_id')->references('id')->on('tryouts')->onDelete('cascade');
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
        Schema::table('tryout_results' , function(Blueprint $table) {
            $table->dropForeign(['tryout_id' , 'student_id']);
        });
        Schema::dropIfExists('tryout_results');
    }
}
