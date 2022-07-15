<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $date = date('Y/m/d H:i:s');

        $user1 = new User;
        $user1->name = 'Desenvolvedor';
        $user1->email = 'dev@teste.com';
        $user1->nickname = 'devcdm';
        $user1->password = Hash::make('devcdm2022');
        $user1->email_verified_at=$date;
        $user1->save();

        $user2 = new User;
        $user2->name = 'CdM Admin';
        $user2->email = 'admin@teste.com';
        $user2->nickname = 'admincdm';
        $user2->password = Hash::make('admincdm2022');
        $user2->email_verified_at=$date;
        $user2->save();
        
        $user3 = new User;
        $user3->name = 'CdM Admin';
        $user3->email = 'auxiliar@teste.com';
        $user3->nickname = 'auxcdm';
        $user3->password = Hash::make('auxiliarcdm2022');
        $user3->email_verified_at=$date;
        $user3->save();

        $user1->roles()->attach(1);
        $user2->roles()->attach(2);
        $user3->roles()->attach(3);
    }
}
