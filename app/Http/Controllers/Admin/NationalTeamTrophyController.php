<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NationalTeamTrophy;
use Illuminate\Http\Request;

class NationalTeamTrophyController extends Controller
{
    public function index()
    {
        $trophy = NationalTeamTrophy::all();
        if (sizeof($trophy)==0) {

            return response()->json(['msg' => 'Nenhuma Competição Encontrada!', 'status' => 'success']);
        } else {

            return response([$trophy, 'status' => 'success']);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'competition' => 'required',
            'level' => 'required'
        ]); 

        $trophy = new NationalTeamTrophy;
        $trophy->fill($request->all());

        if($trophy->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Competição!', 'status' => 'error']); 

        }
    }

    public function edit($trophy_id)
    {
        $trophy_edit=NationalTeamTrophy::find($trophy_id);
        return response([$trophy_edit,'status' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'competition' => 'required',
            'level' => 'required'
        ]); 

        $trophy_edit=NationalTeamTrophy::find($request->id);
        $trophy_edit->fill($request->all());
        $trophy_edit->update();
 
         return response()->json(['msg' => 'Competição atualizada com sucesso!', 'status' => 'success']);
    }

    public function delete($trophy_id)
    {
        $trophy = NationalTeamTrophy::find($trophy_id);
        $trophy->delete();            
       
        return response()->json(['msg' => 'Competição deletada com sucesso', 'status' => 'success']);
    }
}
