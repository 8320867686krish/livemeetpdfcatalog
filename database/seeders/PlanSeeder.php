<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Osiset\ShopifyApp\Storage\Models\Plan as PlanModel;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $planData = [
            'type' => 'RECURRING',
            'name' => 'Free',
            'price' =>  0.00, // 'week', 'month', or 'year'
            'interval' => 'EVERY_7_DAYS',
            'capped_amount' => 0.00,
            'terms' => '
            2 catalogs
            5 pages per catalog\n
            15 products to catalog\n
            2 or 3 product layout\n
            ',
            'trial_days' => 0,
            'test' => 1,
            'on_install' => 1,
            'catelog_limit' => 2,
            'catelog_page_limit' => 5,
            'catelog_product_limit' => 15,
            'layout_limit' => 3,
            'font_limit' => 'false',
            'barcode' => 'false',
            'isAddFrontBack' => 'false',
            'isFree' => 1

            // Add other plan attributes as needed
        ];

        // Make an API call to Shopify to create the plan
        $response = planModel::create($planData);

        // Process the response if needed and store any relevant data in the database
        // For example, you might store the plan ID returned by Shopify in your database
        $planId = $response['id'];

        $planData = [
            'type' => 'RECURRING',
            'name' => 'Basic',
            'price' => 4.99, // 'week', 'month', or 'year'
            'interval' => 'EVERY_30_DAYS',
            'capped_amount' => 4.99,
            'terms' => '50 catalogs \n
            Unlimited pages per catalog\n
            50 products to catalog\n
            5 or 6 product layout\n
            Unlimited font\n
            Barcode\n
            Add front/back cover\n
            ',
            'trial_days' => 0,
            'test' => 1,
            'on_install' => 1,
            'catelog_limit' => 50,
            'catelog_page_limit' => 'true',
            'catelog_product_limit' => 50,
            'layout_limit' => 6,
            'font_limit' => 'true',
            'barcode' => 'true',
            'isAddFrontBack' => 'true',
            'isFree' => 0

            // Add other plan attributes as needed
        ];

        // Make an API call to Shopify to create the plan
        $response = planModel::create($planData);

        // Process the response if needed and store any relevant data in the database
        // For example, you might store the plan ID returned by Shopify in your database
        $planId = $response['id'];

        $planData = [
            'type' => 'RECURRING',
            'name' => 'Premium',
            'price' => 8.99, // 'week', 'month', or 'year'
            'interval' => 'ANNUAL',
            'capped_amount' => 8.99,
            'terms' => 'Unlimited catalogs\n
                Unlimited pages per catalog\n
                Unlimited products per catalog\n
                Unlimited product layout\n
                Unlimited font\n
                Barcode\n
                Add front/back cover\n
            ',
            'trial_days' => 0,
            'test' => 1,
            'on_install' => 1,
            'catelog_limit' => 'true',
            'catelog_page_limit' => 'true',
            'catelog_product_limit' => 'true',
            'layout_limit' => 'true',
            'font_limit' => 'true',
            'barcode' => 'true',
            'isAddFrontBack' => 'true',
            'isFree' => 0
            // Add other plan attributes as needed
        ];

        // Make an API call to Shopify to create the plan
        $response = planModel::create($planData);
    }
}
