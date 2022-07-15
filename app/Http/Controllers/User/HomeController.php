<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\SinglePost;
use App\Models\Team;
use Illuminate\Http\Request;
class HomeController extends Controller
{
    public function indexCountries()
    {
        $country = Country::where('top_country', '=', 's')->get();

        if(sizeof($country)==0){
                
            return response()->json(['msg' => 'Nenhum País Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$country, 'status' => 'success']);

        }
    }

    public function indexPosts()
    {
        $post = SinglePost::orderBy('created_at', 'desc')->take(10)->get();

        if(sizeof($post)==0){
                
            return response()->json(['msg' => 'Nenhum Post Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$post, 'status' => 'success']);

        }
    }

    public function indexClubs()
    {
        $clubs = Team::orderBy('created_at', 'desc')->take(10)->get();

        if(sizeof($clubs)==0){
                
            return response()->json(['msg' => 'Nenhum Clube Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$club, 'status' => 'success']);

        }
    }
}
