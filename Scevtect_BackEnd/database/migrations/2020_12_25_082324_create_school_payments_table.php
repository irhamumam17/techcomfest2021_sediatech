<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->foreignId('class_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->integer('value');
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
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
        Schema::table('school_payments' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'class_id']);
        });
        Schema::dropIfExists('school_payments');
    }
}
