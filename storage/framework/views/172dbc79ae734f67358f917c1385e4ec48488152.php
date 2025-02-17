
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <title><?php echo e(\Osiset\ShopifyApp\Util::getShopifyConfig('app_name')); ?></title>
        <style>
        .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -25px; /* Negative half of the width */
            margin-top: -25px; /* Negative half of the height */    
       }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        </style>
        <?php echo $__env->yieldContent('styles'); ?>
       
    </head>

    <body>
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
    var shopUrl = "<?php echo e($shop_exist['name']); ?>"; // Shopify shop domain
            var installUrl = "https://" + shopUrl + "/admin/oauth/authorize?client_id=5b7fd5bcc773fe3efc10fdc89ce5e8e6&scope=read_products,write_products&redirect_uri=https://pdf.meetanshi.work/callback";
var needs_update = "<?php echo e($shop_exist['needs_update']); ?>";
if(needs_update == 1){
      window.top.location = installUrl; // Redirect to the installation URL
}
            </script>

<script src="<?php echo e(url('js/app.js?v=55561')); ?>"></script>

        <?php echo $__env->yieldContent('scripts'); ?>
    </body>
</html>
<?php /**PATH C:\laragon\www\Live-shopify\meetanshiPDFProductCatalog\resources\views/welcome.blade.php ENDPATH**/ ?>