<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SinglePost;
use Illuminate\Http\Request;

class SinglePostController extends Controller
{
    public function index()
    {
        $posts = SinglePost::all();

        if(sizeof($posts)=== 0){
            return response()->json(['msg' => 'Nenhum Post Encontrado!', 'status' => 'success']);
        }
        else{
            return response()->json([$posts, 'status' => 'success']);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        $post = new SinglePost;
        $post->fill($request->all());

        if($post->save()){
            return response()->json(['msg' => 'Post Cadastrado com Sucesso', 'status' => 'success']);
        }
        else{
            return response()->json(['msg' => 'Não foi possível cadastrar o post', 'status' => 'error']);
        }
    }

    public function edit($post_id)
    {
        $post_edit = SinglePost::find($post_id);
        return response([$post_edit, 'status' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        $post_edit=SinglePost::find($request->id);
        $post_edit->fill($request->all());
        $post_edit->update();
 
        return response()->json(['msg' => 'Post atualizado com sucesso!', 'status' => 'success']);           
    
    }

    public function delete($post_id)
    {
        $post = SinglePost::find($post_id);
        $post->delete();            
       
        return response()->json(['msg' => 'Post deletado com sucesso', 'status' => 'success']);
    
    }
}
