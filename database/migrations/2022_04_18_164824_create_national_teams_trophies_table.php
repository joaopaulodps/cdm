<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNationalTeamsTrophiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('national_team_trophies', function (Blueprint $table) {
            $table->id();
            $table->string('competition')->nullable();
            $table->string('name')->nullable();
            $table->string('level')->nullable();
            $table->text('details_history')->nullable();
            $table->unsignedBigInteger('continental_federation_id')->nullable();
            $table->foreign('continental_federation_id')->references('id')->on('continental_federations');
            $table->unsignedBigInteger('world_federation_id')->nullable();
            $table->foreign('world_federation_id')->references('id')->on('world_federations');
            $table->string('image')->nullable();
            $table->string('slug');
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
        Schema::dropIfExists('national_team_trophies');
    }
}
