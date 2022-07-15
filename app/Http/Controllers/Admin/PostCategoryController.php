<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    public function index(){
        $category = PostCategory::all();

        if(sizeof($category)==0){
                
            return response()->json(['msg' => 'Nenhuma Categoria Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$category, 'status' => 'success']);

        }
    }    
     
    public function store(Request $request){
        $request->validate([
            'category_name' => 'required',
            ]); 
    
            $category = new PostCategory;
            $category->category_name = $request->category_name;
            $category->slug = $request->slug;
    
            if($category->save()){
                                
                return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 
    
            }else{
    
                return response()->json(['msg' => 'Erro ao cadastrar mensagem!', 'status' => 'error']); 
    
            }

    }

    public function edit($category_id){
               
        $category_edit=PostCategory::select('id','category_name')->find($category_id);
        return response([$category_edit,'status' => 'success']);

    }
    
    public function update(Request $request){  
        $request->validate([
            'id'    => 'required',
            'category_name'  => 'required'
            
         ]);
             
         $category_edit=PostCategory::find($request->id);        
         $category_edit->category_name = $request->category_name;
         $category_edit->slug = $request->slug;
  
         $category_edit->update();
 
         return response()->json(['msg' => 'Categoria atualizada com sucesso!', 'status' => 'success']);           
    }
   
    function delete($category_id){
           
        $category = PostCategory::find($category_id);
        $category->delete();            
       
        return response()->json(['msg' => 'Categoria deletada com sucesso', 'status' => 'success']); 

    }
}
