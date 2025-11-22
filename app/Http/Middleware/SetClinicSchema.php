<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\PermissionRegistrar;

class SetClinicSchema
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {

            $clinicId = session('clinic_id');

            if ($clinicId) {
                // Устанавливаем схему текущей клиники
                DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

                // Сбрасываем кеш Spatie, чтобы он видел свежие permissions
                app(PermissionRegistrar::class)->forgetCachedPermissions();
            }
        }

        return $next($request);
    }
}