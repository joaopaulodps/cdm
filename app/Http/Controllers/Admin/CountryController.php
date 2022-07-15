<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CountriesImport;

class CountryController extends Controller
{
    public function index(){
        $country = Country::all();

        if(sizeof($country)==0){
                
            return response()->json(['msg' => 'Nenhum País Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$country, 'status' => 'success']);

        }
    }    
     
    public function selectCountries($continent_id)
    {
        $country = Country::where('continent_id','=', $continent_id)->get();

        if(sizeof($country)==0){
                
            return response()->json(['msg' => 'Nenhum País Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$country, 'status' => 'success']);

        }
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'federal_capital' => 'required'
            ]); 
    
            $country = new Country;
            $country->fill($request->all());
    
            if($country->save()){
                                
                return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 
    
            }else{
    
                return response()->json(['msg' => 'Erro ao cadastrar País!', 'status' => 'error']); 
    
            }

    }

    public function edit($country_id){
               
        $country_edit=Country::find($country_id);
        return response([$country_edit,'status' => 'success']);

    }
    
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'name' => 'required',
            'federal_capital' => 'required',
            
         ]);
             
        $country_edit=Country::find($request->id);        
        $country_edit->name = $request->name;
        $country_edit->federal_capital = $request->federal_capital;
        $country_edit->continent_id = $request->continent_id;
        $country_edit->population = $request->population;
        $country_edit->coin = $request->coin;
        $country_edit->official_language = $request->official_language;
        $country_edit->details_history = $request->details_history;
        $country_edit->flag = $request->flag;
        $country_edit->slug = $request->slug;
  
         $country_edit->update();
 
         return response()->json(['msg' => 'País atualizado com sucesso!', 'status' => 'success']);           
    }
   
    function delete($country_id){
           
        $country = Country::find($country_id);
        $country->delete();            
       
        return response()->json(['msg' => 'País deletado com sucesso', 'status' => 'success']); 

    }

    public function import(Request $request) 
    {
        Excel::import(new CountriesImport, $request->file('file')->store('temp'));
        return back(['msg' => 'Países importados com sucesso!', 'status' => 'success']);
    }

}
