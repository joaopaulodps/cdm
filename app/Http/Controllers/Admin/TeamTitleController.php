<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamTitle;
use Illuminate\Http\Request;

class TeamTitleController extends Controller
{
    public function index($team_id)
    {
        $title = TeamTitle::where('team_id', '=', $team_id)->with('trophy', 'team')->get(['id','team_id', 'trophy_id', 'seasons']);
        
        if (sizeof($title)==0) {

            return response()->json(['msg' => 'Nenhum título encontrado!', 'status' => 'success']);
        } else {

            return response([$title, 'status' => 'success']);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required',
            'trophy_id' => 'required',
            'seasons' => 'required'
        ]); 

        $title = new TeamTitle;
        $title->fill($request->all());

        if($title->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Título(s)!', 'status' => 'error']); 

        }
    }

    public function edit($title_id)
    {
        $title_edit=TeamTitle::find($title_id);
        $title = [
            "id"=>$title_edit->id, 
            "team_id"=>$title_edit->team_id, 
            "trophy_id"=>$title_edit->trophy_id,
            "seasons"=>$title_edit->seasons];
        return response([$title,'status' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'team_id' => 'required',
            'trophy_id' => 'required',
            'seasons' => 'required'
        ]); 

        $title_edit=TeamTitle::find($request->id);
        $title_edit->fill($request->all());
        $title_edit->update();
 
        return response()->json(['msg' => 'Título atualizado com sucesso!', 'status' => 'success']);       
    }

    public function delete($title_id)
    {
        $title = TeamTitle::find($title_id);
        $title->delete();            
       
        return response()->json(['msg' => 'Título deletado com sucesso', 'status' => 'success']);
    }
}
