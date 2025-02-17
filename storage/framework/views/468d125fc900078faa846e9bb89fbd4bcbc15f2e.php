<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf Preview</title>
 
    <link rel="stylesheet" href="<?php echo e(asset('public/FlipPdfJs/style.css')); ?>"></link>
</head>

<body>
    <div class="_df_book" id="flipbok_example"
        source="<?php echo e(asset($pdfurl)); ?>">
    </div>
  
   <script src="<?php echo e(asset('public/FlipPdfJs/jquerymin.js')); ?>"></script>
<script src="<?php echo e(asset('public/FlipPdfJs/dflip.min.js')); ?>"></script>
<script src="<?php echo e(asset('public/FlipPdfJs/pdf.min.js')); ?>"></script>
<script src="<?php echo e(asset('public/FlipPdfJs/pdfworker.min.js')); ?>"></script>
<script src="<?php echo e(asset('public/FlipPdfJs/three.min.js')); ?>"></script>
</body>

</html><?php /**PATH C:\laragon\www\Live-shopify\meetanshiPDFProductCatalog\resources\views/flipBook.blade.php ENDPATH**/ ?>