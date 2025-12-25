<?php

namespace App\Http\Controllers;

use App\Constants\Invoices;
use App\Http\Requests\InvoiceUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Currency;
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

            if ($request->user()->roles[0]->name == 'Admin') {
                $invoiceData = DB::table('invoices')
                    ->select('invoices.*',
                        'stores.name AS storeName',
                        // 'invoice_statuses.name as statusName',
                        // 'invoice_types.name as typeName',
                        'users.name AS customerName',
                        'suppliers.name AS supplierName'
                    )
                    ->leftJoin('stores', 'stores.id', '=', 'invoices.store_id')
                    // ->leftJoin('invoice_statuses', 'invoice_statuses.id', '=', 'invoices.status_id')
                    // ->leftJoin('invoice_types', 'invoice_types.id', '=', 'invoices.type_id')
                    ->leftJoin('suppliers', 'suppliers.id', '=', 'invoices.supplier_id')
                    ->leftJoin('core.users', 'core.users.id', '=', 'invoices.customer_id')
                    // ->where('invoices.clinic_id', $clinic->id)
                    ->where('invoices.type_id', 1)
                    ->orderBy('invoice_number', 'DESC')->get();
            } else {
                $invoiceData = DB::table('invoices')
                    ->select('invoices.*',
                        'stores.name AS storeName',
                        // 'invoice_statuses.name as statusName',
                        // 'invoice_types.name as typeName',
                        'users.name AS customerName',
                        'suppliers.name AS producerName'
                    )
                    ->leftJoin('stores', 'stores.id', '=', 'invoices.store_id')
                    // ->leftJoin('invoice_statuses', 'invoice_statuses.id', '=', 'invoices.status_id')
                    // ->leftJoin('invoice_types', 'invoice_types.id', '=', 'invoices.type_id')
                    ->leftJoin('suppliers', 'suppliers.id', '=', 'invoices.supplier_id')
                    ->leftJoin('core.users', 'core.users.id', '=', 'invoices.customer_id')
                    ->whereIn('invoices.store_id', $arrStores)
                    ->where('invoices.type_id', 1)
                    // ->where('invoices.clinic_id', $clinic->id)
                    ->orderBy('invoice_number', 'DESC')->get();
            }
            return Inertia::render('InvoiceIncoming/List', [
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
                // $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $storeData = DB::table('stores')
                    ->select('stores.*', 'users.first_name', 'users.last_name', 'clinic_filials.name AS filialName')
                    ->leftJoin('core.users', 'users.id', '=', 'stores.user_id')
                    ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'stores.filial_id')
                    ->where('stores.clinic_id', $request->session()->get('clinic_id'))
                    ->orderBy('name')->get();
                // $storeData = Store::where('clinic_id', $clinicData->id)->where('filial_id', $request->session()->get('filial_id'))->get();
                $statusData = InvoiceStatus::all();
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


                // $customerData = DB::table('core.users')
                //     ->select('core.users.*')
                //     ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                //     ->where('clinic_id', $clinicData->id)
                //     ->orderBy('name')->get();
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
        if ($request->user()->can('invoice-incoming-edit')) {
            $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
//            $storeData = Store::where('clinic_id', $clinicData->id)->get();
            $storeData = Store::where('clinic_id', $clinicData->id)->where('filial_id', $request->session()->get('filial_id'))->get();
            $statusData = InvoiceStatus::all();
            $typeData = InvoiceType::all();
            $unitsData = Unit::all();
            $formData = Invoice::find($id);
            $currencyData = Currency::all();
            $taxData = Tax::all();
            $rowData = InvoiceItems::select('invoice_items.*', 'materials.name as product')
                ->leftJoin('materials', 'materials.id', '=', 'invoice_items.product_id')
                ->where('invoice_id', $id)->get();
            $producerData = Producer::all();
            $customerData = DB::table('users')
                ->select('users.*')
                ->leftJoin('clinic_user', 'users.id', '=', 'clinic_user.user_id')
                ->where('clinic_id', $clinicData->id)->orderBy('name')->get();
            return Inertia::render('InvoiceIncoming/Edit', [
                'clinicData' => $clinicData,
                'filialData' => $storeData,
                'formData' => $formData,
                'formRowData' => $rowData,
                'storeData' => $storeData,
                'customerData' => $customerData,
                'producerData' => $producerData,
                'statusData' => $statusData,
                'typeData' => $typeData,
                'currencyData' => $currencyData,
                'unitsData' => $unitsData,
                'taxData' => $taxData
            ]);

        } else {

        }
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
            $invoice->status = $request->status_id; // draft / done
            $invoice->type_id = 1; // 1 = приход
            $invoice->tax_id = $request->tax_id;
            $invoice->currency_id = $request->currency_id;
            
            $invoice->filial_id = 1; // изменить на реальний филиал
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
                $pricePerUnit = $row['total'] / $factQty;

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

                if ($request->status_id === 'posted') {
                    // Создаем партию на складе
                    $batch = new StoreBatches();
                    $batch->store_id = $storeId;
                    $batch->material_id = $row['product_id'];
                    $batch->supplier_id = $request->supplier_id;
                    $batch->invoice_id = $invoiceId;
                    $batch->arrived_at = $request->invoice_date;
                    $batch->qty = $qty;
                    $batch->qty_left = $qty;
                    $batch->fact_qty = $factQty;
                    $batch->fact_qty_left = $factQty;
                    $batch->price_per_unit = $pricePerUnit;
                    $batch->save();

                    // Создаем движение на склад (приход)
                    $movement = new StoreMovements();
                    $movement->store_id = $storeId;
                    $movement->material_id = $row['product_id'];
                    $movement->batch_id = $batch->id;
                    $movement->direction = 1; // 1 = приход
                    $movement->qty = $qty;
                    $movement->fact_qty = $factQty;
                    $movement->document_type = 'iinv';
                    $movement->document_id = $invoiceId;
                    $movement->save();
                }
            }

            // Обновляем общую сумму накладной
            $invoice->total_amount = $totalAmount;
            $invoice->save();
            if ($request->status_id === 'posted')
                $this->updateStoreBalancesAndMaterials($request->store_id, $invoice->id);


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
                    'updated_at' => now()
                ]
            );
        }
    }







    /**
     * Update the specified resource in storage.
     */
    public function updateOld(InvoiceUpdateRequest $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {

    //         if ($request->id) {
    //             $data = $request;
    //         } else {
    //             $data = $request->values;
    //         }
    //         if ($request->user()->can('invoice-incoming-edit')) {
    //             if ($request->id) {
    //                 $invoice = Invoice::find($data->id);
    //                 // invoice was issued and we need to remove materials from store and remove operation
    //             }
    //             else {
    //                 $invoice = new Invoice();
    //             }
    // //            dd($request);exit;
    //             $invoice->fill($request->validated());
    //             $invoice->invoice_number = $request->invoice_number;
    //             $invoice->invoice_date = $request->invoice_date;
    //             $invoice->status_id = $request->status_id;
    //             $invoice->type_id = 1;
    //             $invoice->tax_id = $request->tax_id;
    //             $invoice->currency_id = $request->currency_id;
    //             $invoice->save();
    //             if (!$request->id) {
    //                 $invoiceId = $invoice->id;
    //             } else {
    //                 $invoiceId = $request->id;
    //                 DB::table('invoice_items')->where('invoice_id', $invoiceId)->delete();
    //             }
    //             $producer = Producer::find($request->producer_id);
    //             $store = Store::find($request->store_id);
    //             if ($request->status_id === 2) {
    //                 DB::table('document_operations')
    //                     ->where('document_id', $invoiceId)
    //                     ->where('document_type', 'invoice')
    //                     ->delete();
    //             }
    //             $total = 0;
    //             foreach ($request->rows as $row) {
    //                 $invoiceItem = new InvoiceItems();
    //                 $invoiceItem->invoice_id = $invoiceId;
    //                 $invoiceItem->product_id = $row["product_id"];
    //                 $invoiceItem->unit_id = $row["unit_id"];
    //                 $invoiceItem->fact_qty = $row["fact_qty"];
    //                 $invoiceItem->price_per_unit = $row["total"]/$row["fact_qty"];
    //                 $invoiceItem->quantity = $row["quantity"];
    //                 $invoiceItem->price = $row["price"];
    //                 $invoiceItem->total = $row["total"];
    //                 $total = $total + $row["total"];
    //                 $invoiceItem->save();
    //                 if (intval($request->status_id) === 2) {
    //                     $documentOperation  = new DocumentOperations();
    //                     $documentOperation->operation_date = $request->invoice_date;
    //                     $documentOperation->operation_number = $request->invoice_number;
    //                     $documentOperation->document_id = $invoiceId;
    //                     $documentOperation->document_type = 'iinv';
    //                     $documentOperation->operation_dt = '281';
    //                     $documentOperation->subconto_dt = json_encode(array(
    //                         'store_id' => $request->store_id,
    //                         'store_name' => $store->name,
    //                         'product_id' => $row["product_id"],
    //                         'product_name' => $row['product'],
    //                         'producer_id' => $producer->id,
    //                         'producer_name' => $producer->name,
    //                         'fact_qty' => $row['fact_qty'],
    //                         'qty' => $row['quantity'],
    //                         'price_per_unit' => number_format(($row['total']/$row['fact_qty']), 2)
    //                     ));
    //                     // get weight if exist
    //                     $material = Material::find($row["product_id"]);
    // //                    DB::select('
    // //                        INSERT INTO store_materials AS sm (store_id, material_id, producer_id, quantity, weight, unit_id)
    // //                        VALUES ('.$request->store_id.', '.$row["product_id"].', '.$material->producer_id.',
    // //                        '.$row["quantity"].', '.($row['fact_qty']). ', '.($material->weightunit_id ? $material->weightunit_id :$material->unit_id).')
    // //                        ON CONFLICT ON CONSTRAINT store_materials_pkey
    // //                        DO UPDATE SET
    // //                        weight = sm.weight  + ' .$row["fact_qty"]. ',
    // //                        quantity = sm.quantity + ' .$row["quantity"]. ';
    // //                    ');
    //                     $storeMaterials = new StoreMaterials();
    //                     $storeMaterials->doc_date = $request->invoice_date;
    //                     $storeMaterials->document_type = 'iinv';
    //                     $storeMaterials->document_id = $invoiceId;
    //                     $storeMaterials->store_id = $request->store_id;
    //                     $storeMaterials->material_id = $row["product_id"];
    //                     $storeMaterials->qty = $row["quantity"];
    //                     $storeMaterials->store_qty = $row["quantity"];
    //                     $storeMaterials->unit_id = $material->unit_id;
    //                     $storeMaterials->fact_qty = $row['fact_qty'];
    //                     $storeMaterials->store_fact_qty = $row['fact_qty'];
    //                     $storeMaterials->fact_unit_id = $material->weightunit_id;
    //                     $storeMaterials->price_per_unit = number_format(($row['total']/$row['fact_qty']), 2);
    //                     $storeMaterials->producer_id = $request->producer_id;
    //                     $storeMaterials->save();

    // //                    DB::select('
    // //                        INSERT INTO store_materials AS sm (doc_date, store_id, material_id, qty, unit_id, fact_qty, fact_unit_id, price_per_unit, producer_id)
    // //                        VALUES (\''.$request->invoice_date. '\',  '.$request->store_id.', '.$row["product_id"].',
    // //                        '.$row["quantity"].', ' .$material->unit_id. ', '. $row['fact_qty'].',
    // //                        ' .$material->weightunit_id. ',
    // //                        '.number_format(($row['total']/$row['fact_qty']), 2).',
    // //                        ' .$request->producer_id. '
    // //                    ');

    //                     $documentOperation->operation_kt = '631';
    //                     $documentOperation->subconto_kt = json_encode(array(
    //                         'producer_id' => $request->producer_id,
    //                         'producer_name' => $producer->name
    //                     ));
    // //                    $documentOperation->amount = $row["quantity"]*floatval($row["price"]);
    //                     $documentOperation->amount = $row["total"];
    //                     $documentOperation->quantity = $row["quantity"];
    //                     $documentOperation->comment = 'income_products';
    //                     $documentOperation->save();
    //                 }
    //             }
    //             // create operations
    //             if (intval($request->status_id) === 2) {
    //                 $documentOperation  = new DocumentOperations();
    //                 $documentOperation->operation_date = $request->invoice_date;
    //                 $documentOperation->operation_number = $request->invoice_number;
    //                 $documentOperation->document_id = $invoiceId;
    //                 $documentOperation->document_type = 'iinv';
    //                 $documentOperation->operation_dt = '6442';
    //                 $documentOperation->subconto_dt = json_encode(array('name' => 'nds'));
    //                 $documentOperation->operation_kt = '631';
    //                 $documentOperation->subconto_kt = json_encode(array('producer_id' => $request->producer_id, 'name' => $producer->name));
    //                 $documentOperation->amount = $total*20/100;
    //                 $documentOperation->quantity = 0;
    //                 $documentOperation->comment = 'nds';
    //                 $documentOperation->save();
    //             }

    //             return Redirect::route('invoice.incoming.index');
    //         }
        });
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice) {
        //
    }
}
