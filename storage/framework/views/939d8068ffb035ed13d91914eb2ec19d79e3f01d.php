<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <title><?php echo e(\Osiset\ShopifyApp\Util::getShopifyConfig('app_name')); ?></title>
        <?php echo $__env->yieldContent('styles'); ?>
    </head>

    <body>
        <div class="app-wrapper">
            <div class="app-content">
                <main role="main">
                    <?php echo $__env->yieldContent('content'); ?>
                </main>
            </div>
        </div>

        <?php if(\Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_enabled') && \Osiset\ShopifyApp\Util::useNativeAppBridge()): ?>
            <script src="https://unpkg.com/@shopify/app-bridge<?php echo e(\Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version') ? '@'.config('shopify-app.appbridge_version') : ''); ?>"></script>
            <script src="https://unpkg.com/@shopify/app-bridge-utils<?php echo e(\Osiset\ShopifyApp\Util::getShopifyConfig('appbridge_version') ? '@'.config('shopify-app.appbridge_version') : ''); ?>"></script>
            <script
                <?php if(\Osiset\ShopifyApp\Util::getShopifyConfig('turbo_enabled')): ?>
                    data-turbolinks-eval="false"
                <?php endif; ?>
            >
                var AppBridge = window['app-bridge'];
                var actions = AppBridge.actions;
                var utils = window['app-bridge-utils'];
                var createApp = AppBridge.default;
                var app = createApp({
                    apiKey: "<?php echo e(\Osiset\ShopifyApp\Util::getShopifyConfig('api_key', $shopDomain ?? Auth::user()->name )); ?>",
                    shopOrigin: "<?php echo e($shopDomain ?? Auth::user()->name); ?>",
                    host: "<?php echo e(\Request::get('host')); ?>",
                    forceRedirect: true,
                });
            </script>

            <?php echo $__env->make('shopify-app::partials.token_handler', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            <?php echo $__env->make('shopify-app::partials.flash_messages', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endif; ?>

        <?php echo $__env->yieldContent('scripts'); ?>
    </body>
</html>
<?php /**PATH /opt/lampp/htdocs/pdfCatelog/livemeetpdfcatalog/vendor/osiset/laravel-shopify/src/resources/views/layouts/default.blade.php ENDPATH**/ ?>