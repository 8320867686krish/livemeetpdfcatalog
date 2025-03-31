<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo e(\Osiset\ShopifyApp\Util::getShopifyConfig('app_name')); ?></title>
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
    <?php echo $__env->yieldContent('styles'); ?>
    <meta name="shopify-api-key" content="67c6b06a5ed3454e8ce7ef18faed64ee" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
</head>
<body>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var shopHost = "<?php echo e($host); ?>";
            if (shopHost) {
                localStorage.setItem('host', shopHost);
            }
        });
    </script>
    <div id="loader" class="loader"></div>
    <div class="app-wrapper">
        <div class="app-content">
            <main role="main">
                <div id="main" data-shopid="<?php echo e($shop); ?>"></div>
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

    <script src="<?php echo e(url('/js/app.js?v=230')); ?>"></script>

    <?php echo $__env->yieldContent('scripts'); ?>
</body>

</html><?php /**PATH /opt/lampp/htdocs/pdfCatelog/livemeetpdfcatalog/resources/views/welcome.blade.php ENDPATH**/ ?>