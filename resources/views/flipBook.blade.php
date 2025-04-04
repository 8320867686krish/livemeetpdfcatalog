<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf Preview</title>
 
    <link rel="stylesheet" href="{{ asset('public/FlipPdfJs/style.css')}}"></link>
</head>

<body>
    <div class="_df_book" id="flipbok_example"
        source="{{asset($pdfurl)}}">
    </div>
  
   <script src="{{ asset('public/FlipPdfJs/jquerymin.js') }}"></script>
<script src="{{ asset('public/FlipPdfJs/dflip.min.js') }}"></script>
<script src="{{ asset('public/FlipPdfJs/pdf.min.js') }}"></script>
<script src="{{ asset('public/FlipPdfJs/pdfworker.min.js') }}"></script>
<script src="{{ asset('public/FlipPdfJs/three.min.js') }}"></script>
</body>

</html>