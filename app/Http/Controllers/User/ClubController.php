<?php

namespace App\Http\Controllers\User;

use App\Models\Team;
use App\Models\Country;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index($country)
    {
        $teamId = Country::where('iso', '=', $country)->get('id');
        foreach ($teamId as $tId) {
            $tid = $tId->id;
        }
        $teams = Team::where('country_id', '=', $tid)->get();

        if(sizeof($teams)==0){
                
            return response()->json(['msg' => 'Nenhum Time Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$teams, 'status' => 'success']);

        }
    }
}
