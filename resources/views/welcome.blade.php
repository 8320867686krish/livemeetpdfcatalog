<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ \Osiset\ShopifyApp\Util::getShopifyConfig('app_name') }}</title>
    <style>
        .loader {
            border: 8px solid #f3f3f3;
            /* Light grey */
            border-top: 8px solid #3498db;
            /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            /* Negative half of the width */
            margin-top: -25px;
            /* Negative half of the height */
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    @yield('styles')
    api_key
    <meta name="shopify-api-key" content="{{config('shopify.api_key')}}" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
</head>


<body>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var shopHost = "{{$host}}";
            if (shopHost) {
                localStorage.setItem('host', shopHost);
            }
        });
    </script>
    <div id="loader" class="loader"></div>
    <div class="app-wrapper">
        <div class="app-content">
            <main role="main">

                <div id="main" data-shopid="{{ $shop }}"></div>
            </main>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var loader = document.getElementById("loader");
            loader.style.display = "block"; // Show the loader
        });

        // Hide the loader when your content has finished loading (for example, in your app.js)
        window.addEventListener("load", function() {

            var loader = document.getElementById("loader");

            loader.style.display = "none"; // Hide the loader
        });
    </script>

    <script src="{{ mix('js/app.js?v=9999') }}"></script>

    @yield('scripts')
</body>

</html>