<?php

namespace App\Http\Controllers;

use App\Constants\Invoices;
use App\Http\Requests\MoneyInRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\MoneyIn;
use App\Models\PaymentMethod;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class MoneyInController extends Controller
{
    protected AuditLogService $auditLogService;
    protected ClinicSchemaService $schemaService;

    public function __construct(ClinicSchemaService $schemaService, AuditLogService $auditLogService, CustomerService $customerService)
    {
        $this->schemaService = $schemaService;
        $this->auditLogService = $auditLogService;
        $this->customerService = $customerService;
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
            if (!$request->user()->canClinic('money-in-all')) {
                return Inertia::render('Errors/Forbidden', [
                    'error' => 'Insufficient permissions',
                    'requiredPermission' => 'money-in',
                ])->toResponse($request)->setStatusCode(403);
            }
            $clinic = $request->user()->clinicByFilial($clinicId);
            $filialId = $request->session()->get('filial_id');
            $schema = 'clinic_'.$clinicId;
            $limit = $request->limit ?? 20;
            $offset = $request->offset ?? 0;
            $dateFrom = $request->date_from;
            $dateTo = $request->date_to;
            $accountId = $request->account_id;

            $invoiceData = DB::select("
                SELECT *
                FROM core.get_money_in_by_clinic(
                    ?, 
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            ", [
                $schema,
                $accountId,
                $dateFrom,
                $dateTo,
                $limit,
                $offset
            ]);

            $paymentMethods = PaymentMethod::all();
            $customerData = $this->customerService->getEmploeeClinicFilialData($clinicId, $filialId);
            $currencies = Currency::all();
            return Inertia::render('MoneyIn/List', [
                'clinicData' => $clinic,
                'paymentMethods' => $paymentMethods,
                'listData' => $invoiceData,
                'customerData' => $customerData,
                'statusData' => Invoices::INVOICE_STATUSES,
                'filters' => $request->only(['date_from', 'date_to']),
                'currencyData' => $currencies,
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if (!$request->user()->canClinic('money-in-all')) {
                return Inertia::render('Errors/Forbidden', [
                    'error' => 'Insufficient permissions',
                    'requiredPermission' => 'money-in',
                ])->toResponse($request)->setStatusCode(403);
            }
            $clinicData = $request->user()->clinicByFilial($clinicId);
            $typeData = array();
            $filialId = $request->session()->get('filial_id');
            $formData = MoneyIn::find($id);
            $currencyData = Currency::where('id', '=', $formData->curreny_id);
            $paymentsMethods = PaymentMethod::where('id', '=', $formData->account_id);

            $customerData = $this->customerService->getEmploeeClinicFilialData($clinicId, $filialId);
            return Inertia::render('MoneyIn/View', [
                'clinicData' => $clinicData,
                'formData' => $formData,
                'customerData' => $customerData,
                'paymentsMethodsData' => $paymentsMethods,
                'statusData' => Invoices::INVOICE_STATUSES,
                'typeData' => $typeData,
                'currencyData' => $currencyData,
            ]);
        });
    }



    public function update(MoneyInRequest $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {

            if (!$request->user()->can('invoice-incoming-edit')) {
                abort(403, 'No permission');
            }
            $rate = Currency::where('name', $request->currency_id)
                ->first();
            // Создаем или обновляем накладную
            $moneyIn = $request->id ? MoneyIn::find($request->id) : new MoneyIn();
            $moneyIn->fill($request->validated());
            $moneyIn->document_number = $request->document_number;
            $moneyIn->document_date = $request->document_date;
            $moneyIn->customer_id = $request->customer_id;
            $moneyIn->comment = $request->note;
            $moneyIn->status = $request->status; // draft / done
            $moneyIn->currency_id = $rate->id;
            $moneyIn->filial_id = $request->session()->get('filial_id') ?? 1; // использовать филиал из сессии
            $moneyIn->amount = $request->amount ?? 0;
            try {
                $moneyIn->save();
            } catch (\Throwable $e) { // Указываем Throwable, чтобы поймать вообще любую ошибку/исключение
                dd($e->getMessage()); // Выводим реальный текст ошибки, а не тупой dd(1)
            }

            $invoiceId = $moneyIn->id;

            if ($request->status === 'posted') {
                $schema = "clinic_{$clinicId}";
                DB::statement("SELECT core.add_money_movement(?, ?, ?, ?, ?, ?)", [
                    $schema,
                    $request->account_id,
                    'money_in',
                    $invoiceId,
                    $request->amount ?? 0,
                    1
                ]);
            }

            return redirect()->route('money-in.index');
        });
    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice) {
        //
    }
}
