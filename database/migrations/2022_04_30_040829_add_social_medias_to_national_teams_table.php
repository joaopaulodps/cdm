<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSocialMediasToNationalTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Schema::table('national_teams', function (Blueprint $table) {
            $table->unsignedBigInteger('social_media_id')->nullable();
            $table->foreign('social_media_id')->references('id')->on('social_medias');
        }); */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('national_teams', function (Blueprint $table) {
            //
        });
    }
}
