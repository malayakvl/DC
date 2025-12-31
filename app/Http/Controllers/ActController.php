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
use App\Models\Act;
use App\Models\ActItem;
use App\Models\InvoiceStatus;
use App\Models\InvoiceType;
use App\Models\Producer;
use App\Models\Store;
use App\Models\Invoice;
use App\Models\Supplier;
use App\Models\Tax;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;


class ActController extends Controller
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
    

    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {

            $clinic = $request->user()->clinicByFilial($clinicId);
            $filialId = $request->session()->get('filial_id');
            // $query = DB::table('acts')
            //     ->select(
            //         'acts.*', 'doctor_cf.user_id as doctor_id',
            //         'patient_user.first_name as patient_first_name',
            //         'patient_user.last_name as patient_last_name',
            //         'doctor_user.first_name as doctor_first_name',
            //         'doctor_user.last_name as doctor_last_name',
            //         'payments.amount as payment_amount'
            //     )
            //     ->leftJoin('patients', 'patients.id', '=', 'acts.patient_id')
            //     ->leftJoin('core.users as patient_user', 'patient_user.id', '=', 'patients.user_id')
            //     ->leftJoin('core.users as doctor_user', 'doctor_user.id', '=', 'acts.doctor_id')
            //     ->orderBy('acts.act_number', 'DESC');
            $query = DB::table("clinic_{$clinicId}.acts as acts")
            ->select(
                'acts.*',
                'payments.amount as payment_amount',

                // Пациент
                'patient_user.first_name as patient_first_name',
                'patient_user.last_name  as patient_last_name',

                // Доктор
                'doctor_user.first_name  as doctor_first_name',
                'doctor_user.last_name   as doctor_last_name'
            )

            // --- пациент ---
            ->leftJoin("clinic_{$clinicId}.patients as patients", 'patients.id', '=', 'acts.patient_id')
            ->leftJoin('core.users as patient_user', 'patient_user.id', '=', 'patients.user_id')

            // --- доктор ---
            ->leftJoin('core.users as doctor_user', 'doctor_user.id', '=', 'acts.doctor_id')
            ->leftJoin("clinic_{$clinicId}.payments as payments", 'payments.act_id', '=', 'acts.id')

            ->orderBy('acts.act_number', 'DESC');


            if ($request->user()->roles[0]->name !== 'Admin') {
                $query->where('acts.filial_id', $filialId);
            }
            $acts = $query->get();
        // dd($acts);exit;
            return Inertia::render('Act/List', [
                'clinicData' => $clinic,
                'listData'   => $acts
            ]);
        });
    }




    /**
     * Display a listing of the resource.
     */
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
                $typeData = array();
                $formData = new Invoice();
                $lastInvoiceNum = DB::table('acts')
                    ->max('act_number');
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

                return Inertia::render('Act/Create', [
                    'clinicData' => $clinicData,
                    'formData' => $formData,
                    'customerData' => $customerData,
                    'producerData' => $producerData,
                    'statusData' => Invoices::INVOICE_STATUSES,
                    'typeData' => $typeData,
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
            if ($request->user()->can('act-edit')) {
                $clinicData = $request->user()->clinicByFilial($clinicId);
                $formData = Act::find($id);
                $currencyData = Currency::all();
                $taxData = Tax::all();
                $rowData = ActItem::select('act_items.*', 'pricings.name as product')
                    ->leftJoin('pricings', 'pricings.id', '=', 'act_items.service_id')
                    ->where('act_id', $id)->get();

                // Collection of IDs to batch load names
                $materialIds = [];
                $unitIds = [];
                foreach ($rowData as $item) {
                    $components = is_array($item->components) ? $item->components : json_decode($item->components ?? '[]', true);
                    foreach ($components as $component) {
                        if (!empty($component['material_id'])) $materialIds[] = $component['material_id'];
                        if (!empty($component['unit_id'])) $unitIds[] = $component['unit_id'];
                    }
                }

                // Create associative arrays for quick lookup: [id => name]
                $materialMap = DB::table('materials')
                    ->whereIn('id', array_unique($materialIds))
                    ->pluck('name', 'id')
                    ->toArray();

                $unitMap = Unit::whereIn('id', array_unique($unitIds))
                    ->pluck('name', 'id')
                    ->toArray();

                // Enrich components with display names
                $rowData->each(function ($item) use ($materialMap, $unitMap) {
                    $components = is_array($item->components) ? $item->components : json_decode($item->components ?? '[]', true);
                    foreach ($components as &$component) {
                        $mId = $component['material_id'] ?? null;
                        $uId = $component['unit_id'] ?? null;
                        
                        if ($mId && isset($materialMap[$mId])) {
                            $component['product'] = $materialMap[$mId];
                        }
                        if ($uId && isset($unitMap[$uId])) {
                            $component['unit_name'] = $unitMap[$uId];
                        }
                    }
                    $item->components = $components;
                });
                
                $typeData = array();
                $patientsData = DB::table('patients')
                    ->join('core.users', 'core.users.id', '=', 'patients.user_id')
                    ->select(
                        'users.first_name',
                        'users.last_name',
                        'users.email',
                        'patients.id'
                    )
                    ->distinct()
                    ->orderBy('users.last_name')
                    ->get();
                $customerData = DB::table('core.clinic_user')
                    ->join('core.users', 'clinic_user.user_id', '=', 'users.id')
                    ->select(
                        'users.id',
                        'users.first_name',
                        'users.last_name',
                        'users.email'
                    )
                    ->where('clinic_user.clinic_id', $clinicId)
                    ->distinct()
                    ->orderBy('users.last_name')
                    ->get();

                return Inertia::render('Act/Edit', [
                    'clinicData' => $clinicData,
                    'formData' => $formData,
                    'patientsData'=> $patientsData,
                    'formRowData' => $rowData,
                    'customerData' => $customerData,
                    'statusData' => Invoices::INVOICE_STATUSES,
                    'typeData' => $typeData,
                ]);
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


    public function update(Request $request)
    {
        $clinicData = Clinic::where('user_id', '=', $request->user()->id)->first();
        
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {

            if (!$request->user()->can('act-edit')) {
                abort(403, 'No permission');
            }
            $filialData = ClinicFilial::where('clinic_id', $clinicId)->get();
            $storeId = $filialData[0]->store_id;
            DB::beginTransaction();
            

            try {
                // Создаем или обновляем акт
                $act = $request->id ? Act::find($request->id) : new Act();
                $act->fill($request->only(['filial_id', 'patient_id', 'doctor_id', 'act_date', 'status']));
                $act->act_number = $request->act_number;
                $act->total_amount = 0; // пока 0, потом суммируем
                $act->filial_id = 1; // изменить на реальный филиал
                $act->save();

                $actId = $act->id;
                $totalAmount = 0;

                // Если обновляем, удаляем старые позиции и движения
                if ($request->id) {
                    ActItem::where('act_id', $actId)->delete();
                    StoreMovements::where('document_type', 'act')
                        ->where('document_id', $actId)
                        ->delete();
                    // PatientService::where('act_id', $actId)->delete();
                }

                $filialStoreId = $storeId;// метод для получения store_id филиала

                // Обработка строк акта
                foreach ($request->rows as $row) {
                    $serviceQty = $row['quantity'];
                    $serviceTotal = $row['total'];
                    $totalAmount += $serviceTotal;

                    // 1️⃣ Создаем элемент акта
                    $actItem = ActItem::create([
                        'act_id' => $actId,
                        'service_id' => $row['service_id'],
                        'components' => json_encode($row['components']),
                        'qty' => $serviceQty,
                        'price' => $row['price'],
                        'total' => $serviceTotal
                    ]);

                    // 2️⃣ Создаем запись оказанной услуги для оплаты
                    // PatientService::create([
                    //     'patient_id' => $act->patient_id,
                    //     'doctor_id' => $act->doctor_id,
                    //     'service_id' => $row['service_id'],
                    //     'act_id' => $actId,
                    //     'qty' => $serviceQty,
                    //     'price' => $row['price'],
                    //     'total' => $serviceTotal
                    // ]);
                    // 3️⃣ Списание материалов по компонентам
                    foreach ($row['components'] as $component) {
                        $remainingFactQty = (float)$component['quantity']; // граммы / мл

                        if ($remainingFactQty <= 0) {
                            continue;
                        }

                        $batches = StoreBatches::where('store_id', $filialStoreId)
                            ->where('material_id', $component['material_id'])
                            ->where('fact_qty_left', '>', 0)
                            ->orderBy('arrived_at', 'ASC') // FIFO
                            ->get();

                        foreach ($batches as $batch) {
                            if ($remainingFactQty <= 0) {
                                break;
                            }

                            // сколько можем списать по факту
                            $deductFactQty = min($remainingFactQty, $batch->fact_qty_left);

                            // коэффициент партии (сколько fact в 1 qty)
                            $factPerQty = $batch->fact_qty / $batch->qty;

                            // сколько это в qty
                            $deductQty = $deductFactQty / $factPerQty;

                            // обновляем партию
                            $batch->fact_qty_left -= $deductFactQty;
                            $batch->qty_left -= $deductQty;
                            $batch->save();

                            // движение
                            StoreMovements::create([
                                'store_id'      => $filialStoreId,
                                'material_id'   => $component['material_id'],
                                'batch_id'      => $batch->id,
                                'direction'     => -1,
                                'qty'           => $deductQty,
                                'fact_qty'      => $deductFactQty,
                                'document_type' => 'act',
                                'document_id'   => $actId,
                                'act_item_id'   => $actItem->id   // ← ВОТ ОНО
                            ]);

                            $remainingFactQty -= $deductFactQty;
                        }

                        if ($remainingFactQty > 0) {
                            throw new \Exception(
                                "Недостаточно материала material_id={$component['material_id']}, не хватает {$remainingFactQty}"
                            );
                        }
                    }
                }

                // Обновляем итоговую сумму акта
                $act->total_amount = $totalAmount;
                $act->save();

                DB::commit();

                if ($request->status === 'posted')
                    $this->updateStoreBalancesAndMaterials($storeId, $actId );
                
                return redirect()->route('act.index')->with('success', 'Акт успешно сохранен');

            } catch (\Exception $e) {
                DB::rollBack();
                return back()->withErrors(['error' => $e->getMessage()]);
            }

            return redirect()->route('act.index');
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
