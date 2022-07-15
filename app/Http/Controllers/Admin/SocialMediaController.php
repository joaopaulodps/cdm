<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NationalTeam;
use App\Models\Team;
use App\Models\SocialMedia;
use Illuminate\Http\Request;

class SocialMediaController extends Controller
{
    public function indexTeam($social_id)
    {
        $social = SocialMedia::where('team_id', '=', $social_id)->get();
        if (sizeof($social)==0) {

            return response()->json(['msg' => 'Nenhuma Rede Social Encontrada!', 'status' => 'success']);
        } else {

            return response([$social, 'status' => 'success']);
        }
    }
    public function storeTeam(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'url' => 'required',
            'team_id' => 'required'
        ]); 

        $socialMedia = new SocialMedia;
        $socialMedia->fill($request->all());

        if($socialMedia->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Seleção!', 'status' => 'error']); 

        }
    }
    public function indexNation($social_id)
    {
        $social = SocialMedia::where('nation_id', '=', $social_id)->get();
        if (sizeof($social)==0) {

            return response()->json(['msg' => 'Nenhuma Rede Social Encontrada!', 'status' => 'success']);
        } else {

            return response([$social, 'status' => 'success']);
        }
    }
    public function storeNation(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'url' => 'required',
            'nation_id' => 'required'
        ]); 

        $socialMedia = new SocialMedia;
        $socialMedia->fill($request->all());

        if($socialMedia->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Seleção!', 'status' => 'error']); 

        }
    }
    public function edit($id)
    {
        $social_edit=SocialMedia::find($id);
        return response([$social_edit,'status' => 'success']);
    }
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name' => 'required',
            'url' => 'required',
            
         ]);
             
        $social_edit=SocialMedia::find($request->id);
        $social_edit->fill($request->all());
        $social_edit->update();
 
        return response()->json(['msg' => 'Rede Social atualizada com sucesso!', 'status' => 'success']);           
    }

    public function delete($id)
    {
        $team = SocialMedia::find($id);
        $team->delete();            
       
        return response()->json(['msg' => 'Rede Social deletada com sucesso', 'status' => 'success']);
    }
}
