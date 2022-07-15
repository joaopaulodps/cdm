<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('full_name')->nullable();
            $table->string('foundation')->nullable();
            $table->string('stadium')->nullable();
            $table->string('city')->nullable();
            $table->text('details_history')->nullable();
            $table->string('flag')->nullable();
            $table->string('slug');
            $table->unsignedBigInteger('regional_federation')->nullable();
            $table->foreign('regional_federation')->references('id')->on('regional_federations');
            $table->unsignedBigInteger('country')->nullable();
            $table->foreign('country')->references('id')->on('countries');
            $table->unsignedBigInteger('trophies')->nullable();
            $table->foreign('trophies')->references('id')->on('team_trophies');
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
        Schema::dropIfExists('teams');
    }
}
