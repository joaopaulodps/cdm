<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
      
        $all_user= User::whereHas('roles', function ($query)
        {        
           $query->whereIn('id',[2,3]);

        })->with('roles')->get();

        if(sizeof($all_user)==0){
                
            return response()->json(['msg' => 'Nenhum Usuário encontrado ', 'status' => 'sucess']); 

        }else{
                 
            return response([$all_user, 'status' => 'success']);

        }
    }    
     
    public function store(Request $request)
    {
        $request->validate([
        'name' => 'required',
        'nickname' => 'required',
        'email' => 'email|required',
        'password' => 'required',
        'role'  => 'required' 
        ]); 

        $user = new User;
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);   
        $check_email=User::where('email',$request->email)->first();
        $check_nickname=User::where('nickname',$request->nickname)->first();

        if($check_nickname){
            return response()->json(['msg' => 'Nome de usuário já existe', 'status' => 'error']);
        }

        if(!$check_email){
              
            if($user->save()){
            
                $user->roles()->attach($request->role);
                 
                return response()->json(['msg' => 'Cadastro realizado com sucesso!', 'status' => 'success']); 
   
            }else{
    
                return response()->json(['msg' => 'Erro ao cadastrar Usuário!', 'status' => 'error']); 
   
            }
    
        }else{

            return response()->json(['msg' => 'E-mail já cadastrado', 'status' => 'error']);

        }
    }

    public function edit($user_id){
               
        $user_edit=User::select('id','name','email','nickname')->with('roles')->find($user_id);
        return response([$user_edit,'status' => 'success']);

    }
    
    public function update(Request $request){
        
        $user = Auth::user();
        $request->validate([
           'id'    => 'required',
           'name'  => 'required',
           'email' => 'email|required',
           'role'  => 'required' 
           
        ]);
            
        $user_edit=User::find($request->id);        
        $user_edit->name = $request->name;
        $user_edit->email = $request->email;
      
        if($request->password){

            $user_edit->password  = Hash::make($request->password);
                    
        }    
  
        $user_edit->update();
        $role=$user_edit->roles()->first();         
        if($role->id!=$request->role){
            
            $user_edit->roles()->detach();
            $user_edit->roles()->attach($request->role);      
               
        }

        return response()->json(['msg' => 'Usuário atualizado com sucesso!', 'status' => 'success']); 
                    
    }
   
    function delete($user_id){
           
        $user = User::find($user_id);
        $user->roles()->detach();
        $user->delete();            
       
        return response()->json(['msg' => 'Usuário deletado com sucesso', 'status' => 'success']); 

    }

}


    
