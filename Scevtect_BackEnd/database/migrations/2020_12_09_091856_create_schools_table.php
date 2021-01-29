<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('level_id');
            $table->string('address')->nullable();
            $table->string('headmaster')->nullable();
            $table->string('phone')->nullable();
            $table->string('hp')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('level_id')->references('id')->on('level_schools')->onDelete('cascade');
                
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('schools' , function(Blueprint $table) {
            $table->dropForeign(['user_id' , 'level_id']);
        }); 
        Schema::dropIfExists('schools');
    }
}
