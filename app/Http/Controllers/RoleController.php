<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\RoleUpdateRequest;

class RoleController extends Controller
{
    public function __construct()
    {
        // Используем наш middleware, который проверяет права внутри схемы клиники
        $this->middleware('clinic_permission:role-list|role-create|role-edit|role-delete', ['only' => ['index', 'store']]);
        $this->middleware('clinic_permission:role-create', ['only' => ['create', 'store']]);
        $this->middleware('clinic_permission:role-edit', ['only' => ['edit', 'update']]);
        $this->middleware('clinic_permission:role-delete', ['only' => ['destroy']]);
    }

    /**
     * Helper для работы с текущей схемой клиники
     */
    private function withClinicSchema(Request $request, \Closure $callback)
    {
        $clinicId = $request->session()->get('clinic_id');
        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }

        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            DB::statement("SET search_path TO clinic_{$clinicId}");
            // Сбрасываем кеш Spatie, чтобы использовать актуальные permissions в схеме
            app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

            return $callback($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    // Список ролей текущей клиники
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) {
            $roles = Role::orderBy('name', 'ASC')->get();
            return Inertia::render('Role/Index', [
                'roleData' => $roles
            ]);
        });
    }

    // Форма создания роли
    public function create(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $permissions = Permission::orderBy('name')->get();
            return Inertia::render('Role/Create', [
                'permissionData' => $permissions,
                'clinicId' => $clinicId
            ]);
        });
    }

    // Создание роли
    public function store(RoleUpdateRequest $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $role = new Role();
            $role->name = $request->name;
            $role->guard_name = 'web';
            $role->clinic_id = $clinicId;
            $role->save();

            $permissionsID = array_map(fn($v) => (int)preg_replace('/[^0-9]/', '', $v), $request->permissions);
            $permissions = Permission::whereIn('id', $permissionsID)->get();
            $role->syncPermissions($permissions);

            return Redirect::route('role.index');
        });
    }

    // Форма редактирования роли
    public function edit(Request $request, $id)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($id) {
            $role = Role::findOrFail($id);
            $permissions = Permission::orderBy('name')->get();
            // Get permission IDs as integers to ensure consistent types
            $rolePermissions = $role->permissions()->pluck('id')->map(fn($id) => (int)$id)->toArray();
            return Inertia::render('Role/Edit', [
                'roleData' => $role,
                'permissionData' => $permissions,
                'rolePermissions' => $rolePermissions
            ]);
        });
    }

    // Обновление роли
    public function update(RoleUpdateRequest $request, $id)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            $role = Role::findOrFail($id);
            
            // Update role name
            $role->name = $request->name;
            $role->save();

            $permissionsID = array_map(fn($v) => (int)preg_replace('/[^0-9]/', '', $v), $request->permissions);
            $permissions = Permission::whereIn('id', $permissionsID)->get();
            $role->syncPermissions($permissions);

            return Redirect::route('role.index');
        });
    }

    // Удаление роли
    public function destroy(Request $request, $id)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($id) {
            Role::where('id', $id)->delete();
            return Redirect::route('role.index')->with('success', 'Role deleted successfully');
        });
    }
}