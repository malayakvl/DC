<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducerUpdateRequest;
use App\Models\Clinic;
use App\Models\Producer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class ProducerController extends Controller
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('store-view')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $listData = DB::table('producers')
                ->select('producers.*')
                ->orderBy('name')->get();
            return Inertia::render('Producer/List', [
                'clinicData' => $clinic,
                'listData' => $listData
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData) {
            if (!$request->user()->canClinic('store-create')) {
                return Inertia::render('Store/Edit', ['error' => 'Insufficient permissions']);
            }
            $formData = new Producer();
            return Inertia::render('Producer/Create', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        });
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData, $id) {
            if (!$request->user()->canClinic('store-edit')) {
                return Inertia::render('Store/Edit', ['error' => 'Insufficient permissions']);
            }
            $formData = Producer::find($id);
            return Inertia::render('Producer/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProducerUpdateRequest $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {

            $clinicData = $request->user()->clinicByFilial($clinicId);

            // Проверка прав внутри схемы клиники
            if (!$request->user()->canClinic('store-edit')) {
                return Inertia::render('Store/Edit', [
                    'error' => 'Insufficient permissions',
                    'clinicData' => $clinicData
                ]);
            }

            // Получаем или создаём запись
            if ($request->id)
                $producer = Producer::find($request->id);
            else {
                $producer = new Producer();
            }
            $producer->fill($request->validated());
            $producer->save();

            return Redirect::route('producer.index');

        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producer $producer) {
        //
    }
}
