<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $clinicId = $request->session()->get('clinic_id');
        $filialId = $request->session()->get('filial_id');

        $roles = [];
        $permissions = [];

        if ($user && $clinicId) {
            // 🔹 Сохраняем текущий search_path
            $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

            try {
                // 🔹 Переключаемся на схему текущей клиники
                DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

                // 🔹 Находим роль пользователя именно для ЭТОГО филиала
                $roleData = DB::table('clinic_filial_user')
                    ->join('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
                    ->where('clinic_filial_user.user_id', $user->id)
                    ->where('clinic_filial_user.filial_id', $filialId)
                    ->select('roles.id', 'roles.name')
                    ->first();

                if ($roleData) {
                    $roles = [$roleData->name];
                    
                    // 🔹 Загружаем реальную модель Role, чтобы у нее были методы getKey() и другие
                    $roleModel = \Spatie\Permission\Models\Role::find($roleData->id);
                    if ($roleModel) {
                        $user->setRelation('roles', collect([$roleModel]));
                    }
                    
                    // 🔹 Выгружаем права ТОЛЬКО для этой конкретной роли напрямую из БД
                    $permissions = DB::table('role_has_permissions')
                        ->join('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                        ->where('role_has_permissions.role_id', $roleData->id)
                        ->pluck('permissions.name')
                        ->mapWithKeys(fn($p) => [$p => true])
                        ->toArray();
                }

                // 🔹 Логируем для отладки
                Log::debug('Permissions loaded for filial:', [
                    'filial_id' => $filialId,
                    'role' => $roles,
                    'permissions_count' => count($permissions),
                ]);

            } finally {
                // 🔹 Возвращаем исходный search_path
                DB::statement("SET search_path TO {$originalSearchPath}");
            }
        }

        // 🔹 Логируем для отладки
        Log::debug('HandleInertiaRequests:', [
            'session_id' => session()->getId(),
            'user_id' => $user?->id,
            'clinic_id' => $clinicId,
            'filial_id' => $filialId,
            'roles' => $roles,
            'permissions' => $permissions,
        ]);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'role' => $roles,
                'can' => $permissions,
                'clinic_id' => $clinicId,
                'filial_id' => $filialId,
            ],
        ]);
    }
}
