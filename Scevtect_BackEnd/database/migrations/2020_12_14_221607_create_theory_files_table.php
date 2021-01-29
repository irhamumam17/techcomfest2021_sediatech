<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTheoryFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('theory_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('theory_id');
            $table->enum('type' , ['thumbnail' , 'document' , 'embed']);
            $table->string('value');
            $table->string('extension');
            $table->integer('size');
            $table->timestamps();

            $table->foreign('theory_id')->references('id')->on('theories')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('theory_files' , function(Blueprint $table) {
            $table->dropForeign(['theory_id']);
        });
        Schema::dropIfExists('theory_files');
    }
}
