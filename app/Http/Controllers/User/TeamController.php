<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Country;
use App\Models\TeamTitle;
use App\Models\SocialMedia;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index($country)
    {
        $teamId = Country::where('slug', '=', $country)->get('id');
        foreach ($teamId as $tId) {
            $tid = $tId->id;
        }
        $teams = Team::where('country', '=', $tid)->get();

        if(sizeof($teams)==0){
                
            return response()->json(['msg' => 'Nenhum Time Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$teams, 'status' => 'success']);

        }
    }

    public function indexTeam($team)
    {

        $team = Team::where('slug', '=', $team)->with('regional')->get();
        foreach ($team as $tId) {
            $tid = $tId->id;
        }
        $titles = TeamTitle::where('team_id', '=', $tid)->with('trophy')->get();
        $social = SocialMedia::where('team_id', '=', $tid)->get();

        if(sizeof($team)==0){
                
            return response()->json(['msg' => 'Nenhum Time Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$team, $titles, $social, 'status' => 'success']);

        }
    }

}
