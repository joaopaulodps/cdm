<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SinglePost;
use App\Models\Category;
use App\Models\PostCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index($post_id){
        $category = Category::where('post_id', '=', $post_id)->with('category')->get();

        if(sizeof($category)==0){
                
            return response()->json(['msg' => 'Nenhuma Categoria Encontrada', 'status' => 'success']); 

        }else{
                 
            return response([$category, 'status' => 'success']);

        }
    }    
     
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required',
            'category_id' => 'required'
        ]); 

        $cat_post = new Category;
        $cat_post->fill($request->all());

        if($cat_post->save()){
                            
            return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 

        }else{

            return response()->json(['msg' => 'Erro ao cadastrar Categoria!', 'status' => 'error']); 

        }
    }

    public function edit($category_id)
    {
        $catpost_edit=Category::find($category_id);
        return response([$catpost_edit,'status' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'post_id' => 'required',
            'category_id' => 'required'
        ]); 

        $catpost_edit=Category::find($request->id);
        $catpost_edit->fill($request->all());
        $catpost_edit->update();
 
        return response()->json(['msg' => 'Categoria atualizada com sucesso!', 'status' => 'success']);       
    }

    public function delete($category_id)
    {
        $catpost = Category::find($category_id);
        $catpost->delete();            
       
        return response()->json(['msg' => 'Categoria deletada com sucesso', 'status' => 'success']);
    }
}
