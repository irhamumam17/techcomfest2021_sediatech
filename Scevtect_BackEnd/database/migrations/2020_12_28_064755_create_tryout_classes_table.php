<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTryoutClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tryout_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tryout_id');
            $table->foreignId('class_id');
            $table->timestamps();

            $table->foreign('tryout_id')->references('id')->on('tryouts')->onDelete('cascade');
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
        Schema::table('tryout_classes' , function(Blueprint $table) {
            $table->dropForeign(['tryout_id' , 'class_id']);
        });
        Schema::dropIfExists('tryout_classes');
    }
}
