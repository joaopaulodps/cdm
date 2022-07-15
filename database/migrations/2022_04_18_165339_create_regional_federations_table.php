<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegionalFederationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regional_federations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('full_name')->nullable();
            $table->string('foundation')->nullable();
            $table->string('state')->nullable();
            $table->text('details_history')->nullable();
            $table->string('flag')->nullable();
            $table->string('slug');
            $table->unsignedBigInteger('country_id')->nullable();
            $table->foreign('country_id')->references('id')->on('countries');
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
        Schema::dropIfExists('regional_federations');
    }
}
