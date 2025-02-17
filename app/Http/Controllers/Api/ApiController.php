<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChunkPdf;
use App\Models\CollectionProducts;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
class ApiController extends Controller
{
    //
    public function settingSave(Request $request)
    {
        $post = $request->input();

        $shop = base64_decode($request->header('token'));
        $userData = User::withCount('catelog')->where('name', $shop)->first();
        $checkPlan = DB::table('plans')->where('id', $userData['plan_id'])->first();
        if ($post['id'] == 0) {
            if ($checkPlan) {
                if ($userData['catelog_count'] >= $checkPlan->catelog_limit) {
                    return response()->json(['message' => 'Your Limit Has Been Reached', 'responseCode' => 0, 'errorCode' => 0, 'data' => []]);
                }
            }
        }
        $settingsData = Settings::find($post['id']);
        $post['shop_id'] = $userData['id'];
        if (@$post['logo'] && str_contains($post['logo'], 'data:image')) {
            $png_url = "logo-" . time() . ".jpg";
            $path = public_path() . "/uploads/logo/" . $png_url;
            $shopFolder = public_path() . "/uploads/logo";

            if (!file_exists($shopFolder)) {
                mkdir($shopFolder, 0777, true);
            }
            $img = $post['logo'];
            $img = substr($img, strpos($img, ",") + 1);
            $logo = base64_decode($img);
            $success = file_put_contents($path, $logo);
            unset($post['logo']);
            $post['logo'] = $png_url;
            if (@$settingsData['logo']) {
                $image_path = public_path() . "/uploads/logo/" . $settingsData['logo'];
                if (file_exists($image_path)) {
                    @unlink($image_path);
                }
            }
        }

        if (@$post['frontImage'] && str_contains($post['frontImage'], 'data:image')) {
            $png_url = "FrontImage-" . time() . ".jpg";
            $path = public_path() . "/uploads/frontImage/" . $png_url;
            $shopFolder = public_path() . "/uploads/frontImage";

            if (!file_exists($shopFolder)) {
                mkdir($shopFolder, 0777, true);
            }
            $img = $post['frontImage'];
            $img = substr($img, strpos($img, ",") + 1);
            $logo = base64_decode($img);
            $success = file_put_contents($path, $logo);
            unset($post['frontImage']);

            $post['frontImage'] = $png_url;
            if (@$settingsData['frontImage']) {
                $image_path = public_path() . "/uploads/frontImage/" . $settingsData['frontImage'];
                if (file_exists($image_path)) {
                    @unlink($image_path);
                }
            }
        }

        if (@$post['backImage'] && str_contains($post['backImage'], 'data:image')) {
            $png_url = "LastImage-" . time() . ".jpg";
            $path = public_path() . "/uploads/backImage/" . $png_url;
            $shopFolder = public_path() . "/uploads/backImage";

            if (!file_exists($shopFolder)) {
                mkdir($shopFolder, 0777, true);
            }
            $img = $post['backImage'];
            $img = substr($img, strpos($img, ",") + 1);
            $logo = base64_decode($img);
            $success = file_put_contents($path, $logo);
            unset($post['backImage']);

            $post['backImage'] = $png_url;
            if (@$settingsData['backImage']) {
                $image_path = public_path() . "/uploads/backImage/" . $settingsData['backImage'];
                if (file_exists($image_path)) {
                    @unlink($image_path);
                }
            }
        }
        if (@$post['isUpload'] && $post['isUpload'] == 1) {

            if (@$post['pdfUrl'] && str_contains($post['pdfUrl'], 'data:application/pdf')) {
                $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $post['shop_id'];

                if (!file_exists($shopFolder)) {
                    mkdir($shopFolder, 0777, true);
                }
                // $collectionFolder = publicpath() . "/uploads/pdfFile/collections".$post['collectionName'];
                $collectionFolder = $shopFolder . "/collections_" . $post['collectionName'];
                if (!file_exists($collectionFolder)) {
                    mkdir($collectionFolder, 0777, true);
                }
                $png_url = "PDF-" . $post['collectionName'] . time() . ".pdf";

                $path = $collectionFolder . "/" . $png_url;
                $img = $post['pdfUrl'];
                $img = substr($img, strpos($img, ",") + 1);
                $logo = base64_decode($img);
                $success = file_put_contents($path, $logo);
                unset($post['pdfUrl']);

                $post['pdfUrl'] = $png_url;
                if (@$settingsData['pdfUrl']) {
                    $image_path = $collectionFolder . "/" . $settingsData['pdfUrl'];
                    if (file_exists($image_path)) {
                        @unlink($image_path);
                    }
                }
            }
        } else {
            $post['pdfUrl'] = null;
        }

        $dataToUpdate = Arr::except($post, ['selectedProducts']);
        if ($post['enabled'] == 1) {
            Settings::where('shop_id', $post['shop_id'])->where('collectionId', $post['collectionId'])->update(['enabled' => 0]);
        }
        $saveData = Settings::updateOrCreate(['id' => $dataToUpdate['id']], $dataToUpdate);
        //now get shop_id and collectionId wise get data
        $collectionId = $post['collectionId'];
        $checkProducts = CollectionProducts::where('shop_id', $post['shop_id'])->where('settings_id', $saveData->id);
        if ($checkProducts) {
            $checkProducts->delete();
        }
        if (@$post['selectedProducts']) {
            foreach ($post['selectedProducts'] as $value) {
                CollectionProducts::create([
                    'settings_id' => $saveData->id,
                    'product_id' => $value['id'],
                    'shop_id' => $post['shop_id'],
                    'title' => $value['title'],
                    'image' => $value['image'],
                    'desc' => $value['description'],
                    'price' => $value['price'],
                    'compareAtPrice' => $value['compareAtPrice'] ?? "",
                    'sku' => $value['sku'],
                    'store_url' => @$value['storeurl'] ? $value['storeurl'] : null,
                    'barcode' => @$value['barcode'] ? $value['barcode'] : null,
                ]);
            }
        }
        return response()->json(['message' => 'Catalog saved successfully.', 'setting_id' => $saveData->id, 'logo' => $saveData->logo, 'frontImage' => $saveData->frontImage, 'backImage' => $saveData->backImage, 'responseCode' => 1, 'errorCode' => 0]);
    }
    public function settingGet(Request $request,$id)
    {
        $data = Settings::with('products')->where('id', $id)->first();
        $shop = base64_decode($request->header('token'));
        $shop_id = User::where('name', $shop)->pluck('id')->first();
        if($shop_id == $data['shop_id']){
        if ($data) {
            $products = $data->products->map(function ($product) {
                // Include the desired fields from the "products" relationship
                return [
                    'id' => $product->product_id,
                    'title' => $product->title,
                    'image' => $product->image,
                    'description' => $product->desc ?? '', // Set a blank value if null
                    'sku' => $product->sku ?? '', // Set a blank value if null
                    'price' => $product->price,
                    'storeurl' => $product->store_url,
                    'barcode' => $product->barcode,
                     'compareAtPrice' => $product->compareAtPrice ?? "",
                    // Add more fields as needed
                ];
            });

            $dataArray = $data->toArray();

            unset($dataArray['products']);
            $dataArray['selectedProducts'] = $products;
            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'no', 'data' => $dataArray], 200);
        } else {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => 'no', 'data' => []]);
        }
        }else{
                        return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => 'Permission Denide', 'data' => []]);

        }
    }
    public function collectionsGet(Request $request)
    {
        $shop = base64_decode($request->header('token'));
        $post = $request->input();
        $token = User::where('name', $shop)->pluck('password')->first();

        $query = '{
            collections(sortKey: UPDATED_AT, reverse: false, first: 100) {

                edges {
                    node {
                        id
                        handle,
                        title,
                        description,
                        descriptionHtml,
                        image{
                            url
                        }
                        seo {
                            description
                            title
                          }
                    }
                }

            }
        }';
        // GraphQL endpoint URL
        $graphqlEndpoint = 'https://' . $shop . '/admin/api/2023-10/graphql.json'; // Replace with your actual GraphQL endpoint URL
        $customHeaders = [
            'X-Shopify-Access-Token' => $token, // Replace with your actual authorization token
        ];

        // Send a cURL request to the GraphQL endpoint
        $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
            'query' => $query,
        ]);

        // Get the JSON response
        $jsonResponse = $response->json();
        if (@$jsonResponse['data']) {
            $collections_array = [];
            foreach (@$jsonResponse['data']['collections']['edges'] as $value) {
                $item_array = [];
                $item_array['value'] = str_replace('gid://shopify/Collection/', '', $value['node']['id']);

                $title = $value['node']['title'];
                $item_array['label'] = ucfirst($title); // Capitalize the first character of the title

                $collections_array[] = $item_array; // Use [] to push $item_array into $collections_array
            }
            $responseCode = 1;
            $message = "suceess";
            $data['collections'] = $collections_array;
        } else {
            $responseCode = 0;
            $message = $jsonResponse['errors'] ?? 'no';
            $data['collections'] = [];
        }

        return response()->json(['responseCode' => $responseCode, 'errorCode' => 0, 'message' => $message, 'data' => $data]);
    }
    // public function collectionProductGet(Request $request)
    // {
    //     $shop = base64_decode($request->header('token'));
    //     $post = $request->input();
    //     $token = User::where('name', $shop)->pluck('password')->first();
    //     $queryparam = $request->input('query');

    //     $shopUrl = "https://" . $shop . "/admin/api/2023-10/shop.json";
    //     $customHeaders = [
    //         'X-Shopify-Access-Token' => $token, // Replace with your actual authorization token
    //     ];
    //     // Send a cURL request to the GraphQL endpoint
    //     $shopDetailResponse = Http::withHeaders($customHeaders)->get($shopUrl);
    //     $shopJsonResponse = $shopDetailResponse->json();
    //     $priceFormat = $shopJsonResponse['shop']['money_with_currency_in_emails_format'];

    //     if (isset($post['endCursor'])) {
    //         $querystring = "first: 50, after: \"" . $post['endCursor'] . "\"";
    //     } elseif (isset($post['startCursor'])) {
    //         $querystring = "last: 50, before: \"" . $post['startCursor'] . "\"";
    //     } else {

    //         $querystring = "first:50";
    //     }
    //     if (isset($post['query'])) {
    //         $queryParam = '*' . $post['query'] . '*';
    //     } else {
    //         $queryParam = '';
    //     }
    //     $collectionId = $post['collectionId'];
    //     if (!@$queryparam && $collectionId != 0) {
    //         $query = '{
    //             collection(id: "gid://shopify/Collection/'.$collectionId.'") {
    //                 id
    //                 title
    //                 products(' . $querystring . ') {
    //                     pageInfo {
    //                         hasNextPage
    //                         hasPreviousPage
    //                         endCursor
    //                         startCursor
    //                     }
    //                     edges {
    //                         node {
    //                             id
    //                             title
    //                             description
    //                             onlineStorePreviewUrl
    //                             images(first: 1) {
    //                                 edges {
    //                                     node {
    //                                         originalSrc
    //                                     }
    //                                 }
    //                             }
    //                             variants(first: 6) {
    //                                 pageInfo {
    //                                     hasNextPage
    //                                     hasPreviousPage
    //                                     endCursor
    //                                     startCursor
    //                                 }
    //                                 edges {
    //                                     node {
    //                                         id
    //                                         title
    //                                         price
    //                                         compareAtPrice
    //                                         sku
    //                                         barcode
    //                                         image {
    //                                             originalSrc
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }';
    //     } else {
    //         $query = '{
    //             products(' . $querystring . ($queryparam ? ', query: "title:*' . $queryparam . '*"' : '') . ') {
    //                 pageInfo {
    //                     hasNextPage
    //                     hasPreviousPage
    //                     endCursor
    //                     startCursor
    //                 }
    //                 edges {
    //                     node {
    //                         id
    //                         title
    //                         description
    //                         onlineStorePreviewUrl
    //                         images(first: 1) {
    //                             edges {
    //                                 node {
    //                                     originalSrc
    //                                 }
    //                             }
    //                         }
    //                         variants(first: 6) {
    //                             pageInfo {
    //                                 hasNextPage
    //                                 hasPreviousPage
    //                                 endCursor
    //                                 startCursor
    //                             }
    //                             edges {
    //                                 node {
    //                                     id
    //                                     title
    //                                     price
    //                                     compareAtPrice
    //                                     sku
    //                                     barcode
    //                                     image {
    //                                         originalSrc
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }';
    //     }

    //     $graphqlEndpoint = 'https://' . $shop . '/admin/api/2023-10/graphql.json'; // Replace with your actual GraphQL endpoint URL
    //     $customHeaders = [
    //         'X-Shopify-Access-Token' => $token, // Replace with your actual authorization token
    //     ];
    //     // Send a cURL request to the GraphQL endpoint
    //     $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
    //         'query' => $query,
    //     ]);
    //     // Get the JSON response
    //     $jsonResponse = $response->json();
    //     if (@$jsonResponse['data']) {
    //         $collections_array = [];

    //         if ($jsonResponse['data']['products'] ?? $jsonResponse['data']['collection']['products']) {
    //             $collestionloopdata = @$jsonResponse['data']['products']['edges'] ?? @$jsonResponse['data']['collection']['products']['edges'];
    //             $pageData = $jsonResponse['data']['products'] ?? $jsonResponse['data']['collection']['products'];
    //             if (@$collestionloopdata) {
    //                 foreach (@$collestionloopdata as $value) {

    //                     $minPriceSku = null;

    //                     $item_array = [];
    //                     $variants = $value['node']['variants']['edges'];
    //                     $variants = array_map(function ($variant) {
    //                         $variant['node']['compareAtPrice'] = $variant['node']['compareAtPrice'] ?? "0";
    //                         return $variant;
                            
    //                     }, $variants);

    //                     // If there are more variants, recursively fetch them
    //                     while ($value['node']['variants']['pageInfo']['hasNextPage']) {
    //                         $nextPage = $value['node']['variants']['pageInfo']['endCursor'];

    //                         $queryVariant = '{
    //                             product(id:"' . $value["node"]["id"] . '") {
    //                                 variants(first: 94, after: "' . $nextPage . '") {
    //                                     pageInfo {
    //                                         hasNextPage
    //                                         hasPreviousPage
    //                                         endCursor
    //                                         startCursor
    //                                     }
    //                                     edges {
    //                                         node {
    //                                             id
    //                                             title
    //                                             price
    //                                             compareAtPrice
    //                                             sku
    //                                             barcode
    //                                             image {
    //                                                 originalSrc
    //                                               }
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         }';

    //                         $responseVariant = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
    //                             'query' => $queryVariant,
    //                         ]);

    //                         $jsonResponseVariant = $responseVariant->json();

    //                         if (isset($jsonResponseVariant['data']['product']['variants'])) {
    //                             $variants = array_merge($variants, $jsonResponseVariant['data']['product']['variants']['edges']);
    //                         }

    //                         $value['node']['variants']['pageInfo'] = $jsonResponseVariant['data']['product']['variants']['pageInfo'];
    //                     }

    //                     $item_array['id'] = str_replace('gid://shopify/Product/', '', $value['node']['id']);

    //                     $title = $value['node']['title'];
    //                     $item_array['title'] = ucfirst($title); // Capitalize the first character of the title

    //                     if (isset($value['node']['images']['edges'][0]['node']['originalSrc'])) {
    //                         $item_array['image'] = $value['node']['images']['edges'][0]['node']['originalSrc'];
    //                     } else {
    //                         $item_array['image'] = ''; // Assign null or any default value for missing image
    //                     }

    //                     $item_array['description'] = $value['node']['description'];
    //                     $item_array['storeurl'] = $value['node']['onlineStorePreviewUrl'];
    //                     $item_array['sku'] = (@$value['node']['variants']['edges'][0]['node']['sku']) ? @$value['node']['variants']['edges'][0]['node']['sku'] : "";
    //                     $item_array['barcode'] = $value['node']['variants']['edges'][0]['node']['barcode'];
    //                     $item_array['variants'] = $variants;

    //                     $priceValue = $value['node']['variants']['edges'][0]['node']['price'];
                      
    //                   if($value['node']['variants']['edges'][0]['node']['compareAtPrice']){
    //                           $comparePrice = $value['node']['variants']['edges'][0]['node']['compareAtPrice'];
    //                           $formattedComparePrice = @$this->formatMoney($comparePrice, $priceFormat) ?? "0";
    //                     }else{
    //                       $comparePrice ="0.00";
    //                              $formattedComparePrice = "0.00";
    //                     }
    //                     $formattedPrice = $this->formatMoney($priceValue, $priceFormat);
                       
    //                     $item_array['price'] = $formattedPrice;
    //                     $item_array['orignalPrice'] = $priceValue;
    //                     $collections_array[] = $item_array; // Use [] to push $item_array into $collections_array
                        
    //                     $item_array['compareAtPrice'] =     $formattedComparePrice;
    //                     $item_array['orignalcompareAtPrice'] = $comparePrice;
    //                     $data['products'] = $collections_array;
    //                     $data['hasNextPage'] = $pageData['pageInfo']['hasNextPage'];

    //                     $data['hasPreviousPage'] = $pageData['pageInfo']['hasPreviousPage'];
    //                     $data['endCursor'] = $pageData['pageInfo']['endCursor'];
    //                     $data['startCursor'] = $pageData['pageInfo']['startCursor'];
    //                     $responseCode = 1;
    //                     $message = 'success';
    //                 }
    //             } else {
    //                 $message = $jsonResponse['errors'] ?? 'no';

    //                 $responseCode = 0;
    //                 $data['products'] = [];
    //             }
    //         } else {
    //             $message = $jsonResponse['errors'] ?? 'no';

    //             $responseCode = 0;
    //             $data['products'] = [];
    //         }
    //     } else {
    //         $message = $jsonResponse['errors'] ?? 'no';

    //         $responseCode = 0;
    //         $data['products'] = [];
    //     }
    //     return response()->json(['responseCode' => $responseCode, 'errorCode' => 0, 'message' => $message, 'data' => $data, 'priceFormate' => $priceFormat]);
    // }
      public function collectionProductGet(Request $request)
    {
        $shop = base64_decode($request->header('token'));
        $post = $request->input();
        $token = User::where('name', $shop)->pluck('password')->first();
        $queryparam = $request->input('query');

        $shopUrl = "https://" . $shop . "/admin/api/2023-10/shop.json";
        $customHeaders = [
            'X-Shopify-Access-Token' => $token, // Replace with your actual authorization token
        ];
        // Send a cURL request to the GraphQL endpoint
        $shopDetailResponse = Http::withHeaders($customHeaders)->get($shopUrl);
        $shopJsonResponse = $shopDetailResponse->json();
        $priceFormat = $shopJsonResponse['shop']['money_with_currency_in_emails_format'];

        if (isset($post['endCursor'])) {
            $querystring = "first: 50, after: \"" . $post['endCursor'] . "\"";
        } elseif (isset($post['startCursor'])) {
            $querystring = "last: 50, before: \"" . $post['startCursor'] . "\"";
        } else {

            $querystring = "first:50";
        }
        if (isset($post['query'])) {
            $queryParam = '*' . $post['query'] . '*';
        } else {
            $queryParam = '';
        }
        $collectionId = $post['collectionId'];
        if (!@$queryparam && $collectionId != 0) {
            $query = '{
                collection(id: "gid://shopify/Collection/' . $collectionId . '") {
                    id
                    title
                    products(' . $querystring . ') {
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                            endCursor
                            startCursor
                        }
                        edges {
                            node {
                                id
                                title
                                description
                                onlineStorePreviewUrl
                                images(first: 1) {
                                    edges {
                                        node {
                                            originalSrc
                                        }
                                    }
                                }
                                variants(first: 6) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                        endCursor
                                        startCursor
                                    }
                                    edges {
                                        node {
                                            id
                                            title
                                            price
                                            compareAtPrice
                                            sku
                                            barcode
                                            image {
                                                originalSrc
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }';
        } else {
            $query = '{
                products(' . $querystring . ($queryparam ? ', query: "title:*' . $queryparam . '*"' : '') . ') {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        endCursor
                        startCursor
                    }
                    edges {
                        node {
                            id
                            title
                            description
                            onlineStorePreviewUrl
                            images(first: 1) {
                                edges {
                                    node {
                                        originalSrc
                                    }
                                }
                            }
                            variants(first: 6) {
                                pageInfo {
                                    hasNextPage
                                    hasPreviousPage
                                    endCursor
                                    startCursor
                                }
                                edges {
                                    node {
                                        id
                                        title
                                        price
                                        compareAtPrice
                                        sku
                                        barcode
                                        image {
                                            originalSrc
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }';
        }

        $graphqlEndpoint = 'https://' . $shop . '/admin/api/2023-10/graphql.json'; // Replace with your actual GraphQL endpoint URL
        $customHeaders = [
            'X-Shopify-Access-Token' => $token, // Replace with your actual authorization token
        ];
        // Send a cURL request to the GraphQL endpoint
        $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
            'query' => $query,
        ]);
        // Get the JSON response
        $jsonResponse = $response->json();
        if (@$jsonResponse['data']) {
            $collections_array = [];

            if ($jsonResponse['data']['products'] ?? $jsonResponse['data']['collection']['products']) {
                $collestionloopdata = @$jsonResponse['data']['products']['edges'] ?? @$jsonResponse['data']['collection']['products']['edges'];
                $pageData = $jsonResponse['data']['products'] ?? $jsonResponse['data']['collection']['products'];
                if (@$collestionloopdata) {
                    foreach (@$collestionloopdata as $value) {

                        $minPriceSku = null;

                        $item_array = [];
                        $variants = $value['node']['variants']['edges'];

                        // If there are more variants, recursively fetch them
                        while ($value['node']['variants']['pageInfo']['hasNextPage']) {
                            $nextPage = $value['node']['variants']['pageInfo']['endCursor'];

                            $queryVariant = '{
                                product(id:"' . $value["node"]["id"] . '") {
                                    variants(first: 94, after: "' . $nextPage . '") {
                                        pageInfo {
                                            hasNextPage
                                            hasPreviousPage
                                            endCursor
                                            startCursor
                                        }
                                        edges {
                                            node {
                                                id
                                                title
                                                price
                                                compareAtPrice
                                                sku
                                                barcode
                                                image {
                                                    originalSrc
                                                  }
                                            }
                                        }
                                    }
                                }
                            }';

                            $responseVariant = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
                                'query' => $queryVariant,
                            ]);

                            $jsonResponseVariant = $responseVariant->json();

                            if (isset($jsonResponseVariant['data']['product']['variants'])) {
                                $variants = array_merge($variants, $jsonResponseVariant['data']['product']['variants']['edges']);
                            }

                            $value['node']['variants']['pageInfo'] = $jsonResponseVariant['data']['product']['variants']['pageInfo'];
                        }

                        $item_array['id'] = str_replace('gid://shopify/Product/', '', $value['node']['id']);

                        $title = $value['node']['title'];
                        $item_array['title'] = ucfirst($title); // Capitalize the first character of the title

                        if (isset($value['node']['images']['edges'][0]['node']['originalSrc'])) {
                            $item_array['image'] = $value['node']['images']['edges'][0]['node']['originalSrc'];
                        } else {
                            $item_array['image'] = '55'; // Assign null or any default value for missing image
                        }

                        $item_array['description'] = $value['node']['description'];
                        $item_array['storeurl'] = $value['node']['onlineStorePreviewUrl'];
                        $item_array['sku'] = (@$value['node']['variants']['edges'][0]['node']['sku']) ? @$value['node']['variants']['edges'][0]['node']['sku'] : "";
                        $item_array['barcode'] = $value['node']['variants']['edges'][0]['node']['barcode'];
                        $item_array['variants'] = $variants;

                        $priceValue = $value['node']['variants']['edges'][0]['node']['price'];
                        $comparePrice = $value['node']['variants']['edges'][0]['node']['compareAtPrice'];

                        $formattedPrice = $this->formatMoney($priceValue, $priceFormat);
                        $formattedComparePrice = $this->formatMoney($comparePrice, $priceFormat);

                        $item_array['price'] = $formattedPrice;
                        $item_array['orignalPrice'] = $priceValue;

                        $item_array['compareAtPrice'] = $formattedComparePrice;
                        $item_array['orignalcompareAtPrice'] = $comparePrice;
                        $collections_array[] = $item_array; // Use [] to push $item_array into $collections_array

                        $data['products'] = $collections_array;
                        $data['hasNextPage'] = $pageData['pageInfo']['hasNextPage'];

                        $data['hasPreviousPage'] = $pageData['pageInfo']['hasPreviousPage'];
                        $data['endCursor'] = $pageData['pageInfo']['endCursor'];
                        $data['startCursor'] = $pageData['pageInfo']['startCursor'];
                        $responseCode = 1;
                        $message = 'success';
                    }
                } else {
                    $message = $jsonResponse['errors'] ?? 'no';

                    $responseCode = 0;
                    $data['products'] = [];
                }
            } else {
                $message = $jsonResponse['errors'] ?? 'no';

                $responseCode = 0;
                $data['products'] = [];
            }
        } else {
            $message = $jsonResponse['errors'] ?? 'no';

            $responseCode = 0;
            $data['products'] = [];
        }
        return response()->json(['responseCode' => $responseCode, 'errorCode' => 0, 'message' => $message, 'data' => $data, 'priceFormate' => $priceFormat]);
    }

    public function formatMoney($price, $format)
    {

        $placeholders = [
            'amount' => number_format($price, 2),
            'amount_no_decimals' => number_format($price, 0),
            'amount_with_comma_separator' => number_format($price, 2, '.', ','),
            'amount_no_decimals_with_comma_separator' => number_format($price, 0, '.', ','),
        ];

        // foreach ($placeholders as $placeholder => $value) {
        //     $format = str_replace('{{' . $placeholder . '}}', $value, $format);
        // }
        $placeholders = [
            'amount' => number_format($price, 2),
            'amount_no_decimals' => number_format($price, 0),
            'amount_with_comma_separator' => number_format($price, 2, '.', ','),
            'amount_no_decimals_with_comma_separator' => number_format($price, 0, '.', ','),
        ];

        // Use a regular expression to find placeholders with optional spaces
        $pattern = '/\{\{\s*(amount|amount_no_decimals|amount_with_comma_separator|amount_no_decimals_with_comma_separator)\s*\}\}/';


        // Replace the placeholders in the format string
        $format = preg_replace_callback($pattern, function ($matches) use ($placeholders) {
            return $placeholders[$matches[1]];
        }, $format);
        return $format;
    }

    public function pdfCollections(Request $request)
    {
        $shop = base64_decode($request->header('token'));
        $post = $request->input();
        $user = User::where('name', $shop)->first();
        $shop_id = $user['id'];
        $ChargerData = DB::table('charges')->where('user_id', $shop_id)->first();

        $plan = DB::table('plans')->where('name', 'Free')->first();
        $hostParts = explode('.', $user['name']);

        $query = '{
            collections(sortKey: UPDATED_AT, reverse: true, first: 1) {

                edges {
                    node {
                        id
                        handle
                    }
                }

            }
        }';
        // GraphQL endpoint URL
        $graphqlEndpoint = 'https://' . $shop . '/admin/api/2023-10/graphql.json'; // Replace with your actual GraphQL endpoint URL
        $customHeaders = [
            'X-Shopify-Access-Token' => $user['password'], // Replace with your actual authorization token
        ];

        // Send a cURL request to the GraphQL endpoint
        $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, [
            'query' => $query,
        ]);

        // Get the JSON response
        $jsonResponse = $response->json();
        $colletionNam = $jsonResponse['data']['collections']['edges'][0]['node']['handle'];
        if (@$colletionNam) {
            $theam_setting = "https://admin.shopify.com/store/" . $hostParts[0] . "/themes/" . $user['theam_id'] . "/editor?customCss=true&previewPath=%2Fcollections" . "/" . $colletionNam;
        } else {
            $theam_setting = "https://admin.shopify.com/store/" . $hostParts[0] . "/themes/" . $user['theam_id'] . "/editor?customCss=true&previewPath=%2Fcollections";
        }


        $settingsData = Settings::select('id', 'shop_id', 'collectionId', 'enabled', 'isPdf', 'collectionName', 'pdfUrl','flipId')
            ->where('shop_id', $shop_id)
            ->orderBy('id', 'desc')
            ->get();
        $data['pdfCollections'] = $settingsData;
        $chkUser = \DB::table('users')
            ->where('name', $shop)
            ->where('updated_at', '>', now()->subSeconds(20))
            ->where('isPayment', 1)
            ->first();
        if (@$ChargerData) {
            if (strtolower($ChargerData->status) != 'active' && $ChargerData->price != 0.00) {

                $responseData = (@$settingsData) ? $data : [];
                return response()->json(['responseCode' => 0, 'errorCode' => 101, 'message' => 'Your Plan has been Expired', 'isPayment' => false, 'data' => $responseData]);
            }
        }
        if ($chkUser) {
            $messgae = "Your plan has been changed successfully!";
            $isPayment = true;
        } else {

            $messgae = (@$settingsData) ? "Found data successfully!!" : "Not found data successfully!!";
            $isPayment = false;
        }
        if ($settingsData) {

            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => $messgae, 'isPayment' => $isPayment, 'data' => $data, 'theam_setting_url' => $theam_setting]);
        } else {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => $message, 'isPayment' => $isPayment, 'data' => [], 'theam_setting_url' => $theam_setting]);
        }
    }

    public function pdfCollectionStatus(Request $request)
    {
        $enabled = $request->input('status');
        $Ids = $request->input('Ids');

        try {
            foreach ($Ids as $value) {
                $settings = Settings::findOrFail($value);
                if ($settings) {
                    $settings->enabled = $enabled;
                    $settings->save();
                }
            }
            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => "Catalog status updated successfully", 'data' => []], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => "One or more collections not found", 'data' => []], 404);
        } catch (\Exception $exception) {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => "Failed to remove vollections", 'data' => []], 500);
        }
    }

    public function pdfCollectionRemove(Request $request)
    {
        $Ids = $request->input('Ids');

        try {
            foreach ($Ids as $value) {

                $settings = Settings::find($value);
                if ($settings) {
                    $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $settings['shop_id'];
                    $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $settings['shop_id'];
                    $collectionFolder = $shopFolder . "/collections_" . $settings['collectionName'];
                    $image_path = $collectionFolder . "/" . $settings['pdfUrl'];
                    if (file_exists($image_path)) {
                        @unlink($image_path);
                    }
                    $settings->delete();
                }
            }

            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => "Catalog removed successfully", 'data' => []], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $exception) {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => "One or more collections not found", 'data' => []], 404);
        } catch (\Exception $exception) {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => "Failed to remove vollections", 'data' => []], 500);
        }
    }

    public function getPlan(Request $request)
    {
        $shop = base64_decode($request->header('token'));
        $user = User::where('name', $shop)->first();
        $chargesData = DB::table('charges')->where('user_id', $user['id'])->first();

        $plans = DB::table('plans')->get();
        $planDetail = DB::table('plans')->where('id', $user->plan_id)->pluck('name')->first();

        $data['plans'] = $plans;
        $data['usersPlan'] = $user;
        $data['usersPlan']['planName'] = $planDetail;
        return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => "Succesffully Fetched", 'data' => $data]);
    }
 public function buyPlan(Request $request)
    {
        $shop = base64_decode($request->header('token'));
        $plan_id = $request->input('planId');
        $isFree = $request->input('isFree');
        $plans = DB::table('plans')->where('id', $plan_id)->first();
        $shopDetail = User::where('name', $shop)->first();

       if($isFree == 1){
            $chargeData =  DB::table('charges')->where('user_id', $shopDetail['id'])->first();
            $charge_id = $chargeData->charge_id;
            
             $graphqlEndpointRecuring = 'https://' . $shop . '/admin/api/2023-10/recurring_application_charges/'. $charge_id.'.json'; // Replace with your actual GraphQL endpoint URL
          $customHeaders = [
            'X-Shopify-Access-Token' => $shopDetail['password'], // Replace with your actual authorization token
        ];

        // Send a cURL request to the GraphQL endpoint
            $response = Http::withHeaders($customHeaders)->delete($graphqlEndpointRecuring);
              $latestRecords = Settings::where('shop_id', $shopDetail['id'])
            ->orderByDesc('created_at')
            ->take($plans->catelog_limit)
            ->pluck('id')
            ->toArray();
            $allRecords = Settings::where('shop_id', $shopDetail['id'])->where('enabled', 1)->whereNotIn('id', $latestRecords)->get();
                foreach ($allRecords as $val) {
                    $val->update(['status' => 'your_new_status']);
                    Settings::where('id', $val['id'])->update(['enabled' => 0]);
                }
             $shopDetail->plan_id = $plans->id;
            $shopDetail->save();
             DB::table('charges')->where('user_id', $shopDetail['id'])->update([
                'charge_id' => 0,
                'test' => true,
                'status' => 'active',
                'price' => $plans->price,
                'type' => $plans->type,
                'user_id' => $shopDetail['id'],
                'interval' => $plans->interval,
                'plan_id' => $plans->id,
                'trial_days' => $plans->trial_days,
                'billing_on' => date('Y-m-d H:i:s'),
                'activated_on' => date('Y-m-d H:i:s'),
                'name' => $plans->name,
            ]);
               $redirect_url = "https://" . $shopDetail['name'] . "/admin/apps/".env('SHOPIFY_APP');

           return response()->json(['responseCode' => 1, 'errorCode' => 0, 'buyUrl' => $redirect_url , 'message' => "Successfully Fetched", 'data' => []]);
       }
        $query = '
        mutation appSubscriptionCreate(
            $name: String!,
            $returnUrl: URL!,
            $trialDays: Int,
            $test: Boolean,
            $lineItems: [AppSubscriptionLineItemInput!]!
        ) {
            appSubscriptionCreate(
                name: $name,
                returnUrl: $returnUrl,
                trialDays: $trialDays,
                test: $test,
                lineItems: $lineItems
            ) {
                appSubscription {
                    id
                }
                confirmationUrl
                userErrors {
                    field
                    message
                }
            }
        }
        ';

        $variables = [
            'name' => $plans->name,
            'returnUrl' => url('/plan/process/' . $shopDetail['id'] . "/" . $plan_id),
            'trialDays' => $plans->trial_days,
            'test' => true,
            'lineItems' => [
                [
                    'plan' => [
                        'appRecurringPricingDetails' => [
                            'price' => [
                                'amount' => $plans->price,
                                'currencyCode' => 'USD',
                            ],
                            'interval' => $plans->interval,
                        ],
                    ],
                ],
            ],
        ];
        $requestBody = [
            'query' => $query,
            'variables' => $variables, // Include the variables here
        ];
        $graphqlEndpoint = 'https://' . $shop . '/admin/api/2023-10/graphql.json'; // Replace with your actual GraphQL endpoint URL
        $customHeaders = [
            'X-Shopify-Access-Token' => $shopDetail['password'], // Replace with your actual authorization token
        ];

        // Send a cURL request to the GraphQL endpoint
        $response = Http::withHeaders($customHeaders)->post($graphqlEndpoint, $requestBody);
        $jsonResponse = $response->json();
        if (@$jsonResponse['errors']) {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'messgae' => $jsonResponse['errors'], 'data' => []]);
        } else {
            $charge_id = str_replace('gid://shopify/AppSubscription/', '', $jsonResponse['data']['appSubscriptionCreate']['appSubscription']['id']);
            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'buyUrl' => $jsonResponse['data']['appSubscriptionCreate']['confirmationUrl'], 'message' => "Successfully Fetched", 'data' => []]);
        }
    }
    public function checkPlan(Request $request)
    {
        $shop = base64_decode($request->header('token'));
        $user = User::withCount('catelog')->where('name', $shop)->first();
        $data['domain'] = $user['name'];
        $ChargerData = DB::table('charges')->where([
            'plan_id' => $user['plan_id'],
            'user_id' => $user['id'],
        ])->first();
        $plan = DB::table('plans')->where('name', 'Free')->first();

        $latestRecords = Settings::where('shop_id', $user['id'])
            ->orderByDesc('created_at')
            ->take($plan->catelog_limit)
            ->pluck('id')
            ->toArray();
        if ($ChargerData) {
            if (strtolower($ChargerData->status) != 'active' && $ChargerData->price != 0.00) {

                $responseCode = 0;
                $errorCode = 101;
                $message = "Your Plan has been Expired.";
                $allRecords = Settings::where('shop_id', $user['id'])->where('enabled', 1)->whereNotIn('id', $latestRecords)->get();
                foreach ($allRecords as $val) {
                    $val->update(['status' => 'your_new_status']);
                    Settings::where('id', $val['id'])->update(['enabled' => 0]);
                }
                User::where('name', $shop)->update(['plan_id' => $plan->id]);
            } else {
                $responseCode = 1;
                $errorCode = 0;
                $message = "success";
                $chargerDataArray = (array) $ChargerData;
                $todayDate = date('Y-m-d 00:00:00');

                $trialEndDate = $chargerDataArray['trial_ends_on'];

                $charger_status = $chargerDataArray['status'];
            }
        } else {
            $responseCode = 0;
            $errorCode = 101;
            $message = "Your Plan has been Expired.";
        }
        $planDetail = DB::table('plans')->where('id', $user->plan_id)->first();
        $data['totalCatelog'] = $user['catelog_count'];

        $data['usersPlan'] = ($planDetail) ? $planDetail : [];
        return response()->json(['responseCode' => $responseCode, 'errorCode' => $errorCode, 'message' => $message, 'data' => $data]);
    }

    public function pdfShow(Request $request)
    {

        $post = $request->input();
        $collectionId = $post['collectionId'];
        $shop = $post['shop'];
        $user = User::where('name', $shop)->pluck('id')->first();
        $settings = Settings::where('shop_id', $user)->where('collectionId', $collectionId)->where('enabled', 1)->first();
        if ($settings) {
            $path = url('uploads/pdfFile/shop_' . $user . "/collections_" . $settings['collectionName'] . "/"
                . $settings['pdfUrl']);
            //return response()->download($path);
            if(@$settings['flipId']){
                $flipstatus = true;
                $flipUrl = 'https://pdf.meetanshi.work/flipBook/'.$settings['flipId'];
            }else{
                 $flipstatus = false;
            }
            return response()->json(['status' => 'true', 'pdfName' => $settings['pdfUrl'],'flipstatus'=>$flipstatus,'flipUrl'=>$flipUrl]);
        } else {
            return response()->json(['status' => 'false']);
        }
    }
    public function downloadPdf(Request $request)
    {
        $post = $request->input();
        $collectionId = $post['collectionId'];
        $shop = $post['shop'];
        $user = User::where('name', $shop)->pluck('id')->first();
        $settings = Settings::where('shop_id', $user)->where('collectionId', $collectionId)->where('enabled', 1)->first();
        if ($settings) {
            $path = public_path('uploads/pdfFile/shop_' . $user . "/collections_" . $settings['collectionName'] . "/"
                . $settings['pdfUrl']);
            return response()->download($path);
        }
    }
    public function chunkRequest(Request $request)
    {
        $post = $request->input();
        $user_id = User::where('name', $post['shop_id'])->pluck('id')->first();
        $post['shop_id'] = $user_id;
        $settingsData = Settings::find($post['settings_id']);

        ChunkPdf::create($post);
        if ($post['current_page'] == $post['total_page']) {
            $getAllRequest = ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->pluck('uploadRequest')->toArray();
            $commaSeparatedString = implode('', $getAllRequest);
            $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $post['shop_id'];

            if (!file_exists($shopFolder)) {
                mkdir($shopFolder, 0777, true);
            }
            $collectionFolder = $shopFolder . "/collections_" . $post['collection_name'];
            if (!file_exists($collectionFolder)) {
                mkdir($collectionFolder, 0777, true);
            }
            $png_url = "PDF-" . $post['collection_name'] . time() . ".pdf";
            $path = $collectionFolder . "/" . $png_url;
            $img = $commaSeparatedString;
            $img = substr($img, strpos($img, ",") + 1);
            $logo = base64_decode($img);
            $success = file_put_contents($path, $logo);
            $post['pdfUrl'] = $png_url;
            if (@$settingsData['pdfUrl']) {
                $image_path = $collectionFolder . "/" . $settingsData['pdfUrl'];
                if (file_exists($image_path)) {
                    @unlink($image_path);
                }
            }
            $settingsData->pdfUrl = $png_url;
            $settingsData->save();
            ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->delete();
        }
        return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully Upload', 'data' => []]);
    }
    
    //   public function flipPdfGenrate(Request $request, $settings_id)
    // {
    //     $post = $request->input();

    //     $user_id = User::where('name', $post['shop_id'])->pluck('id')->first();
    //     $post['shop_id'] = $user_id;
    //     ChunkPdf::create($post);

    //     $getAllRequest = ChunkPdf::where('shop_id', $user_id)->where('settings_id', $post['settings_id'])->get()->toArray();
    //     $settingsData = Settings::find($settings_id);
    //     if ($post['current_page'] == $post['total_page']) {
    //         $newJsonData = [];
           
    //         foreach ($getAllRequest as $key => $value) {
    //             $jsonData = []; // Initialize as an empty array for each iteration
          
    //             $jsonData['page'] = 'page' . $value['page']; 
    //             $jsonData['value'] = $value['uploadRequest']; 
    //             $newJsonData[] = $jsonData;
    //         }
           

    //         $jsonString = json_encode($newJsonData, JSON_PRETTY_PRINT);
    //         $base64JsonString = base64_encode($jsonString);
            
    //         Settings::where('id', $settings_id)->update(['flipHtml' => NULL]);
    //         if (@$settingsData) {
    //           $settingsData->flipHtml = $base64JsonString;
    //             $flipId = Str::random(10);
    //             $settingsData->flipId = $flipId;
    //             $settingsData->isLarge = $post['isLarge'];
    //             $settingsData->save();
    //             ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->delete();
    //           //  return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully save', 'data' => ['flipId' => $flipId]]);
    //         }
    //     }
    //     if($post['currentBase64Page'] == $post['totalBase64Page']){
    //         $concatRequest=[];
    //         foreach ($getAllRequest as $key => $value) {
    //             if($value['pdfRequest'] != NULL){
    //                 $concatRequest[]=$value['pdfRequest'];

    //             }
    //         }
    //         $commaSeparatedString = implode('', $concatRequest);
    //         $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $post['shop_id'];
    //         if (!file_exists($shopFolder)) {
    //             mkdir($shopFolder, 0777, true);
    //         }
    //         $collectionFolder = $shopFolder . "/collections_" . $post['collection_name'];
    //         if (!file_exists($collectionFolder)) {
    //             mkdir($collectionFolder, 0777, true);
    //         }
    //         $png_url = "PDF-" . $post['collection_name'] . time() . ".pdf";
    //         $path = $collectionFolder . "/" . $png_url;
    //         $img = $commaSeparatedString;
    //         $img = substr($img, strpos($img, ",") + 1);
    //         $logo = base64_decode($img);
    //         $success = file_put_contents($path, $logo);
    //         $post['pdfUrl'] = $png_url;
            
         
    //         if (@$settingsData['pdfUrl']) {
    //             $image_path = $collectionFolder . "/" . $settingsData['pdfUrl'];
    //             if (file_exists($image_path)) {
    //                 @unlink($image_path);
    //             }
    //         }
    //         $settingsData->pdfUrl = $png_url;
    //         $settingsData->save();
       
    //     }
    //     if($post['total_page'] >= $post['totalBase64Page']){
    //         if( $post['current_page'] == $post['total_page']){
    //             ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->delete();

    //             return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully save', 'data' => ['flipId' => $flipId]]);
    //         }
           

    //     }else{
    //         if($post['totalBase64Page'] == $post['currentBase64Page']){
    //             $settingsData = Settings::find($settings_id);

    //             ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->delete();
     
    //             return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully save', 'data555' => ['flipId' => $settingsData['flipId']]]);
    //         }
    //     }
    // }
    /*public function flipPdfGet($flipId)
    {
        $settingsData = Settings::where('flipId', $flipId)->first();

        $decode = base64_decode($settingsData['flipHtml']);
        if (@$settingsData) {
            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully fetch', 'data' => ['flipHtml' => $decode]]);
        } else {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => 'Not found', 'data' => []]);
        }
    }*/
     public function flipPdfGenrate(Request $request, $settings_id)
    {
        $post = $request->input();

        $user_id = User::where('name', $post['shop_id'])->pluck('id')->first();
        $post['shop_id'] = $user_id;
        ChunkPdf::create($post);

        $getAllRequest = ChunkPdf::where('shop_id', $user_id)->where('settings_id', $post['settings_id'])->get()->toArray();
        $settingsData = Settings::find($settings_id);
        if ($post['current_page'] == $post['total_page']) {

            
            if(!@$settingsData['flipId']){
                            $flipId = Str::random(10);

                   $settingsData->flipId = $flipId;
                  
            }else{
                 $flipId =  $settingsData['flipId'];
            }
              $settingsData->isLarge = $post['isLarge'];
            $settingsData->save();
            ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->delete();
          
            $concatRequest = [];
            foreach ($getAllRequest as $key => $value) {
                if ($value['pdfRequest'] != NULL) {
                    $concatRequest[] = $value['pdfRequest'];
                }
            }
            $commaSeparatedString = implode('', $concatRequest);
           
            
            $shopFolder = public_path() . "/uploads/pdfFile/shop_" . $post['shop_id'];
            if (!file_exists($shopFolder)) {
                mkdir($shopFolder, 0777, true);
            }
            $collectionFolder = $shopFolder . "/collections_" . $post['collection_name'];
            if (!file_exists($collectionFolder)) {
                mkdir($collectionFolder, 0777, true);
            }
            $png_url = "PDF-" . $post['collection_name'] . time() . ".pdf";
            $path = $collectionFolder . "/" . $png_url;
            $img = $commaSeparatedString;
            $img = substr($img, strpos($img, ",") + 1);
            $logo = base64_decode($img);
            $success = file_put_contents($path, $logo);
            $post['pdfUrl'] = $png_url;
            if (@$settingsData['pdfUrl']) {
                $image_path = $collectionFolder . "/" . $settingsData['pdfUrl'];
                if (file_exists($image_path)) {
                    @unlink($image_path);
                }
            }
            $settingsData->pdfUrl = $png_url;
            $settingsData->save();
        }
        if ($post['isLastRequest'] == true) {
          
                ChunkPdf::where('shop_id', $post['shop_id'])->where('settings_id', $post['settings_id'])->delete();
                return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully save', 'data' => ['flipId' => $flipId]]);
            
        } 
       
    }
    public function flipPdfGet($flipId)
    {
        $settingsData = Settings::where('flipId', $flipId)->first();

        $decode = base64_decode($settingsData['flipHtml']);
        if (@$settingsData) {
            return response()->json(['responseCode' => 1, 'errorCode' => 0, 'message' => 'Successfully fetch', 'data' => ['flipHtml' => $decode]]);
        } else {
            return response()->json(['responseCode' => 0, 'errorCode' => 0, 'message' => 'Not found', 'data' => []]);
        }
    }
}
