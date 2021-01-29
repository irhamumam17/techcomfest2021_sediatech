<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_classes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('school_id');
            $table->unsignedBigInteger('grade_id');
            $table->unsignedBigInteger('sub_id')->nullable();
            $table->unsignedBigInteger('course_id')->nullable();
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
            $table->foreign('grade_id')->references('id')->on('class_grades')->onDelete('cascade');
            $table->foreign('sub_id')->references('id')->on('sub_classes')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('list_classes' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'grade_id' , 'sub_id' , 'course_id']);
        });
        Schema::dropIfExists('list_classes');
    }
}
