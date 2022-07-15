<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;

class ImageSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $image1 = new Image;
        $image1->url = 'https://www.imagemhost.com.br/images/2022/04/19/pw.png';
        $image1->alternative_text = 'Bandeira de Palau';
        $image1->save();

        $image2 = new Image;
        $image2->url = 'https://www.imagemhost.com.br/images/2022/04/19/monaco.png';
        $image2->alternative_text = 'Bandeira de Mônaco';
        $image2->save();
    }
}
