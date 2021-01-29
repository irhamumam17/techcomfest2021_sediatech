<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEWalletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('e_wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('phone');
            $table->integer('saldo');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('e_wallets' , function(Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('e_wallets');
    }
}
