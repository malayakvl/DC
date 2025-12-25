<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;

class StoreController extends Controller
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
                return Inertia::render('Store/List', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $storeData = DB::table('stores')
                ->select('stores.*', 'users.name AS ceoName', 'clinic_filials.name AS filialName')
                ->leftJoin('core.users', 'users.id', '=', 'stores.user_id')
                ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                ->where('stores.clinic_id', $request->session()->get('clinic_id'))
                ->orderBy('name')->get();

            return Inertia::render('Store/List', [
                'clinicData' => $clinic,
                'storeData' => $storeData
            ]);

        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        
        return $this->withClinicSchema($request, function($clinicId) use ($request, $clinicData) {
            if (!$request->user()->canClinic('customer-create')) {
                return Inertia::render('Store/Edit', ['error' => 'Insufficient permissions']);
            }
            $filailData = ClinicFilial::where('clinic_id', $clinicData->id)->get();
            $customerData = $clinicData->employees();
            $storeData = new Store();
            return Inertia::render('Store/Create', [
                'clinicData' => $clinicData,
                'filialData' => $filailData,
                'formData' => $storeData,
                'customerData' => $customerData
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('store-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Store/FilialView', [
                'filialData' => $filial,
            ]);
        } else {

        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($id, $request) {
            $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
            if (!$request->user()->canClinic('store-edit')) {
                return Inertia::render('Store/Edit', ['error' => 'Insufficient permissions']);
            }

            $serverFilePath = public_path('storage/clinic/stamps/store-stamp-' .$id. '.png');
            $imagePath = '';
            if (file_exists($serverFilePath)) {
                $imagePath = asset('storage/clinic/stamps/store-stamp-'.$id.'.png');
            }
            $filailData = ClinicFilial::where('clinic_id', $clinicData->id)->get();
            
            $customerData = $clinicData->employees();
            // dd($customerData);exit;
            $storeData = Store::find($id);

            return Inertia::render('Store/Edit', [
                'clinicData' => $clinicData,
                'filialData' => $filailData,
                'formData' => $storeData,
                'customerData' => $customerData,
                'stampPath' => $imagePath
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateRequest $request)
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
            if ($request->id) {
                $store = Store::find($request->id);
                // Capture old data before updating
                $oldData = $store->toArray();
                $store->fill($request->validated());
                
                // Сохраняем привязку к филиалу, если передана
                if ($request->filial_id) {
                    $store->filial_id = $request->filial_id;
                }
                
                // Prepare new data
                $newData = $store->toArray();
                $this->auditLogService->log($request->user(), 'store.updated', $store, $oldData, $newData);
                $store->save();
            } else {
                $store = new Store();
                $store->fill($request->validated());
                
                // Сохраняем привязку к филиалу, если передана
                if ($request->filial_id) {
                    $store->filial_id = $request->filial_id;
                }
                
                // Prepare new data
                $newData = $store->toArray();
                $this->auditLogService->log($request->user(), 'store.created', $store, null, $newData);
                $store->save();
            }

            // Загружаем файл штампа, если передан
            if ($request->file) {
                $ext = $request->file->getClientOriginalExtension();
                Storage::disk('public')->put(
                    'clinic/stamps/store-stamp-' . $store->id . '.' . $ext,
                    file_get_contents($request->file)
                );
            }

            return Redirect::route('store.index')->with('success', 'Store updated successfully');
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $filial) {
        //
    }
}
