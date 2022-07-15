<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContinentalFederation;
use Illuminate\Http\Request;

class ContinentController extends Controller
{
    public function index(){
        $continent = ContinentalFederation::all();

        if(sizeof($continent)==0){
                
            return response()->json(['msg' => 'Nenhuma Federação Continental Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$continent, 'status' => 'success']);

        }
    }    
     
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'details_history' => 'required',
            'continent' => 'required',
            ]); 
    
            $continent = new ContinentalFederation;
            $continent->name = $request->name;
            $continent->full_name = $request->full_name;
            $continent->foundation = $request->foundation;
            $continent->continent = $request->continent;
            $continent->details_history = $request->details_history;
            $continent->flag = $request->flag;
            $continent->slug = $request->slug;
            $continent->world_federation_id = $request->world_federation_id;
    
            if($continent->save()){
                                
                return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 
    
            }else{
    
                return response()->json(['msg' => 'Erro ao cadastrar Federação Continental!', 'status' => 'error']); 
    
            }

    }

    public function edit($continent_id){
               
        $continent_edit=ContinentalFederation::select()->find($continent_id);
        return response([$continent_edit,'status' => 'success']);

    }
    
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name'  => 'required',
            'details_history'  => 'required',
            'continent' => 'required'
            
         ]);
             
         $continent_edit=ContinentalFederation::find($request->id);        
         $continent_edit->name = $request->name;
         $continent_edit->full_name = $request->full_name;
         $continent_edit->foundation = $request->foundation;
         $continent_edit->continent = $request->continent;
         $continent_edit->details_history = $request->details_history;
         $continent_edit->flag = $request->flag;
         $continent_edit->slug = $request->slug;
         $continent_edit->world_federation_id = $request->world_federation_id;
  
         $continent_edit->update();
 
         return response()->json(['msg' => 'Federação Continental atualizada com sucesso!', 'status' => 'success']);           
    }
   
    function delete($continent_id){
           
        $continent = ContinentalFederation::find($continent_id);
        $continent->delete();            
       
        return response()->json(['msg' => 'Federação Continental deletada com sucesso', 'status' => 'success']); 

    }
}
