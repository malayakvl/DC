<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

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
//        return [
//            ...parent::share($request),
//            'auth' => [
//                'user' => $request->user(),
//                'permissionTmp' => '',
//                'can' => $request->user()?->loadMissing('roles.permissions')
//                    ->roles->flatMap(function ($role) {
//                        return $role->permissions;
//                    })->map(function ($permission) {
//                        return [$permission['name'] => auth()->user()->can($permission['name'])];
//                    })->collapse()->all(),
//            ],
//        ];
//        dd($request->user()?->getRoleNames());
        return array_merge(parent::share($request), [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'role' => $request->user()?->getRoleNames(),
                'can' => $request->user()?->getPermissionsViaRoles()->flatMap(function ($role) {
                    return [$role];
                })->map(function ($permission) {
                    return [$permission->name => auth()->user()->can($permission['name'])];
                })->collapse()->all()
            ]

        ]);
    }
}
