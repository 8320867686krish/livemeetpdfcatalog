<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class userAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $shop = base64_decode($request->header('token'));
        $userData = User::select('id','plan_id','name','password')->withCount('catelog')->where('name', $shop)->first();
        if (!$userData) {
            return response()->json([
                'message' => 'Unauthorized',
                'responseCode' => 0,
                'errorCode' => 0,
                'data' => []
            ], Response::HTTP_UNAUTHORIZED);
        }
       
        $request->merge(['shop' => $userData['name'],'password' => $userData['password'],'shop_id' => $userData['id']]);

        return $next($request);
    }
}
