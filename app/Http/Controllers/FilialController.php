<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilialUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Store;
use App\Models\User;
use App\Models\ClinicUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class FilialController extends Controller
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
            DB::statement("SET search_path TO clinic_{$clinicId}");
            return $callback($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    /**
     * Helper to get clinic data from core schema
     */
    private function getClinicFromCoreSchema($clinicId)
    {
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        DB::statement("SET search_path TO core");
        $clinic = Clinic::find($clinicId);
        DB::statement("SET search_path TO {$originalSearchPath}");
        return $clinic;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $this->getClinicFromCoreSchema($clinicId);
            $filialData = ClinicFilial::where('clinic_id', '=', $clinicId)->get();
            return Inertia::render('Clinic/Filials', [
                'clinicData' => $clinic,
                'filialData' => $filialData
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $this->getClinicFromCoreSchema($clinicId);
            $storeData = Store::where('clinic_id', $clinicId)->get();
            $filialData = new ClinicFilial();
            return Inertia::render('Clinic/FilialCreate', [
                'clinicData' => $clinic,
                'filialData' => $filialData,
                'storeData' => $storeData,
                'employeesData' => $clinic->employees()
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        // Debug the current search path and user permissions
        $searchPath = DB::select("SHOW search_path")[0]->search_path;
        \Illuminate\Support\Facades\Log::debug('FilialController show: Current search path: ' . $searchPath);
        \Illuminate\Support\Facades\Log::debug('FilialController show: User permissions: ', $request->user()->getAllPermissions()->pluck('name')->toArray());
        
        // Check permissions in the current schema context
        if (!$request->user()->can('filial-view')) {
            \Illuminate\Support\Facades\Log::debug('FilialController show: Permission denied for filial-view');
            return Inertia::render('Layouts/NoPermission');
        }
        
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            $clinic = $this->getClinicFromCoreSchema($clinicId);
            $filial = ClinicFilial::find($id);
            return Inertia::render('Clinic/FilialShow', [
                'filialData' => $filial,
            ]);
        });
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id, $clinicData) {

            // Проверка прав уже внутри схемы clinic_X
            if (!$request->user()->canClinic('filial-edit')) {
                return Inertia::render('Layouts/NoPermission');
            }
            $serverFilePath = public_path('storage/clinic/stamps/filial-stamp-' .$id. '.png');
            $imagePath = '';
            if (file_exists($serverFilePath)) {
                $imagePath = asset('storage/clinic/stamps/filial-stamp-' .$id. '.png');
            }
            $clinic = $this->getClinicFromCoreSchema($clinicId);
            $storeData = Store::where('clinic_id', $clinicId)->get();
            $filial = ClinicFilial::find($id);
            $filial->stamp = $imagePath;
            $customerData = $clinicData->employees();
            
            return Inertia::render('Clinic/FilialEdit', [
                'filialData' => $filial,
                'clinicData' => $clinic,
                'storeData'  => $storeData,
                'stampPath'  => $imagePath,
                'employeesData' => $customerData
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FilialUpdateRequest $request) {
        
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            // Проверка прав уже внутри схемы clinic_X
            if (!$request->user()->canClinic('filial-edit')) {
                return Inertia::render('Layouts/NoPermission');
            }
            if ($request->id) {
                $filial = ClinicFilial::find($request->id);
                // Capture old data before updating
                $oldData = $filial->toArray();
                $filial->fill($request->validated());
                $filial->store_id = $request->store_id;
                $filial->clinic_id = $clinicId;
                // Prepare new data
                $newData = $filial->toArray();
                $this->auditLogService->log($request->user(), 'filial.updated', $filial, $oldData, $newData);
                $filial->save();
            } else {
                $filial = new ClinicFilial();
                $filial->fill($request->validated());
                $filial->store_id = $request->store_id;
                $filial->clinic_id = $clinicId;
                // Prepare new data
                $newData = $filial->toArray();
                $this->auditLogService->log($request->user(), 'filial.created', $filial, null, $newData);
                $filial->save();
            }
            $filialId = $filial->id;
            if ($request->file) {
                $ext = $request->file->getClientOriginalExtension();
                Storage::disk('public')->put('clinic/stamps/filial-stamp-' .$filialId. '.'.$ext, file_get_contents($request->file));
            }

            return Redirect::route('clinic.filials');
        });

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClinicFilial $filial) {
        //
    }
}