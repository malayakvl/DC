<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrencyUpdateRequest;
use App\Models\Clinic;
use App\Models\Currency;
use App\Models\CurrencyExchange;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;

class CurrencyController extends Controller
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
            if (!$request->user()->canClinic('currency-view')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $listData = Currency::with('rate')->get();

            return Inertia::render('Currency/List', [
                'clinicData' => $clinic,
                'listData'   => $listData,
            ]);
        });
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('currency-create')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = new Currency();
            return Inertia::render('Currency/Create', [
                'clinicData' => $clinicData,
                'formData' => $formData,
            ]);
        });
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($id, $request) {
            $clinicData = $request->user()->clinicByFilial(session('clinic_id'));

            if (!$request->user()->canClinic('currency-edit')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }

            $formData = Currency::with('rate')->findOrFail($id);

            return Inertia::render('Currency/Edit', [
                'clinicData' => $clinicData,
                'formData'   => [
                    'id'     => $formData->id,
                    'name'   => $formData->name,
                    'symbol' => $formData->symbol,
                    'rate'   => $formData->rate->rate_value ?? 1,
                ],
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CurrencyUpdateRequest $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial(session('clinic_id'));
            if (!$request->user()->canClinic('currency-edit')) {
                return Inertia::render('Currency/List', ['error' => 'Insufficient permissions']);
            }
            // Update currency information
            $currency = Currency::find($request->id);
            // Capture old data before updating
            $oldData = $currency->toArray();
            $currency->fill($request->validated());
            $currency->symbol = $request->symbol;
            // Prepare new data
            $newData = $currency->toArray();
            $currency->save();
            // Log the currency update
            $this->auditLogService->log($request->user(), 'currency.updated', $currency, $oldData, $newData);

            // Create new currency exchange rate record
            $currencyExchange = new CurrencyExchange();
            $currencyExchange->clinic_id = $clinicId;
            $currencyExchange->currency_id = $request->id; // Use the currency ID, not from request
            $currencyExchange->rate_value = floatval($request->rate);
            $currencyExchange->rate_date = date('Y-m-d H:i:s');
            $currencyExchange->save();
            // Log the currency exchange rate creation
            $this->auditLogService->log($request->user(), 'currency_exchange.created', $currencyExchange, null, $currencyExchange->toArray());

            return Redirect::route('currency.index')->with('success', 'Currency updated successfully');
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency) {
        //
    }
}