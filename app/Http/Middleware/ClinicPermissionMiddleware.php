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
        $filialId = $request->session()->get('filial_id');

        if (!$clinicId) {
            abort(403, 'No clinic selected.');
        }

        if (!$filialId) {
            abort(403, 'No filial selected.');
        }

        // Проверяем что user состоит в этом filial
        $exists = DB::table('clinic_' . $clinicId . '.clinic_filial_user')
            ->where('clinic_id', $clinicId)
            ->where('filial_id', $filialId)
            ->where('user_id', $request->user()->id)
            ->exists();

        if (!$exists) {
            abort(403, 'User not assigned to this filial.');
        }

        $originalPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

            // 1. Находим роль пользователя именно для ЭТОГО филиала
            $roleData = DB::table('clinic_filial_user')
                ->where('user_id', $request->user()->id)
                ->where('filial_id', $filialId)
                ->first();

            if (!$roleData) {
                abort(403, 'User role not found for this filial.');
            }

            // Множество permissions из мультипараметров
            $allPerms = [];
            foreach ($permissions as $perm) {
                $allPerms = [...$allPerms, ...explode('|',$perm)];
            }

            // 2. Проверяем наличие хотя бы одного из требуемых прав у этой роли через БД
            // Это гарантирует, что права не утекают из других филиалов (например, если там роль CEO)
            $hasPermission = DB::table('role_has_permissions')
                ->join('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                ->where('role_has_permissions.role_id', $roleData->role_id)
                ->whereIn('permissions.name', $allPerms)
                ->exists();

            if (!$hasPermission) {
                abort(403, "Access denied. Required permissions: " . implode(', ', $allPerms));
            }

            return $next($request);

        } finally {
            DB::statement("SET search_path TO {$originalPath}");
        }
    }
}
