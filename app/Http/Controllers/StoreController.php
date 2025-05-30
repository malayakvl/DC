<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateRequest;
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

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->session()->get('filial_id')) {
            $storeData = DB::table('stores')
                ->select('stores.*', 'users.name AS ceoName', 'clinic_filials.name AS filialName')
                ->leftJoin('users', 'users.id', '=', 'stores.user_id')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                ->where('stores.filial_id', $request->session()->get('filial_id'))
                ->orderBy('name')->get();
        } else {
            $storeData = DB::table('stores')
                ->select('stores.*', 'users.name AS ceoName', 'clinic_filials.name AS filialName')
                ->leftJoin('users', 'users.id', '=', 'stores.user_id')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                ->where('stores.clinic_id', $clinic->id)
                ->orderBy('name')->get();
        }
        return Inertia::render('Store/List', [
            'clinicData' => $clinic,
            'storeData' => $storeData
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $filailData = ClinicFilial::where('clinic_id', $clinicData->id)->get();
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            $storeData = new Store();
            return Inertia::render('Store/Create', [
                'clinicData' => $clinicData,
                'filialData' => $filailData,
                'formData' => $storeData,
                'customerData' => $customerData
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('store-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Store/FilialView', [
                'filialData' => $filial,
            ]);
        } else {

        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('store-edit')) {
            $serverFilePath = public_path('storage/clinic/stamps/store-stamp-' .$id. '.png');
            $imagePath = '';
            if (file_exists($serverFilePath)) {
                $imagePath = asset('storage/clinic/stamps/store-stamp-'.$id.'.png');
            }

            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $filailData = ClinicFilial::where('clinic_id', $clinicData->id)->get();
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            $storeData = Store::find($id);
            return Inertia::render('Store/Edit', [
                'clinicData' => $clinicData,
                'filialData' => $filailData,
                'formData' => $storeData,
                'customerData' => $customerData,
                'stampPath' => $imagePath
            ]);
        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->id)
                $store = Store::find($request->id);
            else {
                $store = new Store();
            }
            if ($request->filial_id) {
                $store->filial_id = $request->filial_id;
            }
            $store->fill($request->validated());
            $store->save();

            if ($request->file) {
                $ext = $request->file->getClientOriginalExtension();
                Storage::disk('public')->put('clinic/stamps/store-stamp-' .$store->id. '.'.$ext, file_get_contents($request->file));
            }
            return Redirect::route('store.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filial $filial) {
        //
    }
}
