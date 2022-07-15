<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    public function index()
    {
        $about = About::all()->first();
        $social = About::where('title', '=', 'rede social')->get();

        if(!$about){
                
            return response()->json(['msg' => 'Nenhum Texto Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$about, $social, 'status' => 'success']);

        }
    }
}