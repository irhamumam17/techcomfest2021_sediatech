<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWalletTopupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallet_topups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id');
            $table->string('invoice_number');
            $table->string('card_number');
            $table->string('name');
            $table->string('bank');
            $table->integer('value');
            $table->enum('status' , ['confirmed' , 'waiting' , 'failed'])->default('waiting');
            $table->string('proof');
            $table->timestamps();

            $table->foreign('wallet_id')->references('id')->on('e_wallets')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('wallet_topups' , function(Blueprint $table) {
            $table->dropForeign(['wallet_id']);
        });
        Schema::dropIfExists('wallet_topups');
    }
}
