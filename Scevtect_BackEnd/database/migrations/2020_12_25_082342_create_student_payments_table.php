<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id');
            $table->foreignId('student_id');
            $table->integer('insufficient');
            $table->integer('paid_off');
            $table->enum('status' , ['debt' , 'paid_off'])->default('debt');
            $table->timestamps();

            $table->foreign('payment_id')->references('id')->on('school_payments')->onDelete('cascade');
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
        Schema::table('student_payments' , function(Blueprint $table) {
            $table->dropForeign(['payment_id' , 'student_id']);
        });
        Schema::dropIfExists('student_payments');
    }
}
