<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Image;

class ImageController extends Controller
{
    public function index(){
        $image = Image::all();
        
        if(sizeof($image)==0){
                
            return response()->json(['msg' => 'Nenhuma Imagem Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$image, 'status' => 'success']);

        }
    }

    public function store(){

    }

    public function edit(){

    }

    public function update(){

    }

    public function delete(){

    }
}
