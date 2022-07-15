<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNationsTitlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nation_titles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nation_id');
            $table->unsignedBigInteger('trophy_id');
            $table->string('seasons')->nullable();
            $table->foreign('nation_id')->references('id')->on('national_teams');
            $table->foreign('trophy_id')->references('id')->on('national_team_trophies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nation_titles');
    }
}
