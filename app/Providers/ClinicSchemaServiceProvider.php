<?php

namespace App\Providers;

use App\Services\ClinicSchemaService;
use Illuminate\Support\ServiceProvider;

class ClinicSchemaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(ClinicSchemaService::class, function ($app) {
            return new ClinicSchemaService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}