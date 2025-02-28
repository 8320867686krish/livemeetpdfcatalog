<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/collections/get', [ApiController::class, 'collectionsGet'])->name('collectionGet');
Route::post('/product/get', [ApiController::class, 'collectionProductGet'])->name('collectionProductGet');
Route::get('/pdfCollections/get', [ApiController::class, 'pdfCollections'])->name('pdfCollections');
Route::post('/setting/edit', [ApiController::class, 'settingSave'])->name('settingEdit');
Route::post('/configration/save', [ApiController::class, 'saveConfigration'])->name('save.configration');
Route::post('/product/save', [ApiController::class, 'saveProduct'])->name('save.product');

Route::get('/setting/{id}', [ApiController::class, 'settingGet'])->name('settingGet');
Route::post('collections/status', [ApiController::class, 'pdfCollectionStatus'])->name('pdfCollectionStatus');
Route::post('collections/remove', [ApiController::class, 'pdfCollectionRemove'])->name('pdfCollectionRemove');
Route::get('/plans/get', [ApiController::class, 'getPlan'])->name('getPlan');
Route::post('/plans/buy', [ApiController::class, 'buyPlan']);
Route::get('/plans/checkPlan', [ApiController::class, 'checkPlan']);
Route::post('pdfShow', [ApiController::class, 'pdfShow']);
Route::post('downloadpdf', [ApiController::class, 'downloadPdf']);
Route::post('chunkRequest', [ApiController::class, 'chunkRequest']);
Route::get('reauth', [ApiController::class, 'reauth']);
Route::post('flipPdfGenrate/{settings_id}', [ApiController::class, 'flipPdfGenrate']);
Route::get('flipPdf/{flipId}', [ApiController::class, 'flipPdfGet']);
Route::get('/getAllVendors', [ApiController::class, 'getAllVendors']);
Route::get('/getAllProductTags', [ApiController::class, 'getAllProductTags']);
Route::get('/getAllProductTypes', [ApiController::class, 'getAllProductTypes']);
Route::post('/getProductsUsingFilter', [ApiController::class, 'getProductsUsingFilter']);
Route::post('/getProductsByCollections', [ApiController::class, 'getProductsByCollections']);
