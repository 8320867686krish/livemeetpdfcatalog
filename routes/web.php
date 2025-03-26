<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\webhookController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('callback', [WebhookController::class, 'callback']);

Route::get('demo', function () {
    $allUser =  User::get();
    foreach ($allUser as $value) {
        if (@$value['password']) {
            $token = $value->password; // Assuming the token is stored in the password field
            $shopDomain = $value->name;
            $shopUrl = "https://{$shopDomain}/admin/api/2023-10/webhooks.json";
            $response = Http::withHeaders([
                'X-Shopify-Access-Token' => $token,
            ])->get($shopUrl);
            $shopJsonResponse = $response->json();
            $array = ['shop' => $value->name, 're' => $shopJsonResponse];
            dump($array);
        }
    }
});
Route::get('/', [HomeController::class, 'index'])->middleware(['verify.shop', 'verify.shopify'])->name('home');
Route::post('customers/update', [webhookController::class, 'customersUpdate']);
Route::post('customers/delete', [webhookController::class, 'customersDelete']);
Route::post('shop/update', [webhookController::class, 'shopUpdate']);
Route::post('products/update', [webhookController::class, 'productUpdate']);
Route::post('themes/publish', [webhookController::class, 'themsPublish']);

Route::get('/plan/process/{shop}/{plan_id}', [HomeController::class, 'billingProcess']);
Route::get('/flipBook/{flipId}', [HomeController::class, 'flipBook']);

Route::get('/{path?}', [HomeController::class, 'common'])->where('path', '.*');

// Route::get('/{path?}', [HomeController::class, 'common'])
//     ->where('path', '^(?!uploads).*')
//     ->where('path', '.*\.(?!jpg|jpeg|png|gif|bmp|ico|webp|pdf).*')
//     ->where('path', '.*')
//     ->fallback();