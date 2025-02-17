<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function () {
        var Toast = actions.Toast;

        <?php if(isset($flashNotice) || request()->has('notice')): ?>
            var toastNotice = Toast.create(app, {
                message: "<?php echo e(request()->get('notice', $flashNotice ?? null)); ?>",
                duration: 3000,
            });
            toastNotice.dispatch(Toast.Action.SHOW);
        <?php endif; ?>

        <?php if(isset($flashError) || request()->has('error')): ?>
            var toastNotice = Toast.create(app, {
                message: "<?php echo e(request()->get('error', $flashError ?? null)); ?>",
                duration: 3000,
                isError: true,
            });
            toastNotice.dispatch(Toast.Action.SHOW);
        <?php endif; ?>
    });
</script>
<?php /**PATH /opt/lampp/htdocs/pdfCatelog/livemeetpdfcatalog/vendor/osiset/laravel-shopify/src/resources/views/partials/flash_messages.blade.php ENDPATH**/ ?>