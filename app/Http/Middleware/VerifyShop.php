<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class VerifyShop
{

    public function handle(Request $request, Closure $next)
    {

        if ($request->input('embedded') == 1) {
            $shop = $request->input('shop');
            $host = $request->input('host');
            $shop_exist = User::where('name', $shop)->first();

            return response()->view('welcome', ['shop' => $shop, 'shop_exist' => $shop_exist,'host'=>$host], 200);
        } else {
            $shop = $request->input('shop');
            if (@$shop) {
                return $next($request);
            }
            $pathToFile = public_path('site/index.html');
            return response()->file($pathToFile);
        }
        return $next($request);
    }
}
