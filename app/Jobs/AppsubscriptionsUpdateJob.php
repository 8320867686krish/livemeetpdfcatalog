<?php

namespace App\Jobs;

use App\Models\Settings;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AppsubscriptionsUpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        header('Content-Type: application/json'); // Assuming you are sending JSON data

        $headers = getallheaders();
        $shop = $headers['X-Shopify-Shop-Domain'];
        $data = file_get_contents('php://input');
        $data_json = json_decode($data, true);
        $plan = DB::table('plans')->where('name', 'Free')->first();
        $shop_id = User::where('name', $shop)->pluck('id')->first();
        $latestRecords = Settings::where('shop_id', $shop_id)
            ->orderByDesc('created_at')
            ->take($plan->catelog_limit)
            ->pluck('id')
            ->toArray();
        if (!empty($data_json['app_subscription'])) {
            $data = $data_json['app_subscription'];

            $status = $data['status'];
            $charge_id = str_replace('gid://shopify/AppSubscription/', '', $data['admin_graphql_api_id']);
            DB::table('charges')->where('charge_id', $charge_id)->update(['status' => $status]);
            $chargesData = DB::table('charges')->where('user_id', $shop_id)->first();

        }
    }
}
