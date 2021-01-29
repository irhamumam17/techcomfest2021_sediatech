<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolStatisticDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_statistic_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id');
            $table->foreignId('statistic_id');
            $table->timestamps();

            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
            $table->foreign('statistic_id')->references('id')->on('school_statistics')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('school_statistic_data' , function(Blueprint $table) {
            $table->dropForeign(['school_id' , 'statistic_id']);
        });*/
        Schema::dropIfExists('school_statistic_data');
    }
}
