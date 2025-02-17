<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Osiset\ShopifyApp\Contracts\ShopModel as IShopModel;
use Osiset\ShopifyApp\Traits\ShopModel;
class User extends Authenticatable implements IShopModel
{
    use Notifiable;
    use ShopModel;
    /**
     * The attributes that are mass assignable.
     *
     * @vararray
     */
    protected $fillable = [
        'name', 'email', 'password','store_owner_email','store_name','plan_id','isPayment','theam_id','money_format','needs_update'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @vararray
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    static public function shopData($shop){
       $response =  User::where('name',$shop)->first();
       return $response;
    }
    public function catelog()
    {
        return $this->hasMany(Settings::class,'shop_id','id'); 
    }
}