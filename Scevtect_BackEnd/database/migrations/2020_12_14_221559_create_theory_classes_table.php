<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTheoryClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('theory_classes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('theory_id');
            $table->unsignedBigInteger('class_id');
            $table->timestamps();

            $table->foreign('theory_id')->references('id')->on('theories')->onDelete('cascade');
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
        Schema::table('theory_classes' , function(Blueprint $table) {
            $table->dropForeign(['theory_id' , 'class_id']);
        });
        Schema::dropIfExists('theory_classes');
    }
}
