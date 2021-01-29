<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListSPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_s_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id');
            $table->integer('pay');
            $table->integer('changes');
            $table->integer('value');
            $table->timestamps();

            $table->foreign('payment_id')->references('id')->on('student_payments')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('list_s_payments' , function(Blueprint $table) {
            $table->dropForeign(['payment_id']);
        });
        Schema::dropIfExists('list_s_payments');
    }
}
