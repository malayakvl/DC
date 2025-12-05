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
        $exists = DB::table('core.clinic_filial_user')
            ->where('clinic_id', $clinicId)
            ->where('filial_id', $filialId)
            ->where('user_id', $request->user()->id)
            ->exists();

        if (!$exists) {
            abort(403, 'User not assigned to this filial.');
        }

        $originalPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            DB::statement("SET search_path TO clinic_{$clinicId}");

            // ❗ Используем core.users.id в clinic_x.model_has_roles
            app(PermissionRegistrar::class)->forgetCachedPermissions();

            // Множество permissions из мультипараметров
            $allPerms = [];
            foreach ($permissions as $perm) {
                $allPerms = [...$allPerms, ...explode('|',$perm)];
            }

            foreach ($allPerms as $perm) {
                if (!$request->user()->hasPermissionTo($perm, 'web')) {
                    abort(403, "No permission: {$perm}");
                }
            }

            return $next($request);

        } finally {
            DB::statement("SET search_path TO {$originalPath}");
        }
    }
}
