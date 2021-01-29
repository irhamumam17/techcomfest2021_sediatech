<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScholarshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id');
            $table->string('cover')->default('scholarship.jpg');
            $table->string('title');
            $table->timestamp('deadline');
            $table->integer('limit');
            $table->string('institution');
            $table->text('description');
            $table->timestamps();

            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scholarships' , function(Blueprint $table) {
            $table->dropForeign(['admin_id']);
        });
        Schema::dropIfExists('scholarships');
    }
}
