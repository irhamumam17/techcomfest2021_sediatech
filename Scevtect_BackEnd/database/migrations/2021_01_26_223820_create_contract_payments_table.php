<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->foreignId('bank_id');
            $table->foreignId('package_id');
            $table->string('inv_number');
            $table->timestamp('inv_date')->nullable();
            $table->integer('tax');
            $table->integer('total');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('finish_date')->nullable();
            $table->enum('status' , ['unpaid' , 'waiting' , 'confirmed' , 'reject']);
            $table->timestamps();

            $table->foreign('bank_id')->references('id')->on('banks')->onDelete('cascade');
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
            $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('contract_payments' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'package_id']);
        });*/
        Schema::dropIfExists('contract_payments');
    }
}
