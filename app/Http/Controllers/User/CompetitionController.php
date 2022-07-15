<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\NationalTeamTrophy;
use App\Models\TeamTrophy;
use Illuminate\Http\Request;

class CompetitionController extends Controller
{
    public function index()
    {
        $nation = NationalTeamTrophy::all();
        $club = TeamTrophy::all();

        return response([$nation, $club, 'status' => 'success']);
    }

    public function indexTeam($name)
    {
        $teamTrophy = TeamTrophy::where('slug','=', $name)->get();
        if(sizeof($teamTrophy)>0){
            $teamTrophy;
        }

        else{
            $teamTrophy = NationalTeamTrophy::where('slug','=', $name)->get();                
        }
            
            return response([$teamTrophy, 'status' => 'success']);
            
        
    }
    public function indexNation($name)
    {
        $nationTrophy = NationalTeamTrophy::where('slug','=', $name)->get();

        if(sizeof($nationTrophy)==0){
                
            return response()->json(['msg' => 'Competição Não Encontrada', 'status' => 'success']); 
            
        }else{
            
            return response([$nationTrophy, 'status' => 'success']);
            
        }
    }
}
