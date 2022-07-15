<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRegionalFederationFieldToTeamTrophiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('team_trophies', function (Blueprint $table) {
            $table->unsignedBigInteger('regional_federation_id')->nullable();
            $table->foreign('regional_federation_id')->references('id')->on('regional_federations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('team_trophies', function (Blueprint $table) {
            //
        });
    }
}
