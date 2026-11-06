<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <!-- Scripts -->
        <script src="https://kit.fontawesome.com/e82fc2fd78.js" crossorigin="anonymous"></script>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='28' fill='%230d9488'/><path d='M30 40C30 30 40 22 50 22C60 22 70 30 70 40C70 54 62 65 57 74C54 79 52 82 50 82C48 82 46 79 43 74C38 65 30 54 30 40Z' fill='none' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/><path d='M43 45C45 48 55 48 57 45' fill='none' stroke='white' stroke-width='6' stroke-linecap='round'/></svg>" />
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
