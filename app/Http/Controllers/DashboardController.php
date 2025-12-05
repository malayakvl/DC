<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicUpdateRequest;
use App\Http\Requests\FilialUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $userClinicFilials = DB::table('users')
        //     ->select('clinic_filials.name AS filialName', 'clinics.name AS clinicName',
        //         'clinic_filials.id AS filialId', 'roles.name AS roleName')
        //     ->leftJoin('clinic_filial_user', 'users.id', '=', 'clinic_filial_user.user_id')
        //     ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'clinic_filial_user.filial_id')
        //     ->leftJoin('clinics', 'clinics.id', '=', 'clinic_filials.clinic_id')
        //     ->leftJoin('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
        //     ->orderBy('filialName')
        //     ->where('users.id', $request->user()->id)->get();
        $userClinics = DB::table('core.clinic_user')
            ->select('*')
            ->leftJoin('core.clinics', 'clinics.id', '=', 'clinic_user.clinic_id')
            ->where('core.clinic_user.user_id', $request->user()->id)
            ->get();
        // dd($userClinics);exit;
        // $userClinicFilials = DB::table('core.users')
        // ->select(
        //     'clinic_filials.name AS filialName',
        //     'clinics.name AS clinicName',
        //     'clinic_filials.id AS filialId',
        //     'clinics.id AS clinicId',
        //     'roles.name AS roleName'
        // )
        // ->leftJoin('clinic_filial_user', 'users.id', '=', 'clinic_filial_user.user_id')
        // ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'clinic_filial_user.filial_id')
        // ->leftJoin('clinics', 'clinics.id', '=', 'clinic_filials.clinic_id')
        // ->leftJoin('roles', 'roles.id', '=', 'clinic_filial_user.role_id')
        // ->where('users.id', $request->user()->id)
        // ->orderBy('clinicName')
        // ->orderBy('filialName')
        // ->get();

        return Inertia::render('Dashboard/ClinicSelect', [
            'clinicsData' => $userClinics
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $filailData = ClinicFilial::where('clinic_id', $clinicData->id)->get();
        $storeData = new Store();
        return Inertia::render('Store/StoreCreate', [
            'clinicData' => $clinicData,
            'filialData' => $filailData,
            'formData' => $storeData
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('filial-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Clinic/FilialView', [
                'filialData' => $filial,
            ]);
        } else {
            return Inertia::render('Clinic/FilialView', [
            ]);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        //
        $imagePath = asset('storage/clinic/stamps/filial-stamp-1.png');

        if ($request->user()->can('filial-edit')) {
//            $clinic = $request->user()->clinic;
            $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
            $filial = ClinicFilial::find($id);
            $filial->stamp = $imagePath;
            return Inertia::render('Clinic/FilialEdit', [
                'filialData' => $filial,
                'clinicData' => $clinic,
                'stampPath' => $imagePath
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            $store = Store::find($request->id);

            $store->fill($request->validated());
            $store->save();

            $ext = $request->file->getClientOriginalExtension();
            Storage::disk('public')->put('clinic/stamps/store-stamp-' .$request->id. '.'.$ext, file_get_contents($request->file));

            return Redirect::route('stores');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filial $filial) {
        //
    }
}
