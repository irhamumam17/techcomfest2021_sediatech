<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruiter_id');
            $table->string('position');
            $table->text('description');
            $table->timestamp('deadline');
            $table->enum('type_time' , ['full_time' , 'part_time'])->default('full_time');
            $table->enum('type_distance' , ['onsite' , 'remote']);
            $table->enum('target' , ['fresh_graduate' , 'experience'])->nullable();
            $table->integer('min_experience')->nullable();
            $table->enum('status' , ['waiting' , 'reject' , 'confirmed' , 'finish'])->default('waiting');
            $table->timestamps();

            $table->foreign('recruiter_id')->references('id')->on('recruiters')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('jobs' , function(Blueprint $table) {
            $table->dropForeign('reqruiter_id');
        });*/
        Schema::dropIfExists('jobs');
    }
}
