<?php

namespace App\Http\Controllers;

use App\Constants\Invoices;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\CurrencyExchange;
use App\Models\StoreBatches;
use App\Models\StoreMovements;
use App\Models\InvoiceItems;
use App\Models\InvoiceStatus;
use App\Models\InvoiceType;
use App\Models\Material;
use App\Models\Producer;
use App\Models\Store;
use App\Models\Invoice;
use App\Models\StoreMaterials;
use App\Models\Supplier;
use App\Models\Tax;
use App\Models\Unit;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class IncomingInvoiceController extends Controller
{
    protected AuditLogService $auditLogService;
    protected ClinicSchemaService $schemaService;
    protected CustomerService $customerService;


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
            $clinic = $request->user()->clinicByFilial($clinicId);

            // Получаем доступные склады для филиала
            $filialId = $request->session()->get('filial_id');
            $storesData = Store::where('filial_id', '=', $filialId)->get();
            $allowedStoreIds = $storesData->pluck('id')->toArray();

            $schema = 'clinic_'.$clinicId;
            $limit = $request->limit ?? 20;
            $offset = $request->offset ?? 0;

            $dateFrom = $request->date_from ?: null;
            $dateTo = $request->date_to ?: null;
            $supplierId = $request->supplier_id ?: null;
            $search = $request->search ?: null;
            $paymentStatus = $request->payment_status ?: null;
            $selectedStoreId = $request->store_id ?: null;

            // Логика выбора склада
            $storeIdParam = null;
            if ($request->user()->roles[0]->name !== 'Admin') {
                if ($selectedStoreId && in_array($selectedStoreId, $allowedStoreIds)) {
                    $storeIdParam = (int)$selectedStoreId;
                } else {
                    $storeIdParam = $allowedStoreIds[0] ?? null;
                }
            } else {
                $storeIdParam = $selectedStoreId ? (int)$selectedStoreId : null;
                $storesData = Store::all();
            }
            // КРИТИЧЕСКИ ВАЖНО: оборачиваем склад в массив для bigint[]
            $storeIdsArgument = $storeIdParam !== null ? [$storeIdParam] : null;
            // Превращаем в формат массива PostgreSQL: '{1}' или NULL
            $storeIdsPgArray = $storeIdParam !== null ? '{' . $storeIdParam . '}' : null;
            // Вызов функции (ровно 9 параметров)
            $invoiceData = DB::select("
            SELECT *
            FROM core.get_income_invoices_by_clinic(
                ?, 
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        ", [
                $schema,
                $storeIdsPgArray,
                $supplierId,
                $dateFrom,
                $dateTo,
                $search,
                $paymentStatus,
                (int)$limit,
                (int)$offset
            ]);
            $suppliers = DB::table('suppliers')->select('id', 'name')->orderBy('name')->get();
            $paymentMethods = DB::select("
            SELECT 
                pm.id,
                pm.name,
                c.name as currency_name,
                COALESCE(SUM(mm.direction * mm.amount), 0) as balance
            FROM {$schema}.payment_methods pm
            LEFT JOIN {$schema}.money_movements mm 
                ON mm.account_id = pm.id
            LEFT JOIN {$schema}.currencies c 
                ON c.id = pm.currency_id
            GROUP BY pm.id, pm.name, c.name
            ORDER BY pm.name
        ");

            return Inertia::render('InvoiceIncoming/List', [
                'clinicData' => $clinic,
                'listData' => $invoiceData,
                'suppliers' => $suppliers,
                'paymentMethods' => $paymentMethods,
                'storesData' => $storesData,
                'filters' => $request->only([
                    'search', 'store_id', 'supplier_id', 'payment_status', 'date_from', 'date_to'
                ]),
            ]);
        });
    }

    public function indexOld(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $request->user()->clinicByFilial($clinicId);
            $arrStores = array();
            if ($request->user()->roles[0]->name != 'Admin') {
                // get stores filial
                $filialId = $request->session()->get('filial_id');
                $storesData = Store::where('filial_id', '=', $filialId)->get();
                foreach ($storesData as $store) {
                    $arrStores[] = $store->id;
                }
            }

            $schema = 'clinic_'.$clinicId;
            $limit = $request->limit ?? 20;
            $offset = $request->offset ?? 0;
            $dateFrom = $request->date_from;
            $dateTo = $request->date_to;
            $supplierId = $request->supplier_id;

            $storeIds = null;
            if ($request->user()->roles[0]->name !== 'Admin') {
                $storeIds = $arrStores;
            }

            $storeIdsParam = $storeIds ? '{' . implode(',', $storeIds) . '}' : null;
            $invoiceData = DB::select("
                SELECT *
                FROM core.get_income_invoices_by_clinic(
                    ?, 
                    ?::bigint[],
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            ", [
                $schema,
                $storeIdsParam,
                $supplierId,
                $dateFrom,
                $dateTo,
                $limit,
                $offset
            ]);
            $suppliers = DB::table('suppliers')->select('id', 'name')->orderBy('name')->get();
            
            $paymentMethods = DB::select("
                SELECT 
                    pm.id,
                    pm.name,
                    c.name as currency_name,
                    COALESCE(SUM(mm.direction * mm.amount), 0) as balance
                FROM {$schema}.payment_methods pm
                LEFT JOIN {$schema}.money_movements mm 
                    ON mm.account_id = pm.id
                LEFT JOIN {$schema}.currencies c 
                    ON c.id = pm.currency_id
                GROUP BY pm.id, pm.name, c.name
                ORDER BY pm.name
            ");

            return Inertia::render('InvoiceIncoming/List', [
                'clinicData' => $clinic,
                'listData' => $invoiceData,
                'suppliers' => $suppliers,
                'paymentMethods' => $paymentMethods,
                'storesData' => $storesData,
                'filters' => $request->only(['date_from', 'date_to', 'supplier_id', 'payment_method_id']),
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('invoice-incoming-create')) {
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $filialId = $request->session()->get('filial_id');
                $storeData = $this->customerService->clinicStoresData($clinicId);
                $currencyData = Currency::all();
                $unitsData = Unit::all();
                $taxData = Tax::all();
                $typeData = array();
                $formData = new Invoice();
                $lastInvoiceNum = DB::table('invoices')
                    // ->where('clinic_id', $clinicData->id)
                    ->max('invoice_number');
                if (!$lastInvoiceNum) {
                    $num = 1;
                } else {
                    $maxNum = (explode('-', $lastInvoiceNum));
                    if (intval($maxNum[1])) {
                        $num = intval($maxNum[1]);
                    }
                    ++$num;
                }
                $formData->invoice_number = date("dmy").'-'.$paddedNumber = str_pad($num, 7, '0', STR_PAD_LEFT);;
                $producerData = Supplier::all();
                $customerData = $this->customerService->getEmploeeClinicFilialData($clinicId, $filialId);

                return Inertia::render('InvoiceIncoming/Create', [
                    'clinicData' => $clinicData,
                    'filialData' => $storeData,
                    'formData' => $formData,
                    'storeData' => $storeData,
                    'customerData' => $customerData,
                    'producerData' => $producerData,
                    'statusData' => Invoices::INVOICE_STATUSES,
                    'typeData' => $typeData,
                    'currencyData' => $currencyData,
                    'unitsData' => $unitsData,
                    'taxData' => $taxData
                ]);
            } else {
                return Inertia::render('Layouts/NoPermission', [
                ]);
            }
        });

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if ($request->user()->can('invoice-incoming-edit')) {
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $storeData = $this->customerService->clinicStoresData($clinicId);

                $typeData = array();
                $unitsData = Unit::all();
                $storeName = '';
                $formData = Invoice::find($id);

                $currencyData = Currency::all();
                $taxData = Tax::all();;
                $rowData = InvoiceItems::select('invoice_items.*', 'invoice_items.qty as quantity', 'materials.name as product')
                    ->leftJoin('materials', 'materials.id', '=', 'invoice_items.material_id')
                    ->where('invoice_id', $id)->get();
                if (count($rowData) == 0) {
                    return Inertia::render('Exceptions/NoFound', [
                        'message' => 'No data found'
                    ]);
                }
                $producerData = Producer::all();
                $customerData = $this->customerService->getEmploeeClinicFilialData($clinicId, $request->session()->get('filial_id'));
                if ($formData->status === 'posted') {
                    $currencyData = Currency::all();
                    $storeName = '';
                    foreach ($storeData as $store) {
                        if ($store->id == $formData->store_id) {
                            $storeName = $store->name;
                        }
                    }
                    $currencyData = Currency::where('id', '=', $formData->currency_id)->first();
                    $producerData = Producer::where('id', '=', $formData->supplier_id)->first();
                    $taxData = Tax::where('id', '=', $formData->tax_id)->first();
                    return Inertia::render('InvoiceIncoming/View', [
                        'clinicData' => $clinicData,
                        'filialData' => $storeData,
                        'formData' => $formData,
                        'formRowData' => $rowData,
                        'storeData' => $storeName,
                        'customerData' => $customerData,
                        'producerData' => $producerData,
                        'statusData' => Invoices::INVOICE_STATUSES,
                        'typeData' => $typeData,
                        'currencyData' => $currencyData,
                        'unitsData' => $unitsData,
                        'taxData' => $taxData
                    ]);

                } else {
                    return Inertia::render('InvoiceIncoming/Edit', [
                        'clinicData' => $clinicData,
                        'filialData' => $storeData,
                        'formData' => $formData,
                        'formRowData' => $rowData,
                        'storeData' => $storeData,
                        'customerData' => $customerData,
                        'producerData' => $producerData,
                        'statusData' => Invoices::INVOICE_STATUSES,
                        'typeData' => $typeData,
                        'currencyData' => $currencyData,
                        'unitsData' => $unitsData,
                        'taxData' => $taxData
                    ]);
                }

            } else {
                return Inertia::render('Layouts/NoPermission', [
                ]);
            }
        });
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id) {
        //
        if ($request->user()->can('invoice-incoming-view')) {
            $filial = ClinicFilial::find($id);
            return Inertia::render('Store/FilialView', [
                'filialData' => $filial,
            ]);
        } else {

        }
    }

    /**
     * Откатить проведенный счет
     */
    private function rollbackIncomingInvoice(int $invoiceId): void
    {
        DB::transaction(function () use ($invoiceId) {
            // 1️⃣ ПОЛУЧАЕМ ДВИЖЕНИЯ
            $movements = DB::table('store_movements')
                ->where('document_type', 'invoice')
                ->where('document_id', $invoiceId)
                ->lockForUpdate()
                ->get();

            if ($movements->isEmpty()) {
                throw new \Exception('Движения по счету не найдены');
            }

            // 2️⃣ ДЛЯ КАЖДОГО ДВИЖЕНИЯ
            foreach ($movements as $move) {

                // Откатываем баланс
                DB::table('store_balances')
                    ->where('store_id', $move->store_id)
                    ->where('material_id', $move->material_id)
                    ->update([
                        'qty'        => DB::raw('qty - ' . (float) $move->qty),
                        'fact_qty'   => DB::raw('fact_qty - ' . (float) $move->fact_qty),
                        'uses_left'  => DB::raw('COALESCE(uses_left, 0) - COALESCE(' . ($move->uses ?? 0) . ', 0)'),
                        'updated_at' => now()
                    ]);
            }

            // 3️⃣ УДАЛЯЕМ БАТЧИ
            DB::table('store_batches')
                ->where('invoice_id', $invoiceId)
                ->delete();

            // 4️⃣ УДАЛЯЕМ ДВИЖЕНИЯ
            DB::table('store_movements')
                ->where('document_type', 'invoice')
                ->where('document_id', $invoiceId)
                ->delete();

            // 5️⃣ ВОЗВРАЩАЕМ СТАТУС
            DB::table('invoices')
                ->where('id', $invoiceId)
                ->update([
                    'status'     => 'draft',
                    'updated_at' => now(),
                ]);

        });
    }

    private function rollbackIncomingInvoiceOld(int $invoiceId): void
    {
        // 1️⃣ получаем движения
        $movements = DB::table('store_movements')
            ->where('document_type', 'invoice')
            ->where('document_id', $invoiceId)
            ->get();

        foreach ($movements as $move) {

            // 2️⃣ откатываем баланс
            DB::table('store_balances')
                ->where('store_id', $move->store_id)
                ->where('material_id', $move->material_id)
                ->update([
                    'qty' => DB::raw('qty - ' . $move->fact_qty),
                    'updated_at' => now()
                ]);
        }

        // 3️⃣ удаляем партии
        DB::table('store_batches')
            ->where('invoice_id', $invoiceId)
            ->delete();

        // 4️⃣ удаляем движения
        DB::table('store_movements')
            ->where('document_type', 'invoice')
            ->where('document_id', $invoiceId)
            ->delete();

        // 5️⃣ возвращаем статус
        DB::table('invoices')
            ->where('id', $invoiceId)
            ->update([
                'status'     => 'draft',
                'updated_at' => now(),
            ]);
    }


    public function update(InvoiceUpdateRequest $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {

            if (!$request->user()->can('invoice-incoming-edit')) {
                abort(403, 'No permission');
            }
            // Создаем или обновляем накладную
            $invoice = $request->id ? Invoice::find($request->id) : new Invoice();
            $invoice->fill($request->validated());
            $invoice->invoice_number = $request->invoice_number;
            $invoice->invoice_date = $request->invoice_date;
            $invoice->status = $request->status; // draft / done
            $invoice->type = 'income';
            $invoice->document_type = 'income';
            $invoice->tax_id = $request->tax_id;
            $invoice->currency_id = $request->currency_id;
            $invoice->ttn = $request->ttn;
            $rate = CurrencyExchange::where('currency_id', $request->currency_id)
                ->orderBy('rate_date', 'DESC')
                ->first();
            $invoice->currency_rate = $rate->rate_value ?? 1;
            
            // $invoice->payment_status = $request->payment_status ?? 'unpaid';
            
            $invoice->filial_id = $request->session()->get('filial_id') ?? 1; // использовать филиал из сессии
            $invoice->total_amount = $request->total_amount ?? 0;

            $invoice->save();
            $invoiceId = $invoice->id;

            // Если обновляем, удаляем старые позиции и движения
            if ($request->id) {
                DB::table('invoice_items')->where('invoice_id', $invoiceId)->delete();
                DB::table('store_batches')->where('invoice_id', $invoiceId)->delete();
                DB::table('store_movements')->where('document_id', $invoiceId)->where('document_type', 'iinv')->delete();
            }

            // $producer = Producer::find($request->supplier_id);
            $storeId = $request->store_id;
            $totalAmount = 0;
            foreach ($request->rows as $row) {
                $qty = $row['quantity'];      // количество в единицах материала
                $factQty = $row['fact_qty'];  // фактический вес/объем
                $pricePerUnit = $factQty ? $row['total'] / $factQty : 0;

                // Создаем позицию накладной
                $invoiceItem = new InvoiceItems();
                $invoiceItem->invoice_id = $invoiceId;
                $invoiceItem->material_id = $row['product_id'];
                $invoiceItem->qty = $qty;
                $invoiceItem->fact_qty = $factQty;
                $invoiceItem->price = $row['price'];
                $invoiceItem->total = $row['total'];
                $invoiceItem->price_per_unit = $pricePerUnit;
                $invoiceItem->unit_id = $row['unit_id'];
                $invoiceItem->expiry_date = $row['expiry_date'];
                $invoiceItem->save();

                $totalAmount += $row['total'];

            }

            // Обновляем общую сумму накладной
            // $invoice->total_amount = $totalAmount;
            $vatRate = Tax::where('id', $request->tax_id)->value('rate') ?? 0;
            $vatAmount = $totalAmount * $vatRate / 100;
            $totalWithVat = $totalAmount + $vatAmount;
            $invoice->net_amount = $totalAmount;
            $invoice->total_tax = $vatAmount;
            $invoice->total_amount = $totalWithVat;
            $invoice->save();

            if ($request->status === 'posted') {
                $schema = "clinic_{$clinicId}";
                DB::statement("SELECT core.post_invoice(?, ?)", [$schema, $invoiceId]);


                // Получаем общую сумму накладной
                $totalAmount = $invoice->total_amount;

                // Создаём запись в supplier_movements для контрагента
                DB::table("{$schema}.supplier_movements")->insert([
                    'supplier_id'    => $request->supplier_id,
                    'document_type'  => 'income',        // тип документа
                    'document_id'    => $invoiceId,      // ID накладной
                    'total_sum'      => $totalWithVat,    // сумма по накладной
                    'net_sum'       => $invoice->net_amount,    // без НДС
                    'tax_sum'       => $invoice->total_tax,    // сумма НДС
                    'tax_type'       => $request->tax_id ?? 1,
                    'currency_id'    => $request->currency_id ?? 1,
                    'created_at'     => $invoice->invoice_date,
                    'updated_at'     => now(),
                ]);
            }

            return redirect()->route('invoice.incoming.index');
        });
    }

    public function payment(Request $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {
            $schema = "clinic_{$clinicId}";
            $invoice = Invoice::find($request->invoiceId);

            DB::table("{$schema}.supplier_movements")->insert([
                'supplier_id'   => $invoice->supplier_id,
                'document_type' => 'payment',
                'document_id'   => $invoice->id,
                'total_sum'     => $request->amount,
                'net_sum'       => $request->amount,
                'tax_sum'       => 0,
                'currency_id'   => $invoice->currency_id,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);

            $moneyOutId = DB::table("{$schema}.money_out")->insertGetId([
                'document_number' => $invoice->invoice_number,
                'document_date'   => $invoice->invoice_date,
                'status'          => 'posted',
                'filial_id'       => $invoice->filial_id,
                'account_id'      => $request->paymentMethodId,
                'customer_id'     => $request->user()->id,
                'currency_id'     => $invoice->currency_id,
                'amount'          => $request->amount,
                'payed_document'  => 'invoice',
                'payed_document_id' => $invoice->id,
            ]);

            DB::statement("SELECT core.add_money_movement(?, ?, ?, ?, ?, ?)", [
                    $schema,
                    $request->paymentMethodId,
                    'money_out',
                    $moneyOutId,
                    $request->amount ?? 0,
                    -1
                ]);
            
            return redirect()->back();
        });
    }

    protected function updateStoreBalancesAndMaterials(int $storeId, int $invoiceId)
    {
        // 1. Обновляем остатки партий (они уже правильные после прихода)
        $batches = DB::table('store_batches')
            ->select('material_id',
                DB::raw('SUM(qty_left) as qty'),
                DB::raw('SUM(fact_qty_left) as fact_qty')
            )
            ->where('store_id', $storeId)
            ->groupBy('material_id')
            ->get();

        // 2. Обновляем store_balances (кеш остатков)
        foreach ($batches as $batch) {
            DB::table('store_balances')->updateOrInsert(
                [
                    'store_id' => $storeId,
                    'material_id' => $batch->material_id
                ],
                [
                    'qty' => $batch->qty,
                    'created_at' => now(),
                    'updated_at' => now()
                ]
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice) {
        //
    }
}
