<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NationalTeam;
use App\Models\Country;
use Illuminate\Http\Request;

class NationalTeamController extends Controller
{
    public function index($country_id)
    {
        $team = NationalTeam::where('country_id', '=', $country_id)->get();
        if (sizeof($team)==0) {

            return response()->json(['msg' => 'Seleção não encontrada!', 'status' => 'success']);
        } else {

            return response(['team' => $team, 'status' => 'success']);
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'country_id' => 'required',
        ]); 

        $team = new NationalTeam;
        $team->fill($request->all());

        if($team->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Seleção!', 'status' => 'error']); 

        }
    }
    public function edit($team_id)
    {
        $team_edit=NationalTeam::find($team_id);
        return response([$team_edit,'status' => 'success']);
    }
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name' => 'required',
            'country_id' => 'required',
            
         ]);
             
        $team_edit=NationalTeam::find($request->id);
        $team_edit->fill($request->all());
         $team_edit->update();
 
         return response()->json(['msg' => 'Seleção atualizada com sucesso!', 'status' => 'success']);           
    }

    public function delete($team_id)
    {
        $team = NationalTeam::find($team_id);
        $team->delete();            
       
        return response()->json(['msg' => 'Seleção deletada com sucesso', 'status' => 'success']);
    }
}
