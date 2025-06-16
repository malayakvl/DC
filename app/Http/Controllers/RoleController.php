<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Requests\RoleUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller implements HasMiddleware
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index','store']]);
        $this->middleware('permission:role-create', ['only' => ['create','store']]);
        $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request): \Inertia\Response
    {
//        $request->user()->roles()->detach();
//         $request->user()->hasRole('Ceo Filial');
//         dd($request->user()->hasRole('Ceo Filial'));exit;
//dd(Auth::user()->hasRole('Admin'));
//       $permission = Permission::create(['name' => 'patient-all']);
//       $permission = Permission::create(['name' => 'patient-create']);
//       $permission = Permission::create(['name' => 'patient-edit']);
//       $permission = Permission::create(['name' => 'patient-view']);
//       $permission = Permission::create(['name' => 'patient-delete']);
//exit;
//       $role = Role::where('name', 'Ceo Filial')->first();
//       $permission = Permission::where('name', 'patient-all')->first();
//       $permission->assignRole($role);
//       $permission = Permission::where('name', 'patient-create')->first();
//       $permission->assignRole($role);
//       $permission = Permission::where('name', 'patient-edit')->first();
//       $permission->assignRole($role);
//       $permission = Permission::where('name', 'patient-view')->first();
//       $permission->assignRole($role);
//       $permission = Permission::where('name', 'patient-delete')->first();
//       $permission->assignRole($role);
        $roles = Role::where('special', null)->orderBy('name','ASC')->get();
        return Inertia::render('Role/Index', [
            'roleData' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        if ($request->user()->can('clinic-create')) {
            $permissions = Permission::orderBy('name')->get();
//            $clinicData = $request->user()->clinic;
            $clinicData = $request->user()->clinicByFilial($request->session()->get('clinic_id'));

            return Inertia::render('Role/Create', [
                'clinicData' => $clinicData,
                'permissionData' => $permissions
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit(Request $request, $id)
    {
//        dd($request->user()->hasRole('Ceo Filial'));
//        exit;
        if ($request->user()->hasRole('Ceo Filial') || $request->user()->hasRole('Admin')) {
            $role = Role::find($id);
            $permissions = Permission::orderBy('name')->get();
//            dd($permissions);
//            exit;
            $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id",$id)
                ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
                ->all();
            $prepRolePermissions = [];
            foreach ($rolePermissions as $value) {
                $prepRolePermissions[] = $value;
            }

            return Inertia::render('Role/Edit', [
                'roleData' => $role,
                'permissionData' => $permissions,
                'rolePermissions' => $prepRolePermissions
            ]);
        } else {
            return Inertia::render('Layout/NoPermission', []);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleUpdateRequest $request): RedirectResponse
    {
//        $clinic = $request->user()->clinic;
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));

        $role = new Role();
        $role->name = $request->name;
        $role->guard_name = 'web';
        $role->clinic_id = $clinic->id;
        $role->save();

        $permissionsID = array_map(
            function($value) { return (int)preg_replace('/[^0-9]/', '', $value); },
            $request->permissions
        );
        $role->syncPermissions($permissionsID);

        return Redirect::route('role.index');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleUpdateRequest $request): RedirectResponse
    {
        $id = $request->id;
        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();
        $permissionsID = array_map(
            function($value) { return (int)preg_replace('/[^0-9]/', '', $value); },
            $request->permissions
        );
        $role->syncPermissions($permissionsID);

        return Redirect::route('role.index');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): View
    {
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions","role_has_permissions.permission_id","=","permissions.id")
            ->where("role_has_permissions.role_id",$id)
            ->get();

        return view('roles.show',compact('role','rolePermissions'));
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): RedirectResponse
    {
        DB::table("roles")->where('id',$id)->delete();
        return redirect()->route('roles.index')
            ->with('success','Role deleted successfully');
    }

    public static function middleware()
    {
        // TODO: Implement middleware() method.
    }
}
