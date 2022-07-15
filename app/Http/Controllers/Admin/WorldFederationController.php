<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorldFederation;
use App\Models\ContinentalFederation;
use App\Models\NationalTeam;
use Illuminate\Http\Request;

class WorldFederationController extends Controller
{
    public function index() 
    {
        $world = WorldFederation::all();

        if(sizeof($world)==0){
                
            return response()->json(['msg' => 'Nenhuma Federação Mundial Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$world, 'status' => 'success']);

        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]); 

        $world = new WorldFederation;
        $world->name = $request->name;
        $world->full_name = $request->full_name;
        $world->foundation = $request->foundation;
        $world->head_office = $request->head_office;
        $world->details_history = $request->details_history;
        $world->flag = $request->flag;
        $world->slug = $request->slug;

        if($world->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Federação Mundial!', 'status' => 'error']); 

        }
    }

    public function edit($world_id)
    {
        $world_edit=WorldFederation::select()->find($world_id);
        return response([$world_edit,'status' => 'success']);
    }

    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name'  => 'required'
            
         ]);
             
         $world_edit=WorldFederation::find($request->id);        
         $world_edit->name = $request->name;
         $world_edit->full_name = $request->full_name;
         $world_edit->foundation = $request->foundation;
         $world_edit->head_office = $request->head_office;
         $world_edit->details_history = $request->details_history;
         $world_edit->flag = $request->flag;
         $world_edit->slug = $request->slug;
  
         $world_edit->update();
 
         return response()->json(['msg' => 'Federação Mundial atualizada com sucesso!', 'status' => 'success']);           
    }

    public function delete($world_id)
    {
        $world = WorldFederation::find($world_id);
        $nation = NationalTeam::where('world_federation', '=', $world_id)->get();
        $continent = ContinentalFederation::where('world_federation_id', '=', $world_id)->get();
        if(sizeof($nation)===0 && sizeof($continent)===0){
            $world->delete();            
        
            return response()->json(['msg' => 'Federação Mundial deletada com sucesso', 'status' => 'success']);
        }
        else{
            return response()->json(['msg' => 'Não é possível deletar. Possui federações continentais/seleções vinculadas.']);
        }
    }
}