<?php

namespace Database\Seeders;

use App\Models\ContinentalFederation;
use Illuminate\Database\Seeder;

class ContinentalFederationSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $continent1 = new ContinentalFederation;
        $continent1->name = 'CONMEBOL';
        $continent1->foundation = '09/07/1906';
        $continent1->continent = 'América do Sul';
        $continent1->details_history = 'Confederação responsável pelo futebol da América do Sul. Seus membros (países) filiados são: Argentina, Bolívia, Brasil, Chile, Colômbia, Equador, Peru, Uruguai e Venezuela.';
        $continent1->world_federation_id = '1';
        $continent1->slug = 'conmebol';
        $continent1->save();
        
        $continent2 = new ContinentalFederation;
        $continent2->name = 'UEFA';
        $continent2->foundation = '15/06/1954';
        $continent2->continent = 'Europa';
        $continent2->details_history = 'Confederação responsável pelo futebol da Europa';
        $continent2->world_federation_id = '1';
        $continent2->slug = 'uefa';
        $continent2->save();

        $continent3 = new ContinentalFederation;
        $continent3->name = 'CONCACAF';
        $continent3->foundation = '1961';
        $continent3->continent = 'Amperica do Norte, Central e Caribe';
        $continent3->details_history = 'Confederação responsável pelo futebol da América do Norte, Central e Caribe';
        $continent3->world_federation_id = '1';
        $continent3->slug = 'concacaf';
        $continent3->save();

        $continent4 = new ContinentalFederation;
        $continent4->name = 'AFC';
        $continent4->foundation = '08/05/1954';
        $continent4->continent = 'Ásia';
        $continent4->details_history = 'Confederação responsável pelo futebol da Ásia';
        $continent4->world_federation_id = '1';
        $continent4->slug = 'afc';
        $continent4->save();

        $continent5 = new ContinentalFederation;
        $continent5->name = 'CAF';
        $continent5->foundation = '10/02/1957';
        $continent5->continent = 'África';
        $continent5->details_history = 'Confederação responsável pelo futebol da África';
        $continent5->world_federation_id = '1';
        $continent5->slug = 'caf';
        $continent5->save();

        $continent6 = new ContinentalFederation;
        $continent6->name = 'OFC';
        $continent6->foundation = '1966';
        $continent6->continent = 'Oceania';
        $continent6->details_history = 'Confederação responsável pelo futebol da Oceania';
        $continent6->world_federation_id = '1';
        $continent6->slug = 'ofc';
        $continent6->save();
    }
}
