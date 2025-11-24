<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\User;


class ClinicAccessService
{
    /**
     * Назначить пользователю роль с правами в конкретной клинике и филиале
     */
    public function assignRole(User $user, int $clinicId, int $filialId, string $roleName): void
    {
        $schema = "clinic_{$clinicId}";
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        DB::statement("SET search_path TO {$schema}");

        try {
            // Получаем роль
            $role = DB::table('roles')->where('name', $roleName)->first();
            if (!$role) {
                throw new \Exception("Role {$roleName} не найдена в схеме клиники {$schema}");
            }

            $roleId = $role->id;

            // 1️⃣ Назначаем роль пользователю через Spatie
            DB::table('model_has_roles')->insertOrIgnore([
                'role_id' => $roleId,
                'model_type' => User::class,
                'model_id' => $user->id,
            ]);

            // 2️⃣ Привязываем все permissions этой роли к пользователю
            $permissionIds = DB::table('role_has_permissions')->where('role_id', $roleId)->pluck('permission_id');
            foreach ($permissionIds as $pid) {
                DB::table('model_has_permissions')->insertOrIgnore([
                    'permission_id' => $pid,
                    'model_type' => User::class,
                    'model_id' => $user->id,
                ]);
            }

            // 3️⃣ Если у роли ещё нет прав — привяжем все дефолтные permissions
            if ($permissionIds->isEmpty()) {
                $allPermissionIds = DB::table('permissions')->pluck('id');
                foreach ($allPermissionIds as $pid) {
                    DB::table('role_has_permissions')->insertOrIgnore([
                        'role_id' => $roleId,
                        'permission_id' => $pid,
                    ]);

                    DB::table('model_has_permissions')->insertOrIgnore([
                        'permission_id' => $pid,
                        'model_type' => User::class,
                        'model_id' => $user->id,
                    ]);
                }
            }

            // 4️⃣ Привязываем пользователя к филиалу через pivot
            DB::table('clinic_users')->insertOrIgnore([
                'clinic_id' => $clinicId,
                'user_id' => $user->id,
                'role_id' => $roleId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        } finally {
            // Восстанавливаем оригинальный search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    /**
     * Получить роли и permissions пользователя для конкретной клиники
     */
    public function getUserRolesWithPermissions(User $user, int $clinicId): array
    {
        $schema = "clinic_{$clinicId}";
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        DB::statement("SET search_path TO {$schema}");

        try {
            // Получаем роли пользователя
            $roleIds = DB::table('model_has_roles')
                ->where('model_type', User::class)
                ->where('model_id', $user->id)
                ->pluck('role_id');

            $roles = DB::table('roles')
                ->whereIn('id', $roleIds)
                ->get();

            $result = [];

            foreach ($roles as $role) {
                // Получаем права для роли
                $permissionIds = DB::table('role_has_permissions')
                    ->where('role_id', $role->id)
                    ->pluck('permission_id');

                $permissions = DB::table('permissions')
                    ->whereIn('id', $permissionIds)
                    ->get();

                $result[] = [
                    'id' => $role->id,
                    'name' => $role->name,
                    'guard_name' => $role->guard_name,
                    'permissions' => $permissions,
                ];
            }

            $allPermissions = collect($result)
                ->pluck('permissions')
                ->flatten(1)
                ->unique('id')
                ->values();

            return [
                'roles' => $result,
                'permissions' => $allPermissions,
            ];
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
}
