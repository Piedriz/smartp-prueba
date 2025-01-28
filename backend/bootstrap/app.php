<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(['/login']);
        $middleware->validateCsrfTokens(['/logout']);
        $middleware->validateCsrfTokens(['/users','/users/*']);
        $middleware->validateCsrfTokens(['/products','/products/*']);
        $middleware->validateCsrfTokens(['/cart','/cart/*']);
        $middleware->validateCsrfTokens(['/generate-invoice','/invoice/{invoiceId}/pdf']);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
