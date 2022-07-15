<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\NationTitle;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index($continent)
    {
        if($continent === "all"){
            $country = Country::all();
            if(sizeof($country)==0){
                
                return response()->json(['msg' => 'Nenhum País Encontrado', 'status' => 'success']); 
                
            }else{
                
                return response([$country, 'status' => 'success']);
                
            }
        }
        else{
            $country = Country::where('continent', '=', $continent)->get();
            
            if(sizeof($country)==0){
                
                return response()->json(['msg' => 'Nenhum País Encontrado', 'status' => 'success']); 
                
            }else{
                
                return response([$country, 'status' => 'success']);
                
            }
        }
    }

    public function indexCountry($country)
    {
        $countr = Country::where('slug', '=', $country)->get();
        foreach ($countr as $cl) {
            $logo = $cl->flag;
        }

        if(sizeof($countr)==0){
                
            return response()->json(['msg' => 'Nenhum País Encontrado', 'status' => 'success']); 

        }else{
                 
            return response()->json([$countr, $logo, 'status'=>'success']);

        }
    }

    public function indexTitles($country)
    {
        $teamId = Country::where('slug', '=', $country)->get('id');
        foreach ($teamId as $tId) {
            $tid = $tId->id;
        }
        $teams = NationTitle::where('nation_id', '=', $tid)->with('trophy')->get();
        

        if(sizeof($teams)==0){
                
            return response()->json(['msg' => 'Nenhum Título Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$teams, 'status' => 'success']);

        }
    }
}
