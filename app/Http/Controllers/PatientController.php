<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Patient;
use App\Models\Cabinet;
use App\Models\Size;
use App\Models\Store;
use App\Models\PatientTreatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->session()->get('filial_id')) {
            $listData = DB::table('patients')
                ->select('patients.*')
                ->leftJoin('clinic_patient', 'clinic_patient.patient_id', '=', 'patients.id')
                ->where('clinic_patient.clinic_id', $clinic->id)
                ->where('clinic_patient.filial_id', $request->session()->get('filial_id'))
                ->orderBy('first_name')->get();
        } else {
            $listData = DB::table('patients')
                ->select('patients.*')
                ->leftJoin('clinic_patient', 'clinic_patient.patient_id', '=', 'patients.id')
                ->where('clinic_patient.clinic_id', $clinic->id)
                ->orderBy('first_name')->get();
        }
        return Inertia::render('Patient/List', [
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
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            $contactData = DB::table('patients_contact')->get();
            $formData = new Patient();

            return Inertia::render('Patient/Create', [
                'clinicData' => $clinicData,
                'contactData' => $contactData,
                'customerData' => $customerData,
                'formData' => $formData,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        if ($request->user()->can('patient-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            $contactData = DB::table('patients_contact')->get();
            $formData = Patient::where('id', '=', $id)->first();
            return Inertia::render('Patient/Edit', [
                'formData' => $formData,
                'customerData' => $customerData,
                'contactData' => $contactData
            ]);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PatientUpdateRequest $request) {
        if ($request->user()->can('patient-edit')) {
            $isNew = false;
            if ($request->id)
                $patient = Patient::find($request->id);
            else {
                $patient = new Patient();
                $isNew = true;
            }
            $patient->fill($request->validated());
            $patient->save();

            if ($request->file) {
                $fileName = 'Patient'.$patient->id.'.'.$request->file->extension();  
                $patient->avatar = $fileName;
                $patient->save();
                $request->file->move(public_path('uploads/patients'), $fileName);
            }
            if ($isNew) {
                return Redirect::route('patient.cliniccard', ['id' => $patient->id]);
            } else {
                return redirect()->route('patient.index');
            }
        }
    }

    public function createTreatment(Request $request) {
        if ($request->user()->can('patient-edit')) {
            $patientTreatment = new PatientTreatment();
            $patientTreatment->fill($request->all());
            $patientTreatment->save();
            $patientData = Patient::where('id', '=', $request->user_id)->first();
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();

            if ($request->type === 'formula') {
                return Redirect::route('patient.formula.edit', ['id' => $patientTreatment->id]);
            } else if ($request->type === 'perio') {
                return Redirect::route('patient.perio.edit', ['id' => $patientTreatment->id]);
            } else if ($request->type === 'psr') {
                return Redirect::route('patient.psr.edit', ['id' => $patientTreatment->id]);
            } else if ($request->type === 'stage') {
                $patientTreatment->type = 'stage';
            }
        }
    }

    /**
     * view patient clinic card
     */
    public function view(Request $request, $id) {
        $patientData = Patient::where('id', '=', $id)->first();
        $type = $request->get('type');
        return Inertia::render('Patient/View', [
            'patientData' => $patientData,
            'type' => $type,
            'treatmentData' => PatientTreatment::where('user_id', '=', $id)->orderBy('created_at', 'desc')->get(),
            'clinicData' => Clinic::where('user_id', '=', $request->user()->id)->first(),
        ]);
    }

    /**
     * view patient clinic card
     */
    public function cliniccard(Request $request, $id) {
        $patientData = Patient::where('id', '=', $id)->first();

        return Inertia::render('Patient/Cliniccard', [
            'patientData' => $patientData
        ]);
    }

    /**
     * view patient clinic card
     * 
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function formulaEdit(Request $request, $id) {
        $patientTreatment = PatientTreatment::where('id', '=', $id)->first();
        $patientData = Patient::where('id', '=', $patientTreatment->user_id)->first();
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        return Inertia::render('Patient/EditFormula', [
            'patientData' => $patientData,
            'clinicData' => $clinicData,
            'treatmentData' => $patientTreatment,
        ]);
    }

    public function updateFormula(Request $request) {
        if ($request->user()->can('patient-edit')) {
            $requestData = $request->all();
            $formulaId = $requestData['id'];
            $patientTreatment = PatientTreatment::where('id', '=', $formulaId)->first();
            $patientTreatment->formula = json_encode($requestData['treatmentData']);
            $patientTreatment->formula_type = $requestData['teethType'];
            $patientTreatment->save();

            return redirect()->route('patient.view', ['id' => $requestData['patientData']['id'], 'type' => 'history']);
        }
    }


    public function updatePerio(Request $request) {
        if ($request->user()->can('patient-edit')) {
            $requestData = $request->all();
            $formulaId = $requestData['id'];
            $patientTreatment = PatientTreatment::where('id', '=', $formulaId)->first();
            $patientTreatment->formula = json_encode($requestData['treatmentData']);
            $patientTreatment->perioValues = json_encode($requestData['perioValues']);
            $patientTreatment->chartsData = json_encode($requestData['chartsData']);
            $patientTreatment->save();

            return redirect()->route('patient.view', ['id' => $requestData['patientData']['id'], 'type' => 'history']);
        }

    }


    public function updatePSR(Request $request) {
        if ($request->user()->can('patient-edit')) {
            $requestData = $request->all();
            $formulaId = $requestData['id'];
            $patientTreatment = PatientTreatment::where('id', '=', $formulaId)->first();
            $patientTreatment->psr = json_encode($requestData['treatmentData']);
            $patientTreatment->save();

            return redirect()->route('patient.view', ['id' => $requestData['patientData']['id'], 'type' => 'history']);
        }

    }

    /**
     * view patient clinic card
     * 
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function perioEdit(Request $request, $id) {
        $patientTreatment = PatientTreatment::where('id', '=', $id)->first();
        $patientData = Patient::where('id', '=', $patientTreatment->user_id)->first();
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();

        return Inertia::render('Patient/EditPerio', [
            'patientData' => $patientData,
            'clinicData' => $clinicData,
            'treatmentData' => $patientTreatment,
        ]);
    }

    /**
     * view patient clinic card
     * 
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function psrEdit(Request $request, $id) {
        $patientTreatment = PatientTreatment::where('id', '=', $id)->first();
        $patientData = Patient::where('id', '=', $patientTreatment->user_id)->first();
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();

        return Inertia::render('Patient/EditPSR', [
            'patientData' => $patientData,
            'clinicData' => $clinicData,
            'treatmentData' => $patientTreatment,
        ]);
    }

    /**
     * view patient clinic card
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function psrCopy(Request $request, $id) {
        $patientTreatment = PatientTreatment::where('id', '=', $id)->first();
        $patientData = Patient::where('id', '=', $patientTreatment->user_id)->first();
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();

        // copy row
        $patientTreatmentCopy = new PatientTreatment();
        $patientTreatmentCopy->user_id = $patientTreatment->user_id;
        $patientTreatmentCopy->stage_name = $patientTreatment->name.' copy';
        $patientTreatmentCopy->type = $patientTreatment->type;
        $patientTreatmentCopy->psr = $patientTreatment->psr;
        $patientTreatmentCopy->save();

        return Inertia::render('Patient/EditPSR', [
            'patientData' => $patientData,
            'clinicData' => $clinicData,
            'treatmentData' => $patientTreatmentCopy,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer) {
        //
    }
}
