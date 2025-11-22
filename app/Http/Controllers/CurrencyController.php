<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducerUpdateRequest;
use App\Models\Clinic;
use App\Models\Currency;
use App\Models\CurrencyExchange;
use App\Models\MaterialCategories;
use App\Models\Producer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CurrencyController extends Controller
{
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
            
            if ($request->user()->can('currency-view')) {
                $clinic = $request->user()->clinicByFilial($clinicId);
                
                $listData = Currency::all();
                $arrCurrencies = array();
                foreach($listData as $currency) {
                    $arrCurrencies[$currency->id] = $currency;
                    // Fix: Properly access the rate_value by executing the relationship query
                    $rate = $currency->rate()->first();
                    $arrCurrencies[$currency->id]->rate = $rate ? $rate->rate_value : 1; // Default to 1 if no rate found
                }

                return Inertia::render('Currency/List', [
                    'clinicData' => $clinic,
                    'listData' => $listData
                ]);
            } else {
                return Inertia::render('Currency/List', [
                    'error' => 'Insufficient permissions to view currencies'
                ]);
            }
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('currency-create')) {
                $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                $formData = new Currency();
                return Inertia::render('Currency/Create', [
                    'clinicData' => $clinicData,
                    'formData' => $formData,
                ]);
            } else {
                return Inertia::render('Currency/List', [
                    'clinicData' => $clinicData ?? null,
                    'error' => 'Insufficient permissions to create currency'
                ]);
            }
        });
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if ($request->user()->can('currency-edit')) {
                $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                $formData = DB::table('currencies')
                    ->select('currencies.*', 'currency_exchanges.rate_value AS rate')
                    ->leftJoin('currency_exchanges', 'currencies.id', '=', 'currency_exchanges.to_currency_id')
                    ->where('currencies.id', $id)
                    ->orderBy('created_at', 'desc')->get();
                return Inertia::render('Currency/Edit', [
                    'clinicData' => $clinicData,
                    'formData' => $formData[0],
                ]);
            } else {
                return Inertia::render('Currency/List', [
                    'clinicData' => $clinicData ?? null,
                    'error' => 'Insufficient permissions to edit currency'
                ]);
            }
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('currency-edit')) {
                // Get clinic data
                $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                
                // Update currency information
                $currency = Currency::find($request->id);
                $currency->fill($request->validated());
                $currency->symbol = $request->symbol;
                $currency->save();

                // Create new currency exchange rate record
                $currencyExchange = new CurrencyExchange();
                $currencyExchange->clinic_id = $clinicId;
                $currencyExchange->currency_id = $request->id; // Use the currency ID, not from request
                $currencyExchange->rate_value = floatval($request->rate);
                $currencyExchange->rate_date = date('Y-m-d H:i:s');
                $currencyExchange->save();

                return Redirect::route('currency.index');
            } else {
                return Inertia::render('Currency/List', [
                    'clinicData' => $clinicData ?? null,
                    'error' => 'Insufficient permissions to update currency'
                ]);
            }
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency) {
        //
    }
}