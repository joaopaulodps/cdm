<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('federal_capital');
            $table->string('population')->nullable();
            $table->string('continent')->nullable();
            $table->string('coin')->nullable();
            $table->string('official_language')->nullable();
            $table->string('iso')->nullable();
            $table->text('details_history')->nullable();
            $table->string('flag')->nullable();
            $table->string('slug');
            $table->unsignedBigInteger('continent_id')->nullable();
            $table->foreign('continent_id')->references('id')->on('continental_federations');
            $table->string('top_country')->nullable();
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
        Schema::dropIfExists('countries');
    }
}
