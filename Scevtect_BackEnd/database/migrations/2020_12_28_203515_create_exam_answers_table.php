<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id');
            $table->string('answer');
            $table->enum('correct' , ['true' , 'false']);
            $table->timestamps();

            $table->foreign('question_id')->references('id')->on('exam_questions')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('exam_answers' , function(Blueprint $table) {
            $table->dropForeign(['question_id']);
        });
        Schema::dropIfExists('exam_answers');
    }
}
