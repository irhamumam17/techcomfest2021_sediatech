<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTryoutAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tryout_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id');
            $table->string('answer');
            $table->enum('correct' , ['true' , 'false']);
            $table->timestamps();

            $table->foreign('question_id')->references('id')->on('tryout_questions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tryout_answers' , function(Blueprint $table) {
            $table->dropForeign(['question_id']);
        });
        Schema::dropIfExists('tryout_answers');
    }
}
