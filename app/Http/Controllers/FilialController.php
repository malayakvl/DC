<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicUpdateRequest;
use App\Http\Requests\FilialUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\Store;
use App\Models\User;
use App\Models\ClinicUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class FilialController extends Controller
{
    function __construct()
    {
//        $this->middleware('permission:product-list|product-create|product-edit|product-delete', ['only' => ['index','show']]);
//        $this->middleware('permission:product-create', ['only' => ['create','store']]);
//        $this->middleware('permission:product-edit', ['only' => ['edit','update']]);
//        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $filialData = ClinicFilial::where('clinic_id', '=', $clinic->id)->get();
        return Inertia::render('Clinic/Filials', [
            'clinicData' => $clinic,
            'filialData' => $filialData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('filial-edit')) {
            $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $storeData = Store::where('clinic_id', $clinicData->id)->get();
            $filialData = new ClinicFilial();
            return Inertia::render('Clinic/FilialCreate', [
                'clinicData' => $clinicData,
                'filialData' => $filialData,
                'storeData' => $storeData,
                'employeesData' => $clinic->users
            ]);
        } else {

        }
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
        $serverFilePath = public_path('storage/clinic/stamps/filial-stamp-' .$id. '.png');
        $imagePath = '';
        if (file_exists($serverFilePath)) {
            $imagePath = asset('storage/clinic/stamps/filial-stamp-' .$id. '.png');
        }
        if ($request->user()->can('filial-edit')) {
            $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
            $storeData = Store::where('clinic_id', $clinic->id)->get();
            $filial = ClinicFilial::find($id);
            $filial->stamp = $imagePath;
            return Inertia::render('Clinic/FilialEdit', [
                'filialData' => $filial,
                'clinicData' => $clinic,
                'storeData' => $storeData,
                'stampPath' => $imagePath,
                'employeesData' => $clinic->users
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FilialUpdateRequest $request) {
        if ($request->user()->can('filial-edit')) {

            if ($request->id)
                $filial = ClinicFilial::find($request->id);
            else {
                $filial = new ClinicFilial();
            }
            if ($request->ceo_id) {
                $clinicUser = new ClinicUser();
                $clinicUser->user_id = $request->ceo_id;
                $clinicUser->clinic_id = $request->clinic_id;
                $clinicUser->save();
            }
            $filial->fill($request->validated());
            $filial->store_id = $request->store_id;
            $filial->save();
            $filialId = $filial->id;
            if ($request->file) {
                $ext = $request->file->getClientOriginalExtension();
                Storage::disk('public')->put('clinic/stamps/filial-stamp-' .$filialId. '.'.$ext, file_get_contents($request->file));
            }

            return Redirect::route('clinic.filials');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Filial $filial) {
        //
    }
}
