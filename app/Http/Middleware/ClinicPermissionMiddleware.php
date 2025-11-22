<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\PermissionRegistrar;

class ClinicPermissionMiddleware
{
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        $clinicId = $request->session()->get('clinic_id');
        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }

        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            // Переключаемся на схему клиники
            DB::statement("SET search_path TO clinic_{$clinicId}");

            // 🔹 Сбрасываем кеш Spatie, чтобы увидеть свежие permissions в этой схеме
            app(PermissionRegistrar::class)->forgetCachedPermissions();

            // Разделяем разрешения, если они переданы через '|'
            $allPermissions = [];
            foreach ($permissions as $perm) {
                $allPermissions = array_merge($allPermissions, explode('|', $perm));
            }

            // Проверяем каждое разрешение отдельно с явным указанием guard 'web'
            foreach ($allPermissions as $permission) {
                if (!$request->user()->hasPermissionTo($permission, 'web')) {
                    abort(403, 'User does not have the right permissions.');
                }
            }

            return $next($request);

        } finally {
            // Возвращаем оригинальный search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
}
