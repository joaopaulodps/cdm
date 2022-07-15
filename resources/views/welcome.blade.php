<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <title>CdM</title> -->
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="icon" href="{{ url('https://www.imagemhost.com.br/images/2022/06/06/favicon.th.png') }}">
</head>
<body>
    <!-- React root DOM -->
    <div id="root">
    </div>
    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>