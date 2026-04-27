<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientStatusUpdateRequest;
use App\Models\Clinic;
use App\Models\VisitScheduleStatus;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class SchedulerVisitStatusController extends Controller
{
    protected AuditLogService $auditLogService;
    protected ClinicSchemaService $schemaService;

    public function __construct(ClinicSchemaService $schemaService, AuditLogService $auditLogService)
    {
        $this->schemaService = $schemaService;
        $this->auditLogService = $auditLogService;
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
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");
            return $callback($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
    //
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $request->user()->clinicByFilial($clinicId);
            $listData = VisitScheduleStatus::orderBy('name')->get();
            return Inertia::render('PatientStatus/List', [
                'clinicData' => $clinic,
                'listData' => $listData
            ]);
        });
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
            $formData = PatientStatus::find($id);
            return Inertia::render('PatientStatus/Edit', [
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
