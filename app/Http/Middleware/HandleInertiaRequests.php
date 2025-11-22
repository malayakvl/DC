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
                DB::statement("SET search_path TO clinic_{$clinicId}");

                // 🔹 Получаем роли и permissions через Spatie в схеме клиники
                $roles = $user->getRoleNames();
                $permissions = $user->getAllPermissions()
                                    ->pluck('name')
                                    ->mapWithKeys(fn($p) => [$p => true])
                                    ->toArray();
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
