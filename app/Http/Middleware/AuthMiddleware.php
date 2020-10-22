<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class AuthMiddleware
{

    protected function Unauthorized()
    {
        $result = [];
        $result['code'] = 401;
        $result['message'] = 'Unauthorized access to a resource';

        return response($result, 401, ['Content-Type' => 'application/json']);
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $authoirzation = $request->header('Authorization');

        if(!isset($authoirzation))
        {
            return $this->Unauthorized();
        }

        $token = str_replace('Bearer ', '',$authoirzation);

        $count = User::where('api_token',$token)->count();

        if($count < 1){

            return $this->Unauthorized();
        }

        return $next($request);
    }
}
