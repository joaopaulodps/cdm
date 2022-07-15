<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNationalTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('national_teams', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('full_name')->nullable();
            $table->string('federation_name')->nullable();
            $table->string('foundation')->nullable();
            $table->string('stadium')->nullable();
            $table->text('details_history')->nullable();
            $table->unsignedBigInteger('country_id')->nullable();
            $table->foreign('country_id')->references('id')->on('countries');
            $table->string('world_federation_affiliation');
            $table->unsignedBigInteger('world_federation')->nullable();
            $table->foreign('world_federation')->references('id')->on('world_federations');
            $table->string('world_affiliation_date')->nullable();
            $table->string('continental_federation_affiliation');
            $table->unsignedBigInteger('continental_federation')->nullable();
            $table->foreign('continental_federation')->references('id')->on('continental_federations');
            $table->string('continental_affiliation_date')->nullable();
            $table->unsignedBigInteger('trophies')->nullable();
            $table->foreign('trophies')->references('id')->on('national_team_trophies');
            $table->string('flag')->nullable();
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
        Schema::dropIfExists('national_teams');
    }
}
