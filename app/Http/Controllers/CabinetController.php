<?php

namespace App\Http\Controllers;

use App\Http\Requests\CabinetUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\Cabinet;
use App\Models\Size;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class CabinetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->session()->get('filial_id')) {
            $listData = DB::table('cabinets')
                ->select('cabinets.*', "clinic_filials.name AS filial_name")
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
                ->where('cabinets.clinic_id', $clinic->id)
                ->where('cabinets.filial_id', $request->session()->get('filial_id'))
                ->orderBy('name')->get();
        } else {
            $listData = DB::table('cabinets')
                ->select('cabinets.*', "clinic_filials.name AS filial_name")
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
                ->where('cabinets.clinic_id', $clinic->id)
                ->orderBy('name')->get();
        }
        return Inertia::render('Cabinet/List', [
            'clinicData' => $clinic,
            'listData' => $listData,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            if (!$clinicData) {
                $filialData = ClinicFilial::where('id', '=', $request->session()->get('filial_id'))->first();
                $clinicData = $filialData->clinic;
            }
            $filialData = DB::table('clinic_filials')
                ->select('clinic_filials.*')
                ->where('clinic_filials.clinic_id', $clinicData->id)
                ->orderBy('name')->get();
            $formData = new Cabinet();
            return Inertia::render('Cabinet/Create', [
                'clinicData' => $clinicData,
                'filialData' => $filialData,
                'formData' => $formData,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('cabinet-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $filialData = DB::table('clinic_filials')
                ->select('clinic_filials.*')
                ->where('clinic_filials.clinic_id', $clinicData->id)
                ->orderBy('name')->get();
            $formData = Cabinet::find($id);
            return Inertia::render('Cabinet/Edit', [
                'clinicData' => $clinicData,
                'filialData' => $filialData,
                'formData' => $formData,
            ]);

        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CabinetUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            if ($request->id)
                $cabinet = Cabinet::find($request->id);
            else {
                $cabinet = new Cabinet();
            }
            $cabinet->fill($request->validated());
            $cabinet->save();
            if ($request->filial_id) {
                $cabinet->filial_id = $request->filial_id;
                $cabinet->save();
            }

            return Redirect::route('cabinet.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cabinet $cabinet) {
        //
    }
}
