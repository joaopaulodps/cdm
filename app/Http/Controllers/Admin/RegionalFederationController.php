<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RegionalFederation;
use Illuminate\Http\Request;

class RegionalFederationController extends Controller
{
    public function index(){
        $regional = RegionalFederation::all();

        if(sizeof($regional)==0){
                
            return response()->json(['msg' => 'Nenhuma Federação Regional Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$regional, 'status' => 'success']);

        }
    }    
     
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'country_id' => 'required',
            ]); 
    
            $regional = new RegionalFederation;
            $regional->fill($request->all());
    
            if($regional->save()){
                                
                return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 
    
            }else{
    
                return response()->json(['msg' => 'Erro ao cadastrar Federação Regional!', 'status' => 'success']); 
    
            }

    }

    public function edit($regional_id){
               
        $regional_edit=RegionalFederation::select()->find($regional_id);
        return response([$regional_edit,'status' => 'success']);

    }
    
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name'  => 'required',
            'country_id' => 'required'
            
         ]);
             
         $regional_edit=RegionalFederation::find($request->id);        
         $regional_edit->fill($request->all());
         $regional_edit->update();
 
         return response()->json(['msg' => 'Federação Regional atualizada com sucesso!', 'status' => 'success']);           
    }
   
    function delete($regional_id){
           
        $regional = RegionalFederation::find($regional_id);
        $regional->delete();            
       
        return response()->json(['msg' => 'Federação Regional deletada com sucesso', 'status' => 'success']); 

    }
}
