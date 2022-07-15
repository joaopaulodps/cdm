<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\WorldFederation;
use App\Models\ContinentalFederation;
use App\Models\RegionalFederation;
use Illuminate\Http\Request;

class FederationController extends Controller
{
    public function index()
    {
        $world = WorldFederation::all();
        $continental = ContinentalFederation::all();
        $regional = RegionalFederation::all();

            return response([$world, $continental, $regional, 'status' => 'success']);

    }

    public function indexContinental($fed)
    {
        $federation = WorldFederation::where('name', '=', $fed)->get();
        if(sizeof($federation)>0){
            $federation;
            $fname = $federation[0]->name;
        }
        if(sizeof($federation)===0){
            $federation = ContinentalFederation::where('name', '=', $fed)->get();
            $fname = $federation[0]->name;
        }
        if(sizeof($federation)===0){
            $federation = RegionalFederation::where('name', '=', $fed)->get();
            $fname = $federation[0]->name;
        }

            return response([$federation, $fname, 'status' => 'success']);

    }
}
