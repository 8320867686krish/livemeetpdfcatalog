<?php

namespace App\Http\Controllers;

use App\Jobs\InstallAppProcess;
use App\Models\Settings;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Nette\Utils\Html;
use Carbon\Carbon;
use Illuminate\Support\Facades\URL;
use PDF;
use Symfony\Component\Mailer\Exception\TransportException;

class HomeController extends Controller
{   

    
    public function Index(Request $request)
    {
        $post = $request->input();
        $shop = $request->input('shop');
        $host = $request->input('host');
        $shopDetail = User::where('name', $shop)->first();
        $shop_exist = $shopDetail;
     
      
     InstallAppProcess::dispatch($shop);

      
        return view('welcome', compact('shop','shop_exist','host'));
    }
   
    public function common(Request $request)
    {
        $shop = $request->input('shop');
        $host = $request->input('host');

        $shop_exist = User::where('name', $shop)->first();
        return view('welcome', compact('shop','shop_exist','host'));
    }
    protected function getStoreOwnerEmail($shop, $passowrd)
    {

        $shopUrl = "https://" . $shop . "/admin/api/2023-10/shop.json";
        $customHeaders = [
            'X-Shopify-Access-Token' => $passowrd, // Replace with your actual authorization token
        ];
        // Send a cURL request to the GraphQL endpoint
        $shopDetailResponse = Http::withHeaders($customHeaders)->get($shopUrl);
        $shopJsonResponse = $shopDetailResponse->json();
        if (@$shopJsonResponse['shop']) {
            $storeOwnerEmail = $shopJsonResponse['shop']['email'];
            $store_name = $shopJsonResponse['shop']['name'];
            $money_formate =  $shopJsonResponse['shop']['money_format'];
            User::where('name',$shop)->update(['money_format'=>   $money_formate]);
            $details = [
                'title' => 'Thank You for Installing PDF Product Catalog for Shopify - Meetanshi',
                'name' => $store_name
            ];

          
            try {
                
                Mail::to($storeOwnerEmail)->send(new \App\Mail\InstallMail($details));
                 
            } catch (TransportException $e) {
              
                // Log mail error
              //  Log::error('Mail sending failed: ' . $e->getMessage());
                return true; // Return false if mail fails
            }
            return true; // Return true if everything works fine
        }
    }
    public function billingProcess(Request $request, $shop, $plan_id)
    {

        $chargeId = $request->charge_id;
        $chargeId = $request->charge_id;

        $user = User::where('id', $shop)->first();
        $url = "https://" . $user['name'] . "/admin/api/2023-01/recurring_application_charges" . "/" . $chargeId . ".json";
        $customHeaders = [
            'X-Shopify-Access-Token' => $user['password'], // Replace with your actual authorization token
        ];

        // Send a cURL request to the GraphQL endpoint
        $planDetail = DB::table('plans')->where('id', $plan_id)->first();

        $response = Http::withHeaders($customHeaders)->get($url);
        $jsonResponsedata = $response->json();
        $jsonResponse = $jsonResponsedata['recurring_application_charge'];
        $query = DB::table('charges')
            ->where('user_id', $shop)
            ->update([
                'status' => $jsonResponse['status'],
                'name' => $jsonResponse['name'],
                'charge_id' => $chargeId,
                'trial_days' => $jsonResponse['trial_days'],
                'trial_ends_on' => $jsonResponse['trial_ends_on'],
                'activated_on' => $jsonResponse['activated_on'],
                'billing_on' => $jsonResponse['activated_on'],
                'interval' => $planDetail->interval,
                'plan_id' => $plan_id,
                'price' => $planDetail->price,
                'updated_at' => now()
            ]);
        $userup = User::where('id', $shop)->update(['plan_id' => $plan_id,'isPayment'=>1]);
        $redirect_url = "https://" . $user['name'] . "/admin/apps/".env('SHOPIFY_APP');

        return redirect($redirect_url)->header('customvalue1', 5);

    }
    public function flipBook($flipId){
        $settingsData = Settings::where('flipId', $flipId)->first();
        
        $pdfurl = 'public/uploads/pdfFile/shop_'.$settingsData['shop_id']."/"."collections_".$settingsData['catalog_name']."/".$settingsData['pdfUrl'];
        return view('flipBook',compact('pdfurl'));

    }
}
