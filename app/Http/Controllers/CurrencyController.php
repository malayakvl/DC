<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProducerUpdateRequest;
use App\Models\Clinic;
use App\Models\Currency;
use App\Models\CurrencyExchange;
use App\Models\Filial;
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clinic = $request->user()->clinicByFilial($request->session()->get('clinic_id'));
//        $listData = DB::table('currencies')
//            ->select('currencies.*', 'currency_exchanges.rate_value')
//            ->leftJoin('currency_exchanges', 'currency_exchanges.currency_id', '=', 'currencies.id')
//            ->where('currencies.clinic_id', $clinic->id)
//            ->groupBy('currencies.id')
//            ->groupBy('currency_exchanges.rate_value')
//            ->orderBy('name')
//            ->get();
        $listData = Currency::where('clinic_id', '=', $clinic->id)->get();
        $arrCurrencies = array();
        foreach($listData as $currency) {
            $arrCurrencies[$currency->id] = $currency;
//            echo($currency->rate() ? $currency->rate()->rate_value : 0);
////            exit;
            $arrCurrencies[$currency->id]->rate = $currency->rate() ? $currency->rate()->rate_value : 0;
//            $arrCurrencies[$currency->id]->rate = $currency->rate() ? $currency->rate()->rate_value : 0;
        }
//dd($arrCurrencies);
//        exit;
        return Inertia::render('Currency/List', [
            'clinicData' => $clinic,
            'listData' => $listData
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        if ($request->user()->can('store-create')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
            $formData = new MaterialCategories();
            return Inertia::render('Producer/Create', [
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
            $formData = DB::table('currencies')
                ->select('currencies.*', 'currency_exchanges.rate_value AS rate')
                ->leftJoin('currency_exchanges', 'currencies.id', '=', 'currency_exchanges.currency_id')
                ->where('currencies.clinic_id', $clinicData->id)
                ->where('currencies.id', $id)
                ->orderBy('rate_date')->get();
            return Inertia::render('Currency/Edit', [
                'clinicData' => $clinicData,
                'formData' => $formData[0],
            ]);

        } else {

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProducerUpdateRequest $request) {
        if ($request->user()->can('store-edit')) {
            $currency = Currency::find($request->id);
            $currency->fill($request->validated());
            $currency->symbol = $request->symbol;
            $currency->save();

            $currencyExchange = new CurrencyExchange();
            $currencyExchange->clinic_id = $request->clinic_id;
            $currencyExchange->currency_id = $request->currency_id;
            $currencyExchange->rate_value = floatval($request->rate);
            $currencyExchange->rate_date = date('Y-m-d H:i:s');
            $currencyExchange->save();

            return Redirect::route('currency.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency) {
        //
    }
}
