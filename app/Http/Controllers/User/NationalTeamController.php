<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\NationalTeam;
use App\Models\Country;
use App\Models\WorldFederation;
use App\Models\ContinentalFederation;
use App\Models\NationTitle;
use App\Models\SocialMedia;
use Illuminate\Http\Request;

class NationalTeamController extends Controller
{
    public function index($country)
    {
        $teamId = Country::where('slug', '=', $country)->get('id');
        foreach ($teamId as $tId) {
            $tid = $tId->id;
        }
        $teams = NationalTeam::where('country_id', '=', $tid)->get();
        foreach ($teams as $team) {
            $worldTeam = $team->world_federation;
            $continentalTeam = $team->continental_federation;
            $nationId = $team->id;
            $logo = $team->flag;
        }
        $world = WorldFederation::where('id','=', $worldTeam)->first();
        $continent = ContinentalFederation::where('id','=', $continentalTeam)->first();
        $titles = NationTitle::where('nation_id', '=', $nationId)->with('trophy')->get();
        $social = SocialMedia::where('nation_id', '=', $nationId)->get();

        if(sizeof($teams)==0){
                
            return response()->json(['msg' => 'Nenhuma Seleção Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$teams, $world, $continent, $titles, $logo, $social, 'status' => 'success']);

        }
    }
}
