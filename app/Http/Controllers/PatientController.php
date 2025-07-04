<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Patient;
use App\Models\ActDocument;
use App\Models\Cabinet;
use App\Models\PriceCategory;
use App\Models\Pricing;
use App\Models\Scheduler;
use App\Models\Size;
use App\Models\Store;
use App\Models\PatientTreatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use DateTime;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
        if ($request->session()->get('filial_id')) {
            $query = DB::table('patients')
                ->select('patients.*')
                ->leftJoin('clinic_patient', 'clinic_patient.patient_id', '=', 'patients.id')
                ->where('clinic_patient.clinic_id', $clinic->id);
            if ($request->filterName) {
                $query->whereRaw('LOWER(last_name) LIKE ?', ['%' . mb_strtolower($request->filterName) . '%']);
                //                $query->where('last_name', 'LIKE', '%' . $request->filterName . '%');
            }
            if ($request->filterPhone) {
                $query->where('phone', 'LIKE', '%' . $request->filterPhone . '%');
            }
            $query->where('clinic_patient.filial_id', $request->session()->get('filial_id'))
                ->orderBy('first_name');
        } else {
            $query = DB::table('patients')
                ->select('patients.*')
                ->leftJoin('clinic_patient', 'clinic_patient.patient_id', '=', 'patients.id')
                ->where('clinic_patient.clinic_id', $clinic->id)
                ->orderBy('first_name');
        }
        $listData = $query->paginate(50);

        return Inertia::render('Patient/List', [
            'clinicData' => $clinic,
            'listData' => $listData,
            'currency' => $clinic->currency->symbol
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        if ($request->user()->can('patient-create')) {
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
            $statusesData = DB::table('patient_statuses')
                ->select('patient_statuses.*')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            $contactData = DB::table('patients_contact')->get();
            $formData = Patient::where('id', '=', $id)->first();
            return Inertia::render('Patient/Edit', [
                'formData' => $formData,
                'customerData' => $customerData,
                'contactData' => $contactData,
                'statusesData' => $statusesData
            ]);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PatientUpdateRequest $request) {
        if ($request->user()->can('patient-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $isNew = false;
            if ($request->id)
                $patient = Patient::find($request->id);
            else {
                $patient = new Patient();
                $isNew = true;
            }
            $patient->fill($request->validated());
            $patient->save();

            // connect patient with clinic
            if ($isNew) {
                DB::table('clinic_patient')->insert(
                    [
                        'patient_id' => $patient->id,
                        'filial_id' => $request->session()->get('filial_id'),
                        'clinic_id' => $clinicData->id
                    ]
                );
            }

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

    public function generateCategories($categories, &$arrCat, $level) {
        foreach ($categories as $category) {
            $category->level = $level;
            $category->producerName = $category->producer();
            $arrCat[] = $category;
            if (count($category->children) > 0) {
                $this->generateCategories($category->children, $arrCat, ($level+1));
            }
        }

        return $arrCat;
    }


    public function updateAct(Request $request) {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $schedule = Scheduler::find($request->schedule_id);

        $doc = new ActDocument();
        $date = new DateTime();
        $doc->doc_number = date("dmyHis");
        $doc->doc_date = $date->format('Y-m-d H:i:s');;
        $doc->clinic_id = $clinicData->id;
        $doc->filial_id = $request->session()->get('filial_id');
        $doc->doctor_id = $schedule->doctor_id;
        $doc->patient_id = $schedule->patient_id;
        $doc->schedule_id = $schedule->id;
        $doc->currency_id = $clinicData->currency->id;
        $doc->services = json_encode($request->services);
        $doc->discount = $request->discount;
        $doc->total = $request->total;
        $doc->total_with_discount = $request->total_with_discount;
        $doc->save();

        $schedule->services = json_encode($request->services);
        $schedule->save();

        return redirect()->route('patient.view', ['id' => $schedule->patient_id]);
    }


    /**
     * view patient clinic card
     */
    public function view(Request $request, $id, $scheduleId = '') {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        $patientData = Patient::where('id', '=', $id)->first();
        $categories = PriceCategory::where('parent_id', null)
            ->where('clinic_id', $clinicData->id)
            ->get();
        $arrServices = [];
        foreach ($categories as $category) {
            $arrServices[$category->id] = Pricing::where('category_id', '=', $category->id)->orderBy('name')->get();
        }
        $arrCat = array();
        $tree = $this->generateCategories($categories, $arrCat, 0);
        $type = $request->get('type');
        $quickActData = '';
        if ($scheduleId) {
            $quickActData = Scheduler::where('id', '=', $scheduleId)->get();

            return Inertia::render('Patient/View', [
                'patientData' => $patientData,
                'type' => $type,
                'treatmentData' => PatientTreatment::where('user_id', '=', $id)->orderBy('created_at', 'desc')->get(),
                'clinicData' => $clinicData,
                'quickActData' => $quickActData[0],
                'currency' => $clinicData->currency->symbol,
                'discountStatus' => $patientData->discountStatus ? $patientData->discountStatus->name : '',
                'discountValue' => $patientData->discountStatus ? $patientData->discountStatus->discount : 0,
                'categoriesData' => $categories,
                'services' => $arrServices,
                'tree' => $tree,
                'scheduleId' => $scheduleId
            ]);
        } else {
            return Inertia::render('Patient/View', [
                'patientData' => $patientData,
                'type' => 'documents',
                'treatmentData' => PatientTreatment::where('user_id', '=', $id)->orderBy('created_at', 'desc')->get(),
                'clinicData' => $clinicData,
                'quickActData' => [],
                'currency' => $clinicData->currency->symbol,
                'discountStatus' => $patientData->discountStatus ? $patientData->discountStatus->name : '',
                'discountValue' => $patientData->discountStatus ? $patientData->discountStatus->discount : 0,
                'categoriesData' => $categories,
                'services' => $arrServices,
                'tree' => $tree,
                'scheduleId' => $scheduleId
            ]);
        }

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

    /**
     * view patient clinic card
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function formulaCopy(Request $request, $id) {
        $patientTreatment = PatientTreatment::where('id', '=', $id)->first();
        $patientData = Patient::where('id', '=', $patientTreatment->user_id)->first();
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();

        // copy row
        $patientTreatmentCopy = new PatientTreatment();
        $patientTreatmentCopy->user_id = $patientTreatment->user_id;
        $patientTreatmentCopy->stage_name = $patientTreatment->name.' copy';
        $patientTreatmentCopy->type = $patientTreatment->type;
        $patientTreatmentCopy->perioValues = $patientTreatment->perioValues;
        $patientTreatmentCopy->formula = $patientTreatment->formula;
        $patientTreatmentCopy->save();
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
    public function perioCopy(Request $request, $id) {
        $patientTreatment = PatientTreatment::where('id', '=', $id)->first();
        $patientData = Patient::where('id', '=', $patientTreatment->user_id)->first();
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();

        // copy row
        $patientTreatmentCopy = new PatientTreatment();
        $patientTreatmentCopy->user_id = $patientTreatment->user_id;
        $patientTreatmentCopy->stage_name = $patientTreatment->name.' copy';
        $patientTreatmentCopy->type = $patientTreatment->type;
        $patientTreatmentCopy->perioValues = $patientTreatment->perioValues;
        $patientTreatmentCopy->formula = $patientTreatment->formula;
        $patientTreatmentCopy->save();

        return Inertia::render('Patient/EditPerio', [
            'patientData' => $patientData,
            'clinicData' => $clinicData,
            'treatmentData' => $patientTreatmentCopy,
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
