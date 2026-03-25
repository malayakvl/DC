<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentMethodUpdateRequest;
use App\Models\Clinic;
use App\Models\PaymentMethod;
use App\Models\Currency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;

class PaymentMethodController extends Controller
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
            if (!$request->user()->canClinic('patient-view')) {
                return Inertia::render('Dashboard', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $listData = PaymentMethod::select('payment_methods.*', 'currencies.name as currency_name')
                ->leftJoin('currencies', 'currencies.id', '=', 'payment_methods.currency_id')
                ->orderBy('payment_methods.name', 'asc')
                ->get();

            return Inertia::render('PaymentMethod/List', [
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
            if (!$request->user()->canClinic('patient-edit')) {
                return Redirect::route('payment-method.index')->with('error', 'Insufficient permissions');
            }
            $formData = new PaymentMethod();
            $currencyData = Currency::all();

            return Inertia::render('PaymentMethod/Create', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'currencyData' => $currencyData,
            ]);
        });
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id, $clinicData) {
            if (!$request->user()->canClinic('patient-edit')) {
                return Redirect::route('payment-method.index')->with('error', 'Insufficient permissions');
            }
            $currencyData = Currency::all();
            $formData = PaymentMethod::find($id);
            
            return Inertia::render('PaymentMethod/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'currencyData' => $currencyData,
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentMethodUpdateRequest $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('patient-edit')) {
                return Redirect::route('payment-method.index')->with('error', 'Insufficient permissions');
            }
            if ($request->id)
                $data = PaymentMethod::find($request->id);
            else {
                $data = new PaymentMethod();
            }
            $data->fill($request->validated());
            $data->save();

            return Redirect::route('payment-method.index');
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('patient-edit')) {
                return Redirect::route('payment-method.index')->with('error', 'Insufficient permissions');
            }
            $data = PaymentMethod::find($request->id);
            if ($data) {
                $data->delete();
            }
            return Redirect::route('payment-method.index');
        });
    }
}
