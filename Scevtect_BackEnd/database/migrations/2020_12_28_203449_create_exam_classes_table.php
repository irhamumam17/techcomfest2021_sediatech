<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exam_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id');
            $table->foreignId('class_id');
            $table->timestamps();

            $table->foreign('exam_id')->references('id')->on('exams')->onDelete('cascade');
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
        Schema::table('exam_classes' , function(Blueprint $table) {
            $table->dropForeign(['exam_id' , 'class_id']);
        });
        Schema::dropIfExists('exam_classes');
    }
}
