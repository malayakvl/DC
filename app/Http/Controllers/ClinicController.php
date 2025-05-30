<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicUpdateRequest;
use App\Models\Clinic;
use App\Models\Currency;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ClinicController extends Controller
{
    public function create(Request $request): Response
    {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $currencyData = Currency::where('clinic_id', $clinicData->id)->get();
        return Inertia::render('Clinic/Create', [
            'clinicData' => $clinicData,
            'currencyData' => $currencyData
        ]);
    }

    public function new(Request $request): Response
    {
dd(1);
exit;
//        return Inertia::render('Clinic/Create', [
//            'clinicData' => $clinicData,
//            'currencyData' => $currencyData
//        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function roles(Request $request): Response
    {
        return Inertia::render('Clinic/Roles', [
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ClinicUpdateRequest $request) {
        if ($request->user()->can('clinic-create')) {
            if ($request->id)
                $clinic = Clinic::find($request->id);
            else {
                $clinic = new Clinic();
            }
            $clinic->fill($request->validated());
            $clinic->save();

            return Redirect::route('clinic.create');
        }
    }

    public function filialEnter(Request $request, $filialId) {
        // get role for current filial
        $data = DB::table('clinic_filial_user')
            ->select('role_id', 'roles.name AS roleName', 'clinic_filial_user.clinic_id', 'clinic_filial_user.filial_id')
            ->leftJoin('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
            ->where('filial_id', $filialId)
            ->where('user_id', $request->user()->id)->get();
        // assign role for current filial
        foreach ($request->user()->roles as $role) {
            $request->user()->removeRole($role->name);
        }
        $request->user()->assignRole($data[0]->roleName);
        // assign role permissions
//        $permission = Permission::where('name', 'invoice-exchange-all')->first();
//        $permission->assignRole($role);

        $request->session()->put('clinic_id', $data[0]->clinic_id);
        $request->session()->put('filial_id', $data[0]->filial_id);

        return Redirect::route('dashboard.index');
    }

    public function findProducer(Request $request) {
        $name = $request->searchName;
        $producerData = DB::table('producers')->select('name', 'id')
            ->whereRaw('LOWER(name) LIKE ?', '%' .mb_strtolower($name). '%')
            ->get();
        return response()->json([
            'items' => $producerData
        ]);
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
