<?php

namespace App\Http\Controllers;

use App\Http\Requests\VisitScheduleStatusUpdateRequest;
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


class VisitScheduleStatusController extends Controller
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
            if (!$request->user()->canClinic('scheduler-all')) {
                return Inertia::render('VisitScheduleStatus/List', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $listData = VisitScheduleStatus::orderBy('name')->get();
            return Inertia::render('VisitScheduleStatus/List', [
                'clinicData' => $clinic,
                'listData' => $listData
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('schedule-create')) {
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
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if (!$request->user()->canClinic('scheduler-edit')) {
                return Inertia::render('VisitScheduleStatus/List', ['error' => 'Insufficient permissions']);
            }
            
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = VisitScheduleStatus::find($id);
            
            return Inertia::render('VisitScheduleStatus/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VisitScheduleStatusUpdateRequest $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('scheduler-edit')) {
                return Inertia::render('VisitScheduleStatus/List', ['error' => 'Insufficient permissions']);
            }
            
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            if ($request->id)
                $data = VisitScheduleStatus::find($request->id);
            else {
                $data = new VisitScheduleStatus();
            }
            $data->fill($request->validated());
            $data->save();

            return Redirect::route('visit-schedule-status.index');
        
        });
        
    }
}
