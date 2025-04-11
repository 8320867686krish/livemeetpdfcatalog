<?php

namespace App\Jobs;

use App\Mail\InstallMail;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InstallAppProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $shop;
    private $user,$storeOwnerEmail,$store_name;

    /**
     * Create a new job instance.
     */
    public function __construct($shop)
    {
        $this->shop = $shop;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->user = User::where('name', $this->shop)->first();
        $plan = DB::table('plans')->where('name', 'Free')->first();
        $this->user->plan_id = $plan->id;
        $this->user->save();
        DB::table('charges')->insert([
            'charge_id' => 0,
            'test' => true,
            'price' => $plan->price,
            'type' => $plan->type,
            'user_id' =>$this->user->id,
            'interval' => $plan->interval,
            'plan_id' => $plan->id,
            'trial_days' => $plan->trial_days,
            'billing_on' =>  date('Y-m-d H:i:s'),
            'activated_on' => date('Y-m-d H:i:s'),
            'status' => 'ACTIVE'
        ]);
        if(!$this->user){
            return;
        }
        $this->addThemeId();
     //   $this->handleInstallMail();

    }

    public function addThemeId(){
        $graphqlEndpoint = "https://$this->shop/admin/api/2024-10/graphql.json";

        // Headers for Shopify API request
        $customHeaders = [
            'X-Shopify-Access-Token' => $this->user['password'],
        ];

        $query = 'query {
                shop {
                    name
                    email
                    id,
                    moneyFormat
                }
                themes(first: 1, roles: MAIN) {
                    edges {
                    node {
                        id
                        name
                        role
                    }
                    }
                }
                }';

        // Make HTTP POST request to Shopify GraphQL endpoint
        $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
            'query' => $query,
        ]);

        $jsonResponse = $response->json();

        $themeId = null;
        if(isset($jsonResponse['data']['shop'])){
            $this->storeOwnerEmail = $jsonResponse['shop']['email'];
            $this->store_name = $jsonResponse['shop']['name'];
            $money_formate =  $jsonResponse['shop']['money_format'];
            $this->user->money_format = $$money_formate;
        }
        if(isset($jsonResponse['data']['themes']['edges'][0]['node']['id'])){
            $themeId = $jsonResponse['data']['themes']['edges'][0]['node']['id'];
        }

        if($themeId){
            $themeId = str_replace('gid://shopify/OnlineStoreTheme/', '', $themeId);
            $this->user->theme_id = $themeId;
            $this->user->save();
        }
    }

    
    // public function handleInstallMail()
    // {
    //     $graphqlEndpoint = "https://$shopDomain/admin/api/2024-07/graphql.json";

    //     // Headers for Shopify API request
    //     $customHeaders = [
    //         'X-Shopify-Access-Token' => $this->user['password'],
    //     ];

    //     $query = <<<GRAPHQL
    //         {
    //             shop {
    //                 name
    //                 email
    //                 id
    //             }
    //         }
    //         GRAPHQL;

    //     // Make HTTP POST request to Shopify GraphQL endpoint
    //     $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
    //         'query' => $query,
    //     ]);

    //     $jsonResponse = $response->json();

    //     $name = explode('@', $this->user['name'])[0];

    //     $emailDataMail = null;
    //     $emailData1Mail = null;

    //     if(app()->environment('local')) {
    //         $emailDataMail = "kaushik.panot@meetanshi.com";
    //         $emailData1Mail = "krishna.patel@meetanshi.com";
    //     } else {
    //         $emailDataMail = $jsonResponse['data']['shop']['email'] ?? "sanjay@meetanshi.com";
    //         $emailData1Mail = "sanjay@meetanshi.com";
    //     }

    //     if ($this->user['name']) {

    //         $emailData = [
    //             "cc" => $emailData1Mail,
    //             "to" => $emailDataMail,
    //             'name' => $name,
    //             'shopDomain' => $this->user['name'],
    //         ];

    //         // SendEmailJob::dispatch($emailData, InstallMail::class);

    //     } else {
    //         Log::warning('User not found for shop domain: ' . $this->user['name']);
    //     }


    //     return response()->json(['message' => 'Install mail sent successfully'], 200);
    // }

}
