<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTryoutQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tryout_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tryout_id');
            $table->integer('number');
            $table->string('question');
            $table->integer('score');
            $table->timestamps();

            $table->foreign('tryout_id')->references('id')->on('tryouts')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tryout_questions' , function(Blueprint $table) {
            $table->dropForeign(['tryout_id']);
        });
        Schema::dropIfExists('tryout_questions');
    }
}
