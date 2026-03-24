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
                    ->orderBy('opening_balances.doc_number', 'DESC')->get();
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
                    ->orderBy('opening_balances.doc_number', 'DESC')->get();
            }
            // dd($invoiceData);exit;
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
            if ($request->user()->can('opening-balance-create')) {
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
                    ->max('doc_number');
                if (!$lastInvoiceNum) {
                    $num = 1;
                } else {
                    $maxNum = (explode('-', $lastInvoiceNum));
                    if (intval($maxNum[1])) {
                        $num = intval($maxNum[1]);
                    }
                    ++$num;
                }
                $formData->doc_number = date("dmy").'-'.$paddedNumber = str_pad($num, 7, '0', STR_PAD_LEFT);;
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
                $formData = OpeningBalance::find($id);
                $currencyData = Currency::all();
                // $taxData = Tax::all();
                $rowData = OpeningBalanceItems::select('opening_balance_items.*', 'materials.name as product')
                    ->leftJoin('materials', 'materials.id', '=', 'opening_balance_items.material_id')
                    ->where('opening_balance_id', $id)->get();
                // $producerData = Producer::all();
                
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
// dd(1);exit;
                return Inertia::render('OpeningBalance/Edit', [
                    'clinicData' => $clinicData,
                    'filialData' => $storeData,
                    'formData' => $formData,
                    'formRowData' => $rowData,
                    'storeData' => $storeData,
                    'customerData' => $customerData,
                    // 'producerData' => $producerData,
                    'statusData' => Invoices::INVOICE_STATUSES,
                    'typeData' => $typeData,
                    'currencyData' => $currencyData,
                    'unitsData' => $unitsData,
                    // 'taxData' => $taxData
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


    public function update(OpeningBalanceRequest $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {

            if (!$request->user()->can('invoice-incoming-edit')) {
                abort(403, 'No permission');
            }
            $filialId = $request->session()->get('filial_id');

            // Создаем или обновляем накладную
            $invoice = $request->id ? OpeningBalance::find($request->id) : new OpeningBalance();
            $invoice->fill($request->validated());
            $invoice->doc_number = $request->doc_number;
            $invoice->doc_date = $request->doc_date;
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
