<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContinentalFederationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('continental_federations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('full_name')->nullable();
            $table->string('foundation')->nullable();
            $table->string('continent')->nullable();
            $table->text('details_history')->nullable();
            $table->string('flag')->nullable();
            $table->string('slug');
            $table->unsignedBigInteger('world_federation_id')->nullable();
            $table->foreign('world_federation_id')->references('id')->on('world_federations');
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
        Schema::dropIfExists('continental_federations');
    }
}
