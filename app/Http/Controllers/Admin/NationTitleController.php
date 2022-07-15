<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NationTitle;
use Illuminate\Http\Request;

class NationTitleController extends Controller
{
    public function index($nation_id)
    {
        $title = NationTitle::where('nation_id', '=', $nation_id)->with('trophy', 'nation')->get(['id','nation_id', 'trophy_id', 'seasons']);
        
        if (sizeof($title)==0) {

            return response()->json(['msg' => 'Nenhum título encontrado!', 'status' => 'success']);
        } else {

            return response(['title' => $title, 'status' => 'success']);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'nation_id' => 'required',
            'trophy_id' => 'required',
            'seasons' => 'required'
        ]); 

        $title = new NationTitle;
        $title->fill($request->all());

        if($title->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Título(s)!', 'status' => 'error']); 

        }
    }

    public function edit($title_id)
    {
        $title_edit=NationTitle::find($title_id);
        $title = [
            "id"=>$title_edit->id, 
            "nation_id"=>$title_edit->nation_id, 
            "trophy_id"=>$title_edit->trophy_id,
            "seasons"=>$title_edit->seasons];
        return response([$title,'status' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'nation_id' => 'required',
            'trophy_id' => 'required',
            'seasons' => 'required'
        ]); 

        $title_edit=NationTitle::find($request->id);
        $title_edit->fill($request->all());
        $title_edit->update();
 
        return response()->json(['msg' => 'Título atualizado com sucesso!', 'status' => 'success']);       
    }

    public function delete($title_id)
    {
        $title = NationTitle::find($title_id);
        $title->delete();            
       
        return response()->json(['msg' => 'Título(s) deletado(s) com sucesso', 'status' => 'success']);
    }
}
