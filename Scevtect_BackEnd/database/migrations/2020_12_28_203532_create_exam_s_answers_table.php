<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamSAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_s_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('result_id');
            $table->foreignId('question_id');
            $table->foreignId('answer_id');
            $table->enum('correct' , ['true' , 'false'])->default('false');
            $table->timestamps();

            $table->foreign('result_id')->references('id')->on('exam_results')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('exam_questions')->onDelete('cascade');
            $table->foreign('answer_id')->references('id')->on('exam_answers')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('exam_s_answers' , function(Blueprint $table) {
            $table->dropForeign(['result_id' , 'question_id' , 'answer_id']);
        });
        Schema::dropIfExists('exam_s_answers');
    }
}
