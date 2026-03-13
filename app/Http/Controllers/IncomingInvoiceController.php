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

            return Inertia::render('InvoiceIncoming/List', [
                'clinicData' => $clinic,
                'listData' => $invoiceData,
                'suppliers' => $suppliers,
                'filters' => $request->only(['date_from', 'date_to', 'supplier_id'])
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('invoice-incoming-create')) {
                // $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $storeData = DB::table('stores')
                    ->select('stores.*', 'users.first_name', 'users.last_name', 'clinic_filials.name AS filialName')
                    ->leftJoin('core.users', 'users.id', '=', 'stores.user_id')
                    ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                    ->where('stores.clinic_id', $request->session()->get('clinic_id'))
                    ->orderBy('name')->get();
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
                
                $customerData = DB::table('core.clinic_user')
                    ->join('core.users', 'clinic_user.user_id', '=', 'users.id')
                    ->select(
                        'users.id',
                        'users.first_name',
                        'users.last_name',
                        'users.email'
                    )
                    ->where('clinic_user.clinic_id', $clinicId)
                    ->orderBy('users.last_name')
                    ->get();


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
                $storeData = DB::table('stores')
                    ->select('stores.*', 'users.first_name', 'users.last_name', 'clinic_filials.name AS filialName')
                    ->leftJoin('core.users', 'users.id', '=', 'stores.user_id')
                    ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                    ->where('stores.clinic_id', $request->session()->get('clinic_id'))
                    ->orderBy('name')->get();
                $typeData = array();
                $unitsData = Unit::all();
                $formData = Invoice::find($id);
                $currencyData = Currency::all();
                $taxData = Tax::all();
                $rowData = InvoiceItems::select('invoice_items.*', 'materials.name as product')
                    ->leftJoin('materials', 'materials.id', '=', 'invoice_items.material_id')
                    ->where('invoice_id', $id)->get();
                $producerData = Producer::all();
                
                $customerData = DB::table('core.clinic_user')
                    ->join('core.users', 'clinic_user.user_id', '=', 'users.id')
                    ->select(
                        'users.id',
                        'users.first_name',
                        'users.last_name',
                        'users.email'
                    )
                    ->where('clinic_user.clinic_id', $clinicId)
                    ->orderBy('users.last_name')
                    ->get();

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

            } else {

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

    public function postIncomingInvoice(int $invoiceId): void
    {
        DB::transaction(function () use ($invoiceId) {

            /** @var object $invoice */
            $invoice = DB::table('invoices')->where('id', $invoiceId)->lockForUpdate()->first();

            if (!$invoice) {
                throw new \Exception('Invoice not found');
            }

            // 1️⃣ если уже была проведена — откатываем старый приход
            if ($invoice->status === 'posted') {
                $this->rollbackIncomingInvoice($invoiceId);
            }

            // 2️⃣ получаем строки накладной
            $items = DB::table('invoice_items')
                ->where('invoice_id', $invoiceId)
                ->get();

            if ($items->isEmpty()) {
                throw new \Exception('Invoice has no items');
            }

            foreach ($items as $item) {

                // защита
                if ($item->fact_qty <= 0) {
                    continue;
                }

                // 3️⃣ создаём партию
                $batchId = DB::table('store_batches')->insertGetId([
                    'store_id'        => $invoice->store_id,
                    'material_id'     => $item->material_id,
                    'supplier_id'     => $invoice->supplier_id,
                    'invoice_id'      => $invoiceId,
                    'arrived_at'      => $invoice->invoice_date,
                    'qty'             => $item->qty,
                    'qty_left'        => $item->qty,
                    'fact_qty'        => $item->fact_qty,
                    'fact_qty_left'   => $item->fact_qty,
                    'price_per_unit'  => $item->total / max($item->fact_qty, 1),
                    'created_at'      => now(),
                ]);

                // 4️⃣ обновляем баланс склада
                DB::statement("
                    INSERT INTO store_balances (store_id, material_id, qty, updated_at)
                    VALUES (?, ?, ?, now())
                    ON CONFLICT (store_id, material_id)
                    DO UPDATE SET
                        qty = store_balances.qty + EXCLUDED.qty,
                        updated_at = now()
                ", [
                    $invoice->store_id,
                    $item->material_id,
                    $item->fact_qty
                ]);

                // 5️⃣ движение по складу
                DB::table('store_movements')->insert([
                    'store_id'      => $invoice->store_id,
                    'material_id'   => $item->material_id,
                    'batch_id'      => $batchId,
                    'direction'     => 1, // приход
                    'qty'           => $item->qty,
                    'fact_qty'      => $item->fact_qty,
                    'document_type' => 'invoice',
                    'document_id'   => $invoiceId,
                    'created_at'    => now(),
                ]);
            }

            // 6️⃣ меняем статус накладной
            DB::table('invoices')
                ->where('id', $invoiceId)
                ->update([
                    'status'     => 'posted',
                    'updated_at' => now(),
                ]);
        });
    }

    private function rollbackIncomingInvoice(int $invoiceId): void
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
