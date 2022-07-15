<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = new Role;
        $role1->name = 'dev';
        $role1->description = 'Desenvolvedor';
        $role1->save();

        $role2 = new Role;
        $role2->name = 'cdm admin';
        $role2->description = 'Administrador';
        $role2->save();

        $role3 = new Role;
        $role3->name = 'cdm auxiliar';
        $role3->description = 'Auxiliar';
        $role3->save();

    }
}
