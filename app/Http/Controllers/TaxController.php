<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaxUpdateRequest;
use App\Models\Clinic;
use App\Models\Tax;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class TaxController extends Controller
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
            $listData = Tax::get();

            return Inertia::render('Tax/List', [
                'clinicData' => $clinic,
                'listData'   => $listData,
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData) {
            $formData = new Tax();
            return Inertia::render('Tax/Create', [
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
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id, $clinicData) {
            if (!$request->user()->canClinic('store-edit')) {
                return Inertia::render('Tax/List', ['error' => 'Insufficient permissions']);
            }
            $formData = Tax::find($id);
            return Inertia::render('Tax/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        });
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaxUpdateRequest $request) {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData) {
            if (!$request->user()->canClinic('store-create')) {
                return Inertia::render('Tax/List', ['error' => 'Insufficient permissions']);
            }
            if ($request->id)
                $unit = Tax::find($request->id);
            else {
                $unit = new Tax();
            }

            $unit->fill($request->validated());
            // $unit->clinic_id = $clinicData->id;
            $unit->unit_qty = $request->unit_qty;
            $unit->save();

            return Redirect::route('tax.index');
        });
        
    }


    public function delete(Request $request) {
        $unit = Tax::where('id', '=', $request->id)->get();
        $unit[0]->delete();

        return Redirect::route('tax.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tax $unit) {
        //
    }
}
