<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Imports\TeamsImport;
use Maatwebsite\Excel\Facades\Excel;

class TeamController extends Controller
{
    public function index($country_id)
    {
        $team = Team::where('country', '=', $country_id)->get();
        if (sizeof($team)==0) {

            return response()->json(['msg' => 'Nenhum Time Encontrado!', 'status' => 'success']);
        } else {

            return response([$team, 'status' => 'success']);
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'country' => 'required',
        ]); 

        $team = new Team;
        $team->fill($request->all());

        if($team->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Time!', 'status' => 'error']); 

        }
    }
    public function edit($team_id)
    {
        $team_edit=Team::find($team_id);
        return response([$team_edit,'status' => 'success']);
    }
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name' => 'required',
            'country' => 'required',
            
         ]);
             
        $team_edit=Team::find($request->id);
        $team_edit->fill($request->all());
        $team_edit->update();
 
         return response()->json(['msg' => 'Time atualizado com sucesso!', 'status' => 'success']);           
    }

    public function delete($team_id)
    {
        $team = Team::find($team_id);
        $team->delete();            
       
        return response()->json(['msg' => 'Time deletado com sucesso', 'status' => 'success']);
    }

    public function import(Request $request) 
    {
        Excel::import(new TeamsImport, $request->file('file')->store('temp'));
        return back(['msg' => 'Times importados com sucesso!', 'status' => 'success']);
    }
}
