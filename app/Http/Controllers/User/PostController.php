<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SinglePost;
use App\Models\PostCategory;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $post = SinglePost::all();

        if(sizeof($post)==0){
                
            return response()->json(['msg' => 'Nenhum Post Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$post, 'status' => 'success']);

        }
    }

    public function indexPost($post_id)
    {
        $post = SinglePost::where('id', '=', $post_id)->get();
        /* $categories = PostCategory::where('id', '=', $post->) */

        if(sizeof($post)==0){
                
            return response()->json(['msg' => 'Nenhum Post Encontrado', 'status' => 'success']); 

        }else{
                 
            return response([$post, 'status' => 'success']);

        }
    }
}
