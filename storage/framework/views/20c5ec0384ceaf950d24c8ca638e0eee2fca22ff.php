<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <base target="_top">

        <title>Redirecting...</title>

        <script src="https://unpkg.com/@shopify/app-bridge<?php echo $appBridgeVersion; ?>"></script>
        <script src="https://unpkg.com/@shopify/app-bridge-utils<?php echo $appBridgeVersion; ?>"></script>
        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', function () {
                var redirectUrl = "<?php echo $authUrl; ?>";
                if (window.top == window.self) {
                    // If the current window is the 'parent', change the URL by setting location.href
                    window.top.location.href = redirectUrl;
                } else {
                    // If the current window is the 'child', change the parent's URL with postMessage
                    normalizedLink = document.createElement('a');
                    normalizedLink.href = redirectUrl;

                    var AppBridge = window['app-bridge'];
                    var createApp = AppBridge.default;
                    var Redirect = AppBridge.actions.Redirect;
                    var app = createApp({
                        apiKey: "<?php echo e($apiKey); ?>",
                        shopOrigin: "<?php echo e($shopOrigin); ?>",
                        host: "<?php echo e($host); ?>",
                    });

                    var redirect = Redirect.create(app);
                    redirect.dispatch(Redirect.Action.REMOTE, normalizedLink.href);
                }
            });
        </script>
    </head>
    <body>
    </body>
</html>
<?php /**PATH /opt/lampp/htdocs/pdfCatelog/livemeetpdfcatalog/vendor/osiset/laravel-shopify/src/resources/views/auth/fullpage_redirect.blade.php ENDPATH**/ ?>