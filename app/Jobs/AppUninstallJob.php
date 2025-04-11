<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\CollectionProducts;
use App\Models\Settings;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\Uninstall;
use Illuminate\Support\Facades\DB;

class AppUninstallJob implements ShouldQueue
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
        //
        $data = file_get_contents('php://input');
        $data_json = json_decode($data, true);
        \Log::info($data_json);
        $to = $data_json['email'];
        $name = $data_json['shop_owner'];
        $shopDomain = $data_json['myshopify_domain'];
        $user = User::where('name',$shopDomain)->first();
        $user->password  = "";
        $user->plan_id = NULL;
        $user->isPayment = 0;
        DB::table('charges')->where('user_id',$user['id'])->delete();
        CollectionProducts::where('shop_id',$user['id'])->delete();
        Settings::where('shop_id',$user->id)->delete();
        $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $user['id'];
       if (\File::exists($shopFolder)) \File::deleteDirectory($shopFolder);


     //   Mail::to($to)->send(new Uninstall($name));

        $user->save();                
    }
}
