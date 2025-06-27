<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientStatusUpdateRequest;
use App\Models\Clinic;
use App\Models\PatientStatus;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PatientStatusController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        $listData = DB::table('patient_statuses')
            ->select('patient_statuses.*')
            ->where('patient_statuses.clinic_id', $clinic->id)
            ->orderBy('name')->get();
        return Inertia::render('PatientStatus/List', [
            'clinicData' => $clinic,
            'listData' => $listData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = new PatientStatus();
            return Inertia::render('PatientStatus/Create', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = Unit::find($id);
            return Inertia::render('Unit/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PatientStatusUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            if ($request->id)
                $data = PatientStatus::find($request->id);
            else {
                $data = new PatientStatus();
            }
            $data->fill($request->validated());
            $data->clinic_id = $clinicData->id;
            $data->save();

            return Redirect::route('patient-status.index');
        }
    }
}
