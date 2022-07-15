<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WorldFederation;

class WorldFederationSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $federation1 = new WorldFederation;
        $federation1->name = 'FIFA';
        $federation1->full_name = 'Federação Internacional de Futebol';
        $federation1->foundation = '1904-05-21';
        $federation1->head_office = 'Zurique, Suiça';
        $federation1->details_history = 'É a entidade que organiza o futebol mundial';
        $federation1->slug = 'fifa';
        $federation1->save();
    }
}
