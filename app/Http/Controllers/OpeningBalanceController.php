<?php

namespace App\Http\Controllers;

use App\Constants\Invoices;
use App\Http\Requests\OpeningBalanceRequest;
use App\Models\ClinicFilial;
use App\Models\Currency;
use App\Models\StoreBatches;
use App\Models\StoreMovements;
use App\Models\OpeningBalanceItems;
use App\Models\Producer;
use App\Models\Store;
use App\Models\OpeningBalance;
use App\Models\Supplier;
use App\Models\Tax;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class OpeningBalanceController extends Controller
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

            if ($request->user()->roles[0]->name == 'Admin') {
                $invoiceData = DB::table('opening_balances')
                    ->select('opening_balances.*',
                        'stores.name AS storeName',
                        // 'invoice_statuses.name as statusName',
                        // 'invoice_types.name as typeName',
                        'users.name AS customerName',
                        'suppliers.name AS supplierName'
                    )
                    ->leftJoin('stores', 'stores.id', '=', 'opening_balances.store_id')
                    ->leftJoin('core.users', 'core.users.id', '=', 'opening_balances.customer_id')
                    ->orderBy('opening_balances.ob_number', 'DESC')->get();
            } else {
                // dd($arrStores);exit;
                $invoiceData = DB::table('opening_balances')
                    ->select('opening_balances.*',
                        'stores.name AS storeName',     
                        'users.name AS customerName'
                    )
                    ->leftJoin('stores', 'stores.id', '=', 'opening_balances.store_id')
                    ->leftJoin('core.users', 'core.users.id', '=', 'opening_balances.customer_id')
                    ->whereIn('opening_balances.store_id', $arrStores)
                    ->orderBy('opening_balances.ob_number', 'DESC')->get();
            }
            return Inertia::render('OpeningBalance/List', [
                'clinicData' => $clinic,
                'listData' => $invoiceData
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
                $formData = new OpeningBalance();
                $lastInvoiceNum = DB::table('opening_balances')
                    ->max('ob_number');
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


                return Inertia::render('OpeningBalance/Create', [
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

    // public function postIncomingInvoice(int $invoiceId): void
    // {
    //     DB::transaction(function () use ($invoiceId) {

    //         /** @var object $invoice */
    //         $invoice = DB::table('invoices')->where('id', $invoiceId)->lockForUpdate()->first();

    //         if (!$invoice) {
    //             throw new \Exception('Invoice not found');
    //         }

    //         // 1️⃣ если уже была проведена — откатываем старый приход
    //         if ($invoice->status === 'posted') {
    //             $this->rollbackIncomingInvoice($invoiceId);
    //         }

    //         // 2️⃣ получаем строки накладной
    //         $items = DB::table('invoice_items')
    //             ->where('invoice_id', $invoiceId)
    //             ->get();

    //         if ($items->isEmpty()) {
    //             throw new \Exception('Invoice has no items');
    //         }

    //         foreach ($items as $item) {

    //             // защита
    //             if ($item->fact_qty <= 0) {
    //                 continue;
    //             }

    //             // 3️⃣ создаём партию
    //             $batchId = DB::table('store_batches')->insertGetId([
    //                 'store_id'        => $invoice->store_id,
    //                 'material_id'     => $item->material_id,
    //                 'supplier_id'     => $invoice->supplier_id,
    //                 'invoice_id'      => $invoiceId,
    //                 'arrived_at'      => $invoice->invoice_date,
    //                 'qty'             => $item->qty,
    //                 'qty_left'        => $item->qty,
    //                 'fact_qty'        => $item->fact_qty,
    //                 'fact_qty_left'   => $item->fact_qty,
    //                 'price_per_unit'  => $item->total / max($item->fact_qty, 1),
    //                 'created_at'      => now(),
    //             ]);

    //             // 4️⃣ обновляем баланс склада
    //             DB::statement("
    //                 INSERT INTO store_balances (store_id, material_id, qty, updated_at)
    //                 VALUES (?, ?, ?, now())
    //                 ON CONFLICT (store_id, material_id)
    //                 DO UPDATE SET
    //                     qty = store_balances.qty + EXCLUDED.qty,
    //                     updated_at = now()
    //             ", [
    //                 $invoice->store_id,
    //                 $item->material_id,
    //                 $item->fact_qty
    //             ]);

    //             // 5️⃣ движение по складу
    //             DB::table('store_movements')->insert([
    //                 'store_id'      => $invoice->store_id,
    //                 'material_id'   => $item->material_id,
    //                 'batch_id'      => $batchId,
    //                 'direction'     => 1, // приход
    //                 'qty'           => $item->qty,
    //                 'fact_qty'      => $item->fact_qty,
    //                 'document_type' => 'invoice',
    //                 'document_id'   => $invoiceId,
    //                 'created_at'    => now(),
    //             ]);
    //         }

    //         // 6️⃣ меняем статус накладной
    //         DB::table('invoices')
    //             ->where('id', $invoiceId)
    //             ->update([
    //                 'status'     => 'posted',
    //                 'updated_at' => now(),
    //             ]);
    //     });
    // }

    // private function rollbackIncomingInvoice(int $invoiceId): void
    // {
    //     // 1️⃣ получаем движения
    //     $movements = DB::table('store_movements')
    //         ->where('document_type', 'invoice')
    //         ->where('document_id', $invoiceId)
    //         ->get();

    //     foreach ($movements as $move) {

    //         // 2️⃣ откатываем баланс
    //         DB::table('store_balances')
    //             ->where('store_id', $move->store_id)
    //             ->where('material_id', $move->material_id)
    //             ->update([
    //                 'qty' => DB::raw('qty - ' . $move->fact_qty),
    //                 'updated_at' => now()
    //             ]);
    //     }

    //     // 3️⃣ удаляем партии
    //     DB::table('store_batches')
    //         ->where('invoice_id', $invoiceId)
    //         ->delete();

    //     // 4️⃣ удаляем движения
    //     DB::table('store_movements')
    //         ->where('document_type', 'invoice')
    //         ->where('document_id', $invoiceId)
    //         ->delete();

    //     // 5️⃣ возвращаем статус
    //     DB::table('invoices')
    //         ->where('id', $invoiceId)
    //         ->update([
    //             'status'     => 'draft',
    //             'updated_at' => now(),
    //         ]);
    // }


    public function update(OpeningBalanceRequest $request)
    {
        dd($request->all());exit;
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {

            if (!$request->user()->can('invoice-incoming-edit')) {
                abort(403, 'No permission');
            }
            $filialId = $request->session()->get('filial_id');
// dd($request->all());exit;
            // Создаем или обновляем накладную
            $invoice = $request->id ? OpeningBalance::find($request->id) : new OpeningBalance();
            $invoice->fill($request->validated());
            $invoice->ob_number = $request->invoice_number;
            $invoice->ob_date = $request->invoice_date;
            $invoice->status = $request->status; // draft / done
            // $invoice->type = 'balance'; // 1 = приход
            // $invoice->document_type = 'balance'; // 1 = приход
            $invoice->filial_id = $filialId; // изменить на реальний филиал
            $invoice->store_id = $request->store_id;
            $invoice->customer_id = $request->customer_id;

            $invoice->save();
            $invoiceId = $invoice->id;

            // // Если обновляем, удаляем старые позиции и движения
            // if ($request->id) {
            //     DB::table('invoice_items')->where('invoice_id', $invoiceId)->delete();
            //     DB::table('store_batches')->where('invoice_id', $invoiceId)->delete();
            //     DB::table('store_movements')->where('document_id', $invoiceId)->where('document_type', 'balance')->delete();
            // }

            $storeId = $request->store_id;
            $totalAmount = 0;
            foreach ($request->rows as $row) {
                $qty = $row['quantity'];      // количество в единицах материала
                $factQty = $row['fact_qty'];  // фактический вес/объем
                $pricePerUnit = $row['total'] / $factQty;

                // Создаем позицию накладной
                $invoiceItem = new OpeningBalanceItems();
                $invoiceItem->opening_balance_id = $invoiceId;
                $invoiceItem->material_id = $row['product_id'];
                $invoiceItem->qty = $qty;
                $invoiceItem->fact_qty = $factQty;
                $invoiceItem->price = $row['price'];
                $invoiceItem->total = $row['total'];
                $invoiceItem->price_per_unit = $pricePerUnit;
                $invoiceItem->unit_id = $row['unit_id'];
                $invoiceItem->save();
                $itemId = $invoiceItem->id;

                $totalAmount += $row['total'];

                if ($request->status === 'posted') {
                    
                }
            }

            // Обновляем общую сумму накладной
            // $invoice->total_amount = $totalAmount;
            $invoice->save();
            // Если статус posted — вызываем функцию БД для движения
            if ($request->status === 'posted') {
                $schema = "clinic_{$clinicId}";
                DB::statement("SELECT core.post_opening_balance(?, ?)", [$schema, $invoiceId]);
            }
            return redirect()->route('opening-balance.index');
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
