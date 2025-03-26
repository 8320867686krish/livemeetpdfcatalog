<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CollectionProducts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class webhookController extends Controller
{
    //
        const CLIENT_SECRET = 'c55cda342604686659f8117ab310791e';

    public function customersUpdate(Request $request)
    {
        $hmacHeader = $request->header('X-Shopify-Hmac-Sha256');
        $data = $request->getContent();
        $utf8 = utf8_encode($data);
        $txt = json_decode($utf8, true);

        $verified = $this->verifyWebhookInternal($data, $hmacHeader);

        if ($verified) {

            \Log::info("customer update request");
            return response()->json(['status' => 'success'], 200);
        } else {
            \Log::info("customer update fail request");
            return response()->json(['status' => 'error'], 401);
        }
    }
    private function verifyWebhookInternal($data, $hmacHeader)
    {
        $calculatedHmac = base64_encode(hash_hmac('sha256', $data, self::CLIENT_SECRET, true));
        return hash_equals($calculatedHmac, $hmacHeader);
    }
    public function customersDelete(Request $request)
    {
        $hmacHeader = $request->header('X-Shopify-Hmac-Sha256');
        $data = $request->getContent();
        $utf8 = utf8_encode($data);
        $txt = json_decode($utf8, true);

        $verified = $this->verifyWebhookInternal($data, $hmacHeader);

        if ($verified) {
            \Log::info("customer delete request");
            return response()->json(['status' => 'success'], 200);
        } else {
            \Log::info("customer delete fail request");
            return response()->json(['status' => 'error'], 401);
        }
    }
    public function shopUpdate(Request $request)
    {

        $hmacHeader = $request->header('X-Shopify-Hmac-Sha256');
        $data = $request->getContent();
        $utf8 = utf8_encode($data);
        $txt = json_decode($utf8, true);

        $verified = $this->verifyWebhookInternal($data, $hmacHeader);

        if ($verified) {
            $shopDomain = $request->header('X-Shopify-Shop-Domain');
            if(@$txt['money_format']){
                   $user = User::where('name', $shopDomain)->update(['money_format'=>$txt['money_format']]);
            }
         
            return response()->json(['status' => 'success'], 200);
        } else {
            \Log::info("shop update fail request");
            return response()->json(['status' => 'error'], 401);
        }
    }
      public function themsPublish(Request $request){
          $hmacHeader = $request->header('X-Shopify-Hmac-Sha256');
                  $shopDomain = $request->header('X-Shopify-Shop-Domain');

        $data = $request->getContent();
        $utf8 = utf8_encode($data);
        $txt = json_decode($utf8, true);
        $verified = $this->verifyWebhookInternal($data, $hmacHeader);
     
        if ($verified) {
               $user = User::where('name', $shopDomain)->first();
               $user['theam_id'] = $txt['id'];
               $user->save();
            return response()->json(['status' => 'success'], 200);
        } else {
            return response()->json(['status' => 'error'], 401);
        }
    }
    public function productUpdate(Request $request)
    {
         $hmacHeader = $request->header('X-Shopify-Hmac-Sha256');
        $shopDomain = $request->header('X-Shopify-Shop-Domain');
          $data = $request->getContent();
        $utf8 = utf8_encode($data);
        $txt = json_decode($utf8, true);
        $verified = $this->verifyWebhookInternal($data, $hmacHeader);
         if ($verified) {
        $user = User::where('name', $shopDomain)->first();
        $token = $user['password'];
        $shop_id = $user['id'];
        $data = file_get_contents('php://input');
        $data_json = json_decode($data, true);
        $product_id = $data_json['id'];
        $variants = $data_json['variants'];

        
            $priceFormat = $user['money_format'];
            if(@$variants){
                \Log::info("Product varient avileble",['shop'=>$shopDomain]);

                  foreach($variants as $value){
                   $priceValue = $value['price'];
                   $price = $this->formatMoney($priceValue, $priceFormat);
                  $compareAtPriceValue = $value['compareAtPrice'] ?? 0;
                   $compareAtPrice = $this->formatMoney($compareAtPriceValue, $priceFormat);
                    CollectionProducts::where('shop_id', $shop_id)->where('product_id',$value['admin_graphql_api_id'])->update([
                    'price' => $price,
                    'barcode' => $value['barcode'],
                     'compareAtPrice' => $compareAtPrice,
                    'sku' => $value['sku'],
                ]);
    
                        return response()->json(['status' => 'success'], 200);

            }
            return response()->json(['status' => 'success'], 200);

            }
            else{
                \Log::info("product varients not avilable",['shop'=>$shopDomain]);
                return response()->json(['status' => 'success'], 200);

                
            }
          
         }else{
                \Log::info("product not verified",['shop'=>$shopDomain]);
               return response()->json(['status' => 'error'], 401);
         }
    
    }

    public function formatMoney($price, $format)
    {
        $placeholders = [
            'amount' => number_format($price, 2),
            'amount_no_decimals' => number_format($price, 0),
            'amount_with_comma_separator' => number_format($price, 2, '.', ','),
            'amount_no_decimals_with_comma_separator' => number_format($price, 0, '.', ','),
        ];

        foreach ($placeholders as $placeholder => $value) {
            $format = str_replace('{{' . $placeholder . '}}', $value, $format);
        }
        return $format;
    }
     public function callback(Request $request){
        $query = $request->query();
        $shop = $query['shop'];
    $hmac = $query['hmac'];
    unset($query['hmac']);
    ksort($query);
    $message = http_build_query($query);
    $calculatedHmac = hash_hmac('sha256', $message, 'c55cda342604686659f8117ab310791e');

    if (!hash_equals($hmac, $calculatedHmac)) {
        abort(403, 'Invalid HMAC');
    }

    // Step 2: Exchange Authorization Code for Access Token
    $response = Http::post("https://{$query['shop']}/admin/oauth/access_token", [
        'client_id' =>'5b7fd5bcc773fe3efc10fdc89ce5e8e6',
        'client_secret' =>'c55cda342604686659f8117ab310791e',
        'code' => $query['code'],
    ]);

    if ($response->successful()) {
         $accessToken = $response->json()['access_token'];
             $shop_data = User::where('name', $shop)->first();
             $shop_data->password = $accessToken;
             $shop_data->needs_update = 0;
              $shop_data->save();
                 $redirect_url = "https://".$shop."/admin/apps/".env('SHOPIFY_APP');

               return redirect(  $redirect_url );
    }

    return response()->json(['error' => 'Failed to get access token'], 400);
    }
}
