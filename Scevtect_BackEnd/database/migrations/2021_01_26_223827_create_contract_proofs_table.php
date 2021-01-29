<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractProofsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_proofs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id');
            $table->string('proof');
            $table->enum('status' , ['waiting' , 'reject' , 'confirmed']);
            $table->timestamps();

            $table->foreign('contract_id')->references('id')->on('contract_payments')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contract_proofs' , function(Blueprint $table) {
            $table->dropForeign(['contract_id']);
        });
        Schema::dropIfExists('contract_proofs');
    }
}
