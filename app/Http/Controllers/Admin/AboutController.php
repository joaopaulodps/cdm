<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(){
        $about = About::all();

        if(sizeof($about)==0){
                
            return response()->json(['msg' => 'Nenhum Texto Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$about, 'status' => 'success']);

        }
    }    
     
    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            ]); 
    
            $about = new About;
            $about->title = $request->title;
            $about->description = $request->description;
            $about->slug = $request->slug;
    
            if($about->save()){
                                
                return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 
    
            }else{
    
                return response()->json(['msg' => 'Erro ao cadastrar mensagem!', 'status' => 'error']); 
    
            }

    }

    public function edit($about_id){
               
        $about_edit=About::select('id','title','slug','description')->find($about_id);
        return response([$about_edit,'status' => 'success']);

    }
    
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'title'  => 'required',
            'description'  => 'required' 
            
         ]);
             
         $about_edit=About::find($request->id);        
         $about_edit->title = $request->title;
         $about_edit->description = $request->description;
         $about_edit->slug = $request->slug;
  
         $about_edit->update();
 
         return response()->json(['msg' => 'Mensagem atualizada com sucesso!', 'status' => 'success']);           
    }
   
    function delete($about_id){
           
        $about = About::find($about_id);
        $about->delete();            
       
        return response()->json(['msg' => 'Mensagem deletada com sucesso', 'status' => 'success']); 

    }
}
