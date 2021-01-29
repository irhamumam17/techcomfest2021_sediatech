<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->string('image');
            $table->string('name');
            $table->string('location');
            $table->timestamp('date')->nullable();
            $table->text('description');
            $table->enum('status' , ['public' , 'school']);
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events' , function(Blueprint $table) {
            $table->dropForeign(['school_id']);
        } );
        Schema::dropIfExists('events');
    }
}
