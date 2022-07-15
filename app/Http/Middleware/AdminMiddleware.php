<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(!Auth::user()){
            return response()->json(['msg' => 'Session Expired', 'status' => 'error']);    
        }else{
            if( count(Auth::user()->roles->whereIn('id', [1,2,3])) > 0 )    
                return $next($request);
            else
                return response()->json(['msg' => 'Permission Fail', 'status' => 'error']);
        }
    }
}
