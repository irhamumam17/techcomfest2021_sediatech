<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDutyClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duty_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('duty_id');
            $table->foreignId('class_id');
            $table->timestamps();

            $table->foreign('duty_id')->references('id')->on('duties')->onDelete('cascade');
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
        /*Schema::table('duty_classes' , function(Blueprint $table) {
            $table->dropForeign(['duty_id' , 'class_id']);
        });*/
        Schema::dropIfExists('duty_classes');
    }
}
